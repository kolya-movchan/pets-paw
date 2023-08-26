import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface History {
  historyLog: ImpressionLog[],
}

interface ImpressionLog {
  id: string,
  time: string,
  message: string,
}

const initialState: History = {
  historyLog: [],
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addLike: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        time: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),        message: `Likes`,
      })
    },
    addFav: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        time: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        message: `Favorites`,
      })
    },

    addDislike: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        time: new Date().toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),        message: `Dislikes`,
      })
    },
    // removeLike: (state: History, action: PayloadAction<string>) => {
    //   switch (action.payload) {
    //     case 'removelike':
    //       state.historyLog.push(
    //         `Image ID: ${action.payload} was removed from Likes`
    //       )
    //       break

    //     case 'removefav':
    //       state.historyLog.push(
    //         `Image ID: ${action.payload} was removed from Favorites`
    //       )

    //       break

    //     case 'removelike':
    //       state.historyLog.push(
    //         `Image ID: ${action.payload} was removed from Dislikes`
    //       )

    //       break

    //     default:
    //       return state
    //   }
    // }
  }
})

export const { addLike, addFav, addDislike } = historySlice.actions

export default historySlice.reducer
