import { gql, useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import { FIND_ROLE_TEMPLATES } from "@eden/package-graphql";
import { Members } from "@eden/package-graphql/generated";
import {
  AppUserSubmenuLayout,
  Badge,
  Button,
  Card,
  EditProfileContainer,
  MemberInfo,
  // NewProfileContainer,
  SelectNodesModal,
  SEO,
} from "@eden/package-ui";
import { useContext, useState } from "react";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";

export const ADD_NODES = gql`
  mutation ($fields: addNodesToMemberInput!) {
    addNodesToMember(fields: $fields) {
      _id
    }
  }
`;

const DELETE_NODES = gql`
  mutation ($fields: deleteNodesFromMemberInput!) {
    deleteNodesFromMember(fields: $fields) {
      _id
    }
  }
`;

import type { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
  const { currentUser } = useContext(UserContext);
  // const [experienceOpen, setExperienceOpen] = useState<number | null>(null);

  const { data: dataRoles } = useQuery(FIND_ROLE_TEMPLATES, {
    variables: {
      fields: {},
    },
    context: { serviceName: "soilservice" },
  });

  // console.log("currentUser = " , currentUser)

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

  const [openModalExpertise, setopenModalExpertise] = useState(false);

  const [openModalTypeProject, setopenModalTypeProject] = useState(false);

  const [addNodes] = useMutation(ADD_NODES, {
    onError(error) {
      console.log("error", error);
    },
  });

  const [deleteNodes] = useMutation(DELETE_NODES, {
    onError(error) {
      console.log("error", error);
    },
  });

  const handleSaveNodes = (data: string[]) => {
    if (!currentUser) return;
    addNodes({
      variables: {
        fields: {
          memberID: currentUser._id,
          nodesID: data,
        },
      },
    });
  };

  const handleDeleteNodes = (data: string[]) => {
    if (!currentUser) return;
    deleteNodes({
      variables: {
        fields: {
          memberID: currentUser._id,
          nodesID: data,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  return (
    <>
      <SEO />
      <AppUserSubmenuLayout submenu={submenu} activeIndex={activeIndex}>
        <Card
          shadow
          className={`h-85 scrollbar-hide overflow-y-scroll bg-white`}
        >
          {activeIndex === 0 && (
            <div className={`p-4 md:p-8`}>
              <MemberInfo member={currentUser as Members} />
            </div>
          )}
          {activeIndex === 1 && (
            <>
              <Card shadow className={`mb-4 p-6`}>
                <div className={`flex justify-between`}>
                  <div>
                    <Button
                      onClick={() => setopenModalExpertise(!openModalExpertise)}
                    >
                      Select Skills
                    </Button>
                  </div>
                  <div>
                    {currentUser?.nodes?.map((item, index) => {
                      if (item?.nodeData?.node == "sub_expertise") {
                        return (
                          <Badge
                            key={index}
                            text={item?.nodeData?.name || ""}
                            colorRGB={`209,247,196`}
                            className={`font-Inter text-sm`}
                            cutText={16}
                            closeButton={true}
                            onClose={() => {
                              handleDeleteNodes([`${item?.nodeData?._id}`]);
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </Card>

              <Card shadow className={`mb-4 p-6`}>
                <div className={`flex justify-between`}>
                  <div>
                    <Button
                      onClick={() =>
                        setopenModalTypeProject(!openModalTypeProject)
                      }
                    >
                      Select Type Project
                    </Button>
                  </div>
                  <div>
                    {currentUser?.nodes?.map((item, index) => {
                      if (item?.nodeData?.node == "sub_typeProject") {
                        return (
                          <Badge
                            key={index}
                            text={item?.nodeData?.name || ""}
                            colorRGB={`209,147,296`}
                            className={`font-Inter text-sm`}
                            cutText={16}
                            closeButton={true}
                            onClose={() => {
                              handleDeleteNodes([`${item?.nodeData?._id}`]);
                            }}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </Card>

              <SelectNodesModal
                title="Add your Expertise"
                openModal={openModalExpertise}
                onClose={() => {
                  setopenModalExpertise(false);
                }}
                onSubmit={(val: any) => {
                  handleSaveNodes(val);
                  setopenModalExpertise(false);
                }}
                nodeType={`expertise`}
              />

              <SelectNodesModal
                title="Add the Types of Projects that you like"
                openModal={openModalTypeProject}
                onClose={() => {
                  setopenModalTypeProject(false);
                }}
                onSubmit={(val: any) => {
                  handleSaveNodes(val);
                  setopenModalTypeProject(false);
                }}
                nodeType={`typeProject`}
              />

              <EditProfileContainer roles={dataRoles?.findRoleTemplates} />
            </>
          )}
        </Card>
      </AppUserSubmenuLayout>
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
