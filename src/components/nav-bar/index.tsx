import React from "react"
import { BsPostcard } from "react-icons/bs"
import { NavButton } from "../nav-button"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton path="/" icon={<BsPostcard />}>
            Posts
          </NavButton>
          <NavButton path="following" icon={<FiUsers />}>
            Following
          </NavButton>
          <NavButton path="followers" icon={<FaUsers />}>
            Followers
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
