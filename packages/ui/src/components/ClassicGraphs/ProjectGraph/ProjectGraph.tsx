import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { RefObject, useEffect, useRef, useState } from "react";

import { edgeSettingsPreset } from "../../../../g6/GraphVisual/data/edgeSettingsPreset";
import { nodeSettingsPreset } from "../../../../g6/GraphVisual/data/nodeSettingsPreset";
import { Graph } from "../../../../g6/GraphVisual/settings/interfaceGraph";

const FIND_PROJECT_GRAPH = gql`
  query ($fields: findProjectGraphInput!) {
    findProjectGraph(fields: $fields) {
      nodesVisual {
        _id
        name
        type
        avatar
        fakeID
        originalNode
        extraDistanceRation
        style {
          fill
          stroke
          size
        }
      }
      edges {
        source
        target
        distanceRation
        style {
          fill
          stroke
          distance
          strength
        }
      }
    }
  }
`;

const GraphVisual = dynamic(
  () => import("@eden/package-ui/g6/GraphVisual/GraphVisual"),
  {
    ssr: false,
  }
);

export interface IProjectGraphProps {
  projectId: string;
}

export const ProjectGraph = ({ projectId }: IProjectGraphProps) => {
  const refContainer = useRef<HTMLDivElement>();
  const settingsGraphs = {
    useAvatar: true,
    updateGraph: false,
    projectID1: projectId,
  };

  const [data, setData] = useState<Graph>({
    nodes: [{ id: "node1", size: 50 }],
    edges: [],
  });
  const [width, setWidth] = useState<number>(0);

  const { data: dataGraphAPIProject } = useQuery(FIND_PROJECT_GRAPH, {
    variables: {
      fields: {
        projectID: settingsGraphs.projectID1,
        showAvatar: true,
        nodeSettings: [
          // nodeSettingsPreset["Member"]["main"],
          nodeSettingsPreset["sub_typeProject"]["main"],
          nodeSettingsPreset["typeProject"]["main"],
          nodeSettingsPreset["sub_expertise"]["main"],
          nodeSettingsPreset["expertise"]["main"],
          // nodeSettingsPreset["Project"]["main"],
          {
            ...nodeSettingsPreset["Project"]["main"],
            style: {
              ...nodeSettingsPreset["Project"]["main"].style,
              size: 90,
            },
          },
          {
            ...nodeSettingsPreset["Role"]["main"],
            style: {
              ...nodeSettingsPreset["Role"]["main"].style,
              size: 70,
            },
          },
          // nodeSettingsPreset["skill"]["main"],
        ],
        edgeSettings: [
          // // ------ split sub_typeProject|Member -------
          // edgeSettingsPreset["sub_typeProject|Member"]["typeProject"],
          // edgeSettingsPreset["sub_typeProject|typeProject"]["edge"],
          // edgeSettingsPreset["typeProject|Member"]["edge"],
          // // ------ split sub_typeProject|Member -------

          // // ------ split sub_expertise|Member -------
          // // edgeSettingsPreset["sub_expertise|Member"]["edge"],
          // edgeSettingsPreset["sub_expertise|Member"]["expertise"],
          // edgeSettingsPreset["sub_expertise|expertise"]["edge"],
          // edgeSettingsPreset["expertise|Member"]["edge"],
          // // ------ split sub_expertise|Member -------

          // ------ Project Edges -------
          edgeSettingsPreset["Project|Role"]["edgeXL"],
          edgeSettingsPreset["sub_expertise|Role"]["edge"],
          edgeSettingsPreset["sub_typeProject|Role"]["edge"],
          // edgeSettingsPreset["skill|Role"]["edge"],
          // ------ Project Edges -------

          // // // ------ skill Edges -------
          // // edgeSettingsPreset["skill|Member"]["edge"],
          // edgeSettingsPreset["skill|Member"]["doubleSplitEdge"],
          // edgeSettingsPreset["skill|sub_expertise"]["edge"],
          // // edgeSettingsPreset["sub_expertise|Member"]["edge"],
          // // // ------ skill Edges -------

          // ------ split sub_expertise|Role -------
          edgeSettingsPreset["sub_expertise|Role"]["expertise"],
          edgeSettingsPreset["sub_expertise|expertise"]["edge"],
          edgeSettingsPreset["expertise|Role"]["edge"],
          // ------ split sub_expertise|Role -------

          // ------ split sub_typeProject|Role -------
          edgeSettingsPreset["sub_typeProject|Role"]["typeProject"],
          edgeSettingsPreset["sub_typeProject|typeProject"]["edge"],
          edgeSettingsPreset["typeProject|Role"]["edge"],
          // ------ split sub_typeProject|Role -------

          // //  ------ Create Far Distance between member and project ------
          edgeSettingsPreset["Role|Role"]["hiddenEdge"],
          edgeSettingsPreset["Project|expertise"]["hiddenEdge"],
          // edgeSettingsPreset["Projet|typeProject"]["hiddenEdge"],
          // edgeSettingsPreset["expertise|expertise"]["hiddenEdge"],
          // // edgeSettingsPreset["Project|Member"]["hiddenEdge"],
          // edgeSettingsPreset["typeProject|expertise"]["hiddenEdge"],
          // //  ------ Create Far Distance between member and project ------
        ],
      },
    },
    skip: !projectId,
    context: { serviceName: "soilservice" },
  });

  useEffect(() => {
    if (dataGraphAPIProject?.findProjectGraph) {
      updateGraph(settingsGraphs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsGraphs, dataGraphAPIProject?.findProjectGraph]);

  const updateGraph = (settingsGraphNow: any) => {
    const dataGraphAPI = dataGraphAPIProject.findProjectGraph;

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

    console.log("edgesDataGraph = ", edgesDataGraph);

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

        if (settingsGraphNow.useAvatar == true && node.avatar != undefined) {
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
        if (settingsGraphNow.useAvatar == false && node.avatar != undefined) {
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

    setData({
      nodes: nodesDataGraph,
      edges: edgesDataGraph,
    });
  };

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
        <div
          className="h-[340px] w-full"
          ref={refContainer as RefObject<HTMLDivElement>}
        >
          {data && data.nodes && data.nodes.length > 0 ? (
            <GraphVisual
              data2={data}
              width={width}
              height={refContainer.current?.offsetHeight!}
              hasMenu={false}
              // height={500}
              // height={(1.3 * width) / 4}
              // data2={data2}
              // handleClick={handleClick}
            />
          ) : (
            // <>{JSON.stringify(data)}</>
            <p>Dont have Graph Data Yet</p>
          )}
        </div>
      )}
    </>
  );
};
