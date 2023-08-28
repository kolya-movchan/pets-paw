import React from 'react'

type Props = {
  title: string
  data: string
}

export const DescriptionInfo: React.FC<Props> = ({ title, data }) => {
  return (
    <div className="desctiption-info-container">
      <span className="info-title title">{title}: </span>
      <span className="info-data title">{data}</span>
    </div>
  )
}
