import { Project, RoleType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Modal,
  ProgressStepper,
  ProjectChampion,
} from "@eden/package-ui";

type ApplicationProgressType = {
  applied: boolean;
  reviewed: boolean;
  assesment: boolean;
  interview: boolean;
  induction: boolean;
  onboarding: boolean;
};

export interface ApplicationModalProps {
  isModalOpen: boolean;
  Project: Project;
  Role: RoleType;
  ApplicationProgress: ApplicationProgressType;
}

export const ApplicationModal = ({
  isModalOpen,
  Project,
  Role,
  ApplicationProgress,
}: ApplicationModalProps) => {
  return (
    <Modal open={isModalOpen}>
      <div className="mb-10 flex gap-10">
        <div className="flex flex-col items-start justify-center gap-5">
          <div className="flex items-center justify-center gap-3">
            <div>
              <Avatar
                size="lg"
                isProject
                emoji={Project?.emoji as string}
                backColorEmoji={Project?.backColorEmoji as string}
              />
            </div>
            <div>
              <h1 className="text-soilHeading1 font-semibold">
                {Project.title}
              </h1>
              <p className="text-soilHeading3 text-soilGray leading-6">
                {Project.descriptionOneLine}
              </p>
            </div>
          </div>
          <p>{Project.description}</p>
          <div className="w-full">
            <h1 className="text-soilHeading3 font-medium">{Role.title}</h1>
            <div className="flex items-start justify-between">
              <ul>
                <li>{Role?.keyRosponsibilities}</li>
              </ul>
              <div className="text-soilGray font-medium">
                <div>
                  <h1>⌛ {Role.hoursPerWeek} h / week</h1>
                </div>
                <div>
                  <h1>💰 $CODE {Role.budget?.perMonth} / week</h1>
                </div>
                <div>
                  <h1>
                    📆1 season {Role.dateRangeStart} - {Role.dateRangeEnd}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <h3>Match</h3>
            <h1 className="text-soilHeading1 text-soilPurple font-poppins font-semibold">
              65%
            </h1>
          </div>
          <ProjectChampion member={Project.champion!} />
          {/* <div className="flex items-center justify-center">
            <p></p>
          </div> */}
        </div>
      </div>
      <ProgressStepper
        steps={[
          { name: "Applied", completed: ApplicationProgress.applied },
          { name: "Reviewed", completed: ApplicationProgress.reviewed },
          { name: "Assesment", completed: ApplicationProgress.assesment },
          { name: "interview", completed: ApplicationProgress.interview },
          { name: "Induction", completed: ApplicationProgress.induction },
          { name: "Onboarding", completed: ApplicationProgress.onboarding },
        ]}
      />
    </Modal>
  );
};
