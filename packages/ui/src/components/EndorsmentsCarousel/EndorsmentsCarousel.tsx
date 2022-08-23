import { useEffect, useState } from "react";
import { Endorsements } from "../Endorsements/Endorsements";
import "./style.css"

export interface IEndorsementsCarousel {
  endorsementList?: any;
}


export const EndorsementsCarousel = ({ endorsementList }: IEndorsementsCarousel) => {
  return (
    <div className="relative w-max">
      {/* left arrow */}
      <button type="button" className=" btn-fade-l absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          <span className="sr-only">Previous</span>
        </span>
        <img alt="" />
      </button>
      <div className="carousel-box overscroll-contain flex overflow-auto ">
        {endorsementList &&
          endorsementList.map((end: any, index: number) => (
            <Endorsements
              key={index}
              endorsement={end.name}
            />
          ))}
      </div>
      {/* right arrow */}
      <button type="button" className="btn-fade-r absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg aria-hidden="true" className="w-5 h-5 text-black sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          <span className="sr-only">Next</span>
        </span>
        <img src="" alt="" />
      </button>
    </div>
  )
}