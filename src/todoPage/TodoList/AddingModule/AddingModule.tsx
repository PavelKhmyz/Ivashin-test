import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { Input } from '../../common/Input';
import { addTodo } from '../../TodoPage.slice';
import './AddingModule.style.scss';

interface AddingModuleProps {
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddingModule = ({ onShow }: AddingModuleProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitleInput] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleClose = () => {
    onShow((prev) => !prev);
  };

  const handleSave = () => {
    const todoData = {
      title,
      date,
      content,
      id: title + date + Math.random(),
    };
    dispatch(addTodo(todoData));
    onShow((prev) => !prev);
  };

  return (
    <div
      className='addingModuleWrapper'
      onClick={(e) => e.currentTarget === e.target && handleClose()}
    >
      <div className='addingForm'>
        <Input
          data={{
            text: 'Title: ',
            type: 'text',
            placeholder: 'Enter TODO title',
            id: 'title',
          }}
          onChangeFunc={handleChangeTitle}
          value={title}
        />
        <Input
          data={{
            text: 'Date: ',
            type: 'date',
            placeholder: '',
            id: 'date',
          }}
          onChangeFunc={handleChangeDate}
          value={date}
        />
        <textarea
          className='todoContent'
          onChange={(event) => handleChangeContent(event)}
          value={content}
        />
        <button type='button' onClick={handleSave}>
          Confirm
        </button>
        <button type='button' onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};
