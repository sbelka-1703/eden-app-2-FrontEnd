import { CandidateType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  GridItemTwelve,
  GridLayout,
  Loading,
} from "@eden/package-ui";
import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"td"> {
  extraCssClass?: string;
  textColor?: string;
  children: string | ReactNode;
}

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
  candidatesList: CandidateType[];
  fetchIsLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  setRowObjectData?: (user: CandidateType) => void;
};

export const CandidatesTableList: React.FC<CandidatesTableListProps> = ({
  candidatesList,
  fetchIsLoading,
  setRowObjectData,
}) => {
  const handleObjectDataSelection = (user: CandidateType) => {
    setRowObjectData && setRowObjectData(user);
  };

  // const candidates = candidatesList.map((candidate: CandidateType) => {
  //   return {
  //     _id: parseInt(candidate._id!),
  //     name: candidate.discordName,
  //     avatar: candidate.discordAvatar,
  //     score: candidate.overallScore, //
  //     usdcHour: candidate.user!.budget!.perHour,
  //     background: candidate.user!.previousProjects?.map(
  //       (project: any) => project.title
  //     ),
  //     role: candidate.user!.memberRole?.title,
  //     level: "Junior", // candidate.user...,
  //     responseRate: 15, // candidate.user.chat....
  //     // reason: candidate.summaryQuestions,
  //     summaryQuestions: candidate.summaryQuestions,
  //   };
  // });

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
                  key={`${candidate.user?._id}-${idx}`}
                  onClick={() => handleObjectDataSelection(candidate)}
                  className="cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-300"
                >
                  <ColumnStyled extraCssClass="border-r-0">
                    {idx + 1}
                  </ColumnStyled>
                  <ColumnStyled extraCssClass="border-r-0 pr-0">
                    <Avatar
                      size="xs"
                      src={candidate.user?.discordAvatar!}
                      alt={`${candidate.user?.discordName!.trim()}-avatar`}
                    />
                  </ColumnStyled>
                  <ColumnStyled extraCssClass="border-l-0 pl-0">
                    {candidate.user?.discordName!}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.user?.memberRole?.title
                      ? candidate.user?.memberRole?.title
                      : null}
                  </ColumnStyled>
                  <ColumnStyled textColor="text-fuchsia-600">
                    {candidate.overallScore
                      ? `${candidate.overallScore} %`
                      : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.user?.previousProjects
                      ? candidate.user.previousProjects.map(
                          (experience, idx) => {
                            return (
                              <>
                                {experience?.title ? (
                                  <Badge
                                    key={`${experience}${idx}`}
                                    colorRGB="224,192,245"
                                    text={experience.title}
                                    cutText={17}
                                  />
                                ) : null}
                              </>
                            );
                          }
                        )
                      : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.user?.memberRole?.title ? (
                      <Badge
                        colorRGB="153,255,204"
                        text={candidate.user?.memberRole?.title}
                        cutText={9}
                      />
                    ) : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {candidate.user!.budget!.perHour
                      ? candidate.user!.budget!.perHour
                      : null}
                  </ColumnStyled>
                  <ColumnStyled>
                    {/* {candidate.responseRate ? candidate.responseRate : null} */}
                    15% (hardoded)
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
