import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import storyRoutes from "./routes/stories.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

app.use("/api/auth", authRoutes)
app.use("/api/stories", storyRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

