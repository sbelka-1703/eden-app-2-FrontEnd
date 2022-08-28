import { gql, useMutation } from "@apollo/client";
import { UserContext } from "@context/eden";
import { Maybe, Mutation, Project } from "@graphql/eden/generated";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Avatar, Card, Favorite } from "ui";

const SET_FAVORITE = gql`
  mutation ($fields: addFavoriteProjectInput!) {
    addFavoriteProject(fields: $fields) {
      _id
    }
  }
`;

export interface IFavoriteProps {
  id: Maybe<string> | undefined;
  favorite: boolean;
}

export interface ProjectRecommendedCardProps {
  project?: Project;
  avatar?: string;
}

export const ProjectRecommendedCard = ({
  project,
  avatar,
}: ProjectRecommendedCardProps) => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser?.projects && currentUser?.projects.length > 0 && project) {
      currentUser?.projects.forEach((element) => {
        if (project?._id === element?.info?._id) {
          updateFav(element?.favorite || false);
        }
      });
    }
  }, [currentUser?.projects, project]);

  const router = useRouter();

  const [addFavoriteProject, {}] = useMutation(SET_FAVORITE, {
    onCompleted({ addFavoriteProject }: Mutation) {
      if (!addFavoriteProject) console.log("addFavoriteProject is null");
    },
  });

  const [fav, updateFav] = useState(false);
  const onClickFav = () => {
    addFavoriteProject({
      variables: {
        fields: {
          projectID: project?._id,
          memberID: currentUser?._id,
          favorite: !fav,
        },
      },
    });
    updateFav(!fav);
  };

  if (!project) return null;

  return (
    <Card shadow className="bg-white p-0">
      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-row justify-between">
          <Avatar src={avatar} size={`sm`} />
          <Favorite favorite={fav} onFavorite={() => onClickFav()} />
        </div>
        <div className={`mt-6 w-full`}>
          <div className="flex h-full">
            <div className={`-mt-2 mr-auto`}>
              <div className={`text-darkGreen text-xl font-medium`}>
                {project.title}
              </div>
              <div className={`text-base text-zinc-400`}>
                {project.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="align-center mt-4 flex w-full justify-center rounded-b-lg bg-slate-200 py-3 px-2 text-lg">
        <button onClick={() => router.push(`/apply/${project?._id}`)}>
          <div className="align-center text-darkGreen flex w-full cursor-pointer justify-center text-base">
            <div>More Info</div>
            <div className="px-2">{">"}</div>
          </div>
        </button>
      </div>
    </Card>
  );
};
