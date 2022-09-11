/* eslint-disable camelcase */
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@context/eden";
import { Mutation, Project } from "@graphql/eden/generated";
import { useContext, useState } from "react";
import { Button, Modal, ProjectInfo, RoleCard, TextHeading1 } from "ui";

const SET_APPLY_TO_PROJECT = gql`
  mutation ($fields: changeTeamMember_Phase_ProjectInput!) {
    changeTeamMember_Phase_Project(fields: $fields) {
      _id
    }
  }
`;

const SET_FAVORITE = gql`
  mutation ($fields: addFavoriteProjectInput!) {
    addFavoriteProject(fields: $fields) {
      _id
    }
  }
`;

export interface IApplyByRoleContainerProps {
  project?: Project;
  refetch?: () => void;
}

export const ApplyByRoleContainer = ({
  project,
  refetch,
}: IApplyByRoleContainerProps) => {
  const { currentUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isRoleView, setIsRoleView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [changeTeamMember_Phase_Project, {}] = useMutation(
    SET_APPLY_TO_PROJECT,
    {
      onCompleted: () => {
        // console.log("onCompleted");
        if (refetch) refetch();
        setSubmitting(false);
      },
      onError: (error) => {
        console.log("onError", error);
      },
    }
  );

  const [addFavoriteProject, {}] = useMutation(SET_FAVORITE, {
    onCompleted({ addFavoriteProject }: Mutation) {
      if (!addFavoriteProject) console.log("addFavoriteProject is null");
      setSubmitting(false);
      setIsFavorite(!isFavorite);
    },
  });

  const handleApply = async () => {
    setSubmitting(true);
    changeTeamMember_Phase_Project({
      variables: {
        fields: {
          projectID: project?._id,
          memberID: currentUser?._id,
          phase: "engaged",
        },
      },
    });
  };

  if (project) console.log(project);
  return (
    <div
      className={`text-darkGreen h-8/10 w-full rounded-2xl bg-white px-6 py-6`}
    >
      <ProjectInfo
        project={project}
        isFavoriteButton
        onSwitchView={() => setIsRoleView(!isRoleView)}
        isRoleView={isRoleView}
        submitting={submitting}
        isFavorite={isFavorite}
        onSetFavorite={() => {
          setSubmitting(true);
          addFavoriteProject({
            variables: {
              fields: {
                projectID: project?._id,
                memberID: currentUser?._id,
                favorite: !isFavorite,
              },
            },
            context: { serviceName: "soilservice" },
          });
        }}
      />
      {isRoleView ? (
        <div>
          <div className={`my-6`}>
            <TextHeading1>Matching Open Roles</TextHeading1>
          </div>
          <div className={`grid grid-cols-3 space-x-6 `}>
            {project?.role?.map((role, index) => (
              <RoleCard
                key={index}
                role={role}
                onApply={() => setShowModal(true)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className={`my-6`}>
            <TextHeading1>Project Activity</TextHeading1>
          </div>
        </div>
      )}
      <Modal open={showModal} closeOnEsc={false}>
        <div className={`h-5/10 mt-8`}>finish user profile</div>
        <div className={`flex justify-center`}>
          <Button onClick={() => setShowModal(false)}>
            Submit Application
          </Button>
        </div>
      </Modal>
    </div>
  );
};
