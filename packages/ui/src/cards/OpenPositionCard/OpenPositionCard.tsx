import { Maybe, RoleType } from "@eden/package-graphql/generated";
import { Badge, Button, Card } from "@eden/package-ui";

export interface OpenPositionCardProps {
  role?: Maybe<RoleType>;
  percentage?: number;
  onApply: () => void;
  onRefer: () => void;
}

export const OpenPositionCard = ({
  role,
  percentage,
  onApply,
  onRefer,
}: OpenPositionCardProps) => {
  return (
    <>
      <Card shadow>
        <div className="p-0">
          <div className="flex flex-row	justify-between">
            <span className="text-2xl font-medium">Designer</span>
            <span className="text-soilPurple text-2xl font-semibold">
              {percentage}%
            </span>
          </div>
          <div className="mt-2">
            <Badge text="Python" cutText={10} colorRGB="255, 105, 180, 1" />
          </div>
          <div className="mt-2 text-base font-normal">Description</div>
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
                {role?.hoursPerWeek} open position
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
              Refer 🪙
            </Button>
            <Button
              variant="default"
              radius="default"
              size="lg"
              onClick={onApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
