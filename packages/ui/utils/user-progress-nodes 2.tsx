import { Members } from "@eden/package-graphql/generated";

export const getUserProgressNodes = (user: Members) => {
  let progress = 0;

  // if (!!user.links?.length) progress += 20;
  if (!!user.bio) progress += 20;
  if (!!user.memberRole) progress += 20;
  // if (!!user.skills?.length) progress += 5 * Math.min(user.skills?.length, 12);
  if (!!user.nodes?.length) progress += 15 * Math.min(user.nodes?.length, 12);

  if (progress > 100) progress = 100;

  return Math.ceil(progress);
};
