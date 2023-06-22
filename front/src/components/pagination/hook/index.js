import { useState } from "react";

const usePagination = () => {
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
    // { page: num + 4 },
  ];
  function next(lastPage) {
    if (lastPage !== cur && lastPage !== cur + 1) {
      setNum(++num);
    }
    setCur((prevState) => prevState + 1);
  }
  function back() {
    num > 1 && setNum(--num);
    cur > 1 && setCur((prevState) => prevState - 1);
  }
  function currentPage(page, lastPage) {
    if (lastPage > page) {
      setNum(page);
    }
    setCur(page);
  }
  return [pages, cur, currentPage, next, back];
};

export default usePagination;
