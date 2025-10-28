import express from "express";
import Recipe from "../models/Recipe.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// Create Recipe
router.post("/", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.create({ ...req.body, user: req.userId });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Recipes for User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
