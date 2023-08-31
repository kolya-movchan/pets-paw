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
  dispatch: AppDispatch,
  selectedBreed: string,
) => {
  getRandomCat(setRandomCat, selectedBreed)
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
  dispatch: AppDispatch,
  selectedBreed: string,
) => {
  dispatch(addDislike(cat.id))
  getRandomCat(setRandomCat, selectedBreed)
  toast('You disliked a cat 😢')

  const disLikesStorage: string = localStorage.getItem('dislikes') || ''

  if (disLikesStorage) {
    const dislikes: Cat[] = JSON.parse(disLikesStorage)
    localStorage.setItem('dislikes', JSON.stringify([...dislikes, cat]))
  } else {
    localStorage.setItem('dislikes', JSON.stringify([cat]))
  }
}

export const addCatToFav = (
  setRandomCat: Dispatch<Cat | undefined>,
  id: string,
  dispatch: AppDispatch,
  selectedBreed: string,
) => {
  addToFavorites(id)
  getRandomCat(setRandomCat, selectedBreed)
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
  toast('Cat\'s removed from Favourites')
  dispatch(removeFav(id.toString()))
}
