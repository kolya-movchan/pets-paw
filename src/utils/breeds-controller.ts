import { useSearchParams } from 'react-router-dom'
import { getAllBreeds, getAllCats, getBreedsByTypeFromApi } from '../api/fetch'
import { Breed, BreedList, BreedsImage, Cat } from '../types/Api'
import { handleSearchParams } from './api-helper'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>
type SetURLSearchParams = ReturnType<typeof useSearchParams>[1]

export const settAllGalleryItems = async (
  setAllBreeds: Dispatch<BreedsImage[]>,
  setIsLoading: Dispatch<boolean>,
  setCatsForGallery: Dispatch<BreedsImage[]>,
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams
) => {
  setIsLoading(true)
  handleSearchParams(setSearchParams, searchParams)

  await requestAllBreeds(setAllBreeds)
  await getCats(setCatsForGallery, setSearchParams, searchParams)

  setIsLoading(false)
}

export function generateSlug(name: string) {
  return name.toLowerCase().replace(/ /g, '-')
}

export const requestAllBreeds = async (
  setBreedsForGallery: React.Dispatch<BreedsImage[]>,
  setIsLoading?: React.Dispatch<boolean>,
  setAllBreeds?: Dispatch<Breed[]>
) => {
  if (setIsLoading) {
    setIsLoading(true)
  }

  const breeds = await getAllBreeds()

  const breedsModified = breeds
    .filter(breed => breed.image?.url)
    .map(breed => {
      const {
        id,
        name,
        image,
        description,
        temperament,
        origin,
        weight,
        life_span
      } = breed

      const imageData = image ? image : null
      return {
        id,
        name,
        image: imageData,
        description,
        temperament,
        origin,
        weight,
        life_span
      }
    })

  if (setAllBreeds) {
    setAllBreeds(breedsModified)
  }
  setBreedsForGallery(
    breedsModified
      .map(breed => {
        const { id, name } = breed

        return {
          id,
          name,
          height: breed.image?.height,
          url: breed.image?.url,
          width: breed.image?.width
        }
      })
      .sort(() => {
        return Math.random() - 0.5
      })
  )

  if (setIsLoading) {
    setIsLoading(false)
  }
}

export const selectBreed = async (
  setIsLoading: React.Dispatch<boolean>,
  setSelectedBreed: React.Dispatch<string>,
  setBreedsForGallery: React.Dispatch<BreedsImage[]>,
  setSearchParams: SetURLSearchParams,
  selectedBreed: string,
  limit: string,
  searchParams: URLSearchParams
) => {
  setSelectedBreed(selectedBreed)
  setIsLoading(true)

  searchParams?.set('type', selectedBreed || 'all')

  setSearchParams(searchParams)

  let breedsByType

  if (!selectedBreed.length) {
    requestAllBreeds(setBreedsForGallery, setIsLoading, undefined)

    return
  } else {
    breedsByType = await getBreedsByTypeFromApi(selectedBreed, limit)
  }

  breedsByType = breedsByType.map(breed => {
    return {
      ...breed,
      name: selectedBreed
    }
  })

  setBreedsForGallery(breedsByType)
  setIsLoading(false)
}

export const getBreedsByType = async (
  id: string,
  limit: string,
  setBreedsByType: Dispatch<BreedsImage[]>,
  setIsLoading: Dispatch<boolean>
) => {
  setIsLoading(true)
  const breedsByType = await getBreedsByTypeFromApi(id, limit)

  setBreedsByType(breedsByType)
  setIsLoading(false)
}

export const sortAscending = (
  breedsForGallery: BreedsImage[],
  setBreedsForGallery: Dispatch<BreedsImage[]>
) => {
  setBreedsForGallery(
    [...breedsForGallery].sort((breedA, breedB) => {
      return breedA.name?.localeCompare(breedB.name)
    })
  )
}

export const sortDescending = (
  breedsForGallery: BreedsImage[],
  setBreedsForGallery: Dispatch<BreedsImage[]>
) => {
  const sortedBreedsDesc = [...breedsForGallery].sort((breedA, breedB) => {
    return breedB.name?.localeCompare(breedA.name)
  })

  setBreedsForGallery(sortedBreedsDesc)
}

export const getBreedsInfo = async (
  breedId: string,
  setBreedInfo: Dispatch<Breed | null>
) => {
  const breeds = await getAllBreeds()

  const selectedBreed = breeds.filter(breed => breed.id === breedId)[0]

  const { id, name, alt_names, temperament, origin, weight, life_span } =
    selectedBreed

  const breedInfo = {
    id,
    name,
    description: alt_names,
    temperament,
    origin,
    weight: {
      imperial: weight.imperial,
      metric: weight.metric
    },
    life_span
  }

  setBreedInfo(breedInfo)
}

export const updateLimit = async (
  setSearchParams: SetURLSearchParams,
  limit: string,
  searchParams: URLSearchParams,
  setLimit: React.Dispatch<React.SetStateAction<string>>
) => {
  searchParams.set('limit', limit)
  setSearchParams(searchParams)

  setLimit(limit)
}

export const getCats = async (
  setCatsForGallery: Dispatch<BreedsImage[]>,
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams
) => {
  handleSearchParams(setSearchParams, searchParams)

  const cats = await getAllCats()

  setCatsForGallery(
    [...cats].sort(() => {
      return Math.random() - 0.5
    })
  )

  return cats
}

export const getAllBreedsData = async (
  setAllBreeds: Dispatch<BreedList[]>,
  setIsLoading: Dispatch<boolean>
) => {
  setIsLoading(true)

  const breeds = await getAllBreeds()

  const breedsModified = breeds.map(breed => {
    return {
      id: breed.id,
      name: breed.name
    }
  })

  setAllBreeds(breedsModified)

  setIsLoading(false)
}

interface SearchParams {
  format: string
  data: string
}

export const getCatBySelectedType = async (
  setIsLoading: Dispatch<boolean>,
  setCatsForGallery: Dispatch<BreedsImage[]>,
  newParam: SearchParams,
  setSearchParams: SetURLSearchParams,
  searchParams: URLSearchParams
) => {
  setIsLoading(true)

  const searchParamsToUpdate = [
    newParam.format,
    newParam.format !== 'page'
      ? newParam.data
      : (Number(searchParams.get('page')) + 1).toString()
  ]

  const params = handleSearchParams(
    setSearchParams,
    searchParams,
    searchParamsToUpdate
  )

  const { limit, breeds, order, type, page } = params

  const cats = await getAllCats(limit, order, breeds, type, page)
  setCatsForGallery(cats)

  setIsLoading(false)
}

// export getAllBred
