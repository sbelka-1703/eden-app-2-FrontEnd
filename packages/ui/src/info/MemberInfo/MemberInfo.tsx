import { Maybe, Members } from "@eden/package-graphql/generated";
import {
  Badge,
  Button,
  // Card,
  // EndorsementList,
  SocialMediaComp,
  // TabsSelector,
  TextHeading3,
  UserWithDescription,
} from "@eden/package-ui";
import { useState } from "react";

// import { round } from "../../../utils";

export interface IMemberInfoProps {
  member?: Maybe<Members>;
  percentage?: number;
}

export const MemberInfo = ({ member, percentage }: IMemberInfoProps) => {
  if (!member) return null;

  return (
    <div>
      <UserWithDescription member={member} percentage={percentage} />
      <div className="mb-4 grid grid-cols-5">
        <div className="col-span-3 flex flex-col items-start justify-center">
          <TextHeading3
            style={{ fontWeight: 700 }}
            className="mb-2 text-sm uppercase text-gray-500"
          >
            🪪 Short bio
          </TextHeading3>
          <p className="text-soilBody font-Inter font-normal">{member?.bio}</p>
        </div>
        <div></div>
        <SocialMediaComp links={member?.links} />
      </div>
      <div>
        <div className={`grid grid-cols-2 gap-4`}>
          <div className={`flex flex-col`}>
            <div className="space-y-2 py-1">
              <TextHeading3
                style={{ fontWeight: 700 }}
                className="mb-2 text-sm uppercase text-gray-500"
              >
                SKILLS
              </TextHeading3>
            </div>
            <div>
              {member?.nodes?.map((item, index) => {
                if (item?.nodeData?.node == "sub_expertise") {
                  return (
                    <Badge
                      key={index}
                      text={item?.nodeData?.name || ""}
                      colorRGB={`235,225,255`}
                      className={`font-Inter text-sm`}
                      cutText={16}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className={`flex flex-col`}>
            <div className="space-y-2 py-1">
              <TextHeading3
                style={{ fontWeight: 700 }}
                className="mb-2 text-sm uppercase text-gray-500"
              >
                PREFERRED PROJECTS
              </TextHeading3>
            </div>
            <div>
              {member?.nodes?.map((item, index) => {
                if (item?.nodeData?.node == "sub_typeProject") {
                  return (
                    <Badge
                      key={index}
                      text={item?.nodeData?.name || ""}
                      colorRGB={`209,247,196`}
                      className={`font-Inter text-sm`}
                      cutText={16}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserBackground
          member={member}
          // background={member.background}
          // initialEndorsements={item.endorsements}
        />
      </div>
    </div>
  );
};

const UserBackground = ({}: // member,
// background,
// initialEndorsements,
{
  member?: Members;
  background?: any[];
  initialEndorsements?: any[];
}) => {
  // const endorsements = initialEndorsements?.map((endorsement: any) => ({
  //   member: {
  //     discordName: endorsement.name,
  //     discordAvatar: endorsement.avatar,
  //   },
  //   text: endorsement.endorsement,
  //   level: endorsement.level.name,
  // }));

  const [expand, setExpand] = useState(false);
  // const [activeTab, setActiveTab] = useState(0);
  // const tabs = member?.previusProjects.map(
  //   (item) => `${item.title} ${item.emoji}`
  // );
  // const item = background.reduce((prev, curr) => {
  //   const item = { [`${curr.title} ${curr.emoji}`]: curr };

  //   return { ...prev, ...item };
  // }, {});

  // const activeItem = item[tabs[activeTab]];

  // const onExpend = (item: string) => {
  //   const itemIndex = tabs.findIndex((tab) => tab === item);

  // setActiveTab(itemIndex);
  // setExpand(true);
  // };

  return (
    <div>
      <div className="mb-4 flex">
        {/* <TextHeading3
          style={{ fontWeight: 700 }}
          className=" text-sm uppercase text-gray-500"
        >
          🎡 Background
        </TextHeading3> */}
        {expand && (
          <Button style={{ border: "none" }} onClick={() => setExpand(false)}>
            {/* <ArrowsCollapseIcon /> */}hi
          </Button>
        )}
      </div>
      {/* {expand ? (
        <UserExpandedBackground
          tabs={tabs}
          activeTab={activeTab}
          activeItem={activeItem}
          setActiveTab={setActiveTab}
        />
      ) : (
        <>
          <UserCardBackground onExpand={onExpend} background={background} />
          {endorsements?.length > 0 && (
            <div className="mt-3">
              <EndorsementList endorsements={endorsements} />
            </div>
          )}
        </>
      )} */}
    </div>
  );
};

// const UserCardBackground = ({
//   onExpand,
//   member,
//   background,
// }: {
//   member?: Members;
//   background?: any[];
//   // eslint-disable-next-line no-unused-vars
//   onExpand: (item: string) => void;
// }) => {
//   if (!background) return null;
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {background.map((item, index) => (
//         <Card
//           key={index}
//           border
//           className="hover:shadow-focusShadow hover:border-accentColor cursor-pointer p-2"
//         >
//           <Button
//             className="w-full"
//             style={{ border: "none", display: "block" }}
//             onClick={() => onExpand(`${item.title} ${item.emoji}`)}
//           >
//             <div className="flex h-full flex-col justify-between">
//               <div>
//                 <TextHeading3 className="text-center text-base">
//                   {item.emoji} {item.title}
//                 </TextHeading3>
//                 <div className="absolute right-2 top-3.5">
//                   {/* <ArrowsExpandIcon /> */}
//                 </div>

//                 {item.content.map((content: any) => (
//                   <TextHeading3
//                     key={content.title}
//                     className="font-Inter my-3 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl px-2 py-1 text-base"
//                     style={{ backgroundColor: item?.color || "#CAE8FF" }}
//                   >
//                     {content.title}
//                   </TextHeading3>
//                 ))}
//               </div>
//               <p className="text-gray-400">Total: 4 years 6 month</p>
//             </div>
//           </Button>
//         </Card>
//       ))}
//     </div>
//   );
// };

// const UserExpandedBackground = ({
//   tabs,
//   activeTab,
//   activeItem,
//   setActiveTab,
// }: {
//   tabs: string[];
//   activeItem: any;
//   activeTab: number;
//   // eslint-disable-next-line no-unused-vars
//   setActiveTab: (activeTab: number) => void;
// }) => (
//   <>
//     <TabsSelector
//       tabs={tabs}
//       selectedTab={activeTab}
//       onSelect={(val) => {
//         setActiveTab(val);
//       }}
//     />
//     <div className="border-accentColor scrollbar-hide relative overflow-y-scroll rounded-b-xl border-b-2 border-r-2 border-l-2 bg-white px-4 pt-6">
//       {activeItem?.content.map((item: any, index: number) => (
//         <div
//           key={item.title}
//           className="mb-2 grid grid-cols-2 border-b border-b-gray-300 pb-2"
//           style={
//             index === activeItem?.content.length - 1
//               ? { borderBottom: "none" }
//               : {}
//           }
//         >
//           <div>
//             <TextHeading3
//               className="mb-3 rounded-2xl px-2 py-1"
//               style={{ backgroundColor: activeItem?.color || "#CAE8FF" }}
//             >
//               {item.title}
//             </TextHeading3>
//             <p>{item.content}</p>
//           </div>
//           <div className="flex flex-col items-center justify-between">
//             <div className="flex flex-col items-center">
//               <TextHeading3
//                 style={{ fontWeight: 700 }}
//                 className="mb-2 text-sm uppercase text-gray-500"
//               >
//                 🚀 Skills
//               </TextHeading3>
//               <div className="inline-block">
//                 {item?.skills?.map((skill: string, index: number) => (
//                   <Badge
//                     text={skill}
//                     key={index}
//                     cutText={15}
//                     colorRGB="255, 111, 137, 0.49"
//                     className={`py-px text-xs`}
//                   />
//                 ))}
//               </div>
//             </div>
//             <TextHeading3 className="mb-2 text-gray-500">
//               {`${item.date.start} - ${item.date.end}`}
//             </TextHeading3>
//           </div>
//         </div>
//       ))}
//     </div>
//   </>
// );
