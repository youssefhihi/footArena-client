import { useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { BsExclamationCircle } from "react-icons/bs";
import { cn } from "../utils/constant/cn";
interface CustomInputProps extends HTMLMotionProps<"input"> {
    label: string;
    error?: string;
    className?: string;
  }
  export const FormInput = ({
    label,
    error,
    className,
    ...props
  }: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full space-y-1">
      <label className={cn('text-sm font-medium',className)}>
        {label}
      </label>
      <div className="relative">
        <motion.input
          {...props}
          required={false}
          className={`block w-full rounded-lg border bg-blue-900/30 p-4 pl-10 text-white placeholder-blue-300 backdrop-blur-sm transition-all  focus:outline-none focus:ring-2  ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-blue-800/30 focus:border-blue-500 focus:ring-blue-500/50 "
          }`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            scale: isFocused ? 1.02 : 1,
            borderColor: error ? "#EF4444" : isFocused ? "#6366F1" : "#E5E7EB"
          }}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute right-3 top-3.5"
          >
            <BsExclamationCircle className="h-6 w-6 text-red-500" />
          </motion.div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-left text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
