import { Button as NextButton } from "@nextui-org/react"
import React from "react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextButton
      className={className}
      type={type}
      variant="light"
      startContent={icon}
      size="lg"
      color={color}
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  )
}
