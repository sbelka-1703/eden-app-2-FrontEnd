import "./styles.css";

export interface ILifetimeTRST {
  member?: any;
  lifetimeStakeTRST?: any;
  averageMonthlyReturnTRST?: any;
}

export const LifetimeTRST = ({
  lifetimeStakeTRST,
  member,
  averageMonthlyReturnTRST,
}: ILifetimeTRST) => {
  if (!member) return null;
  return (
    <div className="bg-soilGreen-400 group relative cursor-pointer whitespace-nowrap rounded-xl px-2 text-sm">
      {`Lifetime stake: ${lifetimeStakeTRST} $TRST`}
      <div className="pointer-events-none absolute -top-32 -ml-4 hidden w-60 rounded-xl border bg-white p-2 shadow-md group-hover:block">
        <div className="bg-soilGreen-400 mx-auto mb-2 rounded-xl px-2 text-center text-sm">
          {`Lifetime stake: ${lifetimeStakeTRST} $TRST`}
        </div>
        <p className="mb-1 w-full whitespace-normal">
          {`@${member?.name}’s lifetime stake in other members is ${lifetimeStakeTRST} $TRST.
          @${member?.name}’s average monthly return is ${averageMonthlyReturnTRST} $TRST`}
        </p>
        <p className="text-soilGray w-full whitespace-normal text-xs">
          {`On Eden since Aug 2022 (3 month)`}
        </p>
      </div>
    </div>
  );
};
