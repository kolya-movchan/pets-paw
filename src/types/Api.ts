export interface Cat {
  id: string,
  url: string,
  width: number,
  height: number
};

interface Image {
  id: string,
  url: string,
}

export interface FavCat {
  created_at: string,
  id: number,
  image: Image,
  mage_id: string,
  sub_id: string,
  user_id: string,
};
