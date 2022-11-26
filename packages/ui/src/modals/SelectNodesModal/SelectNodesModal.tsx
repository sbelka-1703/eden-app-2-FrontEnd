import { gql, useQuery } from "@apollo/client";
import {
  Badge,
  Button,
  Dropdown,
  Loading,
  Modal,
  TextHeading3,
} from "@eden/package-ui";
import { isEmpty, map } from "lodash";
import { useState } from "react";

const FIND_NODES = gql`
  query ($fields: findNodesInput) {
    findNodes(fields: $fields) {
      _id
      name
      subNodes {
        _id
        name
      }
    }
  }
`;

type Item = {
  _id: string;
  name: string;
};

export interface ISelectNodesModalProps {
  openModal?: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: { [key: string | number]: Item[] }) => void;
  mockData?: any;
  title?: string;
  subTitle?: string;
  nodeType?: string;
}

export const SelectNodesModal = ({
  onClose,
  openModal,
  onSubmit,
  nodeType,
}: ISelectNodesModalProps) => {
  const [selectedNode, setSelectedNode] = useState<Item[] | null>(null);

  const { data: dataNodes } = useQuery(FIND_NODES, {
    variables: {
      fields: {
        node: nodeType,
      },
    },
    skip: !nodeType,
    context: { serviceName: "soilservice" },
  });

  // if (dataNodes?.findNodes) console.log("dataNodes", dataNodes?.findNodes);

  const handleFinish = () => {
    onSubmit && onSubmit(selectedNode as any);
  };

  return (
    <Modal open={openModal} closeOnEsc={false} onClose={onClose}>
      <div>
        <div className={`mb-12 flex justify-between`}>
          <div>
            <div className="flex justify-between">
              <div className="flex-1">
                <TextHeading3>Add Skills</TextHeading3>
              </div>
            </div>
            <section className="mt-4">
              <div className={`h-44`}>
                {selectedNode?.map((item, index) => (
                  <Badge
                    key={index}
                    text={item?.name || ""}
                    colorRGB={`209,247,196`}
                    className={`font-Inter text-sm`}
                    closeButton={true}
                    onClose={() => {
                      const newSelectedNode = selectedNode?.filter(
                        (node) => node._id !== item._id
                      );

                      setSelectedNode(newSelectedNode);
                    }}
                    cutText={16}
                  />
                ))}
              </div>
              <div className="my-8 ml-4 flex h-52 w-full flex-wrap justify-center gap-2">
                {dataNodes?.findNodes ? (
                  <>
                    {!isEmpty(dataNodes?.findNodes) &&
                      map(dataNodes?.findNodes, (item: any, key: number) => (
                        <Dropdown
                          key={key}
                          multiple
                          label={item.name}
                          items={item.subNodes}
                          onSelect={(val: any) => {
                            if (selectedNode) {
                              const isExist = selectedNode.find(
                                (node) => node._id === val._id
                              );

                              if (!isExist)
                                setSelectedNode([...selectedNode, val]);
                            } else {
                              setSelectedNode([val]);
                            }
                          }}
                        />
                      ))}
                  </>
                ) : (
                  <Loading />
                )}
              </div>
            </section>
          </div>
        </div>

        <div className="flex justify-between">
          <div></div>
          <Button radius="rounded" variant={`secondary`} onClick={handleFinish}>
            Finished
          </Button>
        </div>
      </div>
    </Modal>
  );
};
