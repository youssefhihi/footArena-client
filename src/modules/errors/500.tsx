import { motion } from "framer-motion"
import { FiServer } from "react-icons/fi"
import { ErrorLayout } from "../../commun/layouts/error"

export default function ServerErrorPage() {
  const ServerErrorIllustration = () => (
    <motion.div className="relative h-32 w-32">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <FiServer className="h-20 w-20 text-purple-400/50" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="text-2xl text-purple-400">!</span>
      </motion.div>
      <motion.div
        className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-purple-600/20"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-purple-600/20"
        initial={{ scale: 1.2 }}
        animate={{ scale: 0.8 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
      />
    </motion.div>
  )

  return (
    <ErrorLayout
      statusCode="500"
      title="Server Error"
      description="We're sorry, but something went wrong on our end. Our team has been notified and is working to fix the issue."
      illustration={<ServerErrorIllustration />}
    />
  )
}

