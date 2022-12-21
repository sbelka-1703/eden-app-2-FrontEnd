import { Maybe, RoleType } from "@eden/package-graphql/generated";
import { Badge, Button, Card } from "@eden/package-ui";

import { round } from "../../../utils";

export interface OpenPositionCardProps {
  role?: Maybe<RoleType>;
  percentage?: number;
  padding?: string;
  // eslint-disable-next-line no-unused-vars
  onApply: (val: string) => void;
  onRefer?: () => void;
}

export const OpenPositionCard = ({
  role,
  percentage,
  padding,
  onApply,
}: // onRefer,
OpenPositionCardProps) => {
  if (!role) return null;
  return (
    <>
      <Card shadow border>
        <div className={padding}>
          <div className="flex flex-row	justify-between">
            <span className="text-xl font-medium">{role?.title}</span>
            {percentage && percentage > 0 ? (
              <span className="text-soilPurple text-xl font-semibold">
                {round(percentage, 0)}%
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex">
            {role?.skills?.map((skill, index) => {
              return (
                <div key={index}>
                  {index < 4 && (
                    <Badge
                      className={`mr-2 text-sm`}
                      text={skill?.skillData?.name || ""}
                      cutText={10}
                      colorRGB={`255, 105, 180, 1`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-sm font-normal tracking-wide">
            {role?.description}
          </div>
          <div className="text-xs font-medium">
            <div className="flex flex-row p-1">
              <div>🕓</div>
              <div className={`ml-1 capitalize text-slate-900	`}>
                {role?.hoursPerWeek} hours/week
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div>💰</div>
              <div className={`ml-1 capitalize text-slate-900`}>
                TRST ${role?.budget?.totalBudget}
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div>🗓</div>
              <div className={`ml-1 capitalize text-slate-900	`}>
                {role?.hoursPerWeek} seasons
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div>🪑</div>
              <div className={`ml-1 capitalize text-slate-900	`}>
                {role?.openPositions} open position
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-row justify-end">
            {/* TODO: Refer feature is not developed yet */}
            {/* <Button
              variant="secondary"
              radius="default"
              size="sm"
              onClick={onRefer}
            >
              Refer 💸
            </Button> */}
            <Button
              variant="secondary"
              radius="default"
              size="sm"
              onClick={() => onApply(role.title as string)}
            >
              More
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
