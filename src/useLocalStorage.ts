import { useState, useEffect } from 'react';

export const enum StorageKey {
  LOGIN = 'login',
  REPO = 'repo',
  BLACKLIST = 'blacklist',
};

export function getItemFromStorage(key: string): unknown | null {
  const item = localStorage.getItem(key);
  if (item !== null) {
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error while parsing item from storage: ${(e as Error).message}`);
    }
  }
  return null;
}

export function setItemToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error while saving item to storage: ${(e as Error).message}`);
  }
}

function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    return getItemFromStorage(key) ?? initialValue;
  });

  useEffect(() => {
    setItemToStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
