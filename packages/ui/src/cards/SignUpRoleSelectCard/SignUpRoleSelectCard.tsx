// TODO: needs a test file
/* eslint-disable camelcase */
import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER } from "@eden/package-graphql";
import { Maybe, Mutation, RoleTemplate } from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  Loading,
  RoleSelector,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export interface ISignUpRoleSelectCardProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  refetch?: () => void;
}

export const SignUpRoleSelectCard = ({
  roles,
  refetch,
}: ISignUpRoleSelectCardProps) => {
  const { currentUser } = useContext(UserContext);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      refetch?.();
    },
  });

  const handleSelectRole = () => {
    if (!currentUser) return;
    setIsUpdating(true);
    updateMember({
      variables: {
        fields: {
          _id: currentUser?._id,
          memberRole: selectedRoleId,
          onbording: {
            signup: true,
          },
        },
      },
    });
  };

  return (
    <Card shadow className={`h-64 bg-white p-6`}>
      {isUpdating ? (
        <Loading title={"Updating..."} />
      ) : (
        <>
          <div className={`mb-8 text-center`}>
            <TextHeading3>What role fits you?</TextHeading3>
            <TextBody>
              Choose a role that fits you best, you can always change it later.
            </TextBody>
          </div>
          <RoleSelector
            roles={roles as Maybe<Maybe<RoleTemplate>[]>}
            onSelect={(role) => {
              setSelectedRoleId(role?._id as string);
            }}
          />
          <div className={`col-span-1 `}>
            <div className={`flex justify-end`}>
              <Button
                disabled={!selectedRoleId}
                onClick={() => handleSelectRole()}
                variant={`primary`}
              >
                Next <BsArrowRight className={`my-auto ml-2`} />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
