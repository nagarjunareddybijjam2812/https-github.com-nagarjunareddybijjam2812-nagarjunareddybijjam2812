import React, { useRef } from "react";
import { ProfileData, ImageProcessingParams } from "../types";
import { Sliders, Camera, AlertCircle, ChevronRight, User, Mail, Tag, Cpu, Github } from "lucide-react";

interface SidebarProps {
  data: ProfileData;
  setData: React.Dispatch<React.SetStateAction<ProfileData>>;
  params: ImageProcessingParams;
  setParams: React.Dispatch<React.SetStateAction<ImageProcessingParams>>;
  onImageUploaded: (file: File) => void;
  originalImage: string | null;
  processedImage: string | null;
  faceCrop: string | null;
}

export function Sidebar({
  data,
  setData,
  params,
  setParams,
  onImageUploaded,
  originalImage,
  processedImage,
  faceCrop
}: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParamChange = (name: keyof ImageProcessingParams, value: number) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUploaded(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-pink/20 rounded-2xl p-6 shadow-2xl space-y-6 w-full neon-glow-pink">
      <div>
        <h2 className="text-xl font-display font-extrabold text-cyber-pink flex items-center gap-2 drop-shadow-[0_0_6px_rgba(236,72,153,0.3)]">
          <Cpu className="w-5 h-5 text-cyber-mauve animate-pulse" />
          PROFILE CONSOLE & CONFIGURATION
        </h2>
        <p className="text-xs text-cyber-mauve/60 mt-1">Configure your personal GitHub presentation parameters and transparent body portraits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Profile Details Form */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-cyber-mauve/70 uppercase tracking-widest border-b border-cyber-pink/15 pb-1">1. User Parameters</h3>
          
          <div>
            <label className="text-xs font-semibold text-cyber-mauve block mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyber-pink" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              className="w-full bg-cyber-input border border-cyber-pink/25 rounded-xl px-4 py-2.5 text-sm text-cyber-mauve focus:outline-none focus:ring-2 focus:ring-cyber-pink/50 focus:border-cyber-pink/70 transition-all font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-cyber-mauve block mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyber-pink" /> Core Role Title
            </label>
            <input
              type="text"
              name="role"
              value={data.role}
              onChange={handleInputChange}
              className="w-full bg-cyber-input border border-cyber-pink/25 rounded-xl px-4 py-2.5 text-sm text-cyber-mauve focus:outline-none focus:ring-2 focus:ring-cyber-pink/50 focus:border-cyber-pink/70 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-cyber-mauve block mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-cyber-pink" /> Username
              </label>
              <input
                type="text"
                name="githubUser"
                value={data.githubUser}
                onChange={handleInputChange}
                className="w-full bg-cyber-input border border-cyber-pink/25 rounded-xl px-4 py-2.5 text-xs text-cyber-mauve focus:outline-none focus:ring-2 focus:ring-cyber-pink/50 focus:border-cyber-pink/70 transition-all font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-cyber-mauve block mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyber-pink" /> Email
              </label>
              <input
                type="text"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className="w-full bg-cyber-input border border-cyber-pink/25 rounded-xl px-4 py-2.5 text-xs text-cyber-mauve focus:outline-none focus:ring-2 focus:ring-cyber-pink/50 focus:border-cyber-pink/70 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-cyber-mauve block mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-cyber-pink" /> Tagline / Quote
            </label>
            <input
              type="text"
              name="tagline"
              value={data.tagline}
              onChange={handleInputChange}
              className="w-full bg-cyber-input border border-cyber-pink/25 rounded-xl px-4 py-2.5 text-sm text-cyber-mauve focus:outline-none focus:ring-2 focus:ring-cyber-pink/50 focus:border-cyber-pink/70 transition-all italic"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-cyber-mauve block mb-1 flex items-center gap-1.5">
              Skills (Comma Separated)
            </label>
            <input
              type="text"
              name="skills"
              value={data.skills}
              onChange={handleInputChange}
              className="w-full bg-cyber-input border border-cyber-pink/25 rounded-xl px-4 py-2.5 text-xs text-cyber-mauve focus:outline-none focus:ring-2 focus:ring-cyber-pink/50 focus:border-cyber-pink/70 transition-all font-mono"
            />
          </div>
        </div>

        {/* Image Upload Component */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-cyber-mauve/70 uppercase tracking-widest border-b border-cyber-pink/15 pb-1">2. Character Image</h3>
          
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer border-2 border-dashed border-cyber-pink/30 hover:border-cyber-pink bg-cyber-input hover:bg-cyber-input/60 rounded-2xl p-6 transition-all text-center flex flex-col items-center justify-center gap-2 overflow-hidden"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onImageUploaded(e.target.files[0])}
            />
            
            <div className="w-12 h-12 rounded-full bg-cyber-pink/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyber-pink/20 transition-all">
              <Camera className="w-6 h-6 text-cyber-mauve group-hover:text-cyber-pink transition-all" />
            </div>

            <div className="text-xs font-semibold text-cyber-mauve">Drag &amp; Drop Character Photo</div>
            <div className="text-[10px] text-cyber-mauve/60">Supports PNG, JPG (White background)</div>
          </div>

          {originalImage && (
            <div className="space-y-4 bg-cyber-input/40 border border-cyber-pink/20 p-4 rounded-xl">
              <div className="text-xs font-bold text-cyber-mauve flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-cyber-pink" />
                BACKGROUND REMOVAL CONTROLS
              </div>

              {/* Threshold & Feather sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-cyber-mauve/80 font-medium">Chroma Tolerance</span>
                      <span className="text-cyber-pink font-mono font-bold">{params.tolerance}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={params.tolerance}
                      onChange={(e) => handleParamChange("tolerance", Number(e.target.value))}
                      className="w-full accent-cyber-pink"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-cyber-mauve/80 font-medium">Edge Feathering</span>
                      <span className="text-cyber-pink font-mono font-bold">{params.feather}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={params.feather}
                      onChange={(e) => handleParamChange("feather", Number(e.target.value))}
                      className="w-full accent-cyber-pink"
                    />
                  </div>
                </div>

                {/* Crop position sliders */}
                <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-cyber-pink/15 pt-2 sm:pt-0 sm:pl-4">
                  <div className="text-[10px] font-bold text-cyber-mauve/50 tracking-wider">LANYARD PORTRAIT CROP POSITION</div>
                  
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-cyber-mauve/80 font-medium">Vertical Alignment</span>
                      <span className="text-cyber-pink font-mono font-bold">{params.cropY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={params.cropY}
                      onChange={(e) => handleParamChange("cropY", Number(e.target.value))}
                      className="w-full accent-cyber-pink"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-cyber-mauve/80 font-medium">Horizontal Alignment</span>
                      <span className="text-cyber-pink font-mono font-bold">{params.cropX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={params.cropX}
                      onChange={(e) => handleParamChange("cropX", Number(e.target.value))}
                      className="w-full accent-cyber-pink"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-cyber-mauve/80 font-medium">Zoom Factor</span>
                      <span className="text-cyber-pink font-mono font-bold">{params.cropScale}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.5"
                      step="0.05"
                      value={params.cropScale}
                      onChange={(e) => handleParamChange("cropScale", Number(e.target.value))}
                      className="w-full accent-cyber-pink"
                    />
                  </div>
                </div>
              </div>

              {/* Mini preview frames of cropped result */}
              <div className="flex items-center gap-4 border-t border-cyber-pink/15 pt-3 mt-3">
                <div className="flex-1">
                  <div className="text-[10px] text-cyber-mauve/60 font-bold uppercase">Lanyard Avatar Crop</div>
                  <div className="mt-1.5 w-16 h-16 rounded-full border border-cyber-pink/40 bg-cyber-bg overflow-hidden flex items-center justify-center">
                    {faceCrop ? (
                      <img src={faceCrop} className="w-full h-full object-cover" alt="Avatar Crop Preview" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-cyber-mauve/30" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] text-cyber-mauve/60 font-bold uppercase">Transparent Body</div>
                  <div className="mt-1.5 w-16 h-16 rounded bg-cyber-bg overflow-hidden border border-cyber-pink/20 flex items-center justify-center">
                    {processedImage ? (
                      <img src={processedImage} className="w-full h-full object-contain" alt="Full transparent body" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-cyber-mauve/30" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
