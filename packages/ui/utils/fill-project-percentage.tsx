import { Project } from "@eden/package-graphql/generated";

export const getFillProjectPercentage = (project: Project) => {
  let progress = 0;

  if (!!project.title) progress += 10;
  if (!!project.descriptionOneLine) progress += 10;
  if (!!project.description) progress += 10;

  if (progress > 100) progress = 100;

  return Math.ceil(progress);
};
