import { getAllBreeds } from '../api/fetch'
import { Breeds as BreedsType } from '../types/Api'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export const requestAllBreeds = async (
  setAllBreeds: Dispatch<BreedsType[]>
) => {
  const breeds = await getAllBreeds()

  const breedsModified = breeds.map(breed => {
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

    const imageUrl = image ? image : null // Check if image exists before accessing its url

    return {
      id,
      name,
      image: imageUrl,
      description,
      temperament,
      origin,
      weight,
      life_span
    }
  })

  setAllBreeds(breedsModified)
}
