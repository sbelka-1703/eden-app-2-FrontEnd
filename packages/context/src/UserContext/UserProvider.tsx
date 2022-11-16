import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  FIND_MEMBER_FULL,
  MEMBER_SUBSCRIPTION,
  // UPDATE_MEMBER,
} from "@eden/package-graphql";
import { Members, Mutation } from "@eden/package-graphql/generated";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

// import { isAllServers, isEdenStaff } from "../../data";
import { isAllServers } from "../../data";
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

const findMember = async (memberId: string) => {
  const response = await fetch(
    encodeURI(`/api/discord/fetchMember?memberId=${memberId}`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

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
  const [memberServers, setMemberServers] = useState<any>(null);
  const [selectedServer, setSelectedServer] = useState<any>();

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
        findMember(id as string).then((member) => {
          // console.log("member", member.member);
          addNewMember({
            variables: {
              fields: {
                _id: session?.user?.id,
                discordName: session?.user?.name,
                discordAvatar: session?.user?.image,
                discriminator: member?.member?.discriminator || "",
              },
            },
          });
        });
      } else {
        const servers: any[] = [];

        // if (isEdenStaff.includes(data.findMember._id))
        //   servers.push(isAllServers);
        servers.push(isAllServers);

        findMutualGuilds().then((data) => {
          const mutualGuilds = data.guilds;

          // console.log("mutualGuilds", mutualGuilds);

          servers.push(...mutualGuilds);

          setMemberServers(servers);
          setSelectedServer(servers[0]);
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
      console.log(`==== current USER ====`);
      console.log(dataMember.findMember);
      console.log(`==== ----------- ====`);
    }
  }, [dataMember]);

  useEffect(() => {
    if (selectedServer && process.env.NODE_ENV === "development") {
      console.log(`==== current SERVER ====`);
      console.log(selectedServer);
      console.log(`==== ----------- ====`);
    }
  }, [selectedServer]);

  const injectContext = {
    currentUser: dataMember?.findMember || undefined,
    memberFound,
    setCurrentUser: (user: Members) => {
      console.log("setCurrentUser", user);
      // injectContext.currentUser = user;
    },
    refechProfile: () => refetch,
    memberServers,
    selectedServer,
    setSelectedServer,
  };

  return (
    <UserContext.Provider value={injectContext}>
      {children}
    </UserContext.Provider>
  );
};
