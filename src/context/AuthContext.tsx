"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext<any>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      // You might want to validate the token here
      setUser({ token })
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem("token", token)
    setUser({ token })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

