import { AppDispatch } from './../app/store'
import { toast } from 'react-toastify'
import { Cat } from '../types/Api'
import { addToFavorites, getRandomCat } from './../api/fetch'
import { historySlice } from '../reducers/HistoryLog'

const { addLike, addFav, addDislike } = historySlice.actions

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export const addToLikes = (
  setRandomCat: Dispatch<Cat | undefined>,
  randomCat: Cat,
  dispatch: AppDispatch
) => {
  getRandomCat(setRandomCat)
  toast('You liked a cat!')

  const likesStorage: string = localStorage.getItem('likes') || ''

  // console.log(likesStorage)

  if (likesStorage) {
    const likes: Cat[] = JSON.parse(likesStorage)
    localStorage.setItem('likes', JSON.stringify([...likes, randomCat]))
  } else {
    localStorage.setItem('likes', JSON.stringify([randomCat]))
  }

  dispatch(addLike(randomCat.id))
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

export const addToDislikes = (
  setRandomCat: Dispatch<Cat | undefined>,
  id: string,
  dispatch: AppDispatch
) => {
  getRandomCat(setRandomCat)
  dispatch(addDislike(id))
  toast('You disliked a cat!')
}
