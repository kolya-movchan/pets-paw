import { useSearchParams } from 'react-router-dom'
import { getAllBreeds, getBreedsByTypeFromApi } from '../api/fetch'
import { Breed, BreedsImage } from '../types/Api'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export function generateSlug(name: string) {
  return name.toLowerCase().replace(/ /g, '-')
}

export const requestAllBreeds = async (
  setBreedsForGallery: Dispatch<BreedsImage[]>,
  setIsLoading: Dispatch<boolean>,
  setAllBreeds?: Dispatch<Breed[]>,
  limit = ''
) => {
  setIsLoading(true)

  console.log(limit)

  const breeds = await getAllBreeds(limit)

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
      breedsModified.map(breed => {
        const { id, name } = breed

        return {
          id,
          name,
          height: breed.image?.height,
          url: breed.image?.url,
          width: breed.image?.width
        }
      })
    )

  setIsLoading(false)
}

type SetURLSearchParams = ReturnType<typeof useSearchParams>[1]

export const selectBreed = async (
  // setAllBreeds: Dispatch<Breed[]>,
  setIsLoading: Dispatch<boolean>,
  setSelectedBreed: Dispatch<string>,
  setBreedsForGallery: Dispatch<BreedsImage[]>,
  setSearchParams: SetURLSearchParams,
  selectedBreed: string,
  limit: string,
  searchParams: URLSearchParams
) => {
  setSelectedBreed(selectedBreed)
  setIsLoading(true)

  searchParams?.set('type', selectedBreed || 'all')

  setSearchParams(searchParams)

  console.log(selectedBreed);
  

  let breedsByType

  if (!selectedBreed.length) {
    requestAllBreeds(setBreedsForGallery, setIsLoading, undefined, limit)
    // requestAllBreeds(setBreedsForGallery, setIsLoading, limit)

    return
  } else {
    breedsByType = await getBreedsByTypeFromApi(selectedBreed, limit)

    console.log(breedsByType);
    
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
  // console.log(breedsForGallery);

  const sortedBreedsDesc = [...breedsForGallery].sort((breedA, breedB) => {
    return breedB.name?.localeCompare(breedA.name)
  })

  // console.log(sortedBreedsDesc);

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

  console.log(breedInfo)

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
