import { Endorsements, Maybe } from "@eden/package-graphql/generated";
import { Card, LevelAvatar, TextBody, TextHeading3 } from "@eden/package-ui";
import { FiExternalLink } from "react-icons/fi";

export interface EndorsementsProps {
  endoresement?: Maybe<Endorsements>;
  level?: number;
}

export const EndorsementCard: React.FC<EndorsementsProps> = ({
  endoresement,
  level,
}) => {
  if (!endoresement) return null;

  return (
    <Card shadow border className="relative mt-8 p-6">
      <div className="-mt-14 flex w-full flex-col items-center">
        {
          <LevelAvatar
            src={endoresement?.endorser?.discordAvatar || ""}
            level={level}
            size={`md`}
          />
        }
        <TextHeading3 className="text-soilGray">
          @{endoresement?.endorser?.discordName}
        </TextHeading3>
      </div>
      <section className={`mb-6`}>
        <TextBody>{endoresement?.endorsementMessage}</TextBody>
      </section>
      {endoresement?.arweaveTransactionID && (
        <section className={`absolute bottom-2`}>
          <span
            className={`flex w-full text-xs font-semibold text-zinc-700/70 hover:text-zinc-600`}
          >
            <a
              href={`https://viewblock.io/arweave/tx/${endoresement?.arweaveTransactionID}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1"
            >
              <div className="mr-2 w-[28px]">
                {/* Arweave Logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 31.8 31.8"
                  // style="enable-background:new 0 0 31.8 31.8;"
                  xmlSpace="preserve"
                >
                  <style type="text/css"></style>
                  <circle
                    className="fill-none stroke-[#222326] stroke-[2.5px]"
                    cx="15.9"
                    cy="15.9"
                    r="14.7"
                  />
                  <path
                    className="fill-[#222326]"
                    d="M18.7,21.2c-0.1-0.1-0.1-0.3-0.2-0.5c0-0.2-0.1-0.4-0.1-0.6c-0.2,0.2-0.4,0.3-0.6,0.5c-0.2,0.2-0.5,0.3-0.7,0.4  c-0.3,0.1-0.5,0.2-0.9,0.3c-0.3,0.1-0.7,0.1-1,0.1c-0.6,0-1.1-0.1-1.6-0.3c-0.5-0.2-0.9-0.4-1.3-0.7c-0.4-0.3-0.6-0.7-0.8-1.1  c-0.2-0.4-0.3-0.9-0.3-1.4c0-1.2,0.5-2.2,1.4-2.8c0.9-0.7,2.3-1,4.1-1h1.7v-0.7c0-0.6-0.2-1-0.5-1.3c-0.4-0.3-0.9-0.5-1.6-0.5  c-0.6,0-1,0.1-1.3,0.4c-0.3,0.3-0.4,0.6-0.4,1h-3c0-0.5,0.1-1,0.3-1.4c0.2-0.4,0.5-0.8,1-1.2c0.4-0.3,0.9-0.6,1.5-0.8  c0.6-0.2,1.3-0.3,2.1-0.3c0.7,0,1.3,0.1,1.9,0.3c0.6,0.2,1.1,0.4,1.6,0.8c0.4,0.3,0.8,0.8,1,1.3c0.2,0.5,0.4,1.1,0.4,1.8v5  c0,0.6,0,1.1,0.1,1.5c0.1,0.4,0.2,0.8,0.3,1v0.2H18.7z M15.8,19.1c0.3,0,0.6,0,0.8-0.1c0.3-0.1,0.5-0.2,0.7-0.3  c0.2-0.1,0.4-0.2,0.5-0.4c0.1-0.1,0.3-0.3,0.4-0.4v-2h-1.5c-0.5,0-0.9,0-1.2,0.1c-0.3,0.1-0.6,0.2-0.8,0.4c-0.2,0.2-0.4,0.3-0.5,0.6  c-0.1,0.2-0.1,0.5-0.1,0.7c0,0.4,0.1,0.7,0.4,1C14.8,19,15.3,19.1,15.8,19.1z"
                  />
                </svg>
              </div>
              <span>Stored on the permaweb with Arweave</span>
              <span>
                <FiExternalLink className="ml-1" />
              </span>
            </a>
          </span>
        </section>
      )}
    </Card>
  );
};
