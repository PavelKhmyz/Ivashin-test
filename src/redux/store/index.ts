import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from '../../todoPage/TodoPage.slice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
