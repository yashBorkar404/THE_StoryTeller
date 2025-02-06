import mongoose from "mongoose"

const contributionSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    contributions: [contributionSchema],
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.model("Story", storySchema)

