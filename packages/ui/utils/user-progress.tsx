import { Members } from "@graphql/eden/generated";

export const getUserProgress = (user: Members) => {
  let progress = 0;

  // if (!!user.links?.length) progress += 20;
  if (!!user.bio) progress += 20;
  if (!!user.memberRole) progress += 20;
  if (!!user.skills?.length) progress += 5 * Math.min(user.skills?.length, 12);

  return Math.ceil(progress);
};
