import { UserContext } from "@eden/package-context";
import { useContext, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

import { Avatar } from "../../../elements";

type ChatBoxInputs = {
  message: string;
  description: string;
};

export interface IChatBoxProps {
  chatN?: any;
  // eslint-disable-next-line no-unused-vars
  handleSentMessage: (message: string, user: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const ChatBox = ({ chatN, handleSentMessage }: IChatBoxProps) => {
  const { currentUser } = useContext(UserContext);

  const { register, handleSubmit } = useForm<ChatBoxInputs>({});
  const onSubmit: SubmitHandler<ChatBoxInputs> = (data) =>
    handleSentMessage(data.message, currentUser?.discordName || "02");

  const componentRef = useRef<any>(null);
  //   const Users: any = {
  //     "01": {
  //       name: "EdenAI",
  //       img: "https://pbs.twimg.com/profile_images/1595723986524045312/fqOO4ZI__400x400.jpg",
  //     },
  //     "02": {
  //       name: "USer",
  //       img: "https://cdn.discordapp.com/avatars/961730944170090516/e5844ca759a74e995027a0e50c5cb1bf.png",
  //     },
  //   };

  useEffect(() => {
    // Keep the scroll position at the bottom of the component
    componentRef.current.scrollTop = componentRef.current.scrollHeight;
    // console.log(
    //   "componentRef.current.scrollHeight = ",
    //   componentRef.current.scrollHeight
    // );
  });

  // console.log("chatN = ", chatN);
  return (
    <div className="flex h-full flex-col justify-between">
      <div
        ref={componentRef}
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      >
        <div className="my-4">
          {chatN &&
            chatN.map((chat: any, index: any) => (
              <div className="chat-message p-2" key={index}>
                <div
                  className={classNames(
                    chat.user == "01" ? "" : "justify-end",
                    "flex items-end"
                  )}
                >
                  <div
                    className={classNames(
                      chat.user == "01" ? "order-2" : "order-1",
                      "mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs"
                    )}
                  >
                    <div>
                      <span
                        className={classNames(
                          chat.user == "01"
                            ? "bg-gray-300 text-gray-600"
                            : "bg-blue-600 text-white",
                          "inline-block rounded-lg rounded-bl-none  px-4 py-2 "
                        )}
                      >
                        {chat.message}
                      </span>
                    </div>
                  </div>
                  <Avatar isProject size={`xs`} />
                  {/* <img
                    src={Users[chat.user].img}
                    alt="My profile"
                    className="order-1 h-6 w-6 rounded-full"
                  /> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between p-4">
          <input
            type="text"
            className={`input-primary mr-4`}
            placeholder="Type your message here..."
            required
            {...register("message")}
          />
          <button
            className="rounded-full bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
            type={`submit`}
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};
