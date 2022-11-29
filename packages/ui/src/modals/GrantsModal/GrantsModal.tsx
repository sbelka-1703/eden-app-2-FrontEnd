import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  GrantTemplate,
  Maybe,
  Mutation,
} from "@eden/package-graphql/generated";
import { Button, GrantsInfo, Loading, Modal } from "@eden/package-ui";
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
    setIsApplying(true);
    applyGrant({
      variables: {
        fields: {
          grantID: grant._id,
          memberID: currentUser._id,
        },
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        {isApplying ? (
          <Loading title={`Applying...`} />
        ) : (
          <GrantsInfo grant={grant} />
        )}
      </div>
      {!isApplying && (
        <div className={`flex justify-between`}>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_VERCEL_URL}/grants/${grant?._id}`
              );
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
