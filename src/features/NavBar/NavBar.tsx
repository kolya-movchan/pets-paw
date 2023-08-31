import React, { useEffect, useState } from 'react'
import { NavLinkItem } from '../../components/NavLinkItem/NavLinkItem'
import { ColorNavIcon } from '../../types/Color'

export const NavBar = () => {
  const navLinks = [
    { image: './home-page/voting.svg', to: 'voting', bg: ColorNavIcon.VIOLET },
    {
      image: './home-page/breeds.svg',
      to: 'breeds',
      bg: ColorNavIcon.GREEN,
      optiImage: './home-page/breeds.png'
    },
    { image: './home-page/gallery.svg', to: 'gallery', bg: ColorNavIcon.YELLOW }
  ]

  return (
    <div className="nav">
      <p className="nav__title title">Lets start using The Cat API</p>

      {/* {showNavLinks && ( */}
      <div className="nav__links">
        {navLinks.map(navLink => {
          return <NavLinkItem key={navLink.to} link={navLink} />
        })}
      </div>
      {/* )} */}
    </div>
  )
}
