import React, { useEffect, useState } from 'react'
import { getRandomCat } from '../../api/fetch'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { Cat } from '../../types/Api'
import { VotingHero } from '../VotingHero/VotingHero'

const VotingBoard = () => {
  const [randomCat, setRandomCat] = useState<Cat | undefined>();

  useEffect(() => {
    getRandomCat(setRandomCat)
  }, [])

  return (
    <div className='voting voting-container'>
      <LabelNav label="voting" />
      <div className="voting-interaction">
      <VotingHero randomCat={randomCat} />

      </div>
    </div>
  )
}

export default VotingBoard
