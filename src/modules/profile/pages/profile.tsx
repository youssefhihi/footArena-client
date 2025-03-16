import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FiArrowLeft } from "react-icons/fi"
import { UpdateProfile } from "../components/update-profile"
import { UpdatePassword } from "../components/update-password"


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile")
  
  

 

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

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col p-4">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-lg bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-600/30"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0">
          <button
            onClick={() => setActiveTab("profile")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === "profile" ? "bg-blue-600 text-white" : "bg-blue-900/30 text-blue-200 hover:bg-blue-900/50"
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
              activeTab === "password" ? "bg-blue-600 text-white" : "bg-blue-900/30 text-blue-200 hover:bg-blue-900/50"
            }`}
          >
            Change Password
          </button>
        </div>

        <div className="flex-1">
          {activeTab === "profile" ? (
            <UpdateProfile/>
          ) : (
            <UpdatePassword/>
          )}
        </div>
      </div>
    </div>
  )
}

