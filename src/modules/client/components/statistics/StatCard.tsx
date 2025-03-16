import { motion } from "framer-motion"
interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  description?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description, trend, trendValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-lg bg-blue-600/20 text-blue-400">{icon}</div>
        {trend && trendValue && (
          <div
            className={`flex items-center text-sm font-medium ${
              trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-gray-400"
            }`}
          >
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"}
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
      {description && <p className="mt-2 text-sm text-gray-400">{description}</p>}
    </motion.div>
  )
}

