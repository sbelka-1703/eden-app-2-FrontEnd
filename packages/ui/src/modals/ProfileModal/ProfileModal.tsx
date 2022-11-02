/* eslint-disable camelcase */
import { gql, useMutation } from "@apollo/client";
import {
  Maybe,
  Members,
  Project,
  RoleType,
} from "@eden/package-graphql/generated";
import {
  Button,
  Modal,
  SendMessageToUser,
  UserSkillSocialAval,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";
import { toast } from "react-toastify";

import { round } from "../../../utils";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

export interface ProfileModalProps {
  member: Maybe<Members>;
  project?: Project;
  role?: RoleType;
  type?: string;
  memberMatch?: string;
  openModal?: boolean;
  onClose: () => void;
}

export const ProfileModal = ({
  member,
  project,
  role,
  type,
  memberMatch,
  onClose,
  openModal,
}: ProfileModalProps) => {
  // console.log("member", member);
  // console.log("project", project);
  // console.log("role", role);
  const [showInvite, setShowInvite] = useState(false);

  //  const tabs = ["New Match", "Applied", "Invited", "Accepted", "Rejected"];

  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {
      onCompleted: () => {
        console.log(changeTeamMember_Phase_Project);
        toast.success("success");
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleReject = () => {
    // console.log("reject");
    if (project?._id && member?._id) {
      changeTeamMember_Phase_Project({
        variables: {
          fields: {
            projectID: project?._id,
            memberID: member?._id,
            roleID: role?._id,
            phase: "rejected",
          },
        },
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleAccept = () => {
    // console.log("accept");
    if (project?._id && member?._id) {
      changeTeamMember_Phase_Project({
        variables: {
          fields: {
            projectID: project?._id,
            memberID: member?._id,
            roleID: role?._id,
            phase: "committed",
          },
        },
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal open={openModal} closeOnEsc onClose={onClose}>
      <div className={`flex items-center justify-center`}>
        <div className={`w-28`}>
          {type === "Applied" || type === "Invited" ? (
            <Button variant="tertiary" onClick={() => handleReject()}>
              Reject
            </Button>
          ) : null}
        </div>
        <UserWithDescription member={member} />
        <div className={`w-28`}>
          {type === "New Match" && (
            <Button
              variant="primary"
              onClick={() => setShowInvite(!showInvite)}
            >
              Invite
            </Button>
          )}
          {type === "Applied" || type === "Invited" ? (
            <Button variant="primary" onClick={() => handleAccept()}>
              Accept
            </Button>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div>
            <p className="font-semibold">SHORT BIO</p>

            <p className="break-words text-justify">{member?.bio}</p>
          </div>
        </div>
        <div className="col-span-4 text-center">
          {memberMatch && (
            <>
              <div className={`text-lg font-semibold text-black/50`}>
                ⚡️ Match
              </div>
              <div
                className={`text-soilPurple font-poppins text-3xl font-semibold`}
              >
                {round(Number(memberMatch), 0)}%
              </div>
            </>
          )}
        </div>
      </div>
      {showInvite ? (
        <SendMessageToUser member={member} project={project} role={role} />
      ) : (
        <UserSkillSocialAval member={member} />
      )}
    </Modal>
  );
};
