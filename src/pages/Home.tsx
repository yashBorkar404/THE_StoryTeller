"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

interface Story {
  _id: string
  title: string
  author: {
    username: string
  }
}

const Home: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stories")
        setStories(response.data)
      } catch (error) {
        console.error("Failed to fetch stories:", error)
      }
    }
    fetchStories()
  }, [])

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Latest Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div key={story._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
            <p className="text-gray-600 mb-2">By {story.author.username}</p>
            <Link to={`/story/${story._id}`} className="text-blue-500 hover:underline">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

