import React, { useEffect, useState } from 'react'
import { LinkItem } from '../../types/LinkItem'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { ColorNavIcon } from '../../types/Color'

type Props = {
  link: LinkItem
}

export const NavLinkItem: React.FC<Props> = ({ link }) => {
  const { to, image, bg, optiImage } = link

  const [loadedImage, setLoadedImage] = useState(false)

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames('nav__link-main', { 'nav__link-main--active': isActive })
      }
    >
      <div
        className={classNames(
          { 'nav__link--violet': bg === ColorNavIcon.VIOLET },
          { 'nav__link--green': bg === ColorNavIcon.GREEN },
          { 'nav__link--yellow': bg === ColorNavIcon.YELLOW },
          'nav__link'
        )}
      >
        <img
          src={loadedImage ? image : optiImage || image}
          alt={to}
          className={classNames('nav__link-img', {
            'nav__link-img--gallery': to === 'gallery',
            'nav__link-img--pre': !loadedImage
          })}
          onLoad={() => setLoadedImage(true)}
        />
      </div>

      <div className="nav__link-text-container">
        <span className="nav__link-text">{to}</span>
      </div>
    </NavLink>
  )
}
