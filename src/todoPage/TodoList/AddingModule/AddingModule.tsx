import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { Input } from '../../common/Input';
import { addTags, addTodo } from '../../TodoPage.slice';
import './AddingModule.style.scss';
import { TagsButtonsBlock } from '../../common/TagsButtonsBlock/TagsButtonsBlock';
import { CloseIcon } from '../../common/TagsButtonsBlock/CloseIcon';
import { TodoElementData } from '../../TodoPage.state';
import { Test } from './Test';

interface AddingModuleProps {
  initialValue?: TodoElementData;
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddingModule = ({
  onShow,
  initialValue = { title: '', content: '', tags: [], id: '' },
}: AddingModuleProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitleInput] = useState(initialValue.title);
  const [content, setContent] = useState(initialValue.content);
  const [tags, setTags] = useState<RegExpMatchArray | null | string[]>(initialValue.tags);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
  };
  const findTags = () => {
    const regex = /(?<= )#\w+/g;
    const match = content.match(regex);
    if (match) {
      const uniqFilter = match.filter((el, ind) => ind === match.indexOf(el));
      setTags(uniqFilter);
    }
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
      content,
      tags,
      id: title + Math.random(),
    };
    if (initialValue.id) {
      todoData.id = initialValue.id;
    }

    dispatch(addTodo(todoData));
    dispatch(addTags(tags));
    onShow((prev) => !prev);
  };

  const replaceTags = (text: string) => {
    const regex = /(?<= )#\w+/g;
    const match = text.match(regex);
    const strArr = text.split(regex);

    const bla: string[] = [];

    strArr.forEach((e, i) => {
      bla.push(e);
      if (match && match[i] !== undefined) bla.push(`<h1>${match[i]}</h1>`);
    });
    console.log(bla.join(''));

    return bla.join('');
  };

  const [test, setTest] = useState<string | null>('');

  const changeTest = (e: React.FormEvent<HTMLDivElement>) => {
    setTest(e.currentTarget.textContent);
  };
  useEffect(() => {
    const kek = document.querySelector('.bla');
    if (kek && test) {
      kek.innerHTML = replaceTags(test);
    }
  }, [test]);
  return (
    <div
      className='addingModuleWrapper'
      onClick={(e) => e.currentTarget === e.target && handleClose()}
    >
      <div
        className='bla'
        contentEditable
        style={{ width: '100px', height: '100px', backgroundColor: 'white' }}
        onInput={(e) => changeTest(e)}
      >
        <Test text={test} />
      </div>
      <div className='addingForm'>
        <div className='innerData'>
          <Input
            data={{
              text: '',
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
            onInput={findTags}
          />
          <TagsButtonsBlock tag={tags} onRemove={setTags} />
        </div>
        <button className='saveButton' type='button' onClick={handleSave}>
          Confirm
        </button>
        <button className='closeButton' type='button' onClick={handleClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
