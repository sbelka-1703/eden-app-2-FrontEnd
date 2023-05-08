import { SummaryQuestionType } from "@eden/package-graphql/generated";
import { Button, PopoverOnHover, TextHeading2 } from "@eden/package-ui";
import { FC, useEffect, useState } from "react";

type PopoverScoreReasonProps = {
  children: React.ReactNode;
  question: SummaryQuestionType;
  size?: "sm" | "md" | "lg";
  ubication?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
};

export const PopoverScoreReason: FC<PopoverScoreReasonProps> = ({
  children,
  question,
  size = "md",
  ubication = "top",
}) => {
  const ContentToShow = () => {
    const [showContentOne, setShowContentOne] = useState(true);

    useEffect(() => {
      () => setShowContentOne(true);
    }, []);

    const content1 = (
      <>
        {question.score && (
          <TextHeading2 className="mb-2 text-center">
            Why{" "}
            <span className="text-colorFFA9F1 font-extrabold">
              {question.score * 10}%
            </span>
            ?
          </TextHeading2>
        )}
        <p className="mb-6 text-sm">{question.reason}</p>
      </>
    );

    const content2 = (
      <div>
        <p>{question.questionContent ? question.questionContent : null}</p>
        <p>{question.bestAnswerCompany ? question.bestAnswerCompany : null}</p>
        <p>{question.answerContent ? question.answerContent : null}</p>
      </div>
    );
    const handleChangeContent = () => {
      setShowContentOne(!showContentOne);
    };

    return (
      <div>
        <>{showContentOne ? content1 : content2}</>
        <div className="flex justify-end pt-4">
          <Button size="sm" variant="secondary" onClick={handleChangeContent}>
            {showContentOne ? "See Responses" : "Back"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PopoverOnHover size={size} ubication={ubication} Content={ContentToShow}>
      {children}
    </PopoverOnHover>
  );
};
