import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

import { PartialGuild } from "../../../types/type";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session) {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Guild = () => {
  const [guilds, setGuilds] = useState<Array<PartialGuild>>([]);

  return (
    <div>
      <button
        onClick={async () => {
          const result = await fetch(
            encodeURI("/api/discord/fetchMutualGuilds")
          );

          if (result.ok) {
            const data = await result.json();

            setGuilds(data.guilds);
          } else {
            setGuilds([]);
          }
        }}
      >
        Test
      </button>
      <ul role={"list"}>
        {guilds.length !== 0 ? (
          guilds.map((guild) => <li key={guild.id}>{guild.name}</li>)
        ) : (
          <li>No Guilds</li>
        )}
      </ul>
    </div>
  );
};

export default Guild;
