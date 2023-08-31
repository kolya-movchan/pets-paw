import classNames from 'classnames'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavLinkItem } from '../NavLinkItem/NavLinkItem'
import { SearchInput } from '../SearchInput/SearchInput'
import { Breed as BreedsType } from '../../types/Api'

export const TopNavBar = () => {
  const navLinks = [
    { image: './graphics/like-30.svg', to: 'like', bg: '#fff' },
    { image: './graphics/fav-30.svg', to: 'like', bg: '#fff' },
    { image: './graphics/dislike-30.svg', to: 'like', bg: '#fff' }
  ]
  return (
    <div className="top-nav-links">
      <NavLink
        to="/likes"
        className={({ isActive }) =>
          classNames({ 'active-top-link-like': isActive })
        }
      >
        <div className="top-nav-link top-nav-link--like"></div>
      </NavLink>

      <NavLink
        to="/favourites"
        className={({ isActive }) =>
          classNames({ 'active-top-link-fav': isActive })
        }
      >
        <div className="top-nav-link top-nav-link--favorites"></div>
      </NavLink>

      <NavLink
        to="/dislikes"
        className={({ isActive }) =>
          classNames({ 'active-top-link-dislike': isActive })
        }
      >
        <div className="top-nav-link top-nav-link--dislike"></div>
      </NavLink>
    </div>
  )
}
