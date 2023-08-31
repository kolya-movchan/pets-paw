import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchInput } from '../../components/SearchInput/SearchInput'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import VotingBoard from '../../features/VotingBoard/VotingBoard'
import { BreedsImage, Breed as BreedsType } from '../../types/Api'
import { requestAllBreeds } from '../../utils/breeds-controller'

export const Voting = () => {
  const [allBreeds, setAllBreeds] = useState<BreedsType[]>([])
  const [breedsForGallery, setBreedsForGallery] = useState<BreedsImage[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    requestAllBreeds(setBreedsForGallery, setIsLoading, setAllBreeds)
  }, [])

  // console.log(selectedBreed);

  return (
    <div className="side-container-menu">
      <div className="top-nav">
        <SearchInput
          allBreeds={allBreeds}
          setIsLoading={setIsLoading}
          setSelectedBreed={setSelectedBreed}
          setBreedsForGallery={setBreedsForGallery}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <TopNavBar />
      </div>

      <VotingBoard selectedBreed={selectedBreed} />
    </div>
  )
}
