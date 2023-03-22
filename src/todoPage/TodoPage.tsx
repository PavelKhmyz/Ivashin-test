import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks/hook';
import { SearchPannel } from './searchPannel/SearchPannel';
import { TodoList } from './TodoList/TodoList';
import { parseData } from './TodoPage.slice';
import './TodoPage.style.scss';

export const TodoPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const data = sessionStorage.getItem('TodoArray');
    if (data) {
      dispatch(parseData(data));
    }
  }, [dispatch]);
  return (
    <div className='todoPage'>
      <SearchPannel />
      <TodoList />
    </div>
  );
};
