import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { getRandomCat } from '../../api/fetch'
import { useAppSelector } from '../../app/hooks'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { History, ImpressionLog } from '../../reducers/HistoryLog'
import { Cat } from '../../types/Api'
import { getCurrentTime } from '../../utils/calculations'
import { ImpressionController } from '../ImpressionController/ImpressionController'
import { VotingHero } from '../VotingHero/VotingHero'

const VotingBoard = () => {
  const [randomCat, setRandomCat] = useState<Cat | undefined>()

  let impressionHistory = useAppSelector<ImpressionLog[]>(state => state.historyLog.historyLog)

  useEffect(() => {
    getRandomCat(setRandomCat)
  }, [])

  if (impressionHistory) {
    impressionHistory = [...impressionHistory].sort((b, a) => a.time.getTime() - b.time.getTime())
  }

  return (
    <div className="voting side-inner-container">
      <LabelNav label="voting" />
      <div className="voting-interaction">
        <VotingHero randomCat={randomCat} setRandomCat={setRandomCat} />

        {impressionHistory && (
          <ul className="impressionHistory">
            {impressionHistory.map(action => {
              const { id, type, time, status } = action
              return (
                <li
                  key={action.id}
                  className={classNames(
                    'impressionHistory-item',
                    { 'impressionHistory-item--like': type === 'Likes' },
                    { 'impressionHistory-item--fav': type === 'Favourites' },
                    {
                      'impressionHistory-item--dislike': type === 'Dislikes'
                    }
                  )}
                >
                  <span className="impressionHistory-time">{getCurrentTime(time)}</span>
                  <span className="impressionHistory-text">
                    {' Image ID: '}
                  </span>
                  <span className="impressionHistory-id">{id}</span>
                  <span className="impressionHistory-text">{`${status === 'added' ? 'added to' : 'removed from'} ${type}`}</span>
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
