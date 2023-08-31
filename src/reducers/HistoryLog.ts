import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface History {
  historyLog: ImpressionLog[]
}

export interface ImpressionLog {
  id: string
  type: string
  status: string
  time: string
}

const initialState: History = {
  historyLog: []
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addLike: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        type: 'Likes',
        status: 'added',
        time: new Date().toISOString()
      })      
    },
    addFav: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        type: 'Favourites',
        status: 'added',
        time: new Date().toISOString()
      })
    },

    addDislike: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        type: 'Dislikes',
        status: 'added',
        time: new Date().toISOString()
      })
    },

    removeFav: (state: History, action: PayloadAction<string>) => {
      state.historyLog.push({
        id: action.payload,
        type: 'Favourites',
        status: 'removed',
        time: new Date().toISOString()
      })
    }
  }
})

export const { addLike, addFav, addDislike, removeFav } = historySlice.actions

export default historySlice.reducer
