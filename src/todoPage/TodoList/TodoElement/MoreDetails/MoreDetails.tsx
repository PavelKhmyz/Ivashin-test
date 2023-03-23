import { useState } from 'react';
import { TagsButtonsBlock } from '../../../common/TagsButtonsBlock/TagsButtonsBlock';
import { TodoElementData } from '../../../TodoPage.state';
import { AddingModule } from '../../AddingModule/AddingModule';
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
        {!edit ? (
          <>
            <div className='detailsContent'>
              <h3>{content.title}</h3>
              <p>{content.content}</p>
              <TagsButtonsBlock tag={content.tags} />
            </div>
            <p>
              Please click{' '}
              <button className='editButton' type='button' onClick={handleEdit}>
                here
              </button>{' '}
              to edit or double-click on any place
            </p>
          </>
        ) : (
          <AddingModule onShow={setEdit} initialValue={content} />
        )}
      </div>
    </div>
  );
};
