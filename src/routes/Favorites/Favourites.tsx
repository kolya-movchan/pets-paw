import React, { useEffect } from 'react'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'

export const Favourites = () => {
useEffect(() => {
  // let storedLikes = localStorage.getItem('likes') || '';

  // if (storedLikes) {
  //   storedLikes = JSON.parse(storedLikes);
  // }

  // console.log(storedLikes)
}, [])

  return (
    <div className='side-container-menu'>
      <TopNavBar />
      <div className="voting side-inner-container">
        <LabelNav label="favourites" />
      </div>
    </div>
  )
}
