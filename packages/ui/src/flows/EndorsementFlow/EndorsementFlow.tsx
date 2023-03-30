import { UserContext } from "@eden/package-context";
import { Members } from "@eden/package-graphql/generated";
import { membersWorkedWithMock } from "@eden/package-mock";
import {
  CandidateProfileCard,
  Card,
  GridItemNine,
  GridItemThree,
  GridLayout,
} from "@eden/package-ui";
import { useCallback, useContext, useEffect, useState } from "react";

import {
  EndorsementView1,
  EndorsementView2,
  EndorsementView3,
} from "./components";

type IChatMessages = any;

export const EndorsementFlow = ({}) => {
  const { currentUser } = useContext(UserContext);
  const [memberSelected, setMemberSelected] = useState<Members>();
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([]);

  const [step, setStep] = useState(0);

  useEffect(() => {
    setMemberSelected(membersWorkedWithMock().member as any);
  }, []);

  const handleNext = useCallback(() => {
    if (step === 2) {
      setStep(0);
    } else setStep((prev) => prev + 1);
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
            />
          )}
          {step === 1 && (
            <EndorsementView2
              member={memberSelected}
              onNext={handleNext}
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
