import { useEffect, useState } from "react";
import { Endorsements } from "../Endorsements/Endorsements";

export interface IEndorsementsCarousel {
    Ctitle?: string;
    person?: string;
}

export const EndorsementsCarousel = ({ Ctitle, person }: IEndorsementsCarousel) => {
    return (
        <div>
            <Endorsements />
        </div>
    )
}