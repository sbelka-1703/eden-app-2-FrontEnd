import { useEffect, useState } from "react";
import { Endorsments } from "../Endorsments/Endorsments";

export interface IEndorsmentsCarousel {
    Ctitle?: string;
    person?: string;
}

export const EndorsmentsCarousel = ({ Ctitle, person }: IEndorsmentsCarousel) => {
    return (
        <div>
            <Endorsments />
        </div>
    )
}