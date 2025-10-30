import express from "express";
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
  credentials: true,
};
app.use(cors(corsOptions));

// ===== Middleware =====
app.use(express.json());

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
