
import { useEffect, useState } from "react"
import { Trophy, Loader2, ClubIcon as Football, Star } from "lucide-react"

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const loadingTexts = [
      "Loading player data...",
      "Setting up tournaments...",
      "Preparing stadiums...",
      "Loading team statistics...",
      "Almost there...",
    ]

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10

        const textIndex = Math.min(Math.floor((newProgress / 100) * loadingTexts.length), loadingTexts.length - 1)
        setLoadingText(loadingTexts[textIndex])

        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {i % 2 === 0 ? <Football className="w-12 h-12 text-white" /> : <Star className="w-8 h-8 text-yellow-300" />}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="z-10 flex flex-col items-center justify-center p-8 max-w-3xl w-full">
        {/* Logo area */}
        <div className="mb-12 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 opacity-75 blur"></div>
            <div className="relative bg-green-800 rounded-full p-6 border-4 border-white">
              <Trophy className="w-16 h-16 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 text-center tracking-tight">
          FIFA Tournament
          <span className="block text-yellow-400">Manager</span>
        </h1>

        {/* Loading animation */}
        <div className="relative w-full max-w-md h-4 bg-green-950 rounded-full overflow-hidden mt-8 mb-4">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading text */}
        <div className="flex items-center text-white text-lg mb-8">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          <span>{loadingText}</span>
          <span className="ml-2 animate-pulse">{progress.toFixed(0)}%</span>
        </div>

        {/* Decorative football animation */}
        <div className="relative w-16 h-16 mt-8">
          <div className="absolute inset-0 animate-ping opacity-25">
            <Football className="w-16 h-16 text-white" />
          </div>
          <div className="relative animate-spin animate-duration-3000">
            <Football className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Footer text */}
        <p className="text-green-300 mt-12 text-center text-sm">
          Prepare for the ultimate football management experience
        </p>
      </div>
    </div>
  )
}