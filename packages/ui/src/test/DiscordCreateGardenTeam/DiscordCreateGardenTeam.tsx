import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Mutation } from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Loading,
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
  const { currentUser, selectedServer } = useContext(UserContext);
  const [channels, setChannels] = useState<any>(null);
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
      console.log("selectedTeam  TRUE");
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
      console.log("selectedTeam FALSE");
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
        // console.log("response", response.channels);
        setChannels(response.channels);
      });
    }
  }, [selectedServer]);

  if (submitting) return <Loading title="Submitting..." />;

  return (
    <Card shadow className={"bg-white p-4"}>
      <TextHeading3>Create Garden Team</TextHeading3>
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
                          <div>{item?.description}</div>
                          <div className={`text-sm`}>
                            channelGeneralDiscordID :
                            {item?.channelGeneralDiscordID}
                          </div>
                          <div className={`text-sm`}>
                            categoryDiscordlD : {item?.categoryDiscordlD}
                          </div>
                          <div className={`text-sm`}>
                            forumDiscordID : {item?.forumDiscordID}
                          </div>
                        </Card>
                      </button>
                    );
                  }
                )}
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
              <div>select discord channel</div>
              {channels ? (
                <Dropdown
                  items={channels}
                  onSelect={(value) => setSelectedChannel(value)}
                  placeholder="Select a channel"
                />
              ) : (
                <div>select a server</div>
              )}
              <Button variant={`primary`} onClick={() => handleSaveTeam()}>
                {selectedTeam ? `Save Garden Team` : `Create New Garden Team`}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};
