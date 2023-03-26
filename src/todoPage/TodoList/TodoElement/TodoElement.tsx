/* eslint-disable react/no-danger */
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { CloseIcon } from '../../common/TagsButtonsBlock/CloseIcon';
import { removeTodoElement } from '../../TodoPage.slice';
import { TodoElementData } from '../../TodoPage.state';
import { MoreDetails } from './MoreDetails/MoreDetails';
import './TodoElement.style.scss';
import { editContent } from './TodoElement.utils';

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
          <CloseIcon />
        </button>
        <h3>{content.title}</h3>
        <p>{editContent(content.content)}</p>
      </div>
      {moreDetails && <MoreDetails content={content} onClose={setMoreDetails} />}
    </>
  );
};
