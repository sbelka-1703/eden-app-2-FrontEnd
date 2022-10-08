// TODO: needs a test file
/* eslint-disable camelcase */
import { useMutation } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { UPDATE_MEMBER } from "@eden/package-graphql";
import { Maybe, Mutation, RoleTemplate } from "@eden/package-graphql/generated";
import {
  Button,
  Card,
  RoleSelector,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { useContext } from "react";
import { BsArrowRight } from "react-icons/bs";

export interface ISignUpRoleSelectCardProps {
  roles?: Maybe<Array<Maybe<RoleTemplate>>>;
  refetch?: () => void;
  onNext: () => void;
}

export const SignUpRoleSelectCard = ({
  roles,
  refetch,
  onNext,
}: ISignUpRoleSelectCardProps) => {
  const { currentUser } = useContext(UserContext);

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted({ updateMember }: Mutation) {
      if (!updateMember) console.log("updateMember is null");
      refetch?.();
    },
  });

  return (
    <>
      <Card className={`bg-white p-6`}>
        <div className={`mb-8 text-center`}>
          <TextHeading3>What role fits you?</TextHeading3>
          <TextBody>
            Choose a role that fits you best, you can always change it later.
          </TextBody>
        </div>
        <RoleSelector
          roles={roles as Maybe<Maybe<RoleTemplate>[]>}
          onSelect={(role) => {
            // console.log(role);
            if (!role?._id || !currentUser?._id) return;
            updateMember({
              variables: {
                fields: {
                  _id: currentUser?._id,
                  memberRole: role?._id,
                  onbording: {
                    signup: true,
                  },
                },
              },
            });
          }}
        />
        <div className={`col-span-1 `}>
          <div className={`flex justify-end`}>
            <Button onClick={() => onNext()} variant={`primary`}>
              Next <BsArrowRight className={`my-auto ml-2`} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
