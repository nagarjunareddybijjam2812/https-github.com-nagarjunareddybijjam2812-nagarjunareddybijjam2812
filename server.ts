import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64-embedded SVGs
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API endpoint to save files directly to the workspace
  app.post("/api/save", async (req, res) => {
    try {
      const { files } = req.body;
      if (!files || !Array.isArray(files)) {
        return res.status(400).json({ error: "Invalid request payload. Expected 'files' array." });
      }

      for (const file of files) {
        const { filepath, content } = file;
        if (!filepath || content === undefined) {
          continue;
        }

        // Clean and resolve path relative to workspace root
        const safePath = path.normalize(filepath).replace(/^(\.\.(\/|\\))+/, "");
        const absolutePath = path.join(process.cwd(), safePath);

        // Ensure parent directories exist
        await fs.mkdir(path.dirname(absolutePath), { recursive: true });

        // Write the file
        await fs.writeFile(absolutePath, content, "utf8");
        console.log(`[API] Saved file to workspace: ${safePath}`);
      }

      return res.json({ success: true, message: "All files successfully saved to your project workspace!" });
    } catch (err: any) {
      console.error("[API] Error saving files:", err);
      return res.status(500).json({ error: err.message || "Failed to save files." });
    }
  });

  // Serve static files and integrate Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
