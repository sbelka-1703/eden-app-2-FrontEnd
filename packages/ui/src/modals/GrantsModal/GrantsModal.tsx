import { GrantTemplate, Maybe } from "@eden/package-graphql/generated";
import { Button, GrantsInfo, Modal } from "@eden/package-ui";
import { toast } from "react-toastify";

export interface IGrantsModalProps {
  grant?: Maybe<GrantTemplate>;
  open?: boolean;
  onClose?: () => void;
}

export const GrantsModal = ({ grant, open, onClose }: IGrantsModalProps) => {
  if (!grant) return null;
  return (
    <Modal open={open} onClose={onClose}>
      <div className={`h-8/10 scrollbar-hide w-full overflow-scroll`}>
        <GrantsInfo grant={grant} />
      </div>
      <div className={`flex justify-between`}>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.VERCEL_URL}/grants/${grant?._id}`
            );
            toast.success("grant link copied to clipboard");
          }}
        >
          Share
        </Button>
        <Button variant={`primary`} onClick={() => console.log("apply")}>
          Apply
        </Button>
      </div>
    </Modal>
  );
};
