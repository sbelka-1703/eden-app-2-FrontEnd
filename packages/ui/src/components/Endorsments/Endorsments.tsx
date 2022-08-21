import { UserWithDescription } from "../UserWithDescription";
import UserWithDescriptionStories from "../UserWithDescription/UserWithDescription.stories";
import "./styles.css"

export interface IEndorsments {
    title?: string;
    endorsment?: string;
}

export const Endorsments = ({ title, endorsment }: IEndorsments) => {
    return (
        <div className="endorsment-box ">
            <div className="text-center p-3 ">
                <UserWithDescription avatarSrc="h"/>
                <p className="end-p">{title}</p>
                <h1>{endorsment}</h1>
                 <div className=" mt-2 buttons flex justify-around">
                    <button className="border text-white">Remove</button>
                    <button className="bg-white border">Claim</button>
                 </div>
            </div>
        </div>
    )
}