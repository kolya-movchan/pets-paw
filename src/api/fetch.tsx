import { BreedsImage, BreedsFromAPI, Cat, FavCat } from '../types/Api'
import { item } from './fetch-main'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export const getRandomCat = async (setRandomCat: Dispatch<Cat | undefined>) => {
  const randomCat = await item.get<Cat[]>('images/search')

  setRandomCat(randomCat[0])

  return randomCat || null
}

export const addToFavorites = async (id: string) => {
  const catIsInFav = await item.post<string>('favourites', { image_id: id })

  if (catIsInFav) {
    toast("Cat's in Favourites, Meow 😻")
  }
}

export const getFavourites = async (
  setFavCats: Dispatch<FavCat[]>,
  setIsLoading: Dispatch<boolean>
) => {
  setIsLoading(true)
  const favCats = await item.get<FavCat[]>('favourites')
  setIsLoading(false)

  if (favCats) {
    setFavCats(favCats)
  }

  return favCats || null
}

export const removeFavCat = async (id: string) => {
  const randomCat = await item.delete(`favourites/${id}`)

  return randomCat || null
}

export const getAllBreeds = async (limit?: string) => {
  const allBreeds = await item.get<BreedsFromAPI[]>(
    `${limit ? `breeds?limit=${limit}` : `breeds`}`
  )

  return allBreeds || null
}

export const getBreedsByTypeFromApi = async (id: string, limit: string) => {
  const allBreeds = await item.get<BreedsImage[]>(
    `images/search?breed_ids=${id}&limit=${limit}`
  )

  return allBreeds || null
}

export const getAllCats = async (
  limit = '5',
  order = '',
  breed = '',
  type = '',
  page = '0'
) => {
  const page_ = type ? `&page=${page}` : ''
  const order_ = order ? `&order=${order}` : ''
  const breed_ = breed ? `&breed_ids=${breed}` : ''
  const type_ = type ? `&mime_types=${type}` : ''

  const allBreeds = await item.get<BreedsImage[]>(
    `images/search?limit=${limit}${page_}${order_}${breed_}${type_}`
  )

  return allBreeds || null
}

export const uploadCat = async (img: File) => {
  const formData = new FormData();
  formData.append('file', img);
  

  const isCatUploaded = await item.post('images/upload', formData)

  console.log('isCatUploaded', isCatUploaded)

  return isCatUploaded || null
}
