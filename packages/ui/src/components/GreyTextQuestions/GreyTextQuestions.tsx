export interface IGreyTextQuestionsProps {
  questions: string[];
}

export const GreyTextQuestions = ({ questions }: IGreyTextQuestionsProps) => {
  return (
    <div className="pl-2 pt-2 text-left text-blue-200">
      <ol className="list-decimal">
        {questions.map((question: string, idx: number) => {
          return <li key={idx.toString()}>{question}</li>;
        })}
      </ol>
    </div>
  );
};
