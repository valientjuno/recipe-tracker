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

// ===== CORS =====
const corsOptions = {
  origin: "https://frontend-recipe-tracker.onrender.com", // your deployed frontend URL
  credentials: true, // allow cookies/headers if needed
};
app.use(cors(corsOptions));

// ===== Middleware =====
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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
