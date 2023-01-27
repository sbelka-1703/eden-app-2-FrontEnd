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
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwelve />`}</GridItemTwelve>

        <GridItemSix
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemSix />`}</GridItemSix>
        <GridItemSix
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemSix />`}</GridItemSix>

        <GridItemFour
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemFour />`}</GridItemFour>
        <GridItemFour
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemFour />`}</GridItemFour>
        <GridItemFour
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemFour />`}</GridItemFour>

        <GridItemThree
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemThree
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemThree
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemThree
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemThree />`}</GridItemThree>

        <GridItemTwo
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwo />`}</GridItemTwo>
        <GridItemTwo
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemTwo />`}</GridItemTwo>

        <GridItemFour
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemFour />`}</GridItemFour>
        <GridItemEight
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemEight />`}</GridItemEight>

        <GridItemThree
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemThree />`}</GridItemThree>
        <GridItemNine
          className={`bg-gray-300 p-4 text-center text-sm`}
        >{`<GridItemNine />`}</GridItemNine>
      </GridLayout>
    </>
  );
};
