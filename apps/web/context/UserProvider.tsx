import { useQuery } from "@apollo/client";
import { FIND_MEMBER_FULL } from "@graphql/eden";
import { Members } from "@graphql/eden/generated";
// import type { DefaultUser } from "next-auth";
import { useSession } from "next-auth/react";

import { UserContext } from "./UserContext";
type userProfile = Members;

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession();

  // console.log("status", status);
  // console.log("UserProvider session", session?.user?.id);

  const { id } = session?.user || { id: null };

  const { data: dataMember, refetch } = useQuery(FIND_MEMBER_FULL, {
    variables: {
      fields: {
        _id: id,
      },
    },
    skip: !id,
    context: { serviceName: "soilservice" },
  });

  // if (dataMember) console.log("dataMember", dataMember.findMember);

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
