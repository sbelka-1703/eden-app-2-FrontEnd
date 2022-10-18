import "./styles.css";

import { Members } from "@eden/package-graphql/generated";
import { UserWithDescription } from "@eden/package-ui";

export interface ICollectionOfUsers {
  title?: string;
  members: Members[];
}

export const CollectionOfUsers = ({ title, members }: ICollectionOfUsers) => {
  return (
    <div className=" relative">
      <div className={`users-main m-auto w-72 justify-center`}>
        <h1 className="mb-5 text-center ">{title}</h1>
        <div className={`r-users flex flex-wrap`}>
          {members &&
            members.map((user: any, index: number) => (
              <UserWithDescription key={index} member={user} />
            ))}
          <div className="fade"></div>
        </div>
      </div>
    </div>
  );
};
