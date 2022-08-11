import { Avatar } from "../../elements";

export interface IUserWithDescriptionProps {
  avatarSrc?: string;
  title?: string;
  name?: string;
}

export const UserWithDescription = ({
  avatarSrc,
  title,
  name,
}: IUserWithDescriptionProps) => {
  return (
    <div className={`font-Inter flex-col content-center text-center`}>
      <Avatar src={avatarSrc} />
      <div className={`pt-2 uppercase`}>{title}</div>
      <div className={`font-sm text-neutral-500`}>{name}</div>
    </div>
  );
};
