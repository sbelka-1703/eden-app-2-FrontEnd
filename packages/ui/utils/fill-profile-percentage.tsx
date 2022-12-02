import { LinkType } from "@eden/package-graphql/generated";

export const getFillProfilePercentage = (user: any) => {
  let progress = 0;

  if (!!user.nodes?.length) progress += 5 * Math.min(user.nodes?.length, 12);
  if (!!user?.memberRole) progress += 10;
  if (!!user?.links)
    progress += user?.links.reduce((acc: number, link: LinkType) => {
      return !!link.url && acc < 10 ? acc + 5 : acc;
    }, 0);
  if (!!user?.bio) progress += 20;
  if (!!user?.background)
    progress += user?.background.reduce((acc: number, experience: any) => {
      return !!experience.title && acc < 30 ? acc + 10 : acc;
    }, 0);

  if (progress > 100) progress = 100;

  return Math.ceil(progress);
};
