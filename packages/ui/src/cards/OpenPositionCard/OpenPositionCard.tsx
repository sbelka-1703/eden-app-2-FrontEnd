import { Maybe, RoleType } from "@eden/package-graphql/generated";
import { Badge, Button, Card } from "@eden/package-ui";

export interface OpenPositionCardProps {
  role?: Maybe<RoleType>;
  percentage?: number;
  // eslint-disable-next-line no-unused-vars
  onApply: (val: string) => void;
  onRefer?: () => void;
}

export const OpenPositionCard = ({
  role,
  percentage,
  onApply,
  onRefer,
}: OpenPositionCardProps) => {
  if (!role) return null;
  // console.log("role", role);
  return (
    <>
      <Card shadow border>
        <div className="p-0">
          <div className="flex flex-row	justify-between">
            <span className="text-2xl font-medium">{role?.title}</span>
            <span className="text-soilPurple text-2xl font-semibold">
              {percentage}%
            </span>
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
          <div className="mt-2 text-base font-normal">{role?.description}</div>
          <div>
            <div className="flex flex-row p-1">
              <div>🕓</div>
              <div
                className={`ml-1 text-base font-medium capitalize text-slate-900	`}
              >
                {role?.hoursPerWeek} hours/week
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div>💰</div>
              <div
                className={`ml-1 text-base font-medium capitalize text-slate-900`}
              >
                TRST ${role?.budget?.totalBudget}
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div>🗓</div>
              <div
                className={`ml-1 text-base font-medium capitalize text-slate-900	`}
              >
                {role?.hoursPerWeek} seasons
              </div>
            </div>
            <div className="flex flex-row p-1">
              <div>🪑</div>
              <div
                className={`ml-1 text-base font-medium capitalize text-slate-900	`}
              >
                {role?.openPositions} open position
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-row justify-between">
            <Button
              variant="default"
              radius="default"
              size="lg"
              onClick={onRefer}
            >
              Refer 💸
            </Button>
            <Button
              variant="default"
              radius="default"
              size="lg"
              onClick={() => onApply(role._id as string)}
            >
              Apply
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
