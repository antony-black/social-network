import React, { useContext } from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"

import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features/userSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuth = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg:flex text-3xl cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {
            isAuth && (
              <Button
              color="default"
              variant="flat"
              className="gap-2"
              onPress={handleLogout}
              >
                <CiLogout/> <span>Logout</span>
              </Button>
            )
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
