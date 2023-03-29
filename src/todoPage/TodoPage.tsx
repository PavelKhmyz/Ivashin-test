import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks/hook';
import { SearchPannel } from './searchPannel/SearchPannel';
import { TodoList } from './TodoList/TodoList';
import { getDataFromSessionStorage } from './TodoPage.slice';
import './TodoPage.style.scss';

export const TodoPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDataFromSessionStorage());
  }, [dispatch]);

  return (
    <div className='todoPage'>
      <SearchPannel />
      <TodoList />
    </div>
  );
};
