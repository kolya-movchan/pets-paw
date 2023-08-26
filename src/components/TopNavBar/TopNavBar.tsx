import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavLinkItem } from '../NavLinkItem/NavLinkItem'
import { SearchInput } from '../SearchInput/SearchInput'
import { TopNavLink } from '../TopNavLink/TopNavLink'

export const TopNavBar = () => {
  const navLinks = [
    { image: './graphics/like-30.svg', to: 'like', bg: '#fff' },
    { image: './graphics/fav-30.svg', to: 'like', bg: '#fff' },
    { image: './graphics/dislike-30.svg', to: 'like', bg: '#fff' }
  ]
  return (
    <div className="top-nav">
      <SearchInput />
      <div className="top-nav-links">
        <NavLink to="likes">
          <div className="top-nav-link top-nav-link--like"></div>
        </NavLink>

        <NavLink to="favorites">
          <div className="top-nav-link top-nav-link--favorites"></div>
        </NavLink>

        <NavLink to="dislikes">
          <div className="top-nav-link top-nav-link--dislike"></div>
        </NavLink>
      </div>
    </div>
  )
}
