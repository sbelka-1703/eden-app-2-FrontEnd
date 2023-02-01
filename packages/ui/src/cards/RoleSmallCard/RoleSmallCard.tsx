import { Maybe, Members, RoleType } from "@eden/package-graphql/generated";
import {
  AvatarMemberList,
  AvatarProps,
  Card,
  TextHeading3,
} from "@eden/package-ui";
// import { PencilIcon } from "@heroicons/react/solid";

export interface RoleSmallCardProps {
  role: Maybe<RoleType>;
  members?: Members[];
  avatars?: AvatarProps[];
  isSelected: boolean;
  onClick?: () => void;
  handleEdit?: (() => void) | undefined;
}

export const RoleSmallCard = ({
  role,
  members,
  isSelected,
  // handleEdit,
  onClick,
}: RoleSmallCardProps) => {
  return (
    <button className="flex h-full w-full items-center" onClick={onClick}>
      <Card
        border
        focused={isSelected}
        shadow
        className="h-full w-full overflow-hidden bg-white p-0"
      >
        <div className="flex cursor-pointer flex-col items-start justify-start px-3 py-2">
          {/* {handleEdit && (
            <PencilIcon
              width={20}
              className="text-soilGray absolute right-1 top-2 cursor-pointer hover:text-slate-400"
              onClick={(e) => {
                e.preventDefault();
                handleEdit!();
              }}
            />
          )} */}
          <TextHeading3 className="font-poppins text-sm font-semibold">
            {role?.title}
          </TextHeading3>
        </div>
        {members && (
          <div className="scrollbar-hide overflow-x-scroll px-2">
            <AvatarMemberList size={`xs`} members={members} />
          </div>
        )}
      </Card>
    </button>
  );
};
