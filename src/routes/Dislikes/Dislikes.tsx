import React, { useEffect } from 'react'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'

export const Dislikes = () => {
useEffect(() => {

}, [])

  return (
    <div className='side-container-menu'>
      <TopNavBar />
      <div className="voting side-inner-container">
        <LabelNav label="dislikes" />
      </div>
    </div>
  )
}
