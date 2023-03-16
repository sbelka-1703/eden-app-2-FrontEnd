import { AppUserLayout, AppUserSubmenuLayout, SEO } from "@eden/package-ui";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { NextPageWithLayout } from "../../_app";
import { GiTwoCoins, GiCash, GiCloudRing } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";
import { RxNotionLogo, RxClock } from "react-icons/rx";
import { BsDiscord, BsCloudFill } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";
import { FaLeaf } from "react-icons/fa";

const EdenDm: NextPageWithLayout = () => {
  const [activeButton, setActiveButton] = useState(1);
  const [value, setValue] = useState(7);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <>
      <SEO />
      <div
        className={`bg-background scrollbar-hide h-[90vh] w-full overflow-scroll p-5`}
      >
        <div className="flex w-full gap-3 sm:flex-wrap lg:justify-between">
          <div className="  w-full border-2  border-gray-300 p-2  lg:basis-[49%] ">
            <div className="flex items-center justify-center">
              <div className="flex h-2 w-2 items-center justify-center rounded-full bg-black"></div>
              <div className="h-[2px] w-8 bg-black"></div>
              <button
                className={`rounded-2xl px-4 py-1 font-bold text-white  hover:bg-blue-500 ${
                  activeButton === 1 ? "bg-blue-500 text-white" : "bg-blue-200"
                }`}
                onClick={() => setActiveButton(1)}
              >
                Eden AI
              </button>
              <div className="h-[2px] w-8 bg-black"></div>
              <button
                className={`rounded-2xl px-4 py-1 font-bold text-white  hover:bg-blue-500 ${
                  activeButton === 2 ? "bg-blue-500 text-white" : "bg-blue-200"
                }`}
                onClick={() => setActiveButton(2)}
              >
                Details
              </button>
              <div className="h-[2px] w-8 bg-black"></div>
              <button
                className={`rounded-2xl px-4 py-1 font-bold text-white  hover:bg-blue-500 ${
                  activeButton === 3 ? "bg-blue-500 text-white" : "bg-blue-200"
                }`}
                onClick={() => setActiveButton(3)}
              >
                Review & Launch
              </button>
              <div className="h-[2px] w-8 bg-black"></div>
              <div className="flex h-2 w-2 items-center justify-center rounded-full bg-black"></div>
            </div>

            <div className="mt-4 mb-5 flex flex-col items-center justify-center gap-3 text-center text-[15px]">
              <div className="w-fit cursor-pointer rounded-2xl  bg-[#f7ffde] py-3 px-4 font-bold text-black">
                LET'S STAY IN TOUCH !
              </div>
              <div className=" font-semibold">
                EDEN WILL REACH OUT TO YOU WITH DMs & <br /> APPLICATIONS,
                PLEASE ALWAYS TAKE AN ACTION :)
              </div>
              <div className="font-semibold ">LET'S TEST EDEN :</div>
              <div className="relative flex flex-col items-center gap-3 rounded-lg border-2 border-gray-300 p-2 text-center font-semibold">
                <span
                  className={`absolute top-2 left-2 rounded-full bg-blue-600 p-1 text-left`}
                >
                  <FaDiscord size={`1em`} color={`#ffffff`} />
                </span>
                <>
                  <img src="/logo192.png" width="30%" />
                  <span>@EDEN</span>
                </>
                <button className=" rounded-3xl bg-pink-300 py-2 px-4 hover:bg-pink-500 ">
                  SEND A DM
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-3 font-semibold ">
              <span className="text-center">
                ADJUST FREQUENCY OF NOTIFICATIONS
              </span>

              <div className="flex w-[90%] flex-col items-center justify-between py-3">
                <div className="flex w-full justify-between text-black ">
                  <div className="text-center text-[15px]">
                    HYPER RELEVANT <br />{" "}
                    <span className="text-sm text-gray-300">1-2 WEEK(S)</span>
                  </div>
                  <div className=" text-center text-[15px]">
                    ALL NEW MATCHES <br />
                    <span className="text-sm text-gray-300">15+ WEEKS </span>
                  </div>
                </div>

                <div className="flex w-full items-center px-5">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={value}
                    onChange={(e) => handleSliderChange(e)}
                    className="h-2 w-full appearance-none rounded-full bg-green-100 outline-none focus:outline-none active:bg-green-300"
                  />
                </div>

                <span className="pt-4">{value} WEEK(S)</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <input type="checkbox" /> REVIEW YOUR OPPORTUNITY
                <BsArrowRight fontSize="20px" />
              </div>
              <button className="border-2 border-[#e4fea3] bg-gray-100 py-2 px-3 text-sm hover:bg-white">
                LAUNCH TO EDEN NETWORK
              </button>
            </div>
          </div>

          <div className=" w-full border-2 border-gray-300 p-2  lg:basis-[49%] ">
            <div className="w-full py-3 text-lg font-semibold">Preview</div>
            <div className="flex w-full gap-1">
              <div className=" basis-[20%]">
                <div className="h-28 w-28 rounded-full bg-gray-500"></div>
              </div>
              <div className="flex basis-[65%] flex-col gap-2 py-1">
                <span className="text-xl font-semibold">DESIGN LEAD </span>
                <span>
                  LOOKING FOR A DESIGNER WITH STRONG PROFESSIONAL LEADERSHIP
                  SKILLS TO GUIDE TEAM OF 3 TOWARDS BUILDING A TALENT STAKING
                  PLATFORM
                </span>
              </div>
              <div className="flex  h-fit basis-[15%] items-start justify-center">
                <div className="flex border-2 border-gray-600 px-2 py-1 ">
                  REFER <GiTwoCoins color="yellow" fontSize="20px" />
                </div>
                <SlOptionsVertical className=" self-center" />
              </div>
            </div>
            <div className="flex w-full pt-4">
              <div className="flex basis-[70%] items-center justify-center ">
                <span>Graph Here</span>
              </div>
              <div className="flex basis-[30%] flex-col gap-3">
                <div className="flex items-center">
                  <GiCloudRing fontSize="20px" className="mr-2" />
                  DETAILS
                </div>
                <div className="flex items-center">
                  <RxClock fontSize="20px" className="mr-2" />
                  20 HRS/WEEK
                </div>
                <div className="flex items-center">
                  <FcCalendar fontSize="20px" className="mr-2" />6 MONTHS
                </div>
                <div className="flex w-full items-center justify-center gap-3">
                  <RxNotionLogo fontSize="30px" />
                  <BsDiscord fontSize="30px" color="blue" />
                </div>
                <div className="flex items-center">
                  <GiCash color="gold" fontSize="20px" className="mr-2" />
                  COMPENSATION
                </div>
                <span className="ml-2 text-lg font-semibold">
                  USDC 550<sub>HOUR</sub>
                </span>
              </div>
            </div>
            <div className="flex w-full px-3 pt-4">
              <div className="basis-[55%]">
                <div className="flex items-center pb-2 font-semibold">
                  <BsCloudFill color="blue" className=" mr-1 self-center" />
                  DESCRIPTION
                </div>
                <div className="text-sm  font-semibold">
                  WE'RE LOOKING TO FILL A DESIGN LEAD ROLE FOR OUR PROJELE
                  GRAVITON. WE NEED A STRONG LEADER, WHO WILL BE ABLE TO MANAGE
                  THE TEAM OF 3 PEOPLE. WE'RE & MONTH INTO THE PROCESS & NEED TO
                  DEVELOP DESIGN SYSTEM AS WELL AS ADD SOME ORGANISATION TO THE
                  TEAM. WE'RE LOOKING A DESIGN LEAD, WHO WANTS TO GET IN THE
                  WEEDS AND WORK ON FIGHA COMPONENTS, STRUCTURE & ORGANISATION.
                  THIS PERSON WILL BE A POINT OF CONTACT BETWEEN DESIGN TEAM &
                  FRONTEND TEAM, SO COMMUNICATION SKILLS & GENERAL UNDERSTANDING
                  OF TECH LAYER IS A REQUIREMENT. WE NEED TO LAUNCH AN HUP IN
                  Q3, so I ESTIMATE ABOUT 4-6 MONTH OF WORK.
                </div>
              </div>
              <div className="w-full basis-[5%]"></div>
              <div className="w-full basis-[40%]">
                <div className="flex items-center pb-2 font-semibold">
                  <FaLeaf color="green" className=" mr-1 self-center" />
                  BENEFITS
                </div>
                <div className="text-sm font-semibold">
                  <ul className="list-inside list-disc ">
                    <li className="pb-1"> WORKING ON A STARTUP </li>
                    <li className="pb-1"> TEAM MERCH & GAME NIGHTS ♡</li>
                    <li className="pb-1">
                      FAST PACED GROWTH ORIENTED ENVIRONMENT
                    </li>
                    <li className="pb-1">
                      FLEXIBLE SCHEDULE, OUTCOME ORIENTED REPORTS
                    </li>
                    <li className="pb-1">
                      POSSIBILITY OF FUTURE COLLABORATIONS
                    </li>
                    <li className="pb-1"> TOKEN EQUITY</li>
                    <li className="pb-1"> PARTICIPATION IN CONFERENCES</li>
                    <li className="pb-1"> COMPETITIVE COMPENSATION.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EdenDm.getLayout = (page) => <AppUserLayout>{page}</AppUserLayout>;

export default EdenDm;
