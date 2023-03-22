import { useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks/hook';
import { Input } from '../../../common/Input';
import { saveChanges } from '../../../TodoPage.slice';
import { TodoElementData } from '../../../TodoPage.state';

interface EditMenuProps {
  data: TodoElementData;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditMenu = ({ data, close }: EditMenuProps) => {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const dispatch = useAppDispatch();

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleSaveChanges = () => {
    dispatch(saveChanges({ id: data.id, content, title }));
    close(false);
  };

  return (
    <>
      <Input
        data={{
          text: 'Title: ',
          type: 'text',
          placeholder: 'Enter Title...',
          id: 'changeTitle',
        }}
        onChangeFunc={handleChangeTitle}
        value={title}
      />
      <textarea onChange={handleChangeContent} value={content} />
      <button type='button' onClick={handleSaveChanges}>
        Save
      </button>
      <button type='button' onClick={() => close(false)}>
        reject
      </button>
    </>
  );
};
