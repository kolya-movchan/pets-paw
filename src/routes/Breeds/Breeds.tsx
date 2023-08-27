import React, { useEffect, useState } from 'react'
import { getAllBreeds } from '../../api/fetch'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { Breeds as BreedsType } from '../../types/Api'
import { requestAllBreeds } from '../../utils/breeds-controller'

export const Breeds = () => {
  const [allBreeds, setAllBreeds] = useState<BreedsType[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('')

  useEffect(() => {
    requestAllBreeds(setAllBreeds)
  }, [])

  // if (allBreeds) {
  //   allBreeds.map(b =>
  //     b.image ? console.log(b.image.url) : console.log('NOT FOUND')
  //   )
  // }

  return (
    <div className="side-container-menu">
      <TopNavBar />
      <div className="voting side-inner-container">
        <div className="breeds-navbar-container">
          <LabelNav label={'breeds'} />
          <div className="breeds-navbar">
            <select
              name=""
              id=""
              value={selectedBreed}
              className="breeds-navbar__select breeds-navbar__select--breeds"
              onChange={e => setSelectedBreed(e.target.value)}
              disabled={allBreeds.length < 1}
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
            {/* 
            <select
              name=""
              value=""
              id=""
              className="breeds-navbar__select breeds-navbar__select--limit"
            >
              <option value=""></option>
            </select> */}

            {/* <div className="breeds-navbar__select breeds-navbar__select--limit">
              Limit 10
            </div> */}

            <div className="breeds-navbar__sort breeds-navbar__sort--asc">
              <button></button>
            </div>

            <div className="breeds-navbar__sort breeds-navbar__sort--desc">
              <button></button>
            </div>
          </div>
        </div>

        {allBreeds.length > 1 && (
          <div className="grid">
            {allBreeds?.map((breed) => {
              if (breed.image) {
                return (
                  <div key={breed.id} className='cat'>
                    <img src={breed.image.url} alt="cat-image" />
                  </div>
                )
              }
              
            })}
        </div>)}
      </div>
    </div>
  )
}
