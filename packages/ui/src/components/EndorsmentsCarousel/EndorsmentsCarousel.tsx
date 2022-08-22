import { useEffect, useState } from "react";
import { Endorsements } from "../Endorsements/Endorsements";
import left from "./assets/left.png";
import right from "./assets/right.png";
import "./style.css" 

export interface IEndorsementsCarousel {
  title?: string;
  endorsement?: string;
}

export const EndorsementsCarousel = ({ title, endorsement }: IEndorsementsCarousel) => {
  return (
    <div className="relative w-max">
      {/* left arrow */}
      <button type="button" className=" btn-fade-l absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <img src={left} alt="" />
      </button>
      <div className="carousel-box overscroll-contain flex overflow-auto ">
        <Endorsements title={title} endorsement={endorsement} />
        <Endorsements title={title} endorsement={endorsement} />
        <Endorsements title={title} endorsement={endorsement} />
        <Endorsements title={title} endorsement={endorsement} />
        <Endorsements title={title} endorsement={endorsement} />
        <Endorsements title={title} endorsement={endorsement} />
        <Endorsements title={title} endorsement={endorsement} />
      </div>
      {/* right arrow */}
      <button type="button" className="btn-fade-r absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
      <img src={right} alt="" />
      </button>
    </div>
  )
}