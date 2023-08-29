import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { Breed as BreedsType, BreedsImage } from '../../types/Api'
import {
  generateSlug,
  requestAllBreeds,
  selectBreed,
  sortAscending,
  sortDescending,
  updateLimit
} from '../../utils/breeds-controller'

export const Breeds = () => {
  const [allBreeds, setAllBreeds] = useState<BreedsType[]>([])
  const [breedsForGallery, setBreedsForGallery] = useState<BreedsImage[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [limit, setLimit] = useState<string>('10')
  const [isLoading, setIsLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(() => {
    requestAllBreeds(setBreedsForGallery, setIsLoading, setAllBreeds)
  }, [])

  return (
    <div className="side-container-menu">
      <TopNavBar />
      <div className="voting side-inner-container loader-parent">
        <div className="breeds-navbar-container">
          <LabelNav label={'breeds'} />

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

          <div className="breeds-navbar">
            <select
              name="breeds-type"
              value={selectedBreed}
              className="select breeds-navbar__select breeds-navbar__select--breeds"
              onChange={e => 
                selectBreed(
                  setIsLoading,
                  setSelectedBreed,
                  setBreedsForGallery,
                  setSearchParams,
                  e.target.value,
                  limit,
                  searchParams,
                )
              }
              disabled={breedsForGallery.length < 1}
            >
              <option value="">All breeds</option>

              {allBreeds &&
                allBreeds.map(breed => {
                  return (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  )
                })}
            </select>

            <select
              name="limit"
              value={limit}
              className="select breeds-navbar__select breeds-navbar__select--limit"
              onChange={e => {
                updateLimit(
                  setSearchParams,
                  e.target.value,
                  searchParams,
                  setLimit,
                )

                selectBreed(
                  setIsLoading,
                  setSelectedBreed,
                  setBreedsForGallery,
                  setSearchParams,
                  selectedBreed,
                  e.target.value,
                  searchParams,
                )
              }
                
              }
            >
              <option value="5">Limit: 5</option>
              <option value="10">Limit: 10</option>
              <option value="15">Limit: 15</option>
              <option value="20">Limit: 20</option>
            </select>

            <div className="breeds-navbar__sort breeds-navbar__sort--desc">
              <button
                onClick={() =>
                  sortDescending(breedsForGallery, setBreedsForGallery)
                }
              ></button>
            </div>

            <div className="breeds-navbar__sort breeds-navbar__sort--asc">
              <button
                onClick={() =>
                  sortAscending(breedsForGallery, setBreedsForGallery)
                }
              ></button>
            </div>
          </div>
        </div>

        {breedsForGallery.length > 1 && !isLoading && (
          <div className="grid">
            {breedsForGallery?.map(breed => {
              if (breed?.url) {
                return (
                  <Link
                    to={`/breeds/${generateSlug(breed.id)}?limit=${limit}`}
                    key={breed.id}
                    className="cat"
                  >
                    <img src={breed.url} alt="cat-image" loading='lazy' />

                    <div className="overlay">
                      <button
                        className="overlay-bg overlay-bg--breed"
                      >
                        {breed.name}
                      </button>
                    </div>
                  </Link>
                )
              }
            })}
          </div>
        )}
      </div>
    </div>
  )
}
