import React, { useEffect, useState } from 'react'

type Stylying = {
  [key: string]: string
}

type Props = {
  src: string
  placeholderSrc: string
  style?: Stylying
  className?: string
}

export const CatImage: React.FC<Props> = ({
  placeholderSrc,
  src,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
    }
  }, [src])

  return (
    <img
      {...props}
      src={imgSrc}
      alt="cat image"
      className={`${className} image`}
      loading="lazy"
    />
  )
}
