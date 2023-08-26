import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'

export const HomePage = () => {
  return (
    <div className="home-page__left-container">
      <NavLink to={'/'}>
        <img src="./home-page/logo.svg" alt="logo image" className="logo" />
      </NavLink>

      <div className="home-page__welcome-container">
        <h1 className="home-page__title title">Hi!👋</h1>
        <p className="home-page__p text">Welcome to MacPaw Bootcamp 2023</p>
        <NavBar />
      </div>
    </div>
  )
}
