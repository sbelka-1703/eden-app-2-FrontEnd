import { Avatar, Card, TextHeading2 } from "@eden/package-ui";

export interface IOnboardRoomCardProps {}

export const OnboardRoomCard = ({}: IOnboardRoomCardProps) => {
  return (
    <Card shadow className={`bg-white p-4`}>
      <div className={`flex`}>
        <div className={``}>
          <Avatar
            isProject
            size={`sm`}
            src={`https://pbs.twimg.com/profile_images/1595723986524045312/fqOO4ZI__400x400.jpg`}
          />
        </div>
        <div className={`my-auto ml-4`}>
          <TextHeading2>Eden x Art Basel</TextHeading2>
        </div>
      </div>
      <div className={`mt-2 flex`}>
        <div>📍</div>
        <div
          className={`text-darkGreen font-poppins xl:text-md ml-4 space-y-4 text-xs sm:text-sm`}
        >
          {/* <p>
                    {`IRL: Miami beach boat dock 🛥Virtual Meet-up in Gather Town🚀`}
                  </p> */}
          <p>
            {`Be the first one to hear about Eden Microgrant Incentive
                    Program 🌱 & connect with special guests IRL and on Gather
                    Town!`}
          </p>
        </div>
      </div>
    </Card>
  );
};
