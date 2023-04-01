import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members, NodesType } from "@eden/package-graphql/generated";
import {
  CandidateProfileCard,
  Card,
  FillUserProfileContainer,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridLayout,
  Modal,
  ViewUserProfileContainer,
} from "@eden/package-ui";
import { STEPS } from "@eden/package-ui/utils";
import { getFillProfilePercentage } from "@eden/package-ui/utils/fill-profile-percentage";
import { useCallback, useContext, useEffect, useState } from "react";

import {
  EndorsementView1,
  EndorsementView2,
  EndorsementView3,
  EndorsementView4,
} from "./components";

const FIND_ENDORSEMENT_LINK = gql`
  query ($fields: findEndorsementLinkInput) {
    findEndorsementLink(fields: $fields) {
      _id
      createdAt
      memberInfo {
        _id
        discordName
        discordAvatar
        memberRole {
          _id
          title
        }
      }
      message
      nodes {
        nodeData {
          _id
          name
          node
        }
      }
    }
  }
`;

type IChatMessages = any;

export interface IEndorsementFlowProps {
  endorsementID?: string;
}

export const EndorsementFlow = ({ endorsementID }: IEndorsementFlowProps) => {
  const { currentUser } = useContext(UserContext);
  const [memberSelected, setMemberSelected] = useState<Members>();
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);

  const [endorsedSkills, setEndorsedSkills] = useState<NodesType[]>([]);

  const [step, setStep] = useState(0);

  useQuery(FIND_ENDORSEMENT_LINK, {
    variables: {
      fields: {
        _id: endorsementID,
      },
    },
    skip: !endorsementID,
    onCompleted: (data) => {
      setMemberSelected(data.findEndorsementLink[0].memberInfo);
      setEndorsedSkills(data.findEndorsementLink[0].nodes);
    },
  });

  const handleNext = useCallback(() => {
    if (step === 4) {
      setStep(0);
    } else setStep((prev) => prev + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step !== 0) setStep((prev) => prev - 1);
  }, [step]);

  const [userState, setUserState] = useState<Members>();
  const [profileStep, setProfileStep] = useState(STEPS.ROLE);
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  useEffect(() => {
    if (currentUser) {
      setUserState(currentUser);
    }
  }, [currentUser]);

  return (
    <GridLayout>
      {step !== 4 && (
        <>
          <GridItemThree>
            <Card shadow className={"bg-white"}>
              <CandidateProfileCard member={currentUser} />
              <div className={`p-4 font-semibold uppercase text-neutral-800`}>
                New Invitation
              </div>
            </Card>
          </GridItemThree>
          <GridItemNine>
            <Card
              shadow
              className={"scrollbar-hide h-85 overflow-scroll bg-white p-4"}
            >
              {step === 0 && (
                <EndorsementView1
                  member={memberSelected}
                  onNext={handleNext}
                  rating={currentRating}
                  onRatingChange={setCurrentRating}
                  chatMessages={chatMessages}
                  onChatMessagesChange={setChatMessages}
                  endorsedSkills={endorsedSkills}
                  keywords={keywords}
                  onKeywordsChange={setKeywords}
                />
              )}
              {step === 1 && (
                <EndorsementView2
                  member={memberSelected}
                  onNext={handleNext}
                  onBack={handleBack}
                  rating={currentRating}
                  onRatingChange={setCurrentRating}
                  chatMessages={chatMessages}
                  keywords={keywords}
                />
              )}
            </Card>
          </GridItemNine>
        </>
      )}

      {step === 4 && (
        <>
          <GridItemSix>
            <Card shadow className={"h-85 bg-white"}>
              <FillUserProfileContainer
                step={profileStep}
                state={userState}
                setState={setUserState}
                setStep={setProfileStep}
                setExperienceOpen={setExperienceOpen}
                setView={() => setStep(0)}
                percentage={userState ? getFillProfilePercentage(userState) : 0}
              />
            </Card>
          </GridItemSix>
          <GridItemSix>
            <Card shadow className={"h-85 bg-white"}>
              <ViewUserProfileContainer
                step={profileStep}
                user={userState}
                experienceOpen={experienceOpen}
                setExperienceOpen={setExperienceOpen}
              />
            </Card>
          </GridItemSix>
        </>
      )}

      <Modal open={step === 2 || step === 3} onClose={() => setStep(0)}>
        {step === 2 && (
          <EndorsementView3 member={memberSelected} onNext={handleNext} />
        )}
        {step === 3 && (
          <EndorsementView4
            member={memberSelected}
            onNext={handleNext}
            onClose={() => setStep(0)}
          />
        )}
      </Modal>
    </GridLayout>
  );
};
