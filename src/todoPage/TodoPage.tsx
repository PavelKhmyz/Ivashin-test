import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks/hook';
import { SearchPannel } from './searchPannel/SearchPannel';
import { TodoList } from './TodoList/TodoList';
import { parseData, parseTags } from './TodoPage.slice';
import './TodoPage.style.scss';

export const TodoPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const todoArr = sessionStorage.getItem('TodoArray');
    const tagsArr = sessionStorage.getItem('TagsArray');
    if (todoArr) {
      dispatch(parseData(todoArr));
    }
    if (tagsArr) {
      dispatch(parseTags(tagsArr));
    }
  }, [dispatch]);

  return (
    <div className='todoPage'>
      <SearchPannel />
      <TodoList />
    </div>
  );
};
