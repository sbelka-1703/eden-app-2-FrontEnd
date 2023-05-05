import { Members } from "@eden/package-graphql/generated";
import { DynamicSearchMemberGraph } from "@eden/package-ui";

interface Props {
  member: Members;
}

export const GraphTab: React.FC<Props> = ({ member }: Props) => {
  if (!member) return null;
  return (
    <div className="mt-3 h-[360px] w-full">
      <DynamicSearchMemberGraph
        memberID={member._id!}
        nodesID={member.nodes?.map((_node) => _node?.nodeData?._id!) || []}
        disableZoom={true}
        graphType={"KG_AI2"}
      />
    </div>
  );
};
