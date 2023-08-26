import React from 'react'
import { Cat } from '../../types/Api'
import ReactLoading from 'react-loading'

type Props = {
  randomCat: Cat | undefined
}

export const VotingHero: React.FC<Props> = ({ randomCat }) => {
  console.log(randomCat)

  const { id, url } = randomCat || {}
  return (
    <>
      {randomCat ? (
        <div className="voting-hero-container">
          <div className="voting-hero">
            <img src={url} alt="cat image" className="hero-img" />
          </div>
        </div>
      ) : (
        <div className="loader">
          <ReactLoading
            type={'spin'}
            color={'#FF868E'}
            height={75}
            width={75}
            delay={0}
          />
        </div>
      )}
    </>
  )
}
