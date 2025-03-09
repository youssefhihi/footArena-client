import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../../utils/constant/cn";

interface CustomInputProps extends HTMLMotionProps<"button"> {
  loading: boolean;
  className?: string;
}
export const FormButton = ({
  children,
  loading,
  className,
  ...props
}: CustomInputProps) => (
  <motion.button
    {...props}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    disabled={loading}
    className={cn(className,`flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 ${
      loading ? "cursor-not-allowed opacity-75" : ""
    }`)}
  >
    {loading ? (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
      />
    ) : (
      children
    )}
  </motion.button>
);