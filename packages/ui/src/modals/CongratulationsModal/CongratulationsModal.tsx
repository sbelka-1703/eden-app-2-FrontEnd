import {
  Button,
  ConfettiContainer,
  Modal,
  TextHeading3,
} from "@eden/package-ui";
import { useRouter } from "next/router";

export interface CongratulationsModalProps {
  openModal?: boolean;
}

export const CongratulationsModal = ({
  openModal,
}: CongratulationsModalProps) => {
  const router = useRouter();

  return (
    <>
      <Modal open={openModal} closeOnEsc={false}>
        <div className={`h-5/10 -mx-6`}>
          <div className="absolute top-0 left-0 z-10 h-full w-full">
            <ConfettiContainer></ConfettiContainer>
          </div>
          <div className="z-20 flex h-full w-full items-center justify-center">
            <TextHeading3>YOU DID IT!</TextHeading3>
          </div>
          <div className={`absolute bottom-2  z-20 flex w-full justify-center`}>
            <Button
              variant={`secondary`}
              onClick={() => {
                router.push("/");
              }}
            >
              Home
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
