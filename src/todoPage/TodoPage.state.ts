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
}

export const todoState: TodoStateType = {
  todoArr: [],
  tagsArr: [],
  filteredList: [],
};
