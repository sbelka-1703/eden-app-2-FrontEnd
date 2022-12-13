import { gql, useMutation } from "@apollo/client";
import {
  AppUserSubmenuLayout,
  Button,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
  SEO,
  TextField,
  TextHeading2,
  TextHeading3,
  UserProfileCard,
} from "@eden/package-ui";
import { useState } from "react";
import { toast } from "react-toastify";

import type { NextPageWithLayout } from "../../_app";

const CREATE_ROOM = gql`
  mutation ($fields: createRoomInput!) {
    createRoom(fields: $fields) {
      _id
      name
    }
  }
`;

const DiscoverPage: NextPageWithLayout = () => {
  const [name, setName] = useState("");
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
    createRoom({
      variables: {
        fields: {
          name: name,
        },
      },
    });
  };

  return (
    <>
      <SEO />
      <GridLayout>
        <GridItemThree>
          <Card className={`h-85 flex flex-col gap-2`}>
            <UserProfileCard />
          </Card>
        </GridItemThree>
        <GridItemNine>
          <Card
            shadow
            className="scrollbar-hide h-85 overflow-scroll bg-white p-4"
          >
            <div className={`grid grid-cols-2`}>
              <div className={`col-span-1`}>
                <TextHeading2>Create a Room</TextHeading2>
                <Card>
                  <TextField
                    label={`Room Name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className={`my-6`}>
                    <Button onClick={() => handleCreateRoom()}>
                      Create Room
                    </Button>
                  </div>
                </Card>
              </div>
              <div className={`col-span-1`}>
                <TextHeading2>Room Url</TextHeading2>
                {roomUrl && (
                  <Card>
                    <TextHeading3>{`https://eden-grants.vercel.app/onboard/party/${roomUrl}`}</TextHeading3>
                    <div className={`my-6`}>
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://eden-grants.vercel.app/onboard/party/${roomUrl}`
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
                            `https://eden-grants.vercel.app/onboard/party/${roomUrl}`,
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
        </GridItemNine>
      </GridLayout>
    </>
  );
};

DiscoverPage.getLayout = (page) => (
  <AppUserSubmenuLayout showSubmenu={false}>{page}</AppUserSubmenuLayout>
);

export default DiscoverPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
