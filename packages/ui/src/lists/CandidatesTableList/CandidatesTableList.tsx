import {
  Avatar,
  Badge,
  GridItemTwelve,
  GridLayout,
  Loading,
} from "@eden/package-ui";
import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

// import type { Candidate } from "./types";

interface InputGroupProps extends ComponentPropsWithoutRef<"td"> {
  extraCssClass?: string;
  textColor?: string;
  children: string | ReactNode;
}

type summaryQuestionType = {
  questionID: string;
  questionContent: string;
  answerContent: string;
  bestAnswerCompany: string | null;
  reason: string | null;
  score: number | null;
};

type CandidateLocalType = {
  _id: number;
  name: string;
  avatar: string;
  score: number;
  role?: string;
  background?: any[];
  level?: string;
  usdcHour?: number;
  responseRate?: number;
  reason: string;
  summaryQuestions: summaryQuestionType[];
};

const ColumnStyled: FC<InputGroupProps> = ({
  extraCssClass,
  children,
  textColor = "text-gray-900",
  ...otherProps
}) => (
  <td
    className={clsx(
      "text-md border  px-4 py-3 text-center",
      textColor,
      extraCssClass
    )}
    {...otherProps}
  >
    {children}
  </td>
);

type CandidatesTableListProps = {
  candidatesList: CandidateLocalType[];
  fetchIsLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setRowObjectData?: (user: CandidateLocalType) => void;
};

export const CandidatesTableList: React.FC<CandidatesTableListProps> = ({
  candidatesList,
  fetchIsLoading,
  setRowObjectData,
}) => {
  const handleObjectDataSelection = (user: CandidateLocalType) => {
    setRowObjectData && setRowObjectData(user);
  };

  return (
    <GridLayout>
      <GridItemTwelve>
        <table className="text-md w-full border-collapse border-2 border-black">
          <thead className="text-gray-500">
            <tr>
              <th className="border border-black py-4">#</th>
              <th colSpan={2} className="border border-black py-4">
                Name
              </th>
              <th className="border border-black py-4">Role</th>
              <th className="border border-black py-4">Match</th>
              <th className="border border-black py-4">Background</th>
              <th className="border border-black py-4">Level</th>
              <th className="border border-black py-4">
                USDC/
                <br />
                Hour
              </th>
              <th className="border border-black py-4">
                Response
                <br /> rate
              </th>
            </tr>
          </thead>
          <tbody>
            {fetchIsLoading ? (
              <tr>
                <td colSpan={8} className="content-center py-4">
                  <Loading />
                </td>
              </tr>
            ) : Boolean(candidatesList) ? (
              candidatesList.map((candidate, idx) => (
                <tr
                  key={`${candidate._id}`}
                  onClick={() => handleObjectDataSelection(candidate)}
                  className="cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-300"
                >
                  <ColumnStyled extraCssClass="border-r-0">
                    {idx + 1}
                  </ColumnStyled>
                  <ColumnStyled extraCssClass="border-r-0 pr-0">
                    <Avatar
                      size="xs"
                      src={candidate.avatar!}
                      alt={`${candidate.name!.trim()}-avatar`}
                    />
                  </ColumnStyled>
                  <ColumnStyled extraCssClass="border-l-0 pl-0">
                    {candidate.name!}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.role ? candidate.role : null}
                  </ColumnStyled>
                  <ColumnStyled textColor="text-fuchsia-600">
                    {candidate.score ? `${candidate.score} %` : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.background
                      ? candidate.background.map((experience, idx) => (
                          <Badge
                            key={`${experience}${idx}`}
                            colorRGB="224,192,245"
                            text={experience}
                            cutText={17}
                          />
                        ))
                      : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.level ? (
                      <Badge
                        colorRGB="153,255,204"
                        text={candidate.level}
                        cutText={9}
                      />
                    ) : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.usdcHour ? candidate.usdcHour : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.responseRate ? candidate.responseRate : null}
                  </ColumnStyled>
                </tr>
              ))
            ) : (
              <tr>
                <ColumnStyled
                  extraCssClass="content-center py-4"
                  textColor="black"
                  colSpan={8}
                >
                  No candidates found
                </ColumnStyled>
              </tr>
            )}
          </tbody>
        </table>
      </GridItemTwelve>
    </GridLayout>
  );
};
