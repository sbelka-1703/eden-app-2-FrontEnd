import {
  AppUserSubmenuLayout,
  Button,
  HomeHeroSection,
  Modal,
  SEO,
} from "@eden/package-ui";

import type { NextPageWithLayout } from "../_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <SEO />
      <HomeHeroSection
        grantsPage
        projectsPage
        usersPage
        launchPage
        profilePage
      />
      <HomeTutorialModalContainer />
    </>
  );
};

HomePage.getLayout = (page) => (
  <AppUserSubmenuLayout>{page}</AppUserSubmenuLayout>
);

export default HomePage;

import { IncomingMessage, ServerResponse } from "http";
import dynamic from "next/dynamic";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  return {
    props: {},
  };
}

export enum HomeTutorialSteps {
  // eslint-disable-next-line no-unused-vars
  STEP_1 = "step 1",
  // eslint-disable-next-line no-unused-vars
  STEP_2 = "step 2",
  // eslint-disable-next-line no-unused-vars
  STEP_3 = "step 3",
  // eslint-disable-next-line no-unused-vars
  STEP_4 = "step 4",
}

const GraphVisual = dynamic(
  () => import("@eden/package-ui/g6/GraphVisual/GraphVisual"),
  {
    ssr: false,
  }
);

const HomeTutorialModalContainer = () => {
  const [openModal, setOpenModal] = useState<HomeTutorialSteps | null>(
    HomeTutorialSteps.STEP_1
  );
  const [data, setData] = useState<any>({});

  useEffect(() => {
    switch (openModal) {
      case HomeTutorialSteps.STEP_1:
        setData(updateGraph(dataMember));
        break;
      case HomeTutorialSteps.STEP_2:
        setData(updateGraph(dataMemberToProject));
        break;
      default:
    }
  }, [openModal]);

  console.log("data that goes on the graph:", data);

  return (
    <>
      <Modal closeOnEsc={false} open={!!openModal}>
        {openModal === HomeTutorialSteps.STEP_1 && (
          <div>
            <h1 className="text-center text-2xl">Welcome to Eden!</h1>
            <p className="text-center">This is how the network sees you</p>
            <p className="text-center">{`It's a bit empty, don't you think?`}</p>
            <Button
              className="absolute right-3 bottom-3 z-20"
              radius="rounded"
              variant={`secondary`}
              onClick={() => setOpenModal(HomeTutorialSteps.STEP_2)}
            >
              Next
            </Button>
          </div>
        )}
        {openModal === HomeTutorialSteps.STEP_2 && (
          <div>
            <h1 className="text-center text-2xl">In Eden you are a node</h1>
            <p className="text-center">{`And this is how it's all connected`}</p>
            <Button
              className="absolute right-3 bottom-3 z-20"
              radius="rounded"
              variant={`secondary`}
              onClick={() => setOpenModal(HomeTutorialSteps.STEP_3)}
            >
              Next
            </Button>
          </div>
        )}
        {openModal === HomeTutorialSteps.STEP_3 && (
          <div>
            <h1 className="text-center text-2xl">
              This is our ✨Knowledge Graph✨ today
            </h1>
            <div className="flex justify-center">
              <ul className="">
                <li>190 members</li>
                <li>6 projects</li>
                <li>3 grants</li>
              </ul>
            </div>
            <p className="text-center">
              <span className="bg-[#DEFEFF] px-2">{`Connect to Eden Network to get a match`}</span>
            </p>
            <Button
              className="absolute right-3 bottom-3 z-20"
              radius="rounded"
              variant={`secondary`}
              onClick={() => setOpenModal(HomeTutorialSteps.STEP_4)}
            >
              Next
            </Button>
          </div>
        )}
        {openModal === HomeTutorialSteps.STEP_4 && (
          <div>
            <h1 className="text-center text-2xl">{`Now, let's get you connected to the graph!`}</h1>
            <Button
              className="absolute right-3 bottom-3 z-20"
              radius="rounded"
              variant={`secondary`}
              onClick={() => setOpenModal(null)}
            >
              Next
            </Button>
          </div>
        )}
        <GraphVisual hasMenu={false} data2={data} width={720} height={400} />
      </Modal>
    </>
  );
};

const updateGraph = (data: any) => {
  const dataGraphAPI = data;

  console.log("dataGraphAPI = ", dataGraphAPI);
  const nodeDataObj: any = {};
  const edgesDataGraph = dataGraphAPI.edges.map(
    (edge: { source: any; target: any; distanceRation: any; style: any }) => {
      if (!nodeDataObj[edge.source]) {
        nodeDataObj[edge.source] = {
          numberConnections: 1,
        };
      } else {
        nodeDataObj[edge.source].numberConnections += 1;
      }
      if (!nodeDataObj[edge.target]) {
        nodeDataObj[edge.target] = {
          numberConnections: 1,
        };
      } else {
        nodeDataObj[edge.target].numberConnections += 1;
      }
      return {
        source: edge.source,
        target: edge.target,
        distanceRation: edge.distanceRation,
        style: edge.style,
      };
    }
  );

  let nodesDataGraph = dataGraphAPI.nodesVisual.map(
    (node: {
      _id: any;
      name: any;
      type: string;
      avatar: string;
      extraDistanceRation: Number;
      style: any;
    }) => {
      let extraStyle = {};

      if (node.avatar && node.avatar != undefined) {
        extraStyle = {
          // ----------- Shwow Avatar User ---------
          type: "image",
          img: node.avatar,
          clipCfg: {
            show: true,
            type: "circle",
            r: 25,
          },
          style: {
            height: 50,
            width: 50,
          },
          // ----------- Shwow Avatar User ---------
        };
      }
      if (!node.avatar && node.avatar != undefined) {
        extraStyle = {
          // ----------- Shwow Avatar User ---------
          type: node.type,
          // img: "",
          clipCfg: {},
          style: {},
          // ----------- Shwow Avatar User ---------
        };
      }

      return {
        id: node._id,
        label: node.name,
        nodeType: node.type,
        extraDistanceRation: node.extraDistanceRation,
        size: 50,
        numberConnections: nodeDataObj[node._id]
          ? nodeDataObj[node._id].numberConnections
          : 0,
        propertise: {
          name: node.name,
        },
        style: node.style,
        ...extraStyle,
      };
    }
  );

  if (nodesDataGraph.length == 0) {
    nodesDataGraph = [{ id: "node1", size: 50 }];
  }

  return {
    nodes: nodesDataGraph,
    edges: edgesDataGraph,
  };
};

const dataMember: any = {
  __typename: "Graph",
  nodesVisual: [
    {
      __typename: "NodeVisual",
      _id: "901188444057907310",
      name: "BluePanda",
      type: "Member",
      avatar:
        "https://cdn.discordapp.com/avatars/908392557258604544/5472104b88b4876e3ad06803da45bee6.png",
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#C5947C",
        stroke: "#C5947C",
        size: 20,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaf009df71c82f61c1784b",
      name: "Improve Website Performance",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaefc44862b62edc3037b4",
      name: "Wireframe implementation",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaf045df71c82f61c1793c",
      name: "Debug, troubleshoot code",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaeffadf71c82f61c1781b",
      name: "Cross-browser compatability",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaf063df71c82f61c1799c",
      name: "Animations, transitions",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaf027df71c82f61c178dc",
      name: "Back-end integration",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaf018df71c82f61c178ac",
      name: "Accessibility compliance",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaefebdf71c82f61c177eb",
      name: "Responsive web-apps",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eb077fdf71c82f61c1d826",
      name: "Privacy",
      type: "sub_typeProject",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#FBEDEC",
        stroke: "#F3B8B4",
        size: 40,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eb0772df71c82f61c1d7fe",
      name: "Sybil resistance",
      type: "sub_typeProject",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#FBEDEC",
        stroke: "#F3B8B4",
        size: 40,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaefc64862b62edc3037bc",
      name: "Provide Backend Support",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaefb44862b62edc30376e",
      name: "Frontend Developer",
      type: "expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E7F1FD",
        stroke: "#3882F5",
        size: 60,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eaefb64862b62edc303774",
      name: "Backend Developer",
      type: "expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#E7F1FD",
        stroke: "#3882F5",
        size: 60,
      },
    },
    {
      __typename: "NodeVisual",
      _id: "63eb074cdf71c82f61c1d18c",
      name: "Zk Technology",
      type: "typeProject",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        __typename: "StyleNodeOut",
        fill: "#FBF1F2",
        stroke: "#EC7E8B",
        size: 55,
      },
    },
  ],
  edges: [
    {
      __typename: "Edge",
      source: "63eaf009df71c82f61c1784b",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefc44862b62edc3037b4",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaf045df71c82f61c1793c",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaeffadf71c82f61c1781b",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaf063df71c82f61c1799c",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaf027df71c82f61c178dc",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaf018df71c82f61c178ac",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefebdf71c82f61c177eb",
      target: "63eaefb44862b62edc30376e",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb44862b62edc30376e",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eb077fdf71c82f61c1d826",
      target: "63eb074cdf71c82f61c1d18c",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 70,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eb074cdf71c82f61c1d18c",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eb0772df71c82f61c1d7fe",
      target: "63eb074cdf71c82f61c1d18c",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 70,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eb074cdf71c82f61c1d18c",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefc64862b62edc3037bc",
      target: "63eaefb64862b62edc303774",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 95,
        strength: 0.5,
      },
    },
    {
      __typename: "Edge",
      source: "63eaefb64862b62edc303774",
      target: "901188444057907310",
      distanceRation: null,
      style: {
        __typename: "StyleEdgeOut",
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 170,
        strength: 0.5,
      },
    },
  ],
};

const dataMemberToProject = {
  nodesVisual: [
    {
      _id: "908392557258604544",
      name: "BluePanda",
      type: "Member",
      avatar:
        "https://cdn.discordapp.com/avatars/908392557258604544/5472104b88b4876e3ad06803da45bee6.png",
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        fill: "#C5947C",
        stroke: "#C5947C",
        size: 20,
        __typename: "StyleNodeOut",
      },
      __typename: "NodeVisual",
    },
    {
      _id: "63eaefc44862b62edc3037b4",
      name: "Wireframe implementation",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
        __typename: "StyleNodeOut",
      },
      __typename: "NodeVisual",
    },
    {
      _id: "63ebca723f719753b8adbd22",
      name: "FrontEnd",
      type: "Role",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        fill: "#FCF8ED",
        stroke: "#F4BC67",
        size: 50,
        __typename: "StyleNodeOut",
      },
      __typename: "NodeVisual",
    },
    {
      _id: "63ebca723f7197ebd2adbd21",
      name: "Soil",
      type: "Project",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        fill: "#F9FEE6",
        stroke: "#CBFD50",
        size: 75,
        __typename: "StyleNodeOut",
      },
      __typename: "NodeVisual",
    },
    {
      _id: "63eaefeedf71c82f61c177f3",
      name: "Develop REST API",
      type: "sub_expertise",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        fill: "#E8F6F9",
        stroke: "#49A7CD",
        size: 45,
        __typename: "StyleNodeOut",
      },
      __typename: "NodeVisual",
    },
    {
      _id: "63ebca723f7197e22fadbd23",
      name: "BackEnd",
      type: "Role",
      avatar: null,
      fakeID: null,
      originalNode: null,
      extraDistanceRation: null,
      style: {
        fill: "#FCF8ED",
        stroke: "#F4BC67",
        size: 50,
        __typename: "StyleNodeOut",
      },
      __typename: "NodeVisual",
    },
  ],
  edges: [
    {
      source: "908392557258604544",
      target: "63eaefc44862b62edc3037b4",
      distanceRation: 0.5,
      style: {
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 200,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
    {
      source: "63eaefc44862b62edc3037b4",
      target: "63ebca723f719753b8adbd22",
      distanceRation: 0.5,
      style: {
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 130,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
    {
      source: "63ebca723f719753b8adbd22",
      target: "63ebca723f7197ebd2adbd21",
      distanceRation: 0.5,
      style: {
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 90,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
    {
      source: "908392557258604544",
      target: "63eaefeedf71c82f61c177f3",
      distanceRation: 0.5,
      style: {
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 200,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
    {
      source: "63eaefeedf71c82f61c177f3",
      target: "63ebca723f7197e22fadbd23",
      distanceRation: 0.5,
      style: {
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 130,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
    {
      source: "63ebca723f7197e22fadbd23",
      target: "63ebca723f7197ebd2adbd21",
      distanceRation: 0.5,
      style: {
        fill: "#E0E0E0",
        stroke: "#E0E0E0",
        distance: 90,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
    {
      source: "63ebca723f7197ebd2adbd21",
      target: "908392557258604544",
      distanceRation: null,
      style: {
        fill: "#FFFFFF",
        stroke: "#FFFFFF",
        distance: 500,
        strength: 0.5,
        __typename: "StyleEdgeOut",
      },
      __typename: "Edge",
    },
  ],
  __typename: "Graph",
};
