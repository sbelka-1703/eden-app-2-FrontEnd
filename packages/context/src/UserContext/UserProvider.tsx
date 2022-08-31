import { useQuery } from "@apollo/client";
import { FIND_MEMBER_FULL } from "@graphql/eden";
import { Members } from "@graphql/eden/generated";
import { useSession } from "next-auth/react";
import React from "react";

import { UserContext } from "./UserContext";
type userProfile = Members;

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession();

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
