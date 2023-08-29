import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useSearchParams } from 'react-router-dom'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { BreedList, BreedsImage } from '../../types/Api'
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
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    console.log('effect')

    settAllGalleryItems(
      setAllBreeds,
      setIsLoading,
      setCatsForGallery,
      setSearchParams,
      searchParams
    )

    // getSomeCats(setCatsForGallery, setIsLoading, setSearchParams, searchParams)
    // getAllBreedsData(setAllBreeds, setIsLoading)
  }, [])

  console.log(catsForGallery.length)

  return (
    <div className="side-container-menu">
      <TopNavBar />
      <div className="voting side-inner-container">
        <div className="gallery-top-container">
          <LabelNav label={'gallery'} />

          <button className="gallery__upload-btn title">
            <span className="gallery__upload-btn-text">upload</span>
          </button>
        </div>

        <div className="">
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
                        <div className="overlay">
                          <button className="overlay-bg"></button>
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
      </div>
    </div>
  )
}
