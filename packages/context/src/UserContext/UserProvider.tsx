import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  FIND_MEMBER_FULL,
  MEMBER_SUBSCRIPTION,
  // UPDATE_MEMBER,
} from "@eden/package-graphql";
import { Members, Mutation } from "@eden/package-graphql/generated";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { UserContext } from "./UserContext";

const findMutualGuilds = async () => {
  const response = await fetch(encodeURI("/api/discord/fetchMutualGuilds"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.json();
};

export const ADD_NEW_MEMBER = gql`
  mutation AddNewMember($fields: addNewMemberInput!) {
    addNewMember(fields: $fields) {
      _id
      discordAvatar
      discordName
    }
  }
`;

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession();

  const { id } = session?.user || { id: null };

  const [memberFound, setMemberFound] = useState(false);

  const [addNewMember, {}] = useMutation(ADD_NEW_MEMBER, {
    onCompleted({ addNewMember }: Mutation) {
      if (!addNewMember) console.log("addNewMember is null");
      setMemberFound(true);
      refetch();
    },
  });

  // const [updateMember] = useMutation(UPDATE_MEMBER, {});

  const { data: dataMember, refetch } = useQuery(FIND_MEMBER_FULL, {
    variables: {
      fields: {
        _id: id,
      },
    },
    skip: !id,
    context: { serviceName: "soilservice" },
    ssr: false,
    onCompleted: (data) => {
      if (!data.findMember) {
        addNewMember({
          variables: {
            fields: {
              _id: session?.user?.id,
              discordName: session?.user?.name,
              discordAvatar: session?.user?.image,
            },
          },
        });
      } else {
        findMutualGuilds().then((data) => {
          const mutualGuilds = data.guilds;

          console.log("servers", mutualGuilds);

          const getMutualGuildIds = () => {
            const mutualGuildIds = mutualGuilds.map((guild: any) => {
              return guild.id;
            });

            return mutualGuildIds;
          };

          console.log("mutualGuildIds", getMutualGuildIds());

          // updateMember({
          //   variables: {
          //     fields: {
          //       _id: session?.user?.id,
          //       serverID: getMutualGuildIds(),
          //     },
          //   },
          // });
        });
        setMemberFound(true);
      }
    },
  });

  // console.log("dataMember", dataMember);

  useSubscription(MEMBER_SUBSCRIPTION, {
    variables: {
      fields: {
        _id: id,
      },
    },
    skip: !id || !memberFound,
    context: { serviceName: "soilservice" },
  });

  // if (dataMember) console.log("dataMember", dataMember.findMember);

  useEffect(() => {
    if (dataMember && process.env.NODE_ENV === "development") {
      console.log(`==== currentUser ====`);
      console.log(dataMember.findMember);
      console.log(`==== ----------- ====`);
    }
  }, [dataMember]);

  const injectContext = {
    currentUser: dataMember?.findMember || undefined,
    memberFound,
    setCurrentUser: (user: Members) => {
      console.log("setCurrentUser", user);
      // injectContext.currentUser = user;
    },
    refechProfile: () => refetch,
    memberServers: undefined,
    setMemberServers: (servers: any) => {
      console.log("setMemberServers", servers);
      // injectContext.memberServers = servers;
    },
  };

  return (
    <UserContext.Provider value={injectContext}>
      {children}
    </UserContext.Provider>
  );
};
