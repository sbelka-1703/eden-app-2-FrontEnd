import { gql, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { Members, NodesType } from "@eden/package-graphql/generated";
import {
  CandidateProfileCard,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
} from "@eden/package-ui";
import { useCallback, useContext, useState } from "react";

import {
  EndorsementView1,
  EndorsementView2,
  EndorsementView3,
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
      // console.log("FIND_ENDORSEMENT_LINK = ", data);
      // console.log("MEMBER", data.findEndorsementLink[0].memberInfo);
      setMemberSelected(data.findEndorsementLink[0].memberInfo);
      setEndorsedSkills(data.findEndorsementLink[0].nodes);
      // setLoading(false);
    },
  });

  const handleNext = useCallback(() => {
    if (step === 2) {
      setStep(0);
    } else setStep((prev) => prev + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step !== 0) setStep((prev) => prev - 1);
  }, [step]);

  return (
    <GridLayout>
      <GridItemThree>
        <Card shadow className={"bg-white"}>
          <CandidateProfileCard member={currentUser} />
          <div className={`p-4 font-semibold uppercase text-neutral-800`}>
            My Endorsements
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
            />
          )}
          {step === 2 && (
            <EndorsementView3 member={memberSelected} onNext={handleNext} />
          )}
        </Card>
      </GridItemNine>
    </GridLayout>
  );
};
