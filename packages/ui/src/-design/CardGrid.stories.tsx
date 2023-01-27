/* eslint-disable import/no-anonymous-default-export */
// eslint-disable-next-line import/no-anonymous-default-export
import { Card } from "../elements";
import {
  CardGrid,
  GridItemNine,
  GridItemThree,
  GridLayout,
} from "../layout/GridLayout";

export default {
  title: "Design System/CardGrid",
};

export const CardGridDesign = () => {
  const cardGrid = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <>
      <GridLayout className={`bg-gray-200`}>
        <GridItemThree className={`bg-gray-300`}>
          <div className={`p-4 text-center text-sm`}>{`<GridItemThree />`}</div>{" "}
        </GridItemThree>
        <GridItemNine className={`bg-gray-300`}>
          <div className={`p-4 text-center text-sm`}>{`<GridItemNine />`}</div>

          <div className={`bg-gray-400`}>
            <div className={`p-4 text-center text-sm`}>{`<CardGrid />`}</div>
            <CardGrid>
              {cardGrid.map((item, index) => (
                <Card
                  key={index}
                  className={`h-40 bg-gray-500 p-4 text-center text-sm text-white`}
                >{`<Card />`}</Card>
              ))}
            </CardGrid>
          </div>
        </GridItemNine>
      </GridLayout>
    </>
  );
};
