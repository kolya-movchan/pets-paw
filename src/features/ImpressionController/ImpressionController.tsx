import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { Cat } from '../../types/Api'
import {
  addCatToFav,
  addToDislikes,
  addToLikes
} from '../../utils/impression-controller'

type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

type Props = {
  setRandomCat: Dispatch<Cat | undefined>
  randomCat: Cat
}

export const ImpressionController: React.FC<Props> = ({
  setRandomCat,
  randomCat
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className="impression-controller">
      <div className="impression">
        <button
          onClick={() => addToLikes(setRandomCat, randomCat, dispatch)}
          className="impression-mode impression-mode--like"
        ></button>
      </div>
      <div className="impression">
        <button
          className="impression-mode impression-mode--fav"
          onClick={() => addCatToFav(setRandomCat, randomCat.id, dispatch)}
        ></button>
      </div>
      <div className="impression">
        <button
          className="impression-mode impression-mode--dislike"
          onClick={() => addToDislikes(setRandomCat, randomCat, dispatch)}
        ></button>
      </div>
    </div>
  )
}
