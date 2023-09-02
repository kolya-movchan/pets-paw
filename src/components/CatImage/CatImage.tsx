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
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      setImgSrc(src)
      setImageLoaded(true);
    }
  }, [src])

  const imageStyle: Stylying = {
    transition: 'opacity 0.3s',
    opacity: imageLoaded ? '1' : '0',
  };

  return (
    <img
      {...props}
      style={{ ...props.style, ...imageStyle }}
      src={imgSrc}
      alt="cat image"
      className={`${className} image`}
      loading="lazy"
    />
  )
}
