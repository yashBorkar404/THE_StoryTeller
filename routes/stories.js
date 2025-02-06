import express from "express"
import Story from "../models/Story.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body
    const story = new Story({
      title,
      content,
      author: req.user.userId,
    })
    await story.save()
    res.status(201).json(story)
  } catch (error) {
    res.status(500).json({ error: "Failed to create story" })
  }
})

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().populate("author", "username")
    res.json(stories)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stories" })
  }
})

router.post("/:id/contribute", authenticateToken, async (req, res) => {
  try {
    const { content } = req.body
    const story = await Story.findById(req.params.id)
    if (!story) return res.status(404).json({ error: "Story not found" })
    story.contributions.push({
      author: req.user.userId,
      content,
    })
    await story.save()
    res.status(201).json(story)
  } catch (error) {
    res.status(500).json({ error: "Failed to add contribution" })
  }
})

router.post("/:id/vote", authenticateToken, async (req, res) => {
  try {
    const { contributionId } = req.body
    const story = await Story.findById(req.params.id)
    if (!story) return res.status(404).json({ error: "Story not found" })
    const contribution = story.contributions.id(contributionId)
    if (!contribution) return res.status(404).json({ error: "Contribution not found" })
    contribution.votes += 1
    await story.save()
    res.json(story)
  } catch (error) {
    res.status(500).json({ error: "Failed to vote on contribution" })
  }
})

export default router

