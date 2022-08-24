import type { NextPage } from "next";
import { Card, GridItemSix, GridItemThree, GridLayout } from "ui";

const SignUpPage: NextPage = () => {
  return (
    <GridLayout>
      <GridItemThree>left side</GridItemThree>
      <GridItemSix>
        <Card shadow className="h-8/10 bg-white p-6">
          content here
        </Card>
      </GridItemSix>
      <GridItemThree>right side</GridItemThree>
    </GridLayout>
  );
};

export default SignUpPage;
