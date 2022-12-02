import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_ROLE_TEMPLATES } from "@eden/package-graphql";
import { Maybe, Mutation, RoleTemplate } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  Card,
  // NumberCircle,
  ProgressBarGeneric,
  RoleSelector,
  SelectNodesModal,
  // SocialMediaInput,
  TextArea,
  TextHeading3,
  TextLabel,
} from "@eden/package-ui";
import { useContext, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";

import { getFillProfilePercentage } from "../../../utils/fill-profile-percentage";

const ADD_NODES = gql`
  mutation ($fields: addNodesToMemberInRoomInput) {
    addNodesToMemberInRoom(fields: $fields) {
      _id
    }
  }
`;
// const ADD_NODES = gql`
//   mutation ($fields: addNodesToMemberInput!) {
//     addNodesToMember(fields: $fields) {
//       _id
//     }
//   }
// `;

const DELETE_NODES = gql`
  mutation ($fields: deleteNodesFromMemberInRoomInput) {
    deleteNodesFromMemberInRoom(fields: $fields) {
      _id
    }
  }
`;

// const DELETE_NODES = gql`
//   mutation ($fields: deleteNodesFromMemberInput!) {
//     deleteNodesFromMember(fields: $fields) {
//       _id
//     }
//   }
// `;

export interface IEditProfileOnboardPartyNodesCardProps {
  RoomId: string;
  // eslint-disable-next-line no-unused-vars
  handleUpdateUser: (val: any, name: string) => void;
}

export const EditProfileOnboardPartyNodesCard = ({
  RoomId,
  handleUpdateUser,
}: IEditProfileOnboardPartyNodesCardProps) => {
  const { currentUser } = useContext(UserContext);
  const [openModalExpertise, setOpenModalExpertise] = useState(false);
  const [openModalTypeProject, setOpenModalTypeProject] = useState(false);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {
        _id: null,
      },
    },
    context: { serviceName: "soilservice" },
  });

  const progress = getFillProfilePercentage(currentUser || {});

  const _handleUpdateUser = (e: any) => {
    handleUpdateUser(e.target.value, e.target.name);
  };
  const _handleUpdateUserRole = (val: any) => {
    handleUpdateUser(val, "role");
  };

  const [addNodes] = useMutation(ADD_NODES, {
    onCompleted({ addNodesToMemberInRoom }: Mutation) {
      if (!addNodesToMemberInRoom) console.log("addNodesToMember is null");
      // console.log("updateMember", addNodesToMember);
      // setSubmitting(false);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const [deleteNodes] = useMutation(DELETE_NODES, {
    onCompleted({ deleteNodesFromMemberInRoom }: Mutation) {
      if (!deleteNodesFromMemberInRoom) console.log("addNodesToMember is null");
      // console.log("updateMember", addNodesToMember);
      // setSubmitting(false);
    },
    onError(error) {
      console.log("error", error);
    },
  });

  const handleSaveNodes = (data: string[]) => {
    if (!RoomId || !currentUser) return;

    // console.log(currentUser._id, RoomId, data);

    addNodes({
      variables: {
        fields: {
          memberID: currentUser._id,
          nodesID: data,
          RoomID: RoomId,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  const handleDeleteNodes = (data: string[]) => {
    if (!RoomId || !currentUser) return;

    // console.log(currentUser._id, RoomId, data);

    deleteNodes({
      variables: {
        fields: {
          memberID: currentUser._id,
          nodesID: data,
          RoomID: RoomId,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  return (
    <Card shadow className="bg-white p-4">
      <TextHeading3 className="mb-2">Your Profile</TextHeading3>
      <div className="mb-4 flex items-center">
        {currentUser?.discordAvatar && (
          <Avatar src={currentUser?.discordAvatar} size="sm" />
        )}
        <div>
          <div>
            {currentUser?.discordName && (
              <span className="text-darkGreen ml-2 mb-2 text-2xl font-medium">
                {currentUser?.discordName}
              </span>
            )}
            {currentUser?.discriminator && (
              <span className="mt-3 mb-2 pl-1 text-xs font-medium text-zinc-400">
                #{currentUser?.discriminator}
              </span>
            )}
          </div>
          <div className={`text-md ml-2 font-medium text-zinc-400`}>
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
      {/* Add Roles */}

      <TextLabel>Current Role:</TextLabel>
      <RoleSelector
        value={currentUser?.memberRole?.title || ""}
        roles={
          dataRoles?.findRoleTemplates as Maybe<Array<Maybe<RoleTemplate>>>
        }
        onSelect={_handleUpdateUserRole}
      />

      <div className="flex items-center justify-between space-x-2 py-1">
        <TextLabel>PREFERRED PROJECTS</TextLabel>
        {/* {learningSkills && <NumberCircle value={learningSkills?.length} />} */}
        <button onClick={() => setOpenModalTypeProject(true)}>
          <BiCommentAdd className="text-soilPurple hover:text-accentColor text-2xl" />
        </button>
      </div>
      <div>
        {currentUser?.nodes?.map((item, index) => {
          if (item?.nodeData?.node == "sub_typeProject") {
            return (
              <Badge
                key={index}
                text={item?.nodeData?.name || ""}
                colorRGB={`209,247,196`}
                className={`font-Inter text-sm`}
                cutText={16}
                closeButton={true}
                onClose={() => {
                  handleDeleteNodes([`${item?.nodeData?._id}`]);
                }}
              />
            );
          }
        })}
      </div>

      <div className="flex items-center justify-between space-x-2  py-1">
        <TextLabel>SKILLS</TextLabel>
        {/* {skilledSkills && <NumberCircle value={skilledSkills?.length} />} */}
        <button onClick={() => setOpenModalExpertise(true)}>
          <BiCommentAdd className="text-soilPurple hover:text-accentColor text-2xl" />
        </button>{" "}
      </div>
      <div>
        {currentUser?.nodes?.map((item, index) => {
          if (item?.nodeData?.node == "sub_expertise") {
            return (
              <Badge
                key={index}
                text={item?.nodeData?.name || ""}
                colorRGB={`235,225,255`}
                className={`font-Inter text-sm`}
                cutText={16}
                closeButton={true}
                onClose={() => {
                  handleDeleteNodes([`${item?.nodeData?._id}`]);
                }}
              />
            );
          }
        })}
      </div>

      <TextLabel>ABOUT ME</TextLabel>
      <TextArea
        name="bio"
        placeholder={`Write a short description about yourself...`}
        rows={5}
        value={`${currentUser?.bio ? currentUser.bio : ""}`}
        className="border-0 text-xs"
        onChange={_handleUpdateUser}
        debounceTime={2000}
        maxLength={280}
      />
      {/* <TextLabel>SOCIAL MEDIA</TextLabel>
      <SocialMediaInput platform="twitter" onChange={handleUpdateUser} />
      <SocialMediaInput platform="linkedin" onChange={handleUpdateUser} /> */}

      <SelectNodesModal
        title="Add the Types of Projects that you like"
        openModal={openModalTypeProject}
        onClose={() => {
          setOpenModalTypeProject(false);
        }}
        onSubmit={(val: any) => {
          handleSaveNodes(val);
          setOpenModalTypeProject(false);
        }}
        nodeType={`typeProject`}
      />

      <SelectNodesModal
        title="Add your Expertise"
        openModal={openModalExpertise}
        onClose={() => {
          setOpenModalExpertise(false);
        }}
        onSubmit={(val: any) => {
          handleSaveNodes(val);
          setOpenModalExpertise(false);
        }}
        nodeType={`expertise`}
      />
    </Card>
  );
};
