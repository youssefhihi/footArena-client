import * as React from "react"
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "../../../../commun/utils/constant/cn";

export interface InputProps extends HTMLMotionProps<"input"> {
    className?: string;
    error?: string
}

const Input = ({
    error,
    className,
    ...props
  }: InputProps) => {
    
    const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div>
    <motion.input
          {...props}
          type="text"
          required={false}
          className={cn(`block w-full rounded-lg border   py-2 pl-10  backdrop-blur-sm  focus:outline-none focus:ring-2  ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-black focus:border-blue-500 focus:ring-blue-500/50 "
          }`, className)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{
            scale: isFocused ? 1.01 : 1,
          }}
        />
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
  )
}
Input.displayName = "Input"

export { Input }

