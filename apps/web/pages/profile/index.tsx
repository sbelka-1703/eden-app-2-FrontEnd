import { useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_ROLE_TEMPLATES } from "@eden/package-graphql";
import {
  AppUserSubmenuLayout,
  Card,
  EditProfileContainer,
  MemberInfo,
  SEO,
} from "@eden/package-ui";
import { useContext, useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

import type { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const submenu = [
    {
      Icon: <FaUserAlt size={20} />,
      FunctionName: "My Profile",
      onFunctionCallback: () => setActiveIndex(0),
    },
    {
      Icon: <FaUserEdit size={25} />,
      FunctionName: "Edit Profile",
      onFunctionCallback: () => setActiveIndex(1),
    },
  ];

  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  return (
    <>
      <SEO />

      {activeIndex === 0 && (
        <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
          <Card
            shadow
            className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}
          >
            <div className={`p-4 md:p-8`}>
              <MemberInfo
                member={currentUser}
                setExperienceOpen={setExperienceOpen!}
                experienceOpen={experienceOpen!}
              />
            </div>
          </Card>
        </AppUserSubmenuLayout>
      )}
      {activeIndex === 1 && (
        <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
          <Card
            shadow
            className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}
          >
            <EditProfileContainer roles={dataRoles?.findRoleTemplates} />
          </Card>
        </AppUserSubmenuLayout>
      )}
    </>
  );
};

export default ProfilePage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
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
