import { TodoElementData } from './TodoPage.state';

type UpdateSessionStorageType = (arg0: string, arg1: TodoElementData[] | string[]) => void;

export const updateSessionStorage: UpdateSessionStorageType = (storageKey, storageValue) => {
  sessionStorage.removeItem(storageKey);
  sessionStorage.setItem(storageKey, JSON.stringify(storageValue));
};
