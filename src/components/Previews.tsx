import React, { useState } from "react";
import { ProfileData } from "../types";
import { 
  FileText, 
  Image as ImageIcon, 
  CreditCard, 
  Trophy, 
  ChevronRight, 
  Sparkles, 
  Terminal, 
  Download,
  AlertCircle
} from "lucide-react";

interface PreviewsProps {
  data: ProfileData;
  bannerSvg: string;
  bannerLightSvg: string;
  lanyardSvg: string;
  statsSvg: string;
  langsSvg: string;
  trophiesSvg: string;
  readmeContent: string;
  onDownloadFile: (filename: string, content: string) => void;
}

type TabType = "readme" | "banner-dark" | "banner-light" | "lanyard" | "stats" | "action";

export function Previews({
  data,
  bannerSvg,
  bannerLightSvg,
  lanyardSvg,
  statsSvg,
  langsSvg,
  trophiesSvg,
  readmeContent,
  onDownloadFile
}: PreviewsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("readme");

  return (
    <div className="bg-cyber-card border border-cyber-pink/20 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 neon-glow-pink">
      {/* Tabs navigation bar */}
      <div className="flex flex-wrap gap-2 border-b border-cyber-pink/15 pb-4">
        {[
          { id: "readme", label: "README.md", icon: FileText },
          { id: "banner-dark", label: "Banner (Dark)", icon: ImageIcon },
          { id: "banner-light", label: "Banner (Light)", icon: ImageIcon },
          { id: "lanyard", label: "Lanyard ID Badge", icon: CreditCard },
          { id: "stats", label: "Local Cards Grid", icon: Trophy },
          { id: "action", label: "GitHub Action", icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? "bg-cyber-pink/20 border border-cyber-pink text-cyber-pink font-bold drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]"
                  : "bg-cyber-input/40 border border-transparent text-cyber-mauve/60 hover:text-cyber-mauve hover:bg-cyber-input/80 hover:border-cyber-pink/20"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Rendered active tab panel */}
      <div className={`flex-1 overflow-hidden min-h-[450px] ${
        activeTab === "readme" 
          ? "bg-transparent p-0" 
          : "bg-cyber-bg border border-cyber-pink/15 rounded-2xl p-6"
      }`}>
        
        {/* TAB 1: README.MD PREVIEW */}
        {activeTab === "readme" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-cyber-pink/15">
              <div className="text-sm font-bold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
                <FileText className="w-4 h-4" /> Live Rendered GitHub README Preview
              </div>
              <button
                onClick={() => onDownloadFile("README.md", readmeContent)}
                className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-cyber-pink/20 hover:border-cyber-pink/50 cursor-pointer"
              >
                <Download className="w-3 h-3" /> Download README
              </button>
            </div>

            {/* Simulated Github Readme body */}
            <div className="bg-[#0b0615] rounded-xl p-6 md:p-10 w-full border border-cyber-pink/20 shadow-lg text-cyber-mauve/90 font-sans leading-relaxed space-y-8 overflow-y-auto max-h-[120vh] min-h-[650px] custom-scrollbar">
              {/* Responsive Banner picture */}
              <div className="w-full flex justify-center">
                <div 
                  className="w-full rounded-lg overflow-hidden border border-cyber-pink/15" 
                  dangerouslySetInnerHTML={{ __html: bannerSvg }} 
                />
              </div>

              {/* Badge row */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="bg-cyber-pink/10 border border-cyber-pink/35 text-cyber-pink text-[10px] px-3 py-1 rounded-full font-bold">GITHUB: @{data.githubUser}</span>
                <span className="bg-cyber-violet/10 border border-cyber-violet/35 text-cyber-mauve text-[10px] px-3 py-1 rounded-full font-bold">EMAIL: {data.email}</span>
                <span className="bg-cyber-pink/10 border border-cyber-pink/35 text-cyber-pink text-[10px] px-3 py-1 rounded-full font-bold">LINKEDIN: {data.name}</span>
                <span className="bg-emerald-950/30 border border-emerald-500/50 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-bold">VIEWS: 1,482</span>
              </div>

              <div className="border-t border-cyber-pink/15 my-6"></div>

              {/* Lanyard center alignment */}
              <div className="flex flex-col items-center justify-center gap-2 my-8">
                <div className="w-[280px]" dangerouslySetInnerHTML={{ __html: lanyardSvg }} />
                <span className="text-[10px] text-cyber-mauve/40 font-mono italic">Simulated Damped Pendulum Swing Lanyard</span>
              </div>

              {/* Greeting centered */}
              <div className="text-center space-y-2 mt-6">
                <h2 className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.35)]">👋 Hello World, I'm {data.name}!</h2>
                <p className="text-cyber-mauve text-sm font-medium">{data.role} | Generative AI Specialist | Python Architect</p>
                <p className="text-cyber-pink text-xs italic font-medium">"{data.tagline}"</p>
              </div>

              <div className="border-t border-cyber-pink/15 my-6"></div>

              {/* Grid cards row-by-row */}
              <div className="flex flex-col gap-6 items-center w-full">
                <div className="w-full max-w-[500px] rounded-xl overflow-hidden border border-cyber-pink/15" dangerouslySetInnerHTML={{ __html: statsSvg }} />
                <div className="w-full max-w-[500px] rounded-xl overflow-hidden border border-cyber-pink/15" dangerouslySetInnerHTML={{ __html: langsSvg }} />
              </div>

              <div className="w-full rounded-xl overflow-hidden border border-cyber-pink/15" dangerouslySetInnerHTML={{ __html: trophiesSvg }} />

              <div className="border-t border-cyber-pink/15 my-6"></div>

              {/* Highlighted Projects Table */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">🚀 Highlighted Projects</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-cyber-pink/15 text-xs">
                    <thead>
                      <tr className="bg-cyber-card/60 text-white">
                        <th className="border border-cyber-pink/15 px-4 py-2 text-left">Project Name</th>
                        <th className="border border-cyber-pink/15 px-4 py-2 text-left">Tech Stack</th>
                        <th className="border border-cyber-pink/15 px-4 py-2 text-left">Description</th>
                        <th className="border border-cyber-pink/15 px-4 py-2 text-left">Role &amp; Outcomes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 font-bold text-white">💡 GenAI Agentic RAG</td>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 font-mono text-cyber-mauve">Python, GenAI, LLMs</td>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 text-cyber-mauve/80">Scalable agentic Retrieval Augmented Generation pipeline.</td>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 font-semibold text-emerald-400">Main Architect. 94% accuracy.</td>
                      </tr>
                      <tr className="bg-cyber-card/20">
                        <td className="border border-cyber-pink/15 px-4 py-2.5 font-bold text-white">🧠 DeepLearning Tuner</td>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 font-mono text-cyber-mauve">Python, PyTorch, Transformers</td>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 text-cyber-mauve/80">Custom modular tuning engine for large transformer-based models.</td>
                        <td className="border border-cyber-pink/15 px-4 py-2.5 font-semibold text-emerald-400">QLoRA Optimization Specialist.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DARK BANNER */}
        {activeTab === "banner-dark" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-cyber-pink/15">
              <div className="text-sm font-bold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
                <ImageIcon className="w-4 h-4" /> Dark Pink/Purple Animated Profile Banner (1280x740)
              </div>
              <button
                onClick={() => onDownloadFile("banner.svg", bannerSvg)}
                className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-cyber-pink/20 hover:border-cyber-pink/50 cursor-pointer"
              >
                <Download className="w-3 h-3" /> Download dark banner
              </button>
            </div>

            {/* Inline SVG Frame */}
            <div className="w-full bg-[#0a050f] rounded-xl overflow-hidden border border-cyber-pink/20 flex items-center justify-center shadow-inner">
              <div 
                className="w-full h-auto aspect-[1280/740]" 
                dangerouslySetInnerHTML={{ __html: bannerSvg }} 
              />
            </div>
          </div>
        )}

        {/* TAB 3: LIGHT BANNER */}
        {activeTab === "banner-light" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-cyber-pink/15">
              <div className="text-sm font-bold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
                <ImageIcon className="w-4 h-4" /> Light Mode Matching Animated Profile Banner
              </div>
              <button
                onClick={() => onDownloadFile("banner-light.svg", bannerLightSvg)}
                className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-cyber-pink/20 hover:border-cyber-pink/50 cursor-pointer"
              >
                <Download className="w-3 h-3" /> Download light banner
              </button>
            </div>

            {/* Inline SVG Frame */}
            <div className="w-full bg-white rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center shadow-inner">
              <div 
                className="w-full h-auto aspect-[1280/740]" 
                dangerouslySetInnerHTML={{ __html: bannerLightSvg }} 
              />
            </div>
          </div>
        )}

        {/* TAB 4: LANYARD */}
        {activeTab === "lanyard" && (
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full flex justify-between items-center pb-2 border-b border-cyber-pink/15">
              <div className="text-sm font-bold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
                <CreditCard className="w-4 h-4" /> Swinging ID Badge Lanyard (Interactive React-Style Physics)
              </div>
              <button
                onClick={() => onDownloadFile("lanyard.svg", lanyardSvg)}
                className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-cyber-pink/20 hover:border-cyber-pink/50 cursor-pointer"
              >
                <Download className="w-3 h-3" /> Download lanyard ID
              </button>
            </div>

            {/* Hanging Lanyard Preview area with some spacing */}
            <div className="p-12 w-full max-w-lg bg-cyber-input/40 border border-cyber-pink/15 rounded-2xl flex items-center justify-center min-h-[500px] neon-glow-pink">
              <div className="w-[280px]" dangerouslySetInnerHTML={{ __html: lanyardSvg }} />
            </div>
          </div>
        )}

        {/* TAB 5: LOCAL CARDS */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-cyber-pink/15">
              <div className="text-sm font-bold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
                <Trophy className="w-4 h-4" /> Local Cards (Rank stats, Language bar, Trophies)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onDownloadFile("stats.svg", statsSvg)}
                  className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-2 py-1 rounded text-xs transition-all border border-cyber-pink/20 cursor-pointer"
                >
                  <Download className="w-3 h-3" /> stats.svg
                </button>
                <button
                  onClick={() => onDownloadFile("langs.svg", langsSvg)}
                  className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-2 py-1 rounded text-xs transition-all border border-cyber-pink/20 cursor-pointer"
                >
                  <Download className="w-3 h-3" /> langs.svg
                </button>
                <button
                  onClick={() => onDownloadFile("trophies.svg", trophiesSvg)}
                  className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-2 py-1 rounded text-xs transition-all border border-cyber-pink/20 cursor-pointer"
                >
                  <Download className="w-3 h-3" /> trophies.svg
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 max-w-2xl mx-auto py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-cyber-pink/15 rounded-xl overflow-hidden shadow-lg shadow-cyber-pink/5" dangerouslySetInnerHTML={{ __html: statsSvg }} />
                <div className="border border-cyber-pink/15 rounded-xl overflow-hidden shadow-lg shadow-cyber-pink/5" dangerouslySetInnerHTML={{ __html: langsSvg }} />
              </div>
              <div className="border border-cyber-pink/15 rounded-xl overflow-hidden shadow-lg shadow-cyber-pink/5" dangerouslySetInnerHTML={{ __html: trophiesSvg }} />
            </div>
          </div>
        )}

        {/* TAB 6: GITHUB ACTION */}
        {activeTab === "action" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-cyber-pink/15">
              <div className="text-sm font-bold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_4px_rgba(236,72,153,0.3)]">
                <Terminal className="w-4 h-4" /> github-snake.yml Daily Execution Workflow
              </div>
              <button
                onClick={() => onDownloadFile("github-snake.yml", `name: Generate Snake

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg?palette=github-dark&color_snake=#db2777&color_dots=#161b22,#2d124d,#4c1d95,#701a75,#c084fc
            dist/github-contribution-grid-snake-light.svg?palette=github-light&color_snake=#db2777&color_dots=#ebedf0,#fae8ff,#f5d0fe,#e9d5ff,#c084fc
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`)}
                className="flex items-center gap-1 bg-cyber-input hover:bg-cyber-input/80 text-cyber-mauve hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border border-cyber-pink/20 hover:border-cyber-pink/50 cursor-pointer"
              >
                <Download className="w-3 h-3" /> Download Workflow
              </button>
            </div>

            <pre className="bg-cyber-input/30 p-6 rounded-xl border border-cyber-pink/15 overflow-x-auto text-[11px] font-mono leading-normal text-cyber-mauve/80 custom-scrollbar">
{`name: Generate Snake

on:
  schedule:
    # run every 24 hours
    - cron: "0 0 * * *"
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    
    steps:
      # Generates a game of snake from a github user contributions graph
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg?palette=github-dark&color_snake=#db2777&color_dots=#161b22,#2d124d,#4c1d95,#701a75,#c084fc
            dist/github-contribution-grid-snake-light.svg?palette=github-light&color_snake=#db2777&color_dots=#ebedf0,#fae8ff,#f5d0fe,#e9d5ff,#c084fc
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      # Push snake content to dedicated branch
      - name: push github-contribution-grid-snake.svg to output branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
