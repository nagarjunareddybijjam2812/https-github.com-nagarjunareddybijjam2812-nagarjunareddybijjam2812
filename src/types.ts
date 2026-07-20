export interface ProfileData {
  name: string;
  role: string;
  githubUser: string;
  email: string;
  skills: string; // Comma-separated list
  tagline: string;
}

export interface ImageProcessingParams {
  tolerance: number; // 0 to 255 for color distance
  feather: number; // 0 to 50 for edge smoothing
  cropX: number; // Center X of face crop (percent)
  cropY: number; // Center Y of face crop (percent)
  cropScale: number; // Scale for face crop (0.5 to 2.0)
}

export interface WorkspaceFile {
  filepath: string;
  content: string;
}
