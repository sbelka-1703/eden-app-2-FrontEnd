import {
  GridItemEight,
  GridItemFour,
  GridItemNine,
  GridItemSix,
  GridItemThree,
  GridItemTwelve,
  GridItemTwo,
  GridLayout,
} from "../layout/GridLayout";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Design System/Grid",
};

export const Grid = () => {
  return (
    <>
      <GridLayout className={`bg-gray-200`}>
        <GridItemTwelve
          className={`text-center text-sm`}
        >{`<GridLayout />`}</GridItemTwelve>

        <GridItemTwelve
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwelve />`}</GridItemTwelve>

        <GridItemSix
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemSix />`}</GridItemSix>
        <GridItemSix
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemSix />`}</GridItemSix>

        <GridItemFour
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemFour />`}</GridItemFour>
        <GridItemFour
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemFour />`}</GridItemFour>
        <GridItemFour
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemFour />`}</GridItemFour>

        <GridItemThree
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemThree
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemThree
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemThree
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemThree />`}</GridItemThree>

        <GridItemTwo
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemTwo />`}</GridItemTwo>

        <GridItemFour
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemFour />`}</GridItemFour>
        <GridItemEight
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemEight />`}</GridItemEight>

        <GridItemThree
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemNine
          className={`text-center text-sm bg-gray-300 p-4`}
        >{`<GridItemNine />`}</GridItemNine>
      </GridLayout>
    </>
  );
};
