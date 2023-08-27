import React, { useEffect, useState } from 'react'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { Cat } from '../../types/Api'
import { v4 as uuidv } from 'uuid'
import '../../styles/grid.scss'; // Import the SCSS file
import { NotFound } from '../../components/NotFound/NotFound'


export const Likes = () => {
  const [likedCatsFromStorage, setLikedCatsFromStorage] = useState<Cat[]>([])

  useEffect(() => {
    let storedLikes: Cat[] = JSON.parse(localStorage.getItem('likes') || '[]')

    if (storedLikes) {
      setLikedCatsFromStorage(storedLikes)
    }
  }, [])

  console.log(likedCatsFromStorage)

  return (
    <div className="side-container-menu">
      <TopNavBar />
      <div className="side-wrapper side-inner-container">
        <LabelNav label="likes" />

        {likedCatsFromStorage.length > 1 ? (
          <div className="parent">
            {likedCatsFromStorage?.map((cat, index) => {
              return (
                <div key={uuidv()} className={`cat${index + 1} cat`}>
                  <img src={cat.url} alt="cat-image" />
                </div>
              )
            })}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  )
}
