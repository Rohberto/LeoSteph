import { useState, useCallback } from "react";

export const useDebouncedSearch = (delay = 300) => {
  const [query, setQuery] = useState("");

  const debounce = useCallback(
    (fn) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    },
    [delay]
  );

  const handleSearch = debounce((value) => setQuery(value));

  return { query, handleSearch };
};
