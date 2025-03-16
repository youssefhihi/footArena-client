import platformLogo from "../../../assets/svg/platform-logo.svg"
import platformLogoSimplified from "../../../assets/svg/platform-logo-simplified.svg"
import platformLogoIcon from "../../../assets/svg/platform-logo-icon.svg"

interface LogoProps {
  variant?: "default" | "simplified" | "icon"
  className?: string
  width?: number
  height?: number
}

export const Logo: React.FC<LogoProps> = ({ variant = "default", className = "", width, height }) => {
  const logoSrc =
    variant === "simplified" ? platformLogoSimplified : variant === "icon" ? platformLogoIcon : platformLogo

  const defaultWidth = variant === "icon" ? 60 : 200
  const defaultHeight = variant === "simplified" ? 60 : variant === "icon" ? 60 : 200

  return (
    <img
      src={logoSrc || "/placeholder.svg"}
      alt="FIFA Competition Manager"
      className={className}
      width={width || defaultWidth}
      height={height || defaultHeight}
    />
  )
}

