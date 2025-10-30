import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import "./db.js";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// ===== Serve static frontend =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

// Send index.html for all other routes (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;

// Bind to 0.0.0.0 internally (needed for Render), but log localhost for local testing
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running locally at http://localhost:${PORT}`);
});
