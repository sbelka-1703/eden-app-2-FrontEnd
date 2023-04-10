import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  KeywordValue,
  Members,
  NodesType,
} from "@eden/package-graphql/generated";
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
import { useContext, useEffect, useState } from "react";

import {
  EndorsementView1,
  EndorsementView2,
  EndorsementView3,
  EndorsementView4,
} from "./components";

// eslint-disable-next-line no-unused-vars
export enum ENDORSEMENT_STEPS {
  // eslint-disable-next-line no-unused-vars
  CHAT = "CHAT",
  // eslint-disable-next-line no-unused-vars
  SUBMIT_ENDORSEMENT = "SUBMIT_ENDORSEMENT",
  // eslint-disable-next-line no-unused-vars
  SUCCESS = "SUCCESS",
  // eslint-disable-next-line no-unused-vars
  WARNING = "WARNING",
  // eslint-disable-next-line no-unused-vars
  FILL_PROFILE = "FILL_PROFILE",
}

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

export interface IChatMessages {
  user?: string;
  message?: string;
}

export interface IEndorsementFlowProps {
  endorsementID?: string;
}

export const EndorsementFlow = ({ endorsementID }: IEndorsementFlowProps) => {
  const { currentUser } = useContext(UserContext);
  const [memberSelected, setMemberSelected] = useState<Members>();
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([]);
  const [keywords, setKeywords] = useState<KeywordValue[]>([]);

  const [endorsedSkills, setEndorsedSkills] = useState<NodesType[]>([]);

  const [step, setStep] = useState(ENDORSEMENT_STEPS.CHAT);

  const [error, setError] = useState<boolean | null>(null);

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
    onError: () => {
      setError(true);
    },
  });

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
      {step !== ENDORSEMENT_STEPS.FILL_PROFILE && (
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
              {error ? (
                <div
                  className={`grid h-full place-content-center text-center text-2xl font-semibold text-zinc-700`}
                >
                  <div>Sorry, No Endorsement Link Found</div>
                  <div>Please Check the Link</div>
                </div>
              ) : (
                <>
                  {/* CHAT */}
                  {step === ENDORSEMENT_STEPS.CHAT && (
                    <EndorsementView1
                      member={memberSelected}
                      onNext={() =>
                        setStep(ENDORSEMENT_STEPS.SUBMIT_ENDORSEMENT)
                      }
                      rating={currentRating}
                      onRatingChange={setCurrentRating}
                      chatMessages={chatMessages}
                      onChatMessagesChange={setChatMessages}
                      endorsedSkills={endorsedSkills}
                      keywords={keywords}
                      onKeywordsChange={setKeywords}
                    />
                  )}
                  {/* SUBMIT_ENDORSEMENT */}
                  {step === ENDORSEMENT_STEPS.SUBMIT_ENDORSEMENT && (
                    <EndorsementView2
                      member={memberSelected}
                      onWarning={() => setStep(ENDORSEMENT_STEPS.WARNING)}
                      onNext={() => setStep(ENDORSEMENT_STEPS.SUCCESS)}
                      onBack={() => setStep(ENDORSEMENT_STEPS.CHAT)}
                      rating={currentRating}
                      onRatingChange={setCurrentRating}
                      chatMessages={chatMessages}
                      keywords={keywords}
                    />
                  )}
                </>
              )}
            </Card>
          </GridItemNine>
          <Modal
            open={
              step === ENDORSEMENT_STEPS.SUCCESS ||
              step === ENDORSEMENT_STEPS.WARNING
            }
            onClose={() => setStep(ENDORSEMENT_STEPS.CHAT)}
          >
            {/* SUCCESS */}
            {step === ENDORSEMENT_STEPS.SUCCESS && (
              <EndorsementView3
                member={memberSelected}
                onNext={() => setStep(ENDORSEMENT_STEPS.CHAT)}
              />
            )}
            {/* WARNING */}
            {step === ENDORSEMENT_STEPS.WARNING && (
              <EndorsementView4
                member={memberSelected}
                onNext={() => setStep(ENDORSEMENT_STEPS.FILL_PROFILE)}
                onClose={() => setStep(ENDORSEMENT_STEPS.CHAT)}
              />
            )}
          </Modal>
        </>
      )}

      {/* FILL_PROFILE */}
      {step === ENDORSEMENT_STEPS.FILL_PROFILE && (
        <>
          <GridItemSix>
            <Card shadow className={"h-85 bg-white"}>
              <FillUserProfileContainer
                step={profileStep}
                state={userState}
                setState={setUserState}
                setStep={setProfileStep}
                setExperienceOpen={setExperienceOpen}
                setView={() => setStep(ENDORSEMENT_STEPS.CHAT)}
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
    </GridLayout>
  );
};
