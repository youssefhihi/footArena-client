import { motion } from "framer-motion";
export const StatCard = ({
    icon,
    title,
    value,
  }: { icon: React.ReactNode; title: string; value: number;}) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl bg-gray-800 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-blue-600/20 p-3 text-blue-400">{icon}</div>
          
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <p className="mt-2 text-3xl font-bold">{value.toLocaleString()}</p>
        </div>
      </motion.div>
    )
  }