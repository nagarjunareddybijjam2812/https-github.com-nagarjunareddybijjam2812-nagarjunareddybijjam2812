import React, { useState, useEffect } from "react";
import { ProfileData, ImageProcessingParams } from "./types";
import { Sidebar } from "./components/Sidebar";
import { Previews } from "./components/Previews";
import { processCharacterImage } from "./utils/imageProcessor";
import { 
  generateBannerSvg, 
  generateLanyardSvg, 
  generateReadmeContent 
} from "./data/templates";
import { Sparkles, Save, CheckCircle2, AlertCircle, Sliders } from "lucide-react";

export default function App() {
  // 1. Initial Profile Parameters representing the User's exact details, persisted in localStorage
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("github_anime_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: "Nagarjuna Reddy Bijjam",
      role: "AI&ML Engineer",
      githubUser: "nagarjuna2812",
      email: "nagarjunareddybjjam2812@gmail.com",
      skills: "Python, SQL Database, ML & Deep Learning, Generative AI & LLMs",
      tagline: "Keep On"
    };
  });

  // 2. Image background threshold and crop parameters, persisted in localStorage
  const [imageParams, setImageParams] = useState<ImageProcessingParams>(() => {
    const saved = localStorage.getItem("github_anime_image_params");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      tolerance: 40,
      feather: 15,
      cropX: 50,
      cropY: 20,
      cropScale: 1.2
    };
  });

  // Image assets states, persisted in localStorage
  const [originalImage, setOriginalImage] = useState<string | null>(() => {
    return localStorage.getItem("github_anime_original_image");
  });
  const [processedFull, setProcessedFull] = useState<string | null>(null);
  const [processedFace, setProcessedFace] = useState<string | null>(null);

  // Workspace and save feedback states
  const [saveStatus, setSaveStatus] = useState<{ type: "idle" | "saving" | "success" | "error"; message: string }>({
    type: "idle",
    message: ""
  });

  const [isConfigExpanded, setIsConfigExpanded] = useState(true);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("github_anime_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("github_anime_image_params", JSON.stringify(imageParams));
  }, [imageParams]);

  useEffect(() => {
    if (originalImage) {
      localStorage.setItem("github_anime_original_image", originalImage);
    } else {
      localStorage.removeItem("github_anime_original_image");
    }
  }, [originalImage]);

  // Load a beautiful default logo/avatar if no user image is uploaded yet
  useEffect(() => {
    // When profile edits happen but no image is uploaded, we just use null character references
  }, [profile]);

  // Re-run background removal whenever sliders or the original image changes
  useEffect(() => {
    if (!originalImage) return;

    const img = new Image();
    img.src = originalImage;
    img.onload = async () => {
      const results = await processCharacterImage(
        img,
        imageParams.tolerance,
        imageParams.feather,
        imageParams.cropX,
        imageParams.cropY,
        imageParams.cropScale
      );
      setProcessedFull(results.fullTransparent);
      setProcessedFace(results.faceCrop);
    };
  }, [originalImage, imageParams]);

  const handleImageUploaded = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Generate dynamic, real-time SVG content strings
  const bannerDark = generateBannerSvg(profile, processedFull, false);
  const bannerLight = generateBannerSvg(profile, processedFull, true);
  const lanyard = generateLanyardSvg(profile, processedFace);
  const readme = generateReadmeContent(profile);

  // Load fixed SVGs from workspace root for reference preview if desired,
  // or use the dynamically generated values so edits are shown immediately!
  const [statsSvg, setStatsSvg] = useState<string>("");
  const [langsSvg, setLangsSvg] = useState<string>("");
  const [trophiesSvg, setTrophiesSvg] = useState<string>("");

  useEffect(() => {
    // We can fetch the initial files or render high fidelity templates.
    // Let's load the hardcoded high fidelity structures so they display in the cards right away!
    fetch("/stats.svg")
      .then((r) => r.text())
      .then((text) => setStatsSvg(text))
      .catch(() => {});

    fetch("/langs.svg")
      .then((r) => r.text())
      .then((text) => setLangsSvg(text))
      .catch(() => {});

    fetch("/trophies.svg")
      .then((r) => r.text())
      .then((text) => setTrophiesSvg(text))
      .catch(() => {});
  }, []);

  // Save customized contents to the workspace recursively
  const handleSaveToWorkspace = async () => {
    setSaveStatus({ type: "saving", message: "Saving files to workspace..." });
    try {
      // Package files payload
      const filesToSave = [
        { filepath: "banner.svg", content: bannerDark },
        { filepath: "banner-light.svg", content: bannerLight },
        { filepath: "lanyard.svg", content: lanyard },
        { filepath: "README.md", content: readme }
      ];

      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: filesToSave })
      });

      const data = await res.json();
      if (data.success) {
        setSaveStatus({ type: "success", message: "Successfully saved files into your project workspace!" });
        // Fade out success message after 4s
        setTimeout(() => setSaveStatus({ type: "idle", message: "" }), 4000);
      } else {
        throw new Error(data.error || "Workspace save failed.");
      }
    } catch (err: any) {
      setSaveStatus({ type: "error", message: err.message || "Failed to sync to workspace." });
    }
  };

  // Browser level direct file downloading fallback
  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-mauve flex flex-col antialiased cyber-grid-bg">
      {/* Dynamic Header banner */}
      <header className="border-b border-cyber-pink/20 bg-cyber-card/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 neon-glow-pink">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-pink to-cyber-violet flex items-center justify-center shadow-lg shadow-cyber-pink/30">
            <Sparkles className="w-5 h-5 text-white animate-spin" style={{ animationDuration: "10s" }} />
          </div>
          <div>
            <h1 className="text-lg font-display font-black tracking-wider bg-gradient-to-r from-cyber-pink via-cyber-mauve to-cyber-violet bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
              GITHUB ANIME PROFILE GENERATOR
            </h1>
            <p className="text-[10px] text-cyber-mauve/70 font-medium">Full-stack animated vector README ecosystem</p>
          </div>
        </div>

        {/* Sync action triggers */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsConfigExpanded(!isConfigExpanded)}
            className="flex items-center gap-2 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs tracking-wider border border-cyber-pink/20 hover:border-cyber-pink/50 transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-cyber-pink" />
            {isConfigExpanded ? "HIDE PROFILE CONSOLE" : "SHOW PROFILE CONSOLE"}
          </button>
          <button
            onClick={handleSaveToWorkspace}
            disabled={saveStatus.type === "saving"}
            className="flex items-center gap-2 bg-gradient-to-r from-cyber-pink to-cyber-violet hover:brightness-110 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-xs tracking-wider shadow-lg shadow-cyber-pink/30 hover:shadow-cyber-pink/50 transition-all cursor-pointer neon-border"
          >
            <Save className="w-4 h-4" />
            {saveStatus.type === "saving" ? "WRITING WORKSPACE..." : "SAVE TO WORKSPACE"}
          </button>
        </div>
      </header>

      {/* Main interactive full-width panel */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Sidebar inputs - full width above previews when expanded */}
        {isConfigExpanded && (
          <div className="w-full">
            <Sidebar
              data={profile}
              setData={setProfile}
              params={imageParams}
              setParams={setImageParams}
              onImageUploaded={handleImageUploaded}
              originalImage={originalImage}
              processedImage={processedFull}
              faceCrop={processedFace}
            />
          </div>
        )}

        {/* Feedback alerts */}
        {saveStatus.type !== "idle" && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              saveStatus.type === "success"
                ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400"
                : saveStatus.type === "error"
                ? "bg-rose-950/20 border-rose-500/30 text-rose-400"
                : "bg-purple-950/20 border-purple-500/30 text-purple-400 animate-pulse"
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold uppercase tracking-wide">
                {saveStatus.type === "success" ? "Sync Complete" : saveStatus.type === "error" ? "System Alert" : "Syncing"}
              </div>
              <div className="text-xs mt-0.5 font-medium">{saveStatus.message}</div>
            </div>
          </div>
        )}

        {/* Live renders - Expanded to full-width (BIG) */}
        <div className="w-full">
          <Previews
            data={profile}
            bannerSvg={bannerDark}
            bannerLightSvg={bannerLight}
            lanyardSvg={lanyard}
            statsSvg={statsSvg}
            langsSvg={langsSvg}
            trophiesSvg={trophiesSvg}
            readmeContent={readme}
            onDownloadFile={handleDownloadFile}
          />
        </div>
      </main>

      {/* Retro-inspired decorative footer */}
      <footer className="border-t border-cyber-pink/15 py-6 text-center text-xs text-cyber-mauve/50 bg-cyber-bg/95">
        <p>Animated GitHub Profile README Generator • Crafted for {profile.name} • 100% SVG Vector Architecture</p>
      </footer>
    </div>
  );
}
