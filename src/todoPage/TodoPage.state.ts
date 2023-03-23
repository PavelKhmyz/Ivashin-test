export interface TodoElementData {
  title: string;
  content: string;
  tags: string[];
  id: string;
}
interface TodoStateType {
  todoArr: TodoElementData[];
  tagsArr: string[];
  filteredList: TodoElementData[];
  searchValue: string;
}

export const todoState: TodoStateType = {
  todoArr: [],
  tagsArr: [],
  filteredList: [],
  searchValue: '',
};
