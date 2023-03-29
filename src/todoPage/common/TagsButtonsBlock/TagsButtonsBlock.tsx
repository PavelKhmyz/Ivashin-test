import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hook';
import { changeSearchValue, removeTag } from '../../TodoPage.slice';
import { CloseIcon } from './CloseIcon';
import './TagsButtonBlock.style.scss';

interface TagsButtonsBlockProps {
  tag: string[] | RegExpMatchArray | null;
  hardRemove?: boolean;
  onRemove?: null | ((arg0: string[] | RegExpMatchArray | null) => void);
}

export const TagsButtonsBlock = ({
  tag,
  hardRemove = false,
  onRemove = null,
}: TagsButtonsBlockProps) => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.todo);

  const handleSearch = (value: string) => {
    dispatch(changeSearchValue(`${searchValue} ${value}`));
  };
  const handleHardRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, e: string) => {
    event.stopPropagation();
    dispatch(removeTag(e));
  };

  const handleRemoveTag = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    event.stopPropagation();
    if (onRemove && tag) {
      const removed = tag.filter((el) => el !== value);
      onRemove(removed);
    }
  };
  return (
    <div className='tagsButtonWrapper'>
      {tag &&
        tag.map((el) => (
          <div key={el + Math.random()} onClick={() => handleSearch(el)}>
            <span>{el}</span>
            {hardRemove && (
              <button type='button' onClick={(event) => handleHardRemove(event, el)}>
                <CloseIcon />
              </button>
            )}
            {onRemove && (
              <button type='button' onClick={(event) => handleRemoveTag(event, el)}>
                <CloseIcon />
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
