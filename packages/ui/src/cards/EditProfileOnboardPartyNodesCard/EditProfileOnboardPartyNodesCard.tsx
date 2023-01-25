import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  FIND_NODES,
  FIND_ROLE_TEMPLATES,
  UPDATE_MEMBER_IN_ROOM,
} from "@eden/package-graphql";
import {
  LinkType,
  Maybe,
  Node,
  RoleTemplate,
} from "@eden/package-graphql/generated";
import {
  Avatar,
  Button,
  Card,
  FillSocialLinks,
  Loading,
  Modal,
  NodeList,
  ProgressBarGeneric,
  RoleSelector,
  SelectBoxNode,
  TextArea,
  TextHeading2,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { forEach, isEmpty, map } from "lodash";
import { useContext, useEffect, useState } from "react";

import { getFillProfilePercentage } from "../../../utils/fill-profile-percentage";

const ADD_NODES_TO_MEMBER_IN_ROOM = gql`
  mutation ($fields: addNodesToMemberInRoomInput) {
    addNodesToMemberInRoom(fields: $fields) {
      _id
    }
  }
`;

const DELETE_NODES_TO_MEMBER_IN_ROOM = gql`
  mutation ($fields: deleteNodesFromMemberInRoomInput) {
    deleteNodesFromMemberInRoom(fields: $fields) {
      _id
    }
  }
`;

export interface IEditProfileOnboardPartyNodesCardProps {
  serverID: string;
  RoomID: string;
}

// eslint-disable-next-line no-unused-vars
enum PARTY_STEPS {
  // eslint-disable-next-line no-unused-vars
  WELCOME = "WELCOME",
  // eslint-disable-next-line no-unused-vars
  EXPERTISE = "EXPERTISE",
  // eslint-disable-next-line no-unused-vars
  PROJECT_TYPE = "PROJECT_TYPE",
  // eslint-disable-next-line no-unused-vars
  BIO = "BIO",
  // eslint-disable-next-line no-unused-vars
  SOCIAL = "SOCIAL",
}

export const EditProfileOnboardPartyNodesCard = ({
  serverID,
  RoomID,
}: IEditProfileOnboardPartyNodesCardProps) => {
  const { currentUser } = useContext(UserContext);
  const [selectedModal, setSelectedModal] = useState("");

  const [firstTimeView, setFirstTimeView] = useState(false);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {
        _id: null,
      },
    },
    context: { serviceName: "soilservice" },
  });

  const progress = getFillProfilePercentage(currentUser || {});

  const _handleUpdateUserLinks = (val: any) => {
    handleUpdateUser(val, "links");
  };

  const [updateMember] = useMutation(UPDATE_MEMBER_IN_ROOM, {
    onError: (error) => {
      console.log("error", error);
    },
  });

  const [addNodes] = useMutation(ADD_NODES_TO_MEMBER_IN_ROOM, {
    onError(error) {
      console.log("error", error);
    },
  });

  const [deleteNodes] = useMutation(DELETE_NODES_TO_MEMBER_IN_ROOM, {
    onError(error) {
      console.log("error", error);
    },
  });

  const handleUpdateUser = (val: any, name: any) => {
    if (!RoomID || !currentUser) return;

    let bio = currentUser?.bio || null;
    const memberRole = {
      _id: currentUser?.memberRole?._id || undefined,
    };
    let links = currentUser?.links?.map((link: any) => {
      // eslint-disable-next-line no-unused-vars
      const { __typename, ...rest } = link;

      return rest;
    });

    if (name === "bio") {
      bio = val;
    }
    if (name === "role") {
      memberRole._id = val;
    }

    if (name === "links") {
      links = val;
    }

    updateMember({
      variables: {
        fields: {
          memberID: currentUser?._id,
          serverID: serverID,
          roomID: RoomID,
          bio: bio,
          memberRole: memberRole._id ? memberRole : null,
          links: links,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  const handleSaveNodes = (data: string[]) => {
    if (!RoomID || !currentUser) return;
    addNodes({
      variables: {
        fields: {
          memberID: currentUser._id,
          nodesID: data,
          RoomID: RoomID,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  const handleDeleteNodes = (data: string[]) => {
    if (!RoomID || !currentUser) return;
    deleteNodes({
      variables: {
        fields: {
          memberID: currentUser._id,
          nodesID: data,
          RoomID: RoomID,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.nodes?.length === 0 && !firstTimeView) {
        setFirstTimeView(true);
        setSelectedModal("WELCOME");
      }
    }
  }, [currentUser]);

  return (
    <Card shadow className="flex-grow bg-white p-4">
      <TextHeading3 className="mb-2 text-lg">Your Profile</TextHeading3>
      <div className="mb-2 flex items-center">
        {currentUser?.discordAvatar && (
          <Avatar src={currentUser?.discordAvatar} size="sm" />
        )}
        <div>
          <div>
            <span className="text-darkGreen ml-2 mb-2 text-2xl font-medium">
              {currentUser?.discordName}
            </span>
            {currentUser?.discriminator && (
              <span className="mt-3 mb-2 pl-1 text-xs font-medium text-zinc-400">
                #{currentUser?.discriminator}
              </span>
            )}
          </div>
          <div className={`ml-2 text-sm font-medium text-zinc-400`}>
            {currentUser?.memberRole?.title}
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-1 flex items-baseline">
          <TextLabel>PROFILE PROGRESS</TextLabel>
          <span className="ml-auto">{progress}%</span>
        </div>
        <ProgressBarGeneric progress={progress} />
      </div>
      <div className={`my-6`}>
        <button
          className={`border-soilPurple text-soilPurple hover:text-accentColor hover:border-accentColor w-full rounded-lg border p-2 font-medium uppercase`}
          onClick={() => setSelectedModal("EXPERTISE")}
        >
          Edit Profile
        </button>
      </div>

      <WelcomeModal
        openModal={selectedModal === PARTY_STEPS.WELCOME}
        onClose={() => setSelectedModal("EXPERTISE")}
      />

      <NodesModal
        title="What Subjects Do You Have Expertise In?"
        openModal={selectedModal === PARTY_STEPS.EXPERTISE}
        onClose={() => setSelectedModal("PROJECT_TYPE")}
        onSubmit={(val: any) => {
          handleSaveNodes(val);
          setSelectedModal("PROJECT_TYPE");
        }}
        onDeleteNode={(val: any) => {
          handleDeleteNodes(val);
        }}
        nodeType={`expertise`}
        submitButtonLabel={`Next`}
      />

      <NodesModal
        title="What Types of Projects Do You Prefer?"
        openModal={selectedModal === PARTY_STEPS.PROJECT_TYPE}
        onClose={() => setSelectedModal("BIO")}
        onSubmit={(val: any) => {
          handleSaveNodes(val);
          setSelectedModal("BIO");
        }}
        onDeleteNode={(val: any) => {
          handleDeleteNodes(val);
        }}
        nodeType={`typeProject`}
        submitButtonLabel={`Next`}
      />

      <BioModal
        roles={
          dataRoles?.findRoleTemplates as Maybe<Array<Maybe<RoleTemplate>>>
        }
        openModal={selectedModal === PARTY_STEPS.BIO}
        onSubmit={(role: any, bio: any) => {
          handleUpdateUser(bio, "bio");
          handleUpdateUser(role, "role");
          setSelectedModal("SOCIAL");
        }}
      />

      <SocialModal
        openModal={selectedModal === PARTY_STEPS.SOCIAL}
        onSubmit={(val: any) => {
          _handleUpdateUserLinks(val);
          setSelectedModal("");
        }}
      />
    </Card>
  );
};

interface IWelcomeModalProps {
  openModal: boolean;
  onClose: () => void;
}

const WelcomeModal = ({ openModal, onClose }: IWelcomeModalProps) => {
  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div className="h-6/10 grid place-content-center p-4">
        <div className="mb-12 space-y-12 text-center">
          <TextHeading2 className="text-lg">gm Fren!</TextHeading2>
          <TextHeading3 className="text-lg">
            Please help the room get to know a little bit about you 😃
          </TextHeading3>
        </div>
      </div>
      <div className={`flex justify-end`}>
        <Button variant="secondary" onClick={onClose}>
          Next
        </Button>
      </div>
    </Modal>
  );
};

interface INodesModal {
  openModal?: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (val: string[] | null) => void;
  // eslint-disable-next-line no-unused-vars
  onDeleteNode: (val: any) => void;
  welcomeMessage?: string;
  title?: string;
  subTitle?: string;
  nodeType?: string;
  submitButtonLabel?: string;
}

const NodesModal = ({
  openModal,
  onClose,
  onSubmit,
  onDeleteNode,
  welcomeMessage,
  title,
  nodeType,
  submitButtonLabel = `Finished`,
}: INodesModal) => {
  const { currentUser } = useContext(UserContext);

  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: Node[];
  }>({});
  const [selectedNodes, setSelectedNodes] = useState<string[] | null>(null);

  const { data: dataNodes } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: nodeType,
      },
    },
    skip: !nodeType,
    context: { serviceName: "soilservice" },
  });

  // if (dataNodes?.findNodes) console.log("dataNodes", dataNodes?.findNodes);

  const nodesFilter =
    nodeType === "expertise" ? "sub_expertise" : "sub_typeProject";

  useEffect(() => {
    if (selectedItems) {
      const selectedNodeId: string[] = [];

      forEach(selectedItems, (el) => {
        if (!isEmpty(el)) {
          forEach(el, (item) => {
            // console.log("item", item);
            selectedNodeId.push(item?._id as string);
          });
        }
      });
      setSelectedNodes(selectedNodeId);
    }
  }, [selectedItems]);

  const handleFinish = () => {
    onSubmit && onSubmit(selectedNodes as any);
  };

  return (
    <Modal open={openModal} closeOnEsc={false} onClose={onClose}>
      <div>
        <div className={`mb-12 flex justify-between`}>
          <div>
            <div className="flex justify-between">
              <div className="flex-1 text-center">
                <TextHeading2>{welcomeMessage}</TextHeading2>
                <TextHeading3>{title}</TextHeading3>
              </div>
            </div>
            <section className="mt-4">
              <NodeList
                closeButton
                handleDeleteNode={(val) =>
                  onDeleteNode([`${val?.nodeData?._id}`])
                }
                nodes={currentUser?.nodes?.filter(
                  (node) => node?.nodeData?.node === nodesFilter
                )}
                colorRGB={`209,247,196`}
              />

              <div className="my-8 ml-4 flex h-52 w-full flex-wrap justify-center gap-2">
                {dataNodes?.findNodes ? (
                  <>
                    {!isEmpty(dataNodes?.findNodes) &&
                      map(dataNodes?.findNodes, (item: any, key: number) => (
                        <SelectBoxNode
                          multiple
                          key={key}
                          caption={item?.name}
                          items={item?.subNodes}
                          onChange={(val) => {
                            setSelectedItems((prevState) => ({
                              ...prevState,
                              [item?._id]: val,
                            }));
                          }}
                        />
                      ))}
                  </>
                ) : (
                  <Loading />
                )}
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between">
          <div></div>
          <Button radius="rounded" variant={`secondary`} onClick={handleFinish}>
            {submitButtonLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface IBioModalProps {
  roles: Maybe<Array<Maybe<RoleTemplate>>>;
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (role: any, bio: any) => void;
}

const BioModal = ({ roles, openModal, onSubmit }: IBioModalProps) => {
  const { currentUser } = useContext(UserContext);

  const [bio, setBio] = useState("");
  const [role, setRole] = useState(currentUser?.memberRole?._id || "");

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div className="h-6/10 space-y-8 p-4">
        <TextHeading3 className="text-center text-lg">
          Select Your Current Role
        </TextHeading3>
        <div className={`my-6 space-y-2`}>
          <TextLabel>Current Role:</TextLabel>
          <RoleSelector
            value={currentUser?.memberRole?.title || ""}
            roles={roles}
            onSelect={(e) => setRole(e?._id as string)}
          />
        </div>
        <TextHeading3 className="text-center text-lg">
          Tell the Room About Yourself
        </TextHeading3>
        <div className={`my-6 space-y-2`}>
          <TextLabel>ABOUT ME</TextLabel>
          <TextArea
            name="bio"
            placeholder={`Write a short description about yourself...`}
            rows={5}
            value={`${currentUser?.bio ? currentUser.bio : ""}`}
            className="text-xs"
            onChange={(e) => setBio(e.target.value)}
            maxLength={280}
          />
        </div>
      </div>
      <div className={`flex justify-end`}>
        <Button variant="secondary" onClick={() => onSubmit(role, bio)}>
          Next
        </Button>
      </div>
    </Modal>
  );
};

interface ISocialModalProps {
  openModal: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: any) => void;
}

const SocialModal = ({ openModal, onSubmit }: ISocialModalProps) => {
  const [links, setLinks] = useState<Maybe<LinkType>[]>([]);

  return (
    <Modal open={openModal} closeOnEsc={false}>
      <div className="h-6/10 space-y-12 p-4">
        <TextHeading3 className="text-center text-lg">
          Include Links so Others Can Find You
        </TextHeading3>
        <SocialView onChanges={(val) => setLinks(val)} />
      </div>
      <div className={`flex justify-end`}>
        <Button variant="secondary" onClick={() => onSubmit(links)}>
          Next
        </Button>
      </div>
    </Modal>
  );
};

interface ISocailViewProps {
  onChanges?: React.Dispatch<React.SetStateAction<Maybe<LinkType>[]>>;
}

const SocialView = ({ onChanges }: ISocailViewProps) => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <TextLabel>SOCIAL MEDIA</TextLabel>
      <FillSocialLinks
        links={currentUser?.links || []}
        onChange={(val) => {
          onChanges && onChanges(val as Array<Maybe<LinkType>>);
        }}
      />
    </div>
  );
};
