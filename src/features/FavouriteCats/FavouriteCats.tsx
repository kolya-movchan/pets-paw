import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { CatImage } from "../../components/CatImage/CatImage";
import { FavCat } from "../../types/Api";
import { removeFromFavById } from "../../utils/impression-controller";
import { v4 as uuidv } from 'uuid'


type Props = {
  favCat: FavCat
}

export const FavouriteCats: React.FC<Props> = React.memo(
  ({ favCat }) => {
    const dispatch = useAppDispatch()
    const [isRemoved, setIsRemoved] = useState(false);

    return (
      <a
        style={{ display: `${isRemoved ? 'none' : 'block'}`}}
        key={uuidv()}
        className={`cat`}
        onClick={() => {
          setIsRemoved(true);
          removeFromFavById(favCat.id, dispatch)
        }}
      >
        <CatImage
          src={favCat.image.url}
          placeholderSrc={'./home-page/plc.png'}
        />
        <div className="overlay">
          <button className="overlay-bg overlay-bg--fav"></button>
        </div>
      </a>
    )
  }
)