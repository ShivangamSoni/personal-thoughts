import { StateUpdater, useEffect, useState } from "preact/hooks";

export function useLocalState<T>(
  key: string,
  initial?: T | (() => T)
): [T, StateUpdater<T>] {
  const [data, setData] = useState<T>(() => {
    const savedData = localStorage.getItem(key);

    if (savedData != undefined) {
      return JSON.parse(savedData);
    }

    if (initial instanceof Function) {
      return initial();
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
}
