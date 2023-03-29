import { createSlice } from '@reduxjs/toolkit';
import { todoState } from './TodoPage.state';
import { updateSessionStorage } from './TodoPage.utils';

const todoSlice = createSlice({
  name: 'Todo',
  initialState: todoState,
  reducers: {
    addTodo: (state, action) => {
      const isChanging = state.todoArr.findIndex((el) => el.id === action.payload.id);

      if (isChanging >= 0) {
        state.todoArr[isChanging] = action.payload;
        state.filteredList = state.todoArr;
      } else {
        state.todoArr = [...state.todoArr, action.payload];
        state.filteredList = state.todoArr;
      }
      updateSessionStorage('TodoArray', state.todoArr);
    },
    saveChanges: (state, action) => {
      const { id, content, title } = action.payload;
      state.todoArr = state.todoArr.map((el) => (el.id === id ? { ...el, content, title } : el));
      state.filteredList = state.todoArr;
      updateSessionStorage('TodoArray', state.todoArr);
    },
    removeTodoElement: (state, action) => {
      const removed = state.todoArr.filter((el) => el.id !== action.payload);
      state.todoArr = removed;
      state.filteredList = state.todoArr;
      updateSessionStorage('TodoArray', state.todoArr);
    },

    getDataFromSessionStorage: (state) => {
      const todo = sessionStorage.getItem('TodoArray');
      const tags = sessionStorage.getItem('TagsArray');
      state.todoArr = todo ? JSON.parse(todo) : [];
      state.tagsArr = tags ? JSON.parse(tags) : [];
    },
    addTags: (state, action) => {
      const concat = [...state.tagsArr, ...action.payload];
      state.tagsArr = concat.filter((el, ind) => ind === concat.indexOf(el));
      updateSessionStorage('TagsArray', state.tagsArr);
    },
    removeTag: (state, action) => {
      state.tagsArr = state.tagsArr.filter((el) => el !== action.payload);
      updateSessionStorage('TagsArray', state.tagsArr);
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
  addTags,
  removeTag,
  getDataFromSessionStorage,
  filterList,
  changeSearchValue,
} = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
