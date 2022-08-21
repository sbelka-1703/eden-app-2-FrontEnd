import { useQuery } from "@apollo/client";
import { FIND_MEMBER_FULL } from "@graphql/eden";
import { Members } from "@graphql/eden/generated";

import { UserContext } from "./UserContext";

type userProfile = Members;

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: dataMember, refetch } = useQuery(FIND_MEMBER_FULL, {
    variables: {
      fields: {
        _id: "908392557258604544", // TODO: get user id from login
      },
    },
    context: { serviceName: "soilservice" },
  });

  //   if (dataMember) console.log("dataMember", dataMember);

  const injectContext = {
    currentUser: dataMember?.findMember || undefined,
    setCurrentUser: (user: userProfile) => {
      console.log("setCurrentUser", user);
      // injectContext.currentUser = user;
    },
    refechProfile: () => refetch,
  };

  return (
    <UserContext.Provider value={injectContext}>
      {children}
    </UserContext.Provider>
  );
};
