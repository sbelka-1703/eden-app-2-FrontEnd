/* eslint-disable react/no-unescaped-entities */
import { SignUpContext } from "@context/eden";
import { useContext } from "react";
import {
  FaDiscord,
  FaGithub,
  // FaLinkedin,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { Dropdown, TextField } from "ui";

import { timezones } from "../../../../constants";

export const SignUpViewSocials = () => {
  const {
    hoursPerWeek,
    setHoursPerWeek,
    timezone,
    setTimezone,
    twitterHandle,
    setTwitterHandle,
    githubHandle,
    setGithubHandle,
    discordHandle,
    setDiscordHandle,
    telegramHandle,
    setTelegramHandle,
  } = useContext(SignUpContext);

  return (
    <div className={`py-6 px-12`}>
      <div
        className={`font-poppins text-darkGreen text-center text-2xl font-medium`}
      >
        What's your availability?
      </div>
      <div className={`mt-4 flex justify-center`}>
        <div>
          <div className={`mx-auto w-40`}>
            <Dropdown
              value={timezone}
              items={timezones}
              placeholder={`Timezone`}
              onSelect={(val) => setTimezone(val.name)}
            />
          </div>
          <div className={`flex space-x-4`}>
            <div className={`mx-auto w-24`}>
              <TextField
                placeholder={`Hours`}
                radius="pill"
                type={`number`}
                value={hoursPerWeek.toString()}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              />
            </div>
            <div className={`mx-auto my-auto font-medium text-zinc-600`}>
              hrs. / week
            </div>
          </div>
        </div>
      </div>
      <div
        className={`font-poppins text-darkGreen mt-4 text-center text-2xl font-medium`}
      >
        DROP YOUR SOCIALS
      </div>
      <p className={`my-4 text-center text-xs`}>
        adding links is not required, but it significantly boosts your
        discoverability.
      </p>
      <div className={`my-6 flex w-full`}>
        <FaTwitter size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Twitter Handle`}
          value={twitterHandle}
          onChange={(e) => setTwitterHandle(e.target.value)}
        />
      </div>
      <div className={`my-6 flex w-full`}>
        <FaGithub size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Github Handle`}
          value={githubHandle}
          onChange={(e) => setGithubHandle(e.target.value)}
        />
      </div>
      <div className={`my-6 flex w-full`}>
        <FaDiscord size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Discord Handle`}
          value={discordHandle}
          onChange={(e) => setDiscordHandle(e.target.value)}
        />
      </div>
      <div className={`my-6 flex w-full`}>
        <FaTelegram size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          placeholder={`Telegram Handle`}
          value={telegramHandle}
          onChange={(e) => setTelegramHandle(e.target.value)}
        />
      </div>
      {/* <div className={`my-2 flex w-full`}>
        <FaLinkedin size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          value={``}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className={`my-2 flex w-full`}>
        <FaLinkedin size="2rem" color="#000000" className={`my-auto mr-4`} />
        <TextField
          radius="pill"
          value={``}
          onChange={(e) => console.log(e.target.value)}
        />
      </div> */}
    </div>
  );
};
