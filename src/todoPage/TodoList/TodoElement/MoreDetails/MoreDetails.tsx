import { useState } from 'react';
import { TodoElementData } from '../../../TodoPage.state';
import { EditMenu } from './EditMenu';
import './MoreDetails.style.scss';

interface MoreDetailsProps {
  content: TodoElementData;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoreDetails = ({ content, onClose }: MoreDetailsProps) => {
  const [edit, setEdit] = useState(false);
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      onClose((prev) => !prev);
    }
  };
  const handleEdit = () => {
    setEdit(true);
  };
  return (
    <div className='moreDetailsWrapper' onClick={(e) => handleClose(e)}>
      <div className='moreDetailsTodo' onDoubleClick={handleEdit}>
        <p>
          Please click{' '}
          <button type='button' onClick={handleEdit}>
            here
          </button>{' '}
          to edit or double-click on any place
        </p>
        {!edit ? content.content : <EditMenu close={setEdit} data={content} />}
      </div>
    </div>
  );
};
