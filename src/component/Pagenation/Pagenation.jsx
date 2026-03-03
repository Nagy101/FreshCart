/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

export default function Pagenation({
  totalPosts,
  postsPerPages,
  setCurrentPage,
  currentPage,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPages); i++) {
    pages.push(i);
  }
  // const [loding, setLoding] = useState(true);
  return (
    <div className="flex justify-center items-center gap-1 mt-8 mb-4">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 border border-main rounded-md text-main disabled:opacity-30 disabled:cursor-not-allowed hover:bg-main hover:text-white transition"
      >
        ‹
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 mx-1 border rounded-md transition ${
            page === currentPage
              ? "bg-main text-white border-main shadow"
              : "bg-white text-main border-main hover:bg-main hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, pages.length))}
        disabled={currentPage === pages.length}
        className="px-3 py-1 mx-1 border border-main rounded-md text-main disabled:opacity-30 disabled:cursor-not-allowed hover:bg-main hover:text-white transition"
      >
        ›
      </button>
    </div>
  );
}
