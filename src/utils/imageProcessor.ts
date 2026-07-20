/**
 * Client-side background removal and face/body cropping helper functions.
 */

export interface ProcessedImages {
  fullTransparent: string; // Base64 transparent PNG of the full character
  faceCrop: string;        // Base64 transparent PNG of the cropped face region
}

export function processCharacterImage(
  img: HTMLImageElement,
  tolerance: number,
  feather: number,
  cropX: number, // 0 - 100 representing percentage from left
  cropY: number, // 0 - 100 representing percentage from top
  cropScale: number // 0.5 - 2.0 zoom factor
): Promise<ProcessedImages> {
  return new Promise((resolve) => {
    // 1. Process full transparent background
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve({ fullTransparent: "", faceCrop: "" });
      return;
    }

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Detect white/near-white pixels
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Distance to pure white
      const dist = Math.sqrt((r - 255) ** 2 + (g - 255) ** 2 + (b - 255) ** 2);

      if (dist < tolerance) {
        data[i + 3] = 0; // Completely transparent
      } else if (dist < tolerance + feather) {
        // Soft feathering gradient
        const ratio = (dist - tolerance) / feather;
        data[i + 3] = Math.floor(ratio * 255);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const fullTransparent = canvas.toDataURL("image/png");

    // 2. Crop Face region for the Lanyard
    const faceCanvas = document.createElement("canvas");
    const faceCtx = faceCanvas.getContext("2d");
    if (!faceCtx) {
      resolve({ fullTransparent, faceCrop: "" });
      return;
    }

    // Fixed size avatar for the lanyard
    faceCanvas.width = 150;
    faceCanvas.height = 150;

    // Calculate crop coordinates based on sliders
    const minDim = Math.min(img.naturalWidth, img.naturalHeight);
    const cropSize = (minDim * 0.35) / cropScale; // Target box size in source pixels

    // Calculate source top-left based on percentage sliders
    const centerX = img.naturalWidth * (cropX / 100);
    const centerY = img.naturalHeight * (cropY / 100);

    const srcX = centerX - cropSize / 2;
    const srcY = centerY - cropSize / 2;

    // Clear and draw circular crop
    faceCtx.clearRect(0, 0, 150, 150);
    faceCtx.drawImage(
      canvas, // Use the already transparent processed canvas as source!
      srcX,
      srcY,
      cropSize,
      cropSize,
      0,
      0,
      150,
      150
    );

    const faceCrop = faceCanvas.toDataURL("image/png");
    resolve({ fullTransparent, faceCrop });
  });
}
