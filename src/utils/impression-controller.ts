import { FavCat } from './../types/Api'
import { AppDispatch } from './../app/store'
import { toast } from 'react-toastify'
import { Cat } from '../types/Api'
import {
  addToFavorites,
  getFavourites,
  getRandomCat,
  removeFavCat
} from './../api/fetch'
import { historySlice, removeFav } from '../reducers/HistoryLog'

const { addLike, addFav, addDislike } = historySlice.actions

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export const addToLikes = (
  setRandomCat: Dispatch<Cat | undefined>,
  cat: Cat,
  dispatch: AppDispatch
) => {
  getRandomCat(setRandomCat)
  toast('You liked a cat 😎')

  const likesStorage: string = localStorage.getItem('likes') || ''

  if (likesStorage) {
    const likes: Cat[] = JSON.parse(likesStorage)
    localStorage.setItem('likes', JSON.stringify([...likes, cat]))
  } else {
    localStorage.setItem('likes', JSON.stringify([cat]))
  }

  dispatch(addLike(cat.id))
}

export const addToDislikes = (
  setRandomCat: Dispatch<Cat | undefined>,
  cat: Cat,
  dispatch: AppDispatch
) => {
  dispatch(addDislike(cat.id))
  getRandomCat(setRandomCat)
  toast('You disliked a cat 😢')

  const disLikesStorage: string = localStorage.getItem('dislikes') || ''

  if (disLikesStorage) {
    const dislikes: Cat[] = JSON.parse(disLikesStorage)
    localStorage.setItem('dislikes', JSON.stringify([...dislikes, cat]))
  } else {
    localStorage.setItem('dislikes', JSON.stringify([cat]))
  }

  // console.log(disLikesStorage, 'disLikesStorage')
  // console.log(cat, 'cat')
}

export const addCatToFav = (
  setRandomCat: Dispatch<Cat | undefined>,
  id: string,
  dispatch: AppDispatch
) => {
  addToFavorites(id)
  getRandomCat(setRandomCat)
  dispatch(addFav(id))
}

export const removeFromFavById = (
  id: number,
  favcats: FavCat[],
  setFavCats: Dispatch<FavCat[]>,
  dispatch: AppDispatch
) => {
  removeFavCat(id.toString())
  setFavCats(favcats.filter(favcat => favcat.id !== id))
  toast('Cat removed from Favourites')
  dispatch(removeFav(id.toString()))
}
