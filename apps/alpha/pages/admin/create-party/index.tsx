import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  AdminLayout,
  Button,
  Card,
  SEO,
  ServerSelector,
  TextField,
  TextHeading2,
  TextHeading3,
} from "@eden/package-ui";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

import type { NextPageWithLayout } from "../../_app";

const CREATE_ROOM = gql`
  mutation ($fields: createRoomInput!) {
    createRoom(fields: $fields) {
      _id
    }
  }
`;

const DiscoverPage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  const [selectedServer, setSelectedServer] = useState<ServerTemplate>({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");

  const [roomUrl, setRoomUrl] = useState("");

  const [createRoom] = useMutation(CREATE_ROOM, {
    onCompleted: (data) => {
      console.log("createRoom completed", data);
      setRoomUrl(data.createRoom._id);
    },
    // errorPolicy: "ignore",
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleCreateRoom = () => {
    if (!selectedServer?._id) toast.error("Please select a server");
    if (!currentUser || !selectedServer?._id) return;
    createRoom({
      variables: {
        fields: {
          name,
          description,
          avatar,
          hostID: [currentUser?._id],
          serverID: selectedServer?._id,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  return (
    <>
      <SEO />
      <Card shadow className="scrollbar-hide h-85 overflow-scroll bg-white p-4">
        <div className={`grid grid-cols-2`}>
          <div className={`col-span-1`}>
            <TextHeading2>Create a Room</TextHeading2>
            <div className={``}>
              <div className={`font-Inter my-auto font-medium text-gray-700`}>
                Select a Discord Server to Connect in
              </div>
              <ServerSelector
                compareServerID={[]}
                onChangeServer={(val) => setSelectedServer(val)}
              />
            </div>
            <Card>
              <TextField
                label={`Room Name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label={`Room Description`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label={`Room Image`}
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
              <div className={`my-6`}>
                <Button onClick={() => handleCreateRoom()}>Create Room</Button>
              </div>
            </Card>
          </div>
          <div className={`col-span-1`}>
            <TextHeading2>Room Url</TextHeading2>
            {roomUrl && (
              <Card>
                <TextHeading3>{`https://eden-alpha-develop.vercel.app/party/onboard/${roomUrl}`}</TextHeading3>
                <div className={`my-6`}>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://eden-alpha-develop.vercel.app/party/onboard/${roomUrl}`
                      );
                      toast.success("grant link copied to clipboard");
                    }}
                  >
                    Copy Link
                  </Button>
                </div>
                <div className={`my-6`}>
                  <Button
                    onClick={() =>
                      window.open(
                        `https://eden-alpha-develop.vercel.app/party/onboard/${roomUrl}`,
                        "_blank"
                      )
                    }
                  >
                    Go to Room
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

DiscoverPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default DiscoverPage;

import { ServerTemplate } from "@eden/package-graphql/generated";
import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session || session.error === "RefreshAccessTokenError") {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  if (session.accessLevel && session.accessLevel > 5) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
