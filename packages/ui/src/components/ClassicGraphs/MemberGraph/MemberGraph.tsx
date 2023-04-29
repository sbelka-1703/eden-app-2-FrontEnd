import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { RefObject, useEffect, useRef, useState } from "react";

import { edgeSettingsPreset } from "../../../../g6/GraphVisual/data/edgeSettingsPreset";
import { nodeSettingsPreset } from "../../../../g6/GraphVisual/data/nodeSettingsPreset";
import { Graph } from "../../../../g6/GraphVisual/settings/interfaceGraph";
import { backendGraphToVisualGraph } from "../utils/helperFunctions";

const GraphVisual = dynamic(
  () => import("@eden/package-ui/g6/GraphVisual/GraphVisual"),
  {
    ssr: false,
  }
);

const FIND_MEMBER_GRAPH = gql`
  query ($fields: findMemberGraphInput!) {
    findMemberGraph(fields: $fields) {
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

export interface IMemberGraphProps {
  memberId: string;
  graphType?: string;
  disableZoom?: boolean;
  zoomGraph?: number;
}

export const MemberGraph = ({
  memberId,
  graphType,
  disableZoom,
  zoomGraph,
}: IMemberGraphProps) => {
  const refContainer = useRef<HTMLDivElement>();

  const [data, setData] = useState<Graph>({
    nodes: [{ id: "node1", size: 50 }],
    edges: [],
  });
  const [width, setWidth] = useState<number>(0);

  const [dataGraphAPI, setDataGraphAPI] = useState<any>(undefined);

  const [nodeSettings, setNodeSettings] = useState<any>([]);
  const [edgeSettings, setEdgeSettings] = useState<any>([]);

  useEffect(() => {
    if (graphType == undefined || graphType == "original_KG") {
      setNodeSettings([
        nodeSettingsPreset["Member"]["main"],
        nodeSettingsPreset["sub_typeProject"]["main"],
        nodeSettingsPreset["typeProject"]["main"],
        nodeSettingsPreset["sub_expertise"]["main"],
        nodeSettingsPreset["expertise"]["main"],
        nodeSettingsPreset["skill"]["main"],
      ]);

      setEdgeSettings([
        // ------ split sub_typeProject|Member -------
        edgeSettingsPreset["sub_typeProject|Member"]["typeProject"],
        edgeSettingsPreset["sub_typeProject|typeProject"]["edge"],
        edgeSettingsPreset["typeProject|Member"]["edge"],
        // ------ split sub_typeProject|Member -------

        // ------ split skill|Member -------
        edgeSettingsPreset["skill|Member"]["doubleSplitEdge"],
        edgeSettingsPreset["skill|sub_expertise"]["edge"],
        // ------ split skill|Member -------

        // ------ split sub_expertise|Member -------
        edgeSettingsPreset["sub_expertise|Member"]["expertise"],
        edgeSettingsPreset["sub_expertise|expertise"]["edge"],
        edgeSettingsPreset["expertise|Member"]["edge"],
        // ------ split sub_expertise|Member -------

        // //  ------ Create Far Distance between member and project ------
        edgeSettingsPreset["expertise|expertise"]["hiddenEdge"],
        edgeSettingsPreset["expertise|typeProject"]["hiddenEdge"],
        // //  ------ Create Far Distance between member and project ------
      ]);
    } else if (graphType == "KG_AI") {
      setNodeSettings([
        nodeSettingsPreset["Member"]["main"],
        nodeSettingsPreset["Skill"]["main"],
        nodeSettingsPreset["Expertise"]["main"],
        nodeSettingsPreset["Role"]["main"],
      ]);

      setEdgeSettings([
        // // ------ split sub_typeProject|dynamicSearch -------
        edgeSettingsPreset["Member|Skill"]["edge"],
        edgeSettingsPreset["Member|Expertise"]["edge"],
        edgeSettingsPreset["Member|Role"]["edge"],
        // // ------ split sub_typeProject|dynamicSearch -------
      ]);
    } else if (graphType == "KG_AI2") {
      setNodeSettings([
        nodeSettingsPreset["Combo"]["main"],
        nodeSettingsPreset["Member"]["main"],
        nodeSettingsPreset["Skill"]["smallBlue"],
        nodeSettingsPreset["Category"]["smallBlue"],
        nodeSettingsPreset["Group"]["smallBlue"],
        nodeSettingsPreset["dynamicSearch"]["main"],
      ]);

      setEdgeSettings([
        edgeSettingsPreset["dynamicSearch|Role"]["edge"],
        edgeSettingsPreset["dynamicSearch|Skill"]["edge"],
        edgeSettingsPreset["dynamicSearch|Expertise"]["edge"],

        edgeSettingsPreset["Member|Role"]["long"],
        edgeSettingsPreset["Member|Skill"]["long"],
        edgeSettingsPreset["Member|Expertise"]["long"],

        edgeSettingsPreset["Skill|Role"]["edge"],
        edgeSettingsPreset["Skill|Expertise"]["edge"],
        edgeSettingsPreset["Role|Expertise"]["edge"],

        edgeSettingsPreset["Skill|Skill"]["edge"],
        edgeSettingsPreset["Expertise|Expertise"]["edge"],
        edgeSettingsPreset["Role|Role"]["edge"],

        // ----- Combo ------
        edgeSettingsPreset["dynamicSearch|Combo"]["edge"],
        edgeSettingsPreset["Skill|Combo"]["edge"],
        edgeSettingsPreset["Role|Combo"]["edge"],
        edgeSettingsPreset["Expertise|Combo"]["edge"],
        edgeSettingsPreset["Member|Combo"]["edge"],
        // ----- Combo ------

        // //  ------ Create Far Distance between member and project ------
        edgeSettingsPreset["dynamicSearch|Member"]["hiddenEdge"],
        // //  ------ Create Far Distance between member and project ------
      ]);
    }
  }, [data]);

  console.log("nodeSettings = ", nodeSettings);

  const {} = useQuery(FIND_MEMBER_GRAPH, {
    variables: {
      fields: {
        memberID: memberId,
        showAvatar: true,

        nodeSettings: nodeSettings,
        edgeSettings: edgeSettings,
      },
    },
    skip: !memberId || nodeSettings.length == 0 || edgeSettings.length == 0,
    context: { serviceName: "soilservice" },
    onCompleted: (data) => {
      if (data) {
        setDataGraphAPI(data.findMemberGraph);
      }
    },
  });

  // ----------- Update the Graph Visual ----------
  useEffect(() => {
    if (dataGraphAPI) {
      const resNodeData = backendGraphToVisualGraph(dataGraphAPI, true, false);

      setData({
        nodes: resNodeData.nodes,
        edges: resNodeData.edges,
      });
    }
  }, [dataGraphAPI]);
  // ----------- Update the Graph Visual ----------

  // ------------------ centerGraph --------------
  const [centerGraph, setCenterGraph] = useState<any>(false);

  useEffect(() => {
    setTimeout(function () {
      setCenterGraph(true); // Start Centering the Graph
    }, 1550);

    setTimeout(function () {
      setCenterGraph(false); // Stop Centering the Graph
    }, 2800);
  }, []);
  // ------------------ centerGraph --------------

  // -------------- Width Height Graph -----------
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
  // -------------- Width Height Graph -----------

  const [graph, setGraph] = useState<any>();

  return (
    <>
      {refContainer && (
        <div
          // className="h-[540px] w-full"
          className="h-full w-full"
          ref={refContainer as RefObject<HTMLDivElement>}
        >
          {data && data.nodes && data.nodes.length > 0 ? (
            <GraphVisual
              data2={data}
              width={width}
              height={refContainer.current?.offsetHeight!}
              hasMenu={false}
              graph={graph}
              setGraph={setGraph}
              disableZoom={disableZoom}
              centerGraph={centerGraph}
              zoomGraph={zoomGraph}
            />
          ) : (
            <p>Dont have Graph Data Yet</p>
          )}
        </div>
      )}
    </>
  );
};
