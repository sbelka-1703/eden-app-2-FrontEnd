import { gql, useQuery } from "@apollo/client";
import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Badge,
  IPREFERENCES_TITLE,
  NodeList,
  PREFERENCES_TITLE,
  SocialMediaComp,
  TextLabel1,
  UserBackground,
  UserWithDescription,
} from "@eden/package-ui";
import dynamic from "next/dynamic";
import { RefObject, useEffect, useRef, useState } from "react";

import { edgeSettingsPreset } from "../../../g6/GraphVisual/data/edgeSettingsPreset";
import { nodeSettingsPreset } from "../../../g6/GraphVisual/data/nodeSettingsPreset";
import { Graph } from "../../../g6/GraphVisual/settings/interfaceGraph";

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

export interface IMemberInfoProps {
  member?: Maybe<Members>;
  percentage?: number;
  loading?: boolean;
  hasGraph?: boolean;
}

export const MemberInfo = ({
  member,
  hasGraph = false,
  percentage,
  loading = false,
}: IMemberInfoProps) => {
  const refContainer = useRef<HTMLDivElement>();
  const [experienceOpen, setExperienceOpen] = useState<number | null>(null);
  const settingsGraphs = {
    useAvatar: true,
    updateGraph: false,
    memberID1: member?._id,
  };

  const [data, setData] = useState<Graph>({
    nodes: [{ id: "node1", size: 50 }],
    edges: [],
  });
  const [width, setWidth] = useState<number>(0);

  const { data: dataGraphAPImember } = useQuery(FIND_MEMBER_GRAPH, {
    variables: {
      fields: {
        memberID: member?._id,
        showAvatar: true,
        nodeSettings: [
          nodeSettingsPreset["Member"]["main"],
          nodeSettingsPreset["sub_typeProject"]["main"],
          nodeSettingsPreset["typeProject"]["main"],
          nodeSettingsPreset["sub_expertise"]["main"],
          nodeSettingsPreset["expertise"]["main"],
          nodeSettingsPreset["skill"]["main"],
        ],
        edgeSettings: [
          // ------ split sub_typeProject|Member -------
          edgeSettingsPreset["sub_typeProject|Member"]["typeProject"],
          edgeSettingsPreset["sub_typeProject|typeProject"]["edge"],
          edgeSettingsPreset["typeProject|Member"]["edge"],
          // ------ split sub_typeProject|Member -------

          // ------ split skill|Member -------
          edgeSettingsPreset["skill|Member"]["doubleSplitEdge"],
          // edgeSettingsPreset["skill|Member"]["edge"],
          edgeSettingsPreset["skill|sub_expertise"]["edge"],
          // edgeSettingsPreset["sub_expertise|Member"]["edge"],
          // ------ split skill|Member -------

          // ------ split sub_expertise|Member -------
          edgeSettingsPreset["sub_expertise|Member"]["expertise"],
          edgeSettingsPreset["sub_expertise|expertise"]["edge"],
          edgeSettingsPreset["expertise|Member"]["edge"],
          // edgeSettingsPreset["sub_expertise|Member"]["edge"],
          // ------ split sub_expertise|Member -------

          // ------ Change edge --------
          // {
          //   ...edgeSettingsPreset["typeProject|Member"]["edge"],
          //   mainEdge: {
          //     ...edgeSettingsPreset["typeProject|Member"]["edge"].mainEdge,
          //     style: {
          //       color: "#C5947C",
          //     },
          //   },
          // },
          // ------ Change edge --------
        ],
      },
    },
    skip: !hasGraph,
    context: { serviceName: "soilservice" },
  });

  const subExpertise = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_expertise"
  );

  const projectType = member?.nodes?.filter(
    (node) => node?.nodeData?.node === "sub_typeProject"
  );

  const selectedPreferences = member?.preferences
    ? (Object.keys(member?.preferences) as [keyof IPREFERENCES_TITLE]).filter(
        (key) =>
          member.preferences![key]?.interestedMatch && key.includes("find")
      )
    : null;

  const updateGraph = (settingsGraphNow: any) => {
    const dataGraphAPI = dataGraphAPImember.findMemberGraph;

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
    if (dataGraphAPImember?.findMemberGraph) {
      updateGraph(settingsGraphs);
    }
  }, [dataGraphAPImember?.findMemberGraph]);

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

  if (!member) return null;

  return (
    <div>
      <UserWithDescription member={member} percentage={percentage} />

      {refContainer && hasGraph && (
        <div
          className="w-full h-[340px]"
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

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-5">
        <div className="my-4 flex flex-col items-start justify-center sm:col-span-3 sm:my-0">
          {!!member?.bio && <TextLabel1>🪪 Short bio</TextLabel1>}
          {!loading ? (
            <p className="text-soilBody font-Inter whitespace-pre-wrap font-normal">
              {member?.bio}
            </p>
          ) : (
            <div className="flex w-full animate-pulse space-x-4">
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 rounded bg-slate-200"></div>
                <div className="h-3 rounded bg-slate-200"></div>
              </div>
            </div>
          )}
        </div>
        <div></div>
        {member?.links && member?.links.length > 0 && (
          <SocialMediaComp links={member?.links} />
        )}
      </div>
      {selectedPreferences && (
        <div className="mb-4">
          <TextLabel1>🔎 PREFERENCES</TextLabel1>
          <div>
            {selectedPreferences.map(
              (preference: keyof IPREFERENCES_TITLE, index: number) => (
                <Badge
                  key={index}
                  text={PREFERENCES_TITLE[preference]}
                  colorRGB={`255,255,167`}
                  className={`font-Inter text-sm`}
                  closeButton={false}
                  cutText={16}
                />
              )
            )}
          </div>
        </div>
      )}
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-2`}>
        <div className={`flex flex-col`}>
          <NodeList
            label={`EXPERTISE`}
            nodes={subExpertise}
            colorRGB={`235,225,255`}
          />
        </div>
        <div className={`flex flex-col`}>
          <NodeList
            label={`PREFERRED PROJECTS`}
            nodes={projectType}
            colorRGB={`209,247,196`}
          />
        </div>
      </div>
      {((member?.previusProjects && member?.previusProjects.length) ||
        (member?.endorsements && member?.endorsements.length > 0)) && (
        <div className={`my-4`}>
          <UserBackground
            background={member?.previusProjects || []}
            initialEndorsements={member?.endorsements || []}
            setExperienceOpen={setExperienceOpen!}
            experienceOpen={experienceOpen!}
          />
        </div>
      )}
    </div>
  );
};
