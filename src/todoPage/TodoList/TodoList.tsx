import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks/hook';
import { AddingModule } from './AddingModule/AddingModule';
import { TodoElement } from './TodoElement/TodoElement';
import './TodoList.style.scss';

export const TodoList = () => {
  const { todoArr } = useAppSelector((state) => state.todo);
  const [showAddingForm, setShowAddingForm] = useState(false);
  const addTodo = () => {
    setShowAddingForm((prev) => !prev);
  };
  return (
    <div className='todoList'>
      {todoArr.map((el) => (
        <TodoElement key={el.id} content={el} />
      ))}
      <button className='todoListAddButton' type='button' onClick={addTodo}>
        <div>+</div>
      </button>
      {showAddingForm && <AddingModule onShow={setShowAddingForm} />}
    </div>
  );
};
