import { useEffect } from "react";
import { Avatar } from "../../elements";
import { UserWithDescription } from "../UserWithDescription";
import "./styles.css";

export interface ICollectionOfUsers {
  title?: string;
  users: any;
}

export const CollectionOfUsers = ({ title, users }: ICollectionOfUsers) => {
  return (
    <div className=" relative">
      <div className={`users-main m-auto w-72 justify-center`}>
        <h1 className="mb-5 text-center ">{title}</h1>
        <div className={`r-users flex flex-wrap`}>
          {users &&
            users.map((user: any, index: number) => (
              <UserWithDescription
                key={index}
                title={user.title}
                avatarSrc={user.avatar}
                name={`@${user.name}`}
              />
            ))}
          <div className="fade"></div>
        </div>
      </div>
    </div>
  );
};
