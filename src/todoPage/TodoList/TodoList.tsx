import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks/hook';
import { AddingModule } from './AddingModule/AddingModule';
import { TodoElement } from './TodoElement/TodoElement';
import './TodoList.style.scss';

export const TodoList = () => {
  const { filteredList } = useAppSelector((state) => state.todo);
  const [showAddingForm, setShowAddingForm] = useState(false);

  const addTodo = () => {
    setShowAddingForm((prev) => !prev);
  };

  return (
    <>
      <h2>Todo List:</h2>
      <div className='todoList'>
        {filteredList.map((el) => (
          <TodoElement key={el.id} content={el} />
        ))}
        <button className='todoListAddButton' type='button' onClick={addTodo}>
          <div>+</div>
        </button>
      </div>
      {showAddingForm && <AddingModule onShow={setShowAddingForm} />}
    </>
  );
};
