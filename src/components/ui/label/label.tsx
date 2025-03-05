import React from "react"
import styles from "./label.module.css"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    <label className={`${styles.label} ${className || ""}`} ref={ref} {...props}>
      {children}
    </label>
  )
})

Label.displayName = "Label"

