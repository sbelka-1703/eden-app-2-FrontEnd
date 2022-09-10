import { Members } from "@graphql/eden/generated";
interface IUserAttributes {
  [key: string]: boolean;
  links: boolean;
  bio: boolean;
}
export const getUserProgress = (user: Members) => {
  const userAttributes: IUserAttributes = {
    skills: false,
    links: false,
    bio: false,
  };

  if (!!user.skills?.length) userAttributes.skills = true;
  if (!!user.links?.length) userAttributes.links = true;
  if (!!user.bio) userAttributes.bio = true;

  let numCompleted = 0;

  for (const attribute in userAttributes) {
    if (userAttributes[attribute]) numCompleted += 1;
  }

  return Math.ceil((numCompleted * 100) / Object.keys(userAttributes).length);
};
