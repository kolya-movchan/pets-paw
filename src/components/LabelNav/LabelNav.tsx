import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  label: string,
}

export const LabelNav: React.FC<Props> = ({ label }) => {
  let navigate = useNavigate()

  return (
    <div className="nav-label">
      <button className='goback' onClick={() => navigate(-1)}></button>
      <div className="nav-title-container">
        <span className="nav-title title">
          {label}
        </span>
      </div>
    </div>
  )
}
