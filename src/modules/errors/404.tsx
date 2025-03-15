
import { motion } from "framer-motion"
import { FiSearch } from "react-icons/fi"
import { ErrorLayout } from "../../commun/layouts/error"

export default function NotFoundPage() {
  const NotFoundIllustration = () => (
    <motion.div
      className="relative h-32 w-32"
      initial={{ rotate: -10 }}
      animate={{ rotate: 10 }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <FiSearch className="h-20 w-20 text-blue-400/50" />
      </div>
      <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
        ?
      </div>
      <div className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
        !
      </div>
    </motion.div>
  )

  return (
    <ErrorLayout
      statusCode="404"
      title="Page Not Found"
      description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      illustration={<NotFoundIllustration />}
    />
  )
}

