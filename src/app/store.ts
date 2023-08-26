import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { historySlice } from '../reducers/HistoryLog';

export const store = configureStore({
  reducer: {
    historyLog: historySlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
