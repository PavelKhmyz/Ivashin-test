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
      console.log(state.todoArr);
    },
    parseData: (state, action) => {
      state.todoArr = JSON.parse(action.payload);
    },
    addTags: (state, action) => {
      state.tagsArr = [...state.tagsArr, ...action.payload];
      sessionStorage.removeItem('TagsArray');
      sessionStorage.setItem('TagsArray', JSON.stringify(state.tagsArr));
    },
    removeTag: (state, action) => {
      state.tagsArr = state.tagsArr.filter((el) => el !== action.payload);
      sessionStorage.removeItem('TagsArray');
      sessionStorage.setItem('TagsArray', JSON.stringify(state.tagsArr));
    },
    parseTags: (state, action) => {
      state.tagsArr = JSON.parse(action.payload);
    },
    filterList: (state, action) => {
      // const bla = (tags: string[]) => {
      //   const result = [];
      //   tags.forEach((e) => {
      //     if (e === action.payload) {
      //       result.push(1);
      //     }
      //   });
      //   if (result.length > 0) {
      //     return true;
      //   }
      //   return false;
      // };
      // const filtered = state.todoArr.filter(({ tags }) => bla(tags));
      // state.filteredList = [...state.filteredList, ...filtered];
      state.filteredList = state.todoArr.filter(({ tags }) =>
        tags.forEach((e) => e === action.payload)
      );
    },
  },
});

export const {
  removeTodoElement,
  saveChanges,
  addTodo,
  parseData,
  addTags,
  removeTag,
  parseTags,
  filterList,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
