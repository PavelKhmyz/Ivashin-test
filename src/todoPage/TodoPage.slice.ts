import { createSlice } from '@reduxjs/toolkit';
import { todoState } from './TodoPage.state';

const todoSlice = createSlice({
  name: 'Todo',
  initialState: todoState,
  reducers: {
    removeTodoElement: (state, action) => {
      const removed = state.todoArr.filter((el) => el.id !== action.payload);
      state.todoArr = removed;
      sessionStorage.removeItem('TodoArray');
      sessionStorage.setItem('TodoArray', JSON.stringify(state.todoArr));
    },
    saveChanges: (state, action) => {
      const { id, content, title } = action.payload;
      state.todoArr = state.todoArr.map((el) => (el.id === id ? { ...el, content, title } : el));
      sessionStorage.removeItem('TodoArray');
      sessionStorage.setItem('TodoArray', JSON.stringify(state.todoArr));
    },
    addTodo: (state, action) => {
      state.todoArr = [...state.todoArr, action.payload];
      sessionStorage.removeItem('TodoArray');
      sessionStorage.setItem('TodoArray', JSON.stringify(state.todoArr));
    },
    parseData: (state, action) => {
      state.todoArr = JSON.parse(action.payload);
    },
  },
});

export const { removeTodoElement, saveChanges, addTodo, parseData } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
