"use client"

import type React from "react"
import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const CreateStory: React.FC = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { user } = useContext(AuthContext)
  const history = useHistory()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(
        "http://localhost:5000/api/stories",
        { title, content },
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      history.push("/")
    } catch (error) {
      console.error("Failed to create story:", error)
    }
  }

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Create a New Story</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border rounded h-40"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create Story
        </button>
      </form>
    </div>
  )
}

export default CreateStory

