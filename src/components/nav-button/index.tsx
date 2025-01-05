import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../button"

type Props = {
  children: React.ReactNode
  icon: JSX.Element
  path: string
}

export const NavButton: React.FC<Props> = ({ children, icon, path }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={path}>{children}</Link>
    </Button>
  )
}
