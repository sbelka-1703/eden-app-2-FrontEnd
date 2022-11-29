import { gql, useQuery } from "@apollo/client";
import { Node } from "@eden/package-graphql/generated";
import {
  BatteryStepper,
  Button,
  Loading,
  Modal,
  SelectBoxNode,
  TextBody,
  TextHeading3,
} from "@eden/package-ui";
import { forEach, isEmpty, map } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

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

type Data = {
  _id: string;
  title: string;
  battery?: boolean;
  subtitle?: string;
  hideSkip?: boolean;
  numMatches?: string;
  itemsTitle?: string;
};

export interface IDiscoverTalentDropdownModalProps {
  openModal?: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (val: string[]) => void;
  mockData?: any;
  title?: string;
  subTitle?: string;
  nodeType?: string;
  matchType?: string;
}

export const DiscoverTalentDropdownModal = ({
  onClose,
  openModal,
  onSubmit,
  title = `Alright, tell me who should I find to help you with your project?`,
  subTitle = `Please pick only one role for now!`,
  nodeType,
  matchType,
}: IDiscoverTalentDropdownModalProps) => {
  // console.log("hackathon talent dropdown modal", dataNodes);
  const section: Data = useMemo(
    () => ({
      _id: "main",
      title: title
        ? title
        : "Alright, tell me who should I find to help you with your project?",
      subtitle: subTitle ? subTitle : "Please pick only one role for now!",
      battery: true,
      itemsTitle: "Focus On:",
    }),
    [title, subTitle]
  );

  const [batteryPercentage, setBatteryPercentage] = useState(0);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: Node[];
  }>({});
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  const [numMatches, setNumMatches] = useState(137);

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

  const handleNext = () => {
    if (numMatches === 0) {
      toast.error("You should at least choose on of the items before proceed");
    } else {
      if (onSubmit) onSubmit!(selectedNodes);
      else onClose!();
    }
  };

  useEffect(() => {
    let _numMatches = numMatches;
    let batteryPercentage = 50;

    // eslint-disable-next-line no-unused-vars
    forEach(selectedItems, (el, key) => {
      if (!isEmpty(el)) {
        // numMatches += +get(section, `items.${key}.numMatches`, 1); //replace 1 with 0
        const newFakeNum = _numMatches - Math.round(Math.random() * 15);

        _numMatches = newFakeNum > 0 ? newFakeNum : _numMatches;

        batteryPercentage += 10;
      }
    });

    if (_numMatches) setNumMatches(_numMatches);
    setBatteryPercentage(batteryPercentage);
  }, [numMatches, selectedItems]);

  useEffect(() => {
    if (selectedItems) {
      const selectedNodeId: string[] = [];

      forEach(selectedItems, (el) => {
        if (!isEmpty(el)) {
          forEach(el, (item) => {
            selectedNodeId.push(item?._id as string);
          });
        }
      });
      setSelectedNodes(selectedNodeId);
    }
  }, [selectedItems]);

  return (
    <Modal open={openModal} closeOnEsc={false}>
      {section && (
        <div>
          <div className={`mb-12 flex justify-between`}>
            <div>
              <div className="flex justify-between">
                <div className="flex-1">
                  <TextHeading3>{section?.title}</TextHeading3>
                  <TextBody className={`font-medium text-gray-500`}>
                    {section?.subtitle}
                  </TextBody>
                </div>
              </div>
              <section className="mt-4">
                <div>
                  <TextHeading3>{section?.itemsTitle}</TextHeading3>
                </div>
                <div className="my-8 ml-4 flex h-24 w-full flex-wrap justify-center gap-2">
                  {dataNodes?.findNodes ? (
                    <>
                      {!isEmpty(dataNodes?.findNodes) &&
                        map(dataNodes?.findNodes, (item: any, key: number) => (
                          <SelectBoxNode
                            multiple
                            key={key}
                            caption={item?.name}
                            items={item?.subNodes}
                            onChange={(val) => {
                              setSelectedItems((prevState) => ({
                                ...prevState,
                                [item?._id]: val,
                              }));
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
            <div>
              {section?.battery && (
                <BatteryStepper
                  numMatches={numMatches}
                  batteryPercentage={batteryPercentage}
                  text={matchType}
                />
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <Button radius="rounded" variant={`secondary`} onClick={onClose}>
                Skip
              </Button>
            </div>
            <Button radius="rounded" variant={`secondary`} onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
