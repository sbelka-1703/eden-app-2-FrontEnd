/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { EditText } from "../EditText";

export interface IAddYourOwnQuestionsProps {
  questions: string[];
  // eslint-disable-next-line no-unused-vars
  onEnter: any;
}

export const AddYourOwnQuestions = ({
  questions,
  onEnter,
}: IAddYourOwnQuestionsProps) => {
  const [newQuestionActive, setNewQuestionActive] = useState<boolean>(false);

  const SetNewQuestionActive = (value: boolean) => {
    setNewQuestionActive(value);
  };

  const onClickExistingQuestion = () => {
    if (newQuestionActive) setNewQuestionActive(false);
  };

  useEffect(() => {
    console.log(`AddYourOwnQuestions changed questions`);
    console.log(questions);
  }, [questions, JSON.stringify(questions)]);

  return (
    <div>
      <ol className="list-decimal">
        {questions &&
          questions.map((question: string, idx: number) => {
            return (
              <li className="mt-1" key={idx.toString()}>
                <EditText
                  text={question}
                  onClick={onClickExistingQuestion}
                  onEnter={onEnter}
                  width="3/4"
                  idx={idx}
                />
              </li>
            );
          })}
        {newQuestionActive && (
          <li className="mt-1" key="0">
            <EditText
              text={""}
              onEnter={onEnter}
              width="3/4"
              idx={questions.length}
              setter={SetNewQuestionActive}
            />
          </li>
        )}
      </ol>
      <button
        className="bg-transparent"
        onClick={() => setNewQuestionActive(true)}
      >
        <img className="mt-2 h-8 w-8" src="./plus.png" alt="" />
      </button>
    </div>
  );
};
