import { useAppDispatch } from '../../redux/hooks/hook';
import { removeTag } from '../TodoPage.slice';

interface TagsButtonprops {
  tag: string;
  allTags?: RegExpMatchArray | string[] | null;
  onRemove?: React.Dispatch<React.SetStateAction<RegExpMatchArray | string[] | null>> | null;
}

export const TagsButton = ({ tag, allTags = null, onRemove = null }: TagsButtonprops) => {
  const dispatch = useAppDispatch();
  const handleRemoveTag = () => {
    if (allTags && onRemove) {
      const removed = allTags.filter((el) => el !== tag);
      dispatch(removeTag(tag));
      onRemove(removed);
    } else {
      dispatch(removeTag(tag));
    }
  };
  return (
    <div>
      {tag}
      <button type='button' onClick={handleRemoveTag}>
        remove
      </button>
    </div>
  );
};
