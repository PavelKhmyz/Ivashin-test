import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook';
import { Input } from '../common/Input';
import { TagsButton } from '../common/TagsButton';
import { filterList } from '../TodoPage.slice';
import './SearchPannel.style.scss';

export const SearchPannel = () => {
  const [searchValue, setValue] = useState('');
  const { tagsArr } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const clickSearch = () => {
    const valuesArr = searchValue.split(' ');
    valuesArr.forEach((e) => dispatch(filterList(e)));
  };
  return (
    <div className='searchPannel'>
      <Input
        data={{
          text: 'Enter tags: ',
          type: 'text',
          placeholder: 'Enter Tags...',
          id: 'search',
        }}
        onChangeFunc={(e) => handleSearch(e)}
        value={searchValue}
      />
      <button type='button' onClick={clickSearch}>
        Search
      </button>
      <div>
        {tagsArr.map((el) => (
          <TagsButton tag={el} />
        ))}
      </div>
    </div>
  );
};
