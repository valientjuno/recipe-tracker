import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./db.js";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});
