import React from "react";
import { Card, TextHeading2, TextBody } from "ui";

// export interface TopicCardProps {

// }
export const TopicCard = ({}) => {
  return (
    <Card shadow={true}>
      <div>
        <div className="space-y-6 ">
          <TextHeading2>
            Topic #1: Viability of the $CODE token in the long run
          </TextHeading2>
          <hr className="h-[4px] pb-6 w-50"></hr>
        </div>
        <TextBody>
          <div className="pb-4">
            <p>🗼 $CODE estimated value is $0.3014 </p>
          </div>
          <div>
            <p>
              🧠 Core team has recieved allocations of 1000 $CODE each. To vote
              on the proposals you now have to hold at least 400 $CODE apart
              from the NFT. Also, by buying 400 tokens you now are able to buy
              your way into the DAO. What do you think about it? Share your
              thoughts. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.Volutpat
              commodo sed egestas egestas fringilla. Viverra orci sagittis eu
              volutpat odio. Viverra orci sagittis eu volutpat odio.
            </p>
          </div>
        </TextBody>
      </div>
    </Card>
  );
};
