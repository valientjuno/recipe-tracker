import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    source: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
