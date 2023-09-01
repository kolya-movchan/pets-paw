import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CustomLink } from '../../components/CustomLink/CustomLink'
import { NavBar } from '../NavBar/NavBar'

export const HomePage = () => {
  return (
    <div className="home-page__left-container">
      <NavLink to={'/'}>
        <img src="./home-page/logo.svg" alt="logo image" className="logo" />
      </NavLink>

      <div className="home-page__welcome-container">
        <h1 className="home-page__title title">Hi!👋</h1>
        <p className="home-page__p text">All cat lovers are welcomed! Feel free to reach me out</p>

        <div className='contacts'>
          <CustomLink
            to={'https://github.com/kolya-movchan'}
            iconSrc={'/pets-paw/home-page/github.svg'}
            text={'Github'}
          />
          <CustomLink
            to={'https://www.linkedin.com/in/klmovchan/'}
            iconSrc={'/pets-paw/home-page/linkedin-logo-bold.svg'}
            text={'LinkedIn'}
          />
        </div>

        <NavBar />

      </div>
    </div>
  )
}
