import {
  Avatar,
  Badge,
  GridItemTwelve,
  GridLayout,
  //   NodeList,
} from "@eden/package-ui";
import clsx from "clsx";
import { ReactNode } from "react";

import type { CandidatesResponseData } from "./types";

const ColumnStyled = ({
  extraCssClass,
  children,
  textColor = "text-gray-900",
}: {
  extraCssClass?: string;
  textColor?: string;
  children: string | ReactNode;
}) => (
  <td
    className={clsx(
      "text-md border bg-white  px-4 py-3 text-center",
      textColor,
      extraCssClass
    )}
  >
    {children}
  </td>
);

function random(mn: number, mx: number) {
  return Math.random() * (mx - mn) + mn;
}

export const CandidatesTableList = ({
  candidatesList,
}: {
  candidatesList: CandidatesResponseData;
}) => {
  const candidatesListFormatted =
    candidatesList.data.findCompany.candidates.map((candidate) => {
      return {
        avatar: candidate.user.discordAvatar,
        name: candidate.user.discordName,
        role: [
          "Project Manager",
          "Frontend Developer",
          "Backend Developer",
          "Scrum Master",
          "Blockchain Developer",
        ][Math.floor(random(0, 5))],
        match: candidate.overallScore,
        background: ["Ex-Meta", "Bankless", "Finance & Trading"], // candidate.user.nodes,
        level: ["Junior", "Mid level", "Senior"][Math.floor(random(0, 3))],
        usdcHour: [90, 50, 40, 35, 30, 45, 80][Math.floor(random(0, 7))],
        responseRate: [
          "< 3 hours",
          "1 day",
          "< 12 hours",
          "< 2 days",
          "< 1 hour",
          "1 day",
        ][Math.floor(random(0, 6))],
      };
    });

  return (
    <GridLayout>
      <GridItemTwelve>
        <table className="text-md w-full border-collapse border-2 border-black">
          <thead className="text-gray-500">
            <tr>
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
            {candidatesListFormatted.map(
              ({
                avatar,
                name,
                role,
                match,
                background,
                level,
                usdcHour,
                responseRate,
              }) => (
                <tr key={`${name}${match}`}>
                  <ColumnStyled extraCssClass="border-r-0">
                    <Avatar
                      size="xs"
                      src={avatar}
                      alt={`${name.trim()}-avatar`}
                    />
                  </ColumnStyled>
                  <ColumnStyled extraCssClass="border-l-0">{name}</ColumnStyled>
                  <ColumnStyled>{role}</ColumnStyled>
                  <ColumnStyled textColor="text-fuchsia-600">
                    {match} %
                  </ColumnStyled>
                  <ColumnStyled>
                    {background
                      ? background.map((experience) => (
                          <Badge
                            key={experience}
                            colorRGB="224,192,245"
                            text={experience}
                            cutText={17}
                          />
                        ))
                      : null}
                    {/* <NodeList colorRGB="224,192,245" nodes={background} /> */}
                  </ColumnStyled>
                  <ColumnStyled>
                    <Badge colorRGB="153,255,204" text={level} cutText={9} />
                  </ColumnStyled>
                  <ColumnStyled>{usdcHour}</ColumnStyled>
                  <ColumnStyled>{responseRate}</ColumnStyled>
                </tr>
              )
            )}
          </tbody>
        </table>
      </GridItemTwelve>
    </GridLayout>
  );
};
