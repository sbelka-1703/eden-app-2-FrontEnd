import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Mutation, ServerTemplate } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  CheckBox,
  Dropdown,
  Loading,
  ServerSelector,
  TextField,
  TextHeading3,
} from "@eden/package-ui";
import { useContext, useEffect, useState } from "react";

const SET_NEW_TEAM = gql`
  mutation ($fields: createNewTeamInput!) {
    createNewTeam(fields: $fields) {
      _id
      name
      description
      champion {
        _id
        discordName
      }
      projects {
        _id
        title
      }
      categoryDiscordlD
      channelGeneralDiscordID
      forumDiscordID
    }
  }
`;

const findChannels = async (guildId: string) => {
  const response = await fetch(
    encodeURI(`/api/discord/fetchGuildChannels?guildId=${guildId}`),
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

export interface IDiscordCreateGardenTeamProps {}

export const DiscordCreateGardenTeam = ({}: IDiscordCreateGardenTeamProps) => {
  const { currentUser } = useContext(UserContext);
  const [selectedServer, setSelectedServer] = useState<ServerTemplate>({});
  const [channels, setChannels] = useState<any>(null);
  const [chatChannels, setChatChannels] = useState<any>(null);
  const [forumChannels, setForumChannels] = useState<any>(null);
  const [selectedChannelType, setSelectedChannelType] =
    useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  // filter out of the current user's projects for projects they are a champion of
  const champions = currentUser?.projects?.filter(
    (project) => project?.champion
  );

  // console.log("champions", champions);

  // find the serverID from champions serverID array that matches the selectedServer id
  const serverChampions = champions?.filter((champion) =>
    champion?.info?.serverID?.includes(selectedServer?._id as string)
  );

  //   console.log("serverChampions", serverChampions);

  const [addNewTeam, {}] = useMutation(SET_NEW_TEAM, {
    onCompleted({ createNewTeam }: Mutation) {
      if (!createNewTeam) console.log("createNewTeam is null");
      //   console.log("createNewTeam", createNewTeam);
      setTeamName("");
      setTeamDescription("");
      setSelectedProject(null);
      setSelectedTeam(null);
      setSelectedChannel(null);
      setSubmitting(false);
    },
  });

  const handleSaveTeam = () => {
    // console.log("selectedChannel", selectedChannel);
    // console.log("selectedChannel type", selectedChannel.type);

    setSubmitting(true);
    if (selectedTeam) {
      addNewTeam({
        variables: {
          fields: {
            _id: selectedTeam._id,
            name: teamName,
            description: teamDescription,
            categoryDiscordlD: selectedChannel?.parent_id || null,
            channelGeneralDiscordID:
              selectedChannel.type === 0 ? selectedChannel?.id! : "0",
            forumDiscordID:
              selectedChannel.type === 15 ? selectedChannel?.id! : "0",
          },
        },
        context: { serviceName: "soilservice" },
      });
    } else {
      addNewTeam({
        variables: {
          fields: {
            serverID: selectedServer?._id!,
            projectID: selectedProject?.info?._id!,
            name: teamName,
            description: teamDescription,
            categoryDiscordlD: selectedChannel?.parent_id || null,
            channelGeneralDiscordID:
              selectedChannel.type === 0 ? selectedChannel?.id! : "0",
            forumDiscordID:
              selectedChannel.type === 15 ? selectedChannel?.id! : "0",
          },
        },
        context: { serviceName: "soilservice" },
      });
    }
  };

  //   useEffect(() => {
  //     if (selectedProject) {
  //       console.log("selectedProject", selectedProject);
  //     }
  //   }, [selectedProject]);

  useEffect(() => {
    if (selectedTeam) {
      //   console.log("selectedTeam", selectedTeam);
      setTeamName(selectedTeam?.name || "");
      setTeamDescription(selectedTeam?.description || "");
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (selectedServer?._id) {
      findChannels(selectedServer?._id as string).then((response) => {
        setChannels(response.channels);

        const filteredChatChannels = response.channels.filter(
          (channel: any) => channel.type === 0
        );

        setChatChannels(filteredChatChannels);

        const filteredForumChannels = response.channels.filter(
          (channel: any) => channel.type === 15
        );

        setForumChannels(filteredForumChannels);
      });
    }
  }, [selectedServer]);

  // function to find channel name by id
  const findChannelName = (channelId: string) => {
    const channel = channels?.find((channel: any) => channel.id === channelId);

    return channel?.name;
  };

  if (submitting) return <Loading title="Submitting..." />;

  return (
    <Card shadow className={"bg-white p-4"}>
      <TextHeading3>Create Garden Team</TextHeading3>
      <div className={`my-4 md:mr-28 md:flex md:justify-between`}>
        <div className={`font-Inter my-auto font-medium text-gray-700`}>
          Select a Discord Server to Connect in
        </div>
        <ServerSelector
          compareServerID={[]}
          onChangeServer={(val) => setSelectedServer(val)}
        />
      </div>

      {!selectedServer?._id ? (
        <div
          className={`my-8 w-full text-center text-3xl font-medium uppercase text-zinc-700`}
        >
          please select a server
        </div>
      ) : (
        <>
          <div className={`font-medium uppercase text-zinc-500`}>
            Your Champion Projects
          </div>
          <div>
            <div
              className={`mb-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}
            >
              {serverChampions?.map((item, index) => (
                <button key={index} onClick={() => setSelectedProject(item)}>
                  <Card
                    shadow
                    className={"my-4 flex bg-white p-4"}
                    focused={item === selectedProject}
                  >
                    <div>
                      <Avatar
                        size="sm"
                        isProject
                        emoji={item?.info?.emoji as string}
                        backColorEmoji={item?.info?.backColorEmoji as string}
                      />
                    </div>
                    <div className={`mx-4 font-medium text-zinc-600`}>
                      <div>{item?.info?.title}</div>
                      <div className={`text-sm`}>{item?.info?.description}</div>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
          {selectedProject && (
            <div>
              <div className={`flex justify-between`}>
                <div className={`font-medium uppercase text-zinc-500`}>
                  current teams
                </div>
                {selectedTeam && (
                  <Button
                    onClick={() => {
                      setSelectedTeam(null);
                      setTeamName("");
                      setTeamDescription("");
                    }}
                  >
                    Create New Team
                  </Button>
                )}
              </div>
              <div
                className={`mb-4 grid gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-3`}
              >
                {selectedProject?.info?.garden_teams?.map?.(
                  (item: any, index: number) => {
                    return (
                      <button
                        className={`w-full`}
                        key={index}
                        onClick={() => setSelectedTeam(item)}
                      >
                        <Card
                          key={index}
                          shadow
                          className={
                            "my-4 bg-white p-4 text-left font-medium text-zinc-600"
                          }
                          focused={item === selectedTeam}
                        >
                          <div className={`text-lg`}>{item?.name}</div>
                          {/* <div>{item?.description}</div> */}
                          <div className={`text-sm`}>
                            Category :{" "}
                            {findChannelName(item?.categoryDiscordlD as string)}
                          </div>
                          {item?.channelGeneralDiscordID &&
                            item?.channelGeneralDiscordID !== "0" && (
                              <div className={`text-sm`}>
                                Chat :{" "}
                                {findChannelName(item?.channelGeneralDiscordID)}
                              </div>
                            )}

                          {item?.forumDiscordID &&
                            item?.forumDiscordID !== "0" && (
                              <div className={`text-sm`}>
                                Forum : {findChannelName(item?.forumDiscordID)}
                              </div>
                            )}
                        </Card>
                      </button>
                    );
                  }
                )}
              </div>
              <div className={`flex justify-between font-medium text-zinc-500`}>
                <div className={`my-auto`}>Select A Channel</div>

                <Dropdown
                  items={selectedChannelType ? forumChannels : chatChannels}
                  onSelect={(value) => setSelectedChannel(value)}
                  placeholder="Select a channel"
                />
                <div className={"my-auto flex"}>
                  <div>Forum</div>
                  <CheckBox
                    onChange={() =>
                      setSelectedChannelType(!selectedChannelType)
                    }
                  />
                </div>
              </div>
              <TextField
                label="Garden Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Garden Team Name"
              />
              <TextField
                label="Garden Team Description"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Garden Team Description"
              />
              <div className={`mt-8 flex justify-end`}>
                <Button variant={`primary`} onClick={() => handleSaveTeam()}>
                  {selectedTeam ? `Save Garden Team` : `Create New Garden Team`}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};
