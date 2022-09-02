import { useRouter } from "next/router";
import { Button, GridItemSix, GridLayout } from "ui";

export default function Web() {
  const router = useRouter();

  return (
    <GridLayout>
      <GridItemSix className={`h-4/10 col-span-6 m-4`}> </GridItemSix>
      <GridItemSix className={`h-4/10 col-span-6 m-auto`}>
        <div className={`lg:mt-24`}>
          <Button variant={`primary`} onClick={() => router.push(`/projects`)}>
            user app
          </Button>
        </div>
      </GridItemSix>

      <GridItemSix className={`col-span-6 m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/signup`)}>
          new user signup
        </Button>
      </GridItemSix>
      <GridItemSix className={`col-span-6 m-4`}>
        <Button variant={`primary`} onClick={() => router.push(`/launch`)}>
          launch a project
        </Button>
      </GridItemSix>
    </GridLayout>
  );
}
