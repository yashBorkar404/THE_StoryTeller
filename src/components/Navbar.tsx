"use client"

import type React from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Story Collab
        </Link>
        <div>
          {user ? (
            <>
              <Link to="/create-story" className="text-white mr-4">
                Create Story
              </Link>
              <button onClick={logout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

