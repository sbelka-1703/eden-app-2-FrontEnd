import { useEffect } from "react";
import { Avatar } from "../../elements";
import { UserWithDescription } from "../UserWithDescription";
import "./styles.css";

export interface ICollectionOfUsers {
  Ctitle?: string;
  person?: string;
  // fade?: boolean;
}

const Users = [
  {
    person: "soon 10xDev",
    username: "@geniusyinka",
  },
  {
    person: "MENTORSHIP CHAMPION",
    username: "@blue",
  },
  {
    person: "Budget Steward",
    username: "@tom",
  },

  {
    person: "Eden team",
    username: "@wyse",
  },
  {
    person: "Loki",
    username: "@loki",
  },

  {
    person: "Tony Stark",
    username: "@iron-man",
  },
];

export const CollectionOfUsers = ({ Ctitle, person }: ICollectionOfUsers) => {
  return (
    <div className=" relative">
      <div className={`users-main m-auto w-72 justify-center`}>
        <h1 className="mb-5 text-center ">{Ctitle}</h1>
        <div className={`r-users flex flex-wrap`}>
          {Users.map((user, index) => (
            <UserWithDescription
              title={user.person}
              avatarSrc="url"
              name={user.username}
            />
          ))}
          <div className="fade"></div>
        </div>
      </div>
    </div>
  );
};
