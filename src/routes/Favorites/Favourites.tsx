import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { v4 as uuidv } from 'uuid'
import { getFavourites } from '../../api/fetch'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { FavCat } from '../../types/Api'
import { removeFromFavById } from '../../utils/impression-controller'
import { History } from '../../reducers/HistoryLog'


export const Favourites = () => {
  const [favsCats, setFavCats] = useState<FavCat[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const historyLog = useAppSelector<History>(state => state.historyLog)

  useEffect(() => {
    getFavourites(setFavCats, setIsLoading)
  }, [])

  return (
    <div className="side-container-menu">
      <TopNavBar />
      <div className="voting side-inner-container loader-parent">
        <LabelNav label="favourites" />

        {isLoading && (
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

        {favsCats && favsCats.length > 0 && (
          <div className="grid grid--fav">
            {favsCats?.map(cat => {
              return (
                <div key={uuidv()} className={`cat`}>
                  <img src={cat.image.url} alt="cat-image" />
                  <div className="overlay">
                    <button
                      className="overlay-heart"
                      onClick={() =>
                        removeFromFavById(
                          cat.id,
                          favsCats,
                          setFavCats,
                          dispatch
                        )
                      }
                    ></button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {!isLoading && (!favsCats || favsCats.length === 0) && <NotFound />}

        {!isLoading && (
          <ul className="impressionHistory">
            {historyLog.historyLog.map(action => {
              const { id, time, type, status } = action
              return (
                <li
                  key={action.id}
                  className="impressionHistory-item impressionHistory-item--fav-page"
                >
                  <span className="impressionHistory-time">{time}</span>
                  <span className="impressionHistory-text">
                    {' Image ID: '}
                  </span>
                  <span className="impressionHistory-id">{id}</span>
                  <span className="impressionHistory-text">{` was ${
                    status === 'added' ? 'added to' : 'removed from'
                  } Favourites`}</span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
