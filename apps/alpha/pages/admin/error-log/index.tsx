import { gql, useMutation, useQuery } from "@apollo/client";
import { AppUserSubmenuLayout, Avatar, Card, SEO } from "@eden/package-ui";
import { BsTrash } from "react-icons/bs";

import type { NextPageWithLayout } from "../../_app";

const FIND_ERRORS = gql`
  query ($fields: errorsInput) {
    errors(fields: $fields) {
      errorsData {
        _id
        errorType
        createdAt
        name
        component
        message
        path
        url
        memberInfo {
          _id
          discordName
          discordAvatar
          discriminator
        }
        code
        stacktrace
      }
      pageInfo {
        totalResults
      }
    }
  }
`;

const DELETE_ERROR = gql`
  mutation ($fields: deleteErrorInput!) {
    deleteError(fields: $fields) {
      _id
    }
  }
`;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ErrorLogPage: NextPageWithLayout = () => {
  const [typeSelected, setTypeSelected] = useState<string | null>("FRONTEND");
  const { data: dataErrors, refetch: refetchErrors } = useQuery(FIND_ERRORS, {
    variables: {
      fields: {
        errorType: typeSelected,
      },
    },
    // skip: !nodesID || !selectedServerID,
    context: { serviceName: "soilservice" },
  });

  const { errorsData, pageInfo } = dataErrors?.errors || {};

  //   if (errorsData) console.log("errorsData", errorsData);
  //   if (pageInfo) console.log("pageInfo", pageInfo);

  const [deleteError, {}] = useMutation(DELETE_ERROR, {
    onCompleted({ deleteError }) {
      if (!deleteError) console.log("deleteError is null");
      //   console.log("deleteError", deleteError);
      refetchErrors();
    },
  });

  const handleDeleteError = (_id: string) => {
    deleteError({
      variables: {
        fields: {
          _id: _id,
        },
      },
      context: { serviceName: "soilservice" },
    });
  };

  const formatDate = (date: any) => {
    const offset = 0;

    var d = new Date(date * 1);
    var utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
    var nd = new Date(utc + 3600000 * offset);

    return nd.toLocaleString();
  };

  const tabs = [
    {
      name: "FRONTEND",
      value: "FRONTEND",
      current: typeSelected === "FRONTEND",
    },
    { name: "BOT", value: "BOT", current: typeSelected === "BOT" },
    { name: "SERVER", value: "SERVER", current: typeSelected === "SERVER" },
    { name: "ALL", value: null, current: typeSelected === null },
  ];

  return (
    <>
      <SEO />
      <Card shadow className={`bg-white p-4 h-85`}>
        <div className={`flex justify-between`}>
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setTypeSelected(tab.value)}
                className={classNames(
                  tab.current
                    ? "bg-gray-200 text-gray-800"
                    : "text-gray-600 hover:text-gray-800",
                  "px-3 py-2 font-medium text-sm rounded-md"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
          <div className={`font-medium text-gray-600`}>
            {pageInfo?.totalResults} Total
          </div>
        </div>
        <Card className={`scrollbar-hide h-75 overflow-scroll`}>
          {errorsData &&
            errorsData.map((error: any) => (
              <Card
                key={error._id}
                border
                className={`my-2 p-4 text-gray-600 font-medium`}
              >
                <div className={`font-semibold flex justify-between`}>
                  <span className={`bg-green-200 px-2 rounded`}>
                    {error.errorType}
                  </span>
                  <button
                    className={`hover:text-red-800`}
                    onClick={() => handleDeleteError(error._id)}
                  >
                    <BsTrash size={20} />
                  </button>
                </div>
                <div className={`flex justify-between mt-2`}>
                  <div className={`flex`}>
                    <div>
                      <Avatar
                        src={error.memberInfo?.discordAvatar}
                        size={`sm`}
                      />
                    </div>
                    <div
                      className={`flex font-semibold text-gray-700 mx-4 text-lg`}
                    >
                      <div>{error.memberInfo?.discordName}</div>
                      <span className={`text-gray-500 text-xs mt-2`}>
                        #{error.memberInfo?.discriminator}
                      </span>
                    </div>
                  </div>
                  <div> {formatDate(error.createdAt)} - UTC</div>
                </div>
                <div className={`text-red-800`}>Message: {error.message}</div>
                {error.name && <div>Name: {error.name}</div>}
                {error.component && <div>Component: {error.component}</div>}
                {error.path.length > 0 && (
                  <div className={`flex`}>
                    Mutations
                    {error.path.map((item: string, index: number) => (
                      <div className={`ml-2`} key={index}>
                        : {item}
                      </div>
                    ))}
                  </div>
                )}

                {error.url && <div>URL: {error.url}</div>}
                {error.code && <div>Code: {error.code}</div>}
                {error.stacktrace.length > 0 && (
                  <div className={``}>
                    Stacktrace:
                    {error.stacktrace.map((item: string, index: number) => (
                      <ul className={`ml-4 text-xs`} key={index}>
                        - {item}
                      </ul>
                    ))}
                  </div>
                )}
              </Card>
            ))}
        </Card>
      </Card>
    </>
  );
};

ErrorLogPage.getLayout = (page) => (
  <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
);

export default ErrorLogPage;

import { IncomingMessage, ServerResponse } from "http";
import { getSession } from "next-auth/react";
import { useState } from "react";

export async function getServerSideProps(ctx: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const session = await getSession(ctx);

  const url = ctx.req.url?.replace("/", "");

  if (!session || session.error === "RefreshAccessTokenError") {
    return {
      redirect: {
        destination: `/login?redirect=${url}`,
        permanent: false,
      },
    };
  }

  if (session.accessLevel && session.accessLevel > 5) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
