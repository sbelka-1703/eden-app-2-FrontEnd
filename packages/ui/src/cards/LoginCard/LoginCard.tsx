import { signIn } from "next-auth/react";
import { Button, Card } from "ui";

export interface ILoginCardProps {}

export const LoginCard = ({}: ILoginCardProps) => {
  return (
    <Card shadow className={`h-5/10 bg-white p-6`}>
      <div
        className={`text-darkGreen my-12 text-center text-2xl font-semibold uppercase`}
      >
        you must be logged in
      </div>
      <div className={`mt-24 flex justify-center`}>
        <Button onClick={() => signIn("discord")}>Login with Discord</Button>
      </div>
    </Card>
  );
};
