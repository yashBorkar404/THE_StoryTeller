"use client"

import type React from "react"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

interface Contribution {
  _id: string
  content: string
  author: {
    username: string
  }
  votes: number
}

interface Story {
  _id: string
  title: string
  content: string
  author: {
    username: string
  }
  contributions: Contribution[]
}

const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [story, setStory] = useState<Story | null>(null)
  const [newContribution, setNewContribution] = useState("")
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stories/${id}`)
        setStory(response.data)
      } catch (error) {
        console.error("Failed to fetch story:", error)
      }
    }
    fetchStory()
  }, [id])

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `http://localhost:5000/api/stories/${id}/contribute`,
        { content: newContribution },
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      setStory(response.data)
      setNewContribution("")
    } catch (error) {
      console.error("Failed to add contribution:", error)
    }
  }

  const handleVote = async (contributionId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/stories/${id}/vote`,
        { contributionId },
        { headers: { Authorization: `Bearer ${user.token}` } },
      )
      setStory(response.data)
    } catch (error) {
      console.error("Failed to vote:", error)
    }
  }

  if (!story) return <div>Loading...</div>

  return (
    <div className="container mx-auto mt-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <p className="text-gray-600 mb-4">By {story.author.username}</p>
      <div className="bg-white p-6 rounded shadow mb-8">
        <p>{story.content}</p>
      </div>
      <h2 className="text-2xl font-bold mb-4">Contributions</h2>
      {story.contributions.map((contribution) => (
        <div key={contribution._id} className="bg-white p-4 rounded shadow mb-4">
          <p>{contribution.content}</p>
          <p className="text-gray-600 mt-2">By {contribution.author.username}</p>
          <button
            onClick={() => handleVote(contribution._id)}
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2 hover:bg-blue-600"
          >
            Vote ({contribution.votes})
          </button>
        </div>
      ))}
      {user && (
        <form onSubmit={handleContribute} className="mt-8">
          <h3 className="text-xl font-bold mb-4">Add Your Contribution</h3>
          <textarea
            value={newContribution}
            onChange={(e) => setNewContribution(e.target.value)}
            required
            className="w-full p-2 border rounded h-40 mb-4"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Contribution
          </button>
        </form>
      )}
    </div>
  )
}

export default StoryDetail

