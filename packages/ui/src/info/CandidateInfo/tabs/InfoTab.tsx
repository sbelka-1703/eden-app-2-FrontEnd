import { Maybe, Members } from "@eden/package-graphql/generated";
import { Badge, SocialMediaComp, TextLabel1 } from "@eden/package-ui";

interface Props {
  member?: Maybe<Members>;
  percentage?: number;
  loading?: boolean;
}

export const InfoTab = ({ member }: Props) => {
  return (
    <>
      <div className="mb-4 grid grid-cols-2">
        <div className="col-1 p-2">
          <div className="my-4 flex flex-col items-start justify-center">
            <TextLabel1>🌸 Short bio</TextLabel1>
            {member?.bio ? (
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
        </div>
        <div className="col-2 p-2">
          <div className="grid grid-cols-2">
            {/* First Column: Availability, Location, Timezone */}
            <div className="col-1 p-2">
              <section className="mb-2 w-full text-left">
                <TextLabel1 className="mb-2 text-xs">
                  ❤️️ AVAILABILITY
                </TextLabel1>
                <p className="ml-4 font-bold text-slate-600">
                  {member?.hoursPerWeek
                    ? `${member?.hoursPerWeek} hrs\\week`
                    : "unavailable"}
                </p>
              </section>
              <section className="mb-2 w-full text-left">
                <TextLabel1 className="mb-2 text-xs">🌍 Location</TextLabel1>
                <p className="ml-4 font-bold text-slate-600">
                  {`${
                    member?.location ? `${member?.location}` : "Bali, Indonesia" // TODO: change to empty string location?
                  }`}
                </p>
              </section>
              <section className="mb-2 w-full text-left">
                <TextLabel1 className="mb-2 text-xs">🧭 Timezone</TextLabel1>
                <div className="ml-4 inline-flex">
                  <p className="font-bold text-slate-600">
                    {`9:41am `} {` `}
                  </p>
                  <p className="font-bold text-gray-500">
                    {`- ${member?.timeZone || "UTC +5"}`}
                  </p>
                </div>
              </section>
            </div>
            {/* Second Column: Hourly Rate, Level, Notice */}
            <div className="col-2 p-2">
              <section className="mb-2 w-full text-left">
                <TextLabel1 className="text-xs">💰 Hourly rate</TextLabel1>
                <p className="text-center text-sm">
                  $USDC{" "}
                  <span className="text-xl font-bold text-[#fcba03]">
                    {member?.budget?.perHour || 35}
                  </span>{" "}
                  hour
                </p>
              </section>
              <section className="mb-2 w-full text-left">
                <TextLabel1 className="text-xs">⭐ Level</TextLabel1>
                <br />
                <Badge
                  className="ml-4 text-sm"
                  colorRGB="151,232,163"
                  text={
                    member?.experienceLevel?.total
                      ? member?.experienceLevel?.total <= 3
                        ? "Junior"
                        : member?.experienceLevel?.total <= 6
                        ? "Mid"
                        : "Senior"
                      : "Entry"
                  }
                />
              </section>
              <section className="mb-2 w-full text-left">
                <TextLabel1 className="text-xs">🍀 Notice</TextLabel1>
                <p className="ml-4">2 Weeks</p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2">
        <div className="col-1 p-2">
          <section className="mb-2 w-full text-left">
            <TextLabel1 className="text-xs">🌺 WIZARD SKILLS</TextLabel1>
            <div className="ml-4 inline-flex flex-wrap">
              {["Agile", "Leadership", "Product", "Development"].map(
                (preference: string, index: number) => (
                  <Badge
                    key={index}
                    text={preference}
                    colorRGB="224,151,232"
                    className={`font-Inter text-sm`}
                    closeButton={false}
                    cutText={16}
                  />
                )
              )}
            </div>
          </section>

          {/* BACKGROUND */}
          {member?.previousProjects && member?.previousProjects.length ? (
            <section className="mb-2 w-full text-left">
              <TextLabel1 className="text-xs">🍒 BACKGROUND</TextLabel1>
              <div className="ml-4 mt-2 inline-flex flex-wrap">
                {[
                  "Project Manager x Amazon",
                  "Senior Project Manager x LLC",
                  "PM Scum Master x Rocky Industries",
                ].map((experience: string, index: number) => (
                  <div key={index} className="mb-4 flex flex-row">
                    ►{" "}
                    <Badge
                      text={experience}
                      colorRGB="250,248,137"
                      className={`font-Inter text-sm`}
                      closeButton={false}
                      cutText={50}
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <div className="col-2 p-2">
          <section className="mb-2 w-full text-left">
            <TextLabel1 className="text-xs">🔎 INTERESTS</TextLabel1>
            <div className="ml-4 inline-flex flex-wrap">
              {["Travelling", "Trading", "Community", "DAOs"].map(
                (preference: string, index: number) => (
                  <Badge
                    key={index}
                    text={preference}
                    colorRGB="224,151,232"
                    className={`font-Inter text-sm`}
                    closeButton={false}
                    cutText={16}
                  />
                )
              )}
            </div>
          </section>

          <section className="mb-2 w-full text-center">
            <div className="my-4 flex justify-center">
              {member?.links && member?.links.length > 0 && (
                <SocialMediaComp size="sm" links={member?.links} />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
