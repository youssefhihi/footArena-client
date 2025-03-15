import { motion } from "framer-motion"
import { FiLock } from "react-icons/fi"
import { ErrorLayout } from "../../commun/layouts/error"

export default function UnauthorizedPage() {
  const UnauthorizedIllustration = () => (
    <motion.div
      className="relative h-32 w-32"
      initial={{ y: -5 }}
      animate={{ y: 5 }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <FiLock className="h-20 w-20 text-yellow-400/50" />
      </div>
      <motion.div
        className="absolute -right-2 top-0 h-8 w-8 rounded-full bg-yellow-600/20"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-2 bottom-0 h-6 w-6 rounded-full bg-yellow-600/20"
        initial={{ scale: 1.2 }}
        animate={{ scale: 0.8 }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
      />
    </motion.div>
  )

  return (
    <ErrorLayout
      statusCode="401"
      title="Unauthorized"
      description="You need to be authenticated to access this page. Please sign in with your credentials."
      illustration={<UnauthorizedIllustration />}
      showLoginButton={true}
    />
  )
}

