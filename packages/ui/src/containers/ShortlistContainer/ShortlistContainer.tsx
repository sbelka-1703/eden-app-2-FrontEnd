import { LaunchProjectContext } from "@context/eden";
import { useContext } from "react";

import { Card } from "../../elements";

export interface IShortlistContainerProps {}

export const ShortlistContainer = ({}: IShortlistContainerProps) => {
  const { project } = useContext(LaunchProjectContext);

  return (
    <>
      <Card className="mb-8 bg-white p-6">{JSON.stringify(project)}</Card>
    </>
  );
};
