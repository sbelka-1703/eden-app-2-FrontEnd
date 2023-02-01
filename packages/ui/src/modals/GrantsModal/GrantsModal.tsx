import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  GrantTemplate,
  Maybe,
  Mutation,
} from "@eden/package-graphql/generated";
import { Button, GrantsInfo, Loading, Modal } from "@eden/package-ui";
import { getDynamicURL } from "@eden/package-ui/utils/dynamic-url";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

export const APPLY_GRANT = gql`
  mutation ($fields: applyGrantInput!) {
    applyGrant(fields: $fields) {
      _id
    }
  }
`;

export interface IGrantsModalProps {
  grant?: Maybe<GrantTemplate>;
  open?: boolean;
  onClose?: () => void;
}

export const GrantsModal = ({ grant, open, onClose }: IGrantsModalProps) => {
  const { currentUser } = useContext(UserContext);
  const [isApplying, setIsApplying] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [applyGrant] = useMutation(APPLY_GRANT, {
    onCompleted({ applyGrant }: Mutation) {
      if (!applyGrant) console.log("applyGrant is null");
      toast.success("Successfully Applied to Grant");
      setIsApplying(false);
    },
  });

  if (!grant) return null;

  const handleApply = () => {
    if (!currentUser) {
      toast.error("You must be logged in to apply for a grant");
      return;
    }
    if (
      !currentUser.onbording?.signup ||
      currentUser.onbording?.percentage! < 50
    ) {
      toast.error("Your profile must be filled 50% minimum");
      return;
    }
    // setIsApplying(true);
    // applyGrant({
    //   variables: {
    //     fields: {
    //       grantID: grant._id,
    //       memberID: currentUser._id,
    //     },
    //   },
    // });

    window.open(
      getDynamicURL("https://airtable.com/shrs5Y5wNEISaB7Uc", [
        {
          name: "prefill_Eden+Profile",
          value:
            "https://eden-grants.vercel.app/profile/" +
            currentUser?.discordName,
        },
        { name: "prefill_Microgrant+Name", value: grant.name || "" },
        {
          name: "prefill_Discord+Handle",
          value:
            `${currentUser?.discordName}#${currentUser?.discriminator}` || "",
        },
      ]),
      "_blank"
    );
  };

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        {isApplying ? (
          <Loading title={`Redirecting...`} />
        ) : (
          <GrantsInfo grant={grant} />
        )}
      </div>
      {!isApplying && (
        <div className={`flex justify-between`}>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`${baseUrl}/grants/${grant?._id}`);
              toast.success("grant link copied to clipboard");
            }}
          >
            Share
          </Button>
          <Button variant={`primary`} onClick={() => handleApply()}>
            Apply
          </Button>
        </div>
      )}
    </Modal>
  );
};
