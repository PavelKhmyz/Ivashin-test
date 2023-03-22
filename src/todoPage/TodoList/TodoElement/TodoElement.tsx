import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { removeTodoElement } from '../../TodoPage.slice';
import { TodoElementData } from '../../TodoPage.state';
import { MoreDetails } from './MoreDetails/MoreDetails';
import './TodoElement.style.scss';

interface TodoElementProps {
  content: TodoElementData;
}

export const TodoElement = ({ content }: TodoElementProps) => {
  const dispatch = useAppDispatch();
  const [moreDetails, setMoreDetails] = useState(false);

  const handleOpenMoreDetails = () => {
    setMoreDetails((prev) => !prev);
  };
  const handleRemove = () => {
    dispatch(removeTodoElement(content.id));
  };

  return (
    <>
      <div onClick={handleOpenMoreDetails} className='todoElement'>
        <button type='button' onClick={handleRemove}>
          remove
        </button>
        {content.title}
        {content.content}
      </div>
      {moreDetails && <MoreDetails content={content} onClose={setMoreDetails} />}
    </>
  );
};
