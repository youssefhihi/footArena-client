import type React from "react"
import type { IconType } from "react-icons"
import { cn } from "../../utils/constant/cn"

interface ButtonProps {
  onClick: () => void
  icon?: IconType
  children?: React.ReactNode
  variant?: "primary" | "secondary" | "danger" | "default"
  disabled?: boolean,
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  icon: Icon,
  children,
  variant = "primary",
  disabled = false,
  className
}) => {
  const baseClasses = "flex items-center rounded-lg px-4 py-2 text-sm font-medium"
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
    default: "bg-white border border-gray-500 text-gray-500 hover:text-white hover:bg-gray-500 ease-in-out duration-200 duration-300",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(className, `${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`)}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  )
}