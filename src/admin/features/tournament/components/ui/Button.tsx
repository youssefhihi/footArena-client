import type React from "react"
import type { IconType } from "react-icons"

interface ButtonProps {
  onClick: () => void
  icon?: IconType
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  icon: Icon,
  children,
  variant = "primary",
  disabled = false,
}) => {
  const baseClasses = "flex items-center rounded-lg px-4 py-2 text-sm font-medium"
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {Icon && <Icon className="mr-2" />}
      {children}
    </button>
  )
}