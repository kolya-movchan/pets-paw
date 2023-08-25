import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Test {
  darkMode: boolean
}

const initialState: Test = {
  darkMode: true,
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    switchMode: (state: Test, action: PayloadAction<boolean>) => {
      // logic
    },
  },
})

export const { switchMode } = testSlice.actions

export default testSlice.reducer
