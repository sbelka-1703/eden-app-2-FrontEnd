import { Members } from "@eden/package-graphql/generated";
import { Card, LevelAvatar, TextBody, TextHeading2 } from "@eden/package-ui";
import { FiExternalLink } from "react-icons/fi";

export interface EndorsementsProps {
  member: Members;
  text?: string;
  level?: number;
  arweaveTransactionID?: string;
}

export const EndorsementCard: React.FC<EndorsementsProps> = ({
  member,
  text,
  level,
  arweaveTransactionID,
}) => {
  if (!member) return null;
  return (
    <Card shadow border className="mt-8 p-6 ">
      <div className="-mt-14 flex w-full flex-col items-center">
        {
          <LevelAvatar
            src={member?.discordAvatar || ""}
            level={level}
            size={`md`}
          />
        }
        <TextHeading2 className="text-soilGray">
          @{member?.discordName}
        </TextHeading2>
      </div>
      {text && (
        <section>
          <TextBody>{text}</TextBody>
        </section>
      )}
      {arweaveTransactionID && (
        <section>
          <span
            className={`mt-4 flex w-full text-center text-sm font-semibold text-zinc-700/70 hover:text-zinc-800`}
          >
            <a
              href={`https://viewblock.io/arweave/tx/${arweaveTransactionID}`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1"
            >
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
