
import { motion } from "framer-motion"
import { FiShield } from "react-icons/fi"
import { ErrorLayout } from "../../commun/layouts/error"

export default function ForbiddenPage() {
  const ForbiddenIllustration = () => (
    <motion.div
      className="relative h-32 w-32"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <FiShield className="h-20 w-20 text-red-400/50" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
          className="text-3xl font-bold text-red-400"
        >
          ✕
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <ErrorLayout
      statusCode="403"
      title="Access Forbidden"
      description="You don't have permission to access this resource. Please contact your administrator if you believe this is an error."
      illustration={<ForbiddenIllustration />}
      showLoginButton={true}
    />
  )
}

