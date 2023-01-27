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
          <div className={`text-center text-sm p-4`}>{`<GridItemThree />`}</div>{" "}
        </GridItemThree>
        <GridItemNine className={`bg-gray-300`}>
          <div className={`text-center text-sm p-4`}>{`<GridItemNine />`}</div>

          <div className={`bg-gray-400`}>
            <div className={`text-center text-sm p-4`}>{`<CardGrid />`}</div>
            <CardGrid>
              {cardGrid.map((item, index) => (
                <Card
                  key={index}
                  className={`text-center text-sm bg-gray-500 p-4 h-40 text-white`}
                >{`<Card />`}</Card>
              ))}
            </CardGrid>
          </div>
        </GridItemNine>
      </GridLayout>
    </>
  );
};
