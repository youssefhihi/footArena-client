"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FiHome, FiArrowLeft } from "react-icons/fi"
import fifaLogo from "../../assets/imgs/logo.png"

interface ErrorLayoutProps {
  statusCode: string
  title: string
  description: string
  illustration: React.ReactNode
  showLoginButton?: boolean
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({
  statusCode,
  title,
  description,
  illustration,
  showLoginButton = false,
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/70 via-indigo-900/70 to-violet-900/70" />

      {/* Animated shapes */}
      <motion.div
        className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {/* FIFA Logo */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center"
        >
          <img src={fifaLogo || "/placeholder.svg"} alt="FIFA Logo" className="h-16" />
          <div className="ml-4 border-l-2 border-white/20 pl-4">
            <h1 className="text-2xl font-bold text-white">Competition Manager</h1>
            <p className="text-sm text-blue-200">Manage your FIFA tournaments with ease</p>
          </div>
        </motion.div>

        <div className="w-full max-w-md">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl"
          >
            <div className="relative">
              {/* Top decorative element */}
              <div className="absolute -top-6 -right-6 h-12 w-32 rotate-12 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl" />

              <div className="relative p-8">
                <div className="mb-6 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 text-center"
                  >
                    {illustration}
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-2 flex items-center justify-center"
                  >
                    <span className="mr-3 text-5xl font-bold text-blue-400">{statusCode}</span>
                    <div className="h-12 w-0.5 bg-white/20"></div>
                    <h1 className="ml-3 text-2xl font-bold text-white">{title}</h1>
                  </motion.div>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8 text-blue-200"
                  >
                    {description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0"
                  >
                    <Link
                      to="/"
                      className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
                    >
                      <FiHome className="mr-2 h-4 w-4" />
                      Go to Home
                    </Link>
                    <button
                      onClick={() => window.history.back()}
                      className="flex items-center justify-center rounded-lg border border-blue-600 px-5 py-2.5 text-center text-sm font-medium text-blue-400 hover:bg-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-800"
                    >
                      <FiArrowLeft className="mr-2 h-4 w-4" />
                      Go Back
                    </button>
                  </motion.div>

                  {showLoginButton && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-4"
                    >
                      <Link to="/auth/sign-in" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                        Sign in to your account
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

