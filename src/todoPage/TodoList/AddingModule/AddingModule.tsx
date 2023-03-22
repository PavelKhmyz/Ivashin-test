import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { Input } from '../../common/Input';
import { addTags, addTodo } from '../../TodoPage.slice';
import './AddingModule.style.scss';
import { TagsButton } from '../../common/TagsButton';

interface AddingModuleProps {
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddingModule = ({ onShow }: AddingModuleProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitleInput] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<RegExpMatchArray | null | string[]>(null);

  const whitespace = content.match(/\s/g);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };
  const handleChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleClose = () => {
    onShow((prev) => !prev);
  };
  const findTags = () => {
    const regex = /(?<= )#\w+/g;
    const match = content.match(regex);
    setTags(match);
  };

  const handleSave = () => {
    const todoData = {
      title,
      content,
      tags,
      id: title + Math.random(),
    };
    dispatch(addTodo(todoData));
    dispatch(addTags(tags));
    onShow((prev) => !prev);
  };

  useEffect(() => {
    findTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whitespace?.length]);

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
        <textarea
          className='todoContent'
          onChange={(event) => handleChangeContent(event)}
          value={content}
        />
        <div className='tagsWrapper'>
          {tags?.map((el) => (
            <TagsButton key={el + Math.random()} tag={el} onRemove={setTags} allTags={tags} />
          ))}
        </div>
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
