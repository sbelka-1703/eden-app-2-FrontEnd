import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import React, { RefObject, useEffect, useRef, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

const FIND_MEMBER_GRAPH = gql`
  query ($fields: findMemberGraphInput!) {
    findMemberGraph(fields: $fields) {
      nodesVisual {
        _id
        name
        type
      }
      edges {
        source
        target
      }
    }
  }
`;

const FIND_MEMBER_PROJECT_GRAPH = gql`
  query ($fields: findMemberToProjectGraphInput!) {
    findMemberToProjectGraph(fields: $fields) {
      nodesVisual {
        _id
        name
        type
      }
      edges {
        source
        target
      }
    }
  }
`;

interface Node {
  id: string;
  size: number;
  label?: string;
  style?: {
    fill: string;
    stroke: string;
    lineWidth: number;
  };
}

interface DataState {
  nodes: Node[];
  edges: { source: string; target: string }[];
}

const G6Component = dynamic(
  () => import("@eden/package-ui/g6/G6Component/G6Component"),
  {
    ssr: false,
  }
);

const G6ComponentPage: NextPageWithLayout = () => {
  const refContainer = useRef<HTMLDivElement>();

  const [width, setWidth] = useState<number>(0);

  // create a function that handle a click and will pass on G6component component

  const { data: dataGraphAPImember } = useQuery(
    // const { data: dataGraphAPImember, refetch: refetchDataGraphAPI } = useQuery(
    FIND_MEMBER_GRAPH,
    {
      variables: {
        fields: {
          // memberID: "908392557258604544",
          // memberID: "812342397790191638",
          memberID: "961730944170090516",
        },
      },
      // skip: !nodesID || !selectedServerID,
      context: { serviceName: "soilservice" },
    }
  );

  const { data: dataGraphAPImemberProject } = useQuery(
    // const { data: dataGraphAPImember, refetch: refetchDataGraphAPI } = useQuery(
    FIND_MEMBER_PROJECT_GRAPH,
    {
      variables: {
        fields: {
          memberID: "908392557258604544",
        },
      },
      // skip: !nodesID || !selectedServerID,
      context: { serviceName: "soilservice" },
    }
  );

  useEffect(() => {
    let dataGraphAPI;

    // Use One of them!
    if (dataGraphAPImemberProject) {
      dataGraphAPI = dataGraphAPImemberProject.findMemberToProjectGraph;
    }
    // Use One of them!
    // if (dataGraphAPImember) {
    //   dataGraphAPI = dataGraphAPImember.findMemberGraph;
    // }

    if (dataGraphAPI) {
      // console.log("dataGraphAPImember = ", dataGraphAPImember);

      const nodeDataObj: any = {};
      const edgesDataGraph = dataGraphAPI.edges.map(
        (edge: { source: any; target: any }) => {
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
          };
        }
      );

      // console.log("edgesDataGraph = ", edgesDataGraph);

      const nodesDataGraph = dataGraphAPI.nodesVisual.map(
        (node: { _id: any; name: any; type: string }) => {
          const extraStyle = {};

          if (node._id == "637a914ab8953f12f501e1ca") {
            // extraStyle = {
            //   disabledNode: true,
            // };
          }
          return {
            id: node._id,
            label: node.name,
            type: node.type,
            size: 50,
            numberConnections: nodeDataObj[node._id]
              ? nodeDataObj[node._id].numberConnections
              : 0,
            propertise: {
              name: node.name,
            },
            ...extraStyle,
          };
        }
      );

      // console.log("nodesDataGraph = ", nodesDataGraph);

      setData({
        nodes: nodesDataGraph,
        edges: edgesDataGraph,
      });
    }
  }, [dataGraphAPImember, dataGraphAPImemberProject]);

  // const [data, setData] = React.useState<DataState>(data2);
  const [data, setData] = React.useState<DataState>({
    nodes: [{ id: "node1", size: 50 }],
    edges: [],
  });

  // const [disable]

  useEffect(() => {
    const getwidth = () => {
      setWidth(refContainer.current?.offsetWidth!);
    };

    // when the component gets mounted
    setWidth(refContainer.current?.offsetWidth!);

    // to handle page resize
    window.addEventListener("resize", getwidth);
    // remove the event listener before the component gets unmounted
    return () => window.removeEventListener("resize", getwidth);
  }, []);

  return (
    <>
      {refContainer && (
        <div className="w-full" ref={refContainer as RefObject<HTMLDivElement>}>
          {data && data.nodes && data.nodes.length > 0 ? (
            <G6Component
              width={width}
              height={(3 * width) / 4}
              data2={data}
              // data2={data2}
              // handleClick={handleClick}
            />
          ) : (
            <p>Dont have Graph Data Yet</p>
          )}
        </div>
      )}
    </>
  );
};

export default G6ComponentPage;
