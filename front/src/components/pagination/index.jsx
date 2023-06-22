import { useState } from "react";
import usePagination from "./hook";
const Pagination = ({ pages, cur, back, next, setCur, lastPage }) => {
  return (
    <div className="flex bg-white rounded-lg font-[Poppins]">
      <button
        onClick={() => back()}
        className="h-12 px-4 rounded-l-lg "
        disabled={cur === 1}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
      {lastPage > 4
        ? pages.map((pg, i) => (
            <button
              key={i}
              onClick={() => {
                setCur(pg.page, lastPage);
              }}
              className={`h-12 w-12 ${
                cur === pg.page && "bg-blue-400 text-white"
              }`}
            >
              {pg.page}
            </button>
          ))
        : [...Array(lastPage).keys()].map((pg, i) => (
            <button
              key={i}
              onClick={() => setCur(pg + 1)}
              className={`h-12 w-12 ${
                cur === pg + 1 && "bg-blue-400 text-white"
              }`}
            >
              {pg + 1}
            </button>
          ))}
      <button
        onClick={() => next(lastPage)}
        disabled={cur === lastPage}
        className="h-12 px-4 rounded-r-lg"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
