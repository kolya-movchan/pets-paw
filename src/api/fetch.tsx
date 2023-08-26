import { Cat } from '../types/Api'
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
  const catIsInFav = await item.post<string>('favourites', { image_id: id });
  
  if (catIsInFav) {
      toast('Cat is added in Favorites, Meow!')
    }
}
