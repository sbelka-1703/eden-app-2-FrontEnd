import { CandidateType } from "@eden/package-graphql/generated";
import {
  Avatar,
  Badge,
  GridItemTwelve,
  GridLayout,
  Loading,
  TextHeading2,
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
    className={clsx("text-md px-4 py-1", textColor, extraCssClass)}
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

  return (
    <GridLayout>
      <GridItemTwelve>
        <section className="scrollbar-hide w-full overflow-scroll rounded-md border border-gray-400 bg-white drop-shadow-md">
          <table className="text-md w-full">
            <thead className="bg-slate-200 text-gray-800 shadow-md">
              <tr>
                <th className="border-b border-r border-gray-400 py-2">#</th>
                <th className="min-w-min border-b border-gray-400 py-2">
                  Name
                </th>
                <th className="border-b border-gray-400 py-2">Role</th>
                <th className="border-b border-gray-400 py-2">Match</th>
                <th className="border-b border-gray-400 py-2 ">Background</th>
                <th className="border-b border-gray-400 py-2">Level</th>
                <th className="border-b border-gray-400 py-2 pr-2 text-right">
                  $/hour
                </th>
                {/* <th className="border border-black py-2">
                Response
                <br /> rate
              </th> */}
              </tr>
            </thead>
            <tbody>
              {fetchIsLoading ? (
                <tr>
                  <td colSpan={8} className="content-center py-2">
                    <Loading />
                  </td>
                </tr>
              ) : Boolean(candidatesList) ? (
                candidatesList.map((candidate, idx) => (
                  <tr
                    key={`${candidate.user?._id}-${idx}`}
                    onClick={() => handleObjectDataSelection(candidate)}
                    className="group cursor-pointer even:bg-slate-100 hover:bg-lime-50 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-300"
                  >
                    <ColumnStyled extraCssClass="text-center border-r">
                      {idx + 1}
                    </ColumnStyled>
                    <ColumnStyled extraCssClass="border-r-0 pr-0">
                      <div className=" flex flex-nowrap items-center">
                        <Avatar
                          size="xs"
                          src={candidate.user?.discordAvatar!}
                          alt={`${candidate.user?.discordName!.trim()}-avatar`}
                        />
                        <span className="ml-2">
                          {candidate.user?.discordName!}
                        </span>
                      </div>
                    </ColumnStyled>
                    <ColumnStyled extraCssClass="text-center">
                      {candidate.user?.memberRole?.title
                        ? candidate.user?.memberRole?.title
                        : null}
                    </ColumnStyled>
                    <ColumnStyled textColor="text-fuchsia-600 text-center">
                      {candidate.overallScore ? (
                        <TextHeading2 className="text-colorFFA9F1 font-black">{`${candidate.overallScore}%`}</TextHeading2>
                      ) : null}
                    </ColumnStyled>
                    <ColumnStyled extraCssClass="text-center max-w-xs overflow-hidden">
                      <div className="max-h-[40px] min-h-[40px] w-full transition-[max-height] duration-150 ease-in-out group-hover:max-h-[400px]">
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
                                        cutText={30}
                                      />
                                    ) : null}
                                  </>
                                );
                              }
                            )
                          : null}
                      </div>
                    </ColumnStyled>
                    <ColumnStyled>
                      {candidate?.user?.experienceLevel?.total ? (
                        <Badge
                          colorRGB="153,255,204"
                          text={
                            candidate?.user.experienceLevel?.total
                              ? candidate?.user.experienceLevel?.total <= 3
                                ? "Junior"
                                : candidate?.user.experienceLevel?.total <= 6
                                ? "Mid"
                                : "Senior"
                              : "Entry"
                          }
                          cutText={9}
                        />
                      ) : null}
                    </ColumnStyled>
                    <ColumnStyled className="pr-2 text-right">
                      {candidate.user!.budget!.perHour ? (
                        <TextHeading2 className="text-colorFFD02B font-black">
                          ${candidate.user!.budget!.perHour}
                        </TextHeading2>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </ColumnStyled>
                    {/* <ColumnStyled>
                    // {candidate.responseRate ? candidate.responseRate : null}
                    15% (hardoded)
                  </ColumnStyled> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <ColumnStyled
                    extraCssClass="text-center content-center py-2"
                    textColor="black"
                    colSpan={8}
                  >
                    No candidates found
                  </ColumnStyled>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </GridItemTwelve>
    </GridLayout>
  );
};
