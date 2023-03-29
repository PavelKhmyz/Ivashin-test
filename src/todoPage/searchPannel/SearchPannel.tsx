import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook';
import { Input } from '../common/Input';
import { TagsButtonsBlock } from '../common/TagsButtonsBlock/TagsButtonsBlock';
import { changeSearchValue, filterList } from '../TodoPage.slice';
import './SearchPannel.style.scss';

export const SearchPannel = () => {
  const { searchValue, tagsArr } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValue(e.target.value));
  };

  useEffect(() => {
    dispatch(filterList(searchValue));
  }, [dispatch, searchValue]);

  return (
    <div className='searchPannel'>
      <h1>NybleCraft test-task</h1>
      <Input
        data={{
          text: '',
          type: 'text',
          placeholder: 'Enter Tags...',
          id: 'search',
        }}
        onChangeFunc={handleSearch}
        value={searchValue}
      />
      <TagsButtonsBlock hardRemove tag={tagsArr} />
    </div>
  );
};
