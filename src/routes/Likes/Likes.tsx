import React, { useEffect, useState } from 'react'
import { LabelNav } from '../../components/LabelNav/LabelNav'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import { Cat } from '../../types/Api'
import { v4 as uuidv } from 'uuid';

export const Likes = () => {
  const [likedCatsFromStorage, setLikedCatsFromStorage] = useState<Cat[]>()

  useEffect(() => {
    let storedLikes: Cat[] = JSON.parse(localStorage.getItem('likes') || '') 

    if (storedLikes) {
      setLikedCatsFromStorage(storedLikes)
    }
  }, [])

  console.log(likedCatsFromStorage)

  // likedCatsFromStorage?.map(c => console.log(c));

  return (
    <div className="side-container-menu">
      <TopNavBar />
      <div className="side-wrapper side-inner-container">
        <LabelNav label="likes" />

        <div className="parent">
          {likedCatsFromStorage?.map((cat, index) => {
            return (
              <div key={uuidv()} className={`div${index}`}>
                <img src={cat.url} alt="cat-image" />
              </div>
            )
          })}
        </div>

        {/* {likedCatsFromStorage ? (
          <div className="parent"> {likedCatsFromStorage.map((cat, index)=> {
            return (
              <div key={cat.id} className={`div${index}`}>
                <img src={cat.url} alt="cat-image" />
              </div>
            )
          })}</div>
        ) : (
          <>NO CAT</>
        )} */}

        {/* <div className="parent">
          <div className="div1">sdsd </div>
          <div className="div2"> </div>
          <div className="div3"> </div>
          <div className="div4"> </div>
          <div className="div5"> </div>
          <div className="div6"> </div>
          <div className="div7"> </div>
          <div className="div8"> </div>
          <div className="div9"> </div>
          <div className="div10"> </div>
          <div className="div11"> </div>
          <div className="div12"> </div>
          <div className="div13"> </div>
          <div className="div14"> </div>
          <div className="div15"> </div>
        </div> */}
      </div>
    </div>
  )
}
