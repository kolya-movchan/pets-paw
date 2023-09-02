import React, { Dispatch, useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { v4 as uuidv } from 'uuid'
import { getFavourites } from '../../api/fetch'
import { useAppDispatch } from '../../app/hooks'
import { CatImage } from '../../components/CatImage/CatImage'
import HistoryData from '../../components/HistoryData/HistoryData'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { FavouriteCats } from '../../features/FavouriteCats/FavouriteCats'
import { FavCat } from '../../types/Api'
import { removeFromFavById } from '../../utils/impression-controller'

export const Favourites = () => {
  const [favsCats, setFavCats] = useState<FavCat[]>([])
  const [removedFavsCatsIds, setRemovedFavCatsIds] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

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
              if (!removedFavsCatsIds.some(id => id === cat.id)) {
                return <FavouriteCats favCat={cat} />
              }
            })}
          </div>
        )}

        {!isLoading && (!favsCats || favsCats.length === 0) && <NotFound />}

        {!isLoading && <HistoryData />}
      </div>
    </div>
  )
}
