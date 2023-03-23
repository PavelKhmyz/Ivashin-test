import { createSlice } from '@reduxjs/toolkit';
import { todoState } from './TodoPage.state';

const todoSlice = createSlice({
  name: 'Todo',
  initialState: todoState,
  reducers: {
    removeTodoElement: (state, action) => {
      const removed = state.todoArr.filter((el) => el.id !== action.payload);
      state.todoArr = removed;
      state.filteredList = state.todoArr;
      sessionStorage.removeItem('TodoArray');
      sessionStorage.setItem('TodoArray', JSON.stringify(state.todoArr));
    },
    saveChanges: (state, action) => {
      const { id, content, title } = action.payload;
      state.todoArr = state.todoArr.map((el) => (el.id === id ? { ...el, content, title } : el));
      state.filteredList = state.todoArr;
      sessionStorage.removeItem('TodoArray');
      sessionStorage.setItem('TodoArray', JSON.stringify(state.todoArr));
    },
    addTodo: (state, action) => {
      const isNew = state.todoArr.findIndex((el) => el.id === action.payload.id);

      if (isNew >= 0) {
        state.todoArr[isNew] = action.payload;
        state.filteredList = state.todoArr;
      } else {
        state.todoArr = [...state.todoArr, action.payload];
        state.filteredList = state.todoArr;
      }

      sessionStorage.removeItem('TodoArray');
      sessionStorage.setItem('TodoArray', JSON.stringify(state.todoArr));
    },
    parseData: (state, action) => {
      state.todoArr = JSON.parse(action.payload);
    },
    addTags: (state, action) => {
      const concat = [...state.tagsArr, ...action.payload];
      state.tagsArr = concat.filter((el, ind) => ind === concat.indexOf(el));
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
      if (!action.payload) {
        state.filteredList = state.todoArr;
      } else {
        const valuesArr = action.payload.split(' ');
        state.filteredList = state.todoArr.filter(({ tags }) =>
          tags.some((i) => valuesArr.includes(i))
        );
      }
    },
    changeSearchValue: (state, action) => {
      state.searchValue = action.payload;
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
  changeSearchValue,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
