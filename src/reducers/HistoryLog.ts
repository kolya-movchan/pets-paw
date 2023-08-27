import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface History {
  historyLog: ImpressionLog[]
}

interface ImpressionLog {
  id: string
  type: string,
  status: string,
  time: string
}

const initialState: History = {
  historyLog: [],
}



const getCurrentTime = () => {
  return new Date().toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addLike: (state: History, action: PayloadAction<string>) => {
      state.historyLog.unshift({
        id: action.payload,
        type: 'Likes',
        status: 'added',
        time: getCurrentTime(),
      })
    },
    addFav: (state: History, action: PayloadAction<string>) => {
      state.historyLog.unshift({
        id: action.payload,
        type: 'Favourites',
        status: 'added',
        time: getCurrentTime(),
      })
    },

    addDislike: (state: History, action: PayloadAction<string>) => {
      state.historyLog.unshift({
        id: action.payload,
        type: 'Dislikes',
        status: 'added',
        time: getCurrentTime(),
      })
    },

    removeFav: (state: History, action: PayloadAction<string>) => {
      state.historyLog.unshift({
        id: action.payload,
        type: 'Favourites',
        status: 'removed',
        time: getCurrentTime(),
      })
    }
    // removeLike: (state: History, action: PayloadAction<string>) => {
    //   switch (action.payload) {
    //     case 'removelike':
    //       state.historyLog.unshift(
    //         `Image ID: ${action.payload} was removed from Likes`
    //       )
    //       break

    //     case 'removefav':
    //       state.historyLog.unshift(
    //         `Image ID: ${action.payload} was removed from Favorites`
    //       )

    //       break

    //     case 'removelike':
    //       state.historyLog.unshift(
    //         `Image ID: ${action.payload} was removed from Dislikes`
    //       )

    //       break

    //     default:
    //       return state
    //   }
    // }
  }
})

export const { addLike, addFav, addDislike, removeFav } = historySlice.actions

export default historySlice.reducer
