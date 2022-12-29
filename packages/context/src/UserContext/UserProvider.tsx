import { gql, useQuery, useSubscription } from "@apollo/client";
import { FIND_CURRENTUSER, FIND_CURRENTUSER_SUB } from "@eden/package-graphql";
import { Members, ServerTemplate } from "@eden/package-graphql/generated";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

// import { isAllServers, isEdenStaff } from "../../data";
import { isAllServers } from "../../data";
import { UserContext } from "./UserContext";

export const FIND_SERVERS = gql`
  query ($fields: findServersInput) {
    findServers(fields: $fields) {
      _id
      name
      serverAvatar
      serverType
      channel {
        chatID
      }
    }
  }
`;

export interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession();

  const { id } = session?.user || { id: null };

  const [memberServers, setMemberServers] = useState<ServerTemplate[]>([]);
  const [selectedServer, setSelectedServer] = useState<any>(null);
  const [memberServerIDs, setMemberServerIDs] = useState<string[]>([]);

  const { data: dataMember, refetch: refechProfile } = useQuery(
    FIND_CURRENTUSER,
    {
      variables: {
        fields: {
          _id: id,
        },
      },
      skip: !id,
      context: { serviceName: "soilservice" },
      ssr: false,
      onCompleted: (data) => {
        // console.log("dataMember", data);
        // if user is not found, remove access token. This is in case the user is not in the db but has a valid access token
        if (!data.findMember) localStorage.removeItem("eden_access_token");
      },
    }
  );

  // console.log("dataMember", dataMember);

  useSubscription(FIND_CURRENTUSER_SUB, {
    variables: {
      fields: {
        _id: id,
      },
    },
    skip: !id,
    context: { serviceName: "soilservice" },
  });

  useQuery(FIND_SERVERS, {
    variables: {
      fields: {
        _id: memberServerIDs,
      },
    },
    skip: memberServerIDs.length === 0,
    context: { serviceName: "soilservice" },
    onCompleted: (data) => {
      const servers: ServerTemplate[] = [isAllServers];

      servers.push(...data.findServers);
      setMemberServers(servers);
      setSelectedServer(servers[0]);
    },
  });

  // if (dataServers) console.log("dataServers", dataServers?.findServers);

  useEffect(() => {
    if (dataMember) setMemberServerIDs(dataMember.findMember?.serverID || []);

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
    setCurrentUser: (user: Members) => {
      console.log("setCurrentUser", user);
      // injectContext.currentUser = user;
    },
    refechProfile: refechProfile,
    memberServers,
    memberServerIDs,
    selectedServer,
    setSelectedServer,
  };

  return (
    <UserContext.Provider value={injectContext}>
      {children}
    </UserContext.Provider>
  );
};
