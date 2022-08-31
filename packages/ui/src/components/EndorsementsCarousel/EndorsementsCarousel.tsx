import { useEffect, useState } from "react";
import { Endorsements, IEndorsements } from "../Endorsements/Endorsements";
import { UserWithDescription } from "../UserWithDescription";

import "./style.css";

export interface IEndorsementsCarousel {
  _id?: string;
  endorsementList?: any;
  onClaim?: any;
  onRemove?: any;
}




export const EndorsementsCarousel = ({
  endorsementList, onClaim, onRemove
}: IEndorsementsCarousel) => {
  
  return (
    <div className="relative w-max">
      {/* left arrow */}
      <button
        type="button"
        className=" btn-fade-l group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-black dark:text-gray-800 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
        <img alt="" />
      </button>
      <div className="carousel-box flex overflow-auto overscroll-contain ">
        {endorsementList && 
          endorsementList.map((end: any, index: number) => (
            <Endorsements remove={() => onRemove(end)} claim={() => onClaim(end)} key={index} endorsement={end.name} />
          ))}
      </div>
      {/* right arrow */}
      <button
        type="button"
        className="btn-fade-r group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-black dark:text-gray-800 sm:h-6 sm:w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
          <span className="sr-only">Next</span>
        </span>
        <img src="" alt="" />
      </button>
    </div>
  );
};
