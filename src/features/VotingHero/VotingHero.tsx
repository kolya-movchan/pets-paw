import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Cat } from '../../types/Api'
import ReactLoading from 'react-loading'
import { ImpressionController } from '../ImpressionController/ImpressionController'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

type Props = {
  randomCat: Cat | undefined
  setRandomCat: Dispatch<Cat | undefined>
  selectedBreed: string
}

export const VotingHero: React.FC<Props> = ({ randomCat, setRandomCat, selectedBreed }) => {
  const { url } = randomCat || {}

  const newImage = (
    <img
      src={url}
      alt="cat image"
      className="hero-img"
      style={{ borderRadius: '20px' }}
    />
  )

  return (
    <>
      <div className="voting-hero-container ">
        {randomCat ? (
          <>
            <div className="voting-hero">{newImage}</div>

            <ImpressionController
              setRandomCat={setRandomCat}
              randomCat={randomCat}
              selectedBreed={selectedBreed}
            />
          </>
        ) : (
          <div className="loader">
            <ReactLoading
              type={'spin'}
              color={'#FF868E'}
              height={50}
              width={50}
              delay={0}
            />
          </div>
        )}
      </div>
    </>
  )
}
