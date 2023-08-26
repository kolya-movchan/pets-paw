import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { getRandomCat } from '../../api/fetch'
import { useAppSelector } from '../../app/hooks'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { History } from '../../reducers/HistoryLog'
import { Cat } from '../../types/Api'
import { ImpressionController } from '../ImpressionController/ImpressionController'
import { VotingHero } from '../VotingHero/VotingHero'

const VotingBoard = () => {
  const [randomCat, setRandomCat] = useState<Cat | undefined>()

  const impressionHistory = useAppSelector<History>(state => state.historyLog)

  console.log(impressionHistory.historyLog)

  useEffect(() => {
    getRandomCat(setRandomCat)
  }, [])

  return (
    <div className="voting side-inner-container">
      <LabelNav label="voting" />
      <div className="voting-interaction">
        <VotingHero randomCat={randomCat} setRandomCat={setRandomCat} />

        {impressionHistory && (
          <ul className="impressionHistory">
            {impressionHistory.historyLog.map(action => {
              const { id, message, time } = action
              return (
                <li
                  key={action.id}
                  className={classNames(
                    'impressionHistory-item',
                    { 'impressionHistory-item--like': message === 'Likes' },
                    { 'impressionHistory-item--fav': message === 'Favorites' },
                    {
                      'impressionHistory-item--dislike': message === 'Dislikes'
                    }
                  )}
                >
                  <span className="impressionHistory-time">{time}</span>
                  <span className="impressionHistory-text">
                    {' Image ID: '}
                  </span>
                  <span className="impressionHistory-id">{id}</span>
                  <span className="impressionHistory-text">{` was added to ${message}`}</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default VotingBoard
