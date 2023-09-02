import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { v4 as uuidv } from 'uuid'
import { getFavourites } from '../../api/fetch'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CatImage } from '../../components/CatImage/CatImage'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { ImpressionLog } from '../../reducers/HistoryLog'
import { FavCat } from '../../types/Api'
import { getCurrentTime } from '../../utils/calculations'
import { removeFromFavById } from '../../utils/impression-controller'

export const Favourites = () => {
  const [favsCats, setFavCats] = useState<FavCat[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const historyLog = useAppSelector<ImpressionLog[]>(
    state => state.historyLog.historyLog
  )

  useEffect(() => {
    getFavourites(setFavCats, setIsLoading)
  }, [])

  return (
    <div className="side-container-menu">
       <div className="top-nav">
        <TopNavBar />
      </div>
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
                <a
                  key={uuidv()}
                  className={`cat`}
                  onClick={() =>
                    removeFromFavById(cat.id, favsCats, setFavCats, dispatch)
                  }
                >
                   <CatImage
                    src={cat.image.url}
                    placeholderSrc={'./home-page/plc.png'}
                  />
                  <div className="overlay">
                    <button className="overlay-bg overlay-bg--fav"></button>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {!isLoading && (!favsCats || favsCats.length === 0) && <NotFound />}

        {!isLoading && (
          <ul className="impressionHistory">
            {[...historyLog]
              .filter(cat => cat.type === 'Favourites')
              .sort((b, a) => new Date(a.time).getTime() -  new Date(b.time).getTime())
              .map(action => {
                const { id, time, type, status } = action
                return (
                  <li
                    key={action.id}
                    className="impressionHistory-item impressionHistory-item--fav-page"
                  >
                    <span className="impressionHistory-time">
                      {getCurrentTime(time)}
                    </span>
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
