import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { SetURLSearchParams } from 'react-router-dom'
import {
  Breed,
  Breed as BreedsType,
  BreedList,
  BreedsImage
} from '../../types/Api'
import { getBreedsInfo, selectBreed } from '../../utils/breeds-controller'

type Props = {
  allBreeds: BreedsType[] | BreedList[]
  setIsLoading: Dispatch<boolean>
  setSelectedBreed: Dispatch<string>
  setBreedsForGallery: Dispatch<BreedsImage[]>
  setSearchParams: SetURLSearchParams
  searchParams: URLSearchParams
  limit?: string
  setBreedInfo?: React.Dispatch<React.SetStateAction<Breed | null>>
}

export const SearchInput: React.FC<Props> = ({
  allBreeds,
  setIsLoading,
  setSelectedBreed,
  setBreedsForGallery,
  setSearchParams,
  searchParams,
  limit = '5',
  setBreedInfo
}) => {
  const [query, setQuery] = useState('')
  const searchBreedsRef = useRef<HTMLDivElement | null>(null)

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleBreedSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    const selectedBreedValue =
      event.currentTarget.getAttribute('data-breed-value') || ''

    setQuery('')
    selectBreed(
      setIsLoading,
      setSelectedBreed,
      setBreedsForGallery,
      setSearchParams,
      selectedBreedValue,
      limit,
      searchParams
    )

    if (setBreedInfo) {
      getBreedsInfo(selectedBreedValue, setBreedInfo)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setQuery('')
    }, 100)
  }

  return (
    <div className="search-container">
      <input
        value={query}
        type="text"
        className="input"
        placeholder="Search for breeds by name"
        onChange={handleQuery}
        onBlur={handleBlur}
      ></input>

      <div className="search-icon" style={{backgroundImage: '.build/graphics/search-20.svg'}}></div>

      {query && (
        <div className="search-breeds-data" ref={searchBreedsRef}>
          <ul>
            {allBreeds.map(breed => {
              if (
                breed.name
                  .toLowerCase()
                  .trim()
                  .includes(query.toLowerCase().trim())
              )
                return (
                  <li
                    className="search-breeds-li"
                    data-breed-value={breed.id}
                    key={breed.id}
                    onClick={handleBreedSelect}
                  >
                    {breed.name}
                  </li>
                )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
