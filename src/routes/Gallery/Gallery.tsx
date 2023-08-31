import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useSearchParams } from 'react-router-dom'
import {
  addToFavorites,
  deleteFromFavorites,
  getFavourites,
  removeFavCat
} from '../../api/fetch'
import { item } from '../../api/fetch-main'
import { useAppDispatch } from '../../app/hooks'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { SearchInput } from '../../components/SearchInput/SearchInput'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { UploadModal } from '../../features/UploadModal/UploadModal'
import { addFav, removeFav } from '../../reducers/HistoryLog'
import { BreedList, BreedsImage, FavCat } from '../../types/Api'
import {
  // getAllBreedsData,
  getCatBySelectedType,
  // getSomeCats,
  settAllGalleryItems
} from '../../utils/breeds-controller'

export const Gallery = () => {
  const [catsForGallery, setCatsForGallery] = useState<BreedsImage[]>([])
  const [allBreeds, setAllBreeds] = useState<BreedList[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadWindowOpened, setIsUploadWindowOpened] = useState(false)
  const [favCatsIds, setFavCatsIds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('')

  const [searchParams, setSearchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    settAllGalleryItems(
      setAllBreeds,
      setIsLoading,
      setCatsForGallery,
      setSearchParams,
      searchParams
    )
  }, [])

  useEffect(() => {
    if (isUploadWindowOpened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isUploadWindowOpened])

  const addCatIdToFav = async (id: string) => {
    if (favCatsIds.includes(id)) {
      try {
        setFavCatsIds(favCatsIds.filter(catId => catId !== id))
        dispatch(removeFav(id))
        const favoritesFromAPI = await item.get<FavCat[]>('favourites')
        const targetId = favoritesFromAPI.find(fav => fav.image_id === id)?.id

        if (targetId) {
          deleteFromFavorites(targetId.toString())
        }
      } catch {
        setFavCatsIds([...favCatsIds, id])
      }
    } else {
      try {
        setFavCatsIds([...favCatsIds, id])
        dispatch(addFav(id))
        addToFavorites(id)
      } catch {
        setFavCatsIds(favCatsIds.filter(catId => catId !== id))
      }
    }
  }
  

  return (
    <div className="side-container-menu">
      <div className="top-nav">
        <SearchInput
          allBreeds={allBreeds}
          setIsLoading={setIsLoading}
          setSelectedBreed={setSelectedBreed}
          setBreedsForGallery={setCatsForGallery}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <TopNavBar />
      </div>

      <div className="voting side-inner-container">
        <div className="gallery-top-container">
          <LabelNav label={'gallery'} />

          <button
            className="gallery__upload-btn title"
            onClick={() => setIsUploadWindowOpened(true)}
          >
            <span className="gallery__upload-btn-text">upload</span>
          </button>
        </div>

        <div>
          <div className="gallery__filter-bar">
            <div className="gallery__select-container">
              <span>order</span>
              <select
                className="select gallery__select"
                onChange={e =>
                  getCatBySelectedType(
                    setIsLoading,
                    setCatsForGallery,
                    { format: 'order', data: e.target.value },
                    setSearchParams,
                    searchParams
                  )
                }
              >
                <option value="random">Random</option>
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>

            <div className="gallery__select-container">
              <span>type</span>
              <select
                value={selectedBreed}
                className="select gallery__select"
                onChange={e =>
                  getCatBySelectedType(
                    setIsLoading,
                    setCatsForGallery,
                    { format: 'type', data: e.target.value },
                    setSearchParams,
                    searchParams
                  )
                }
              >
                <option value="jpg,png,gif">All</option>
                <option value="jpg,png">Static</option>
                <option value="gif">Animated</option>
              </select>
            </div>

            <div className="gallery__select-container">
              <span>breed</span>
              <select
                className="select gallery__select"
                onChange={e =>
                  getCatBySelectedType(
                    setIsLoading,
                    setCatsForGallery,
                    { format: 'breeds', data: e.target.value },
                    setSearchParams,
                    searchParams
                  )
                }
              >
                <option value="">None</option>
                {allBreeds &&
                  allBreeds.map(breed => {
                    return (
                      <option key={breed.id} value={breed.id}>
                        {breed.name}
                      </option>
                    )
                  })}
              </select>
            </div>

            <div className="gallery__select-container">
              <span>limit</span>
              <select
                className="select gallery__select"
                onChange={e =>
                  getCatBySelectedType(
                    setIsLoading,
                    setCatsForGallery,
                    { format: 'limit', data: e.target.value },
                    setSearchParams,
                    searchParams
                  )
                }
              >
                <option value="5">5 items per page</option>
                <option value="10">10 items per page</option>
                <option value="15">15 items per page</option>
                <option value="20">20 items per page</option>
              </select>
            </div>
            <button
              className="gallery__action-btn"
              onClick={() => {
                getCatBySelectedType(
                  setIsLoading,
                  setCatsForGallery,
                  {
                    format: 'page',
                    data: ''
                  },
                  setSearchParams,
                  searchParams
                )
              }}
            ></button>
          </div>

          <div className="loader-parent">
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

            {catsForGallery.length > 1 && !isLoading && (
              <div className="grid">
                {catsForGallery?.map(cat => {
                  if (cat.url) {
                    return (
                      <div className="cat" key={cat.id}>
                        <img src={cat.url} alt="cat-image" loading="lazy" />
                        <div className="overlay" onClick={() => addCatIdToFav(cat.id)}>
                          <button
                            className={classNames(
                              'overlay-bg overlay-bg--to-fav',
                              {
                                'overlay-bg--in-fav': favCatsIds.includes(
                                  cat.id
                                )
                              }
                            )}
                          ></button>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            )}

            {!catsForGallery.length && !isLoading && <NotFound />}
          </div>
        </div>

        <div className={isUploadWindowOpened ? 'body-overlay' : ''}>
          <div
            className={isUploadWindowOpened ? 'upload--open upload' : 'upload'}
          >
            {isUploadWindowOpened && (
              <UploadModal
                onClose={setIsUploadWindowOpened}
                isOpen={isUploadWindowOpened}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
