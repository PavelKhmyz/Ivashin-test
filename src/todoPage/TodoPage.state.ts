export interface TodoElementData {
  title: string;
  date: string;
  content: string;
  id: string;
}
interface TodoStateType {
  todoArr: TodoElementData[];
}

export const todoState: TodoStateType = {
  todoArr: [],
};
