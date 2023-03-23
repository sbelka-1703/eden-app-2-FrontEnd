import { UserContext } from "@eden/package-context";
import { Avatar } from "@eden/package-ui";
import { useContext, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

type ChatBoxInputs = {
  message: string;
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
  const { register, handleSubmit, reset } = useForm<ChatBoxInputs>({});
  const onSubmit: SubmitHandler<ChatBoxInputs> = (data) => {
    handleSentMessage(data.message, "02");
    reset();
  };

  const componentRef = useRef<any>(null);

  useEffect(() => {
    // Keep the scroll position at the bottom of the component
    componentRef.current.scrollTop = componentRef.current.scrollHeight;
    // console.log(
    //   "componentRef.current.scrollHeight = ",
    //   componentRef.current.scrollHeight
    // );
  });

  // useEffect(() => {
  //   console.log("chatN CHATBOX = ", chatN);
  // }, [chatN]);

  return (
    <div className="flex h-1/2 flex-col justify-between  rounded-lg border shadow-md">
      <div
        ref={componentRef}
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch scrollbar-hide flex flex-col space-y-4 overflow-scroll overflow-y-auto p-3"
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
                    <div className={`flex`}>
                      <span
                        className={classNames(
                          chat.user == "01"
                            ? "rounded-bl-none bg-slate-200 text-slate-700"
                            : "rounded-br-none bg-blue-600 text-slate-100",
                          "inline-block rounded-lg border px-4 py-2 font-medium shadow"
                        )}
                      >
                        {chat.message}
                      </span>

                      {chat.user == "02" && (
                        <div className="ml-2">
                          <Avatar
                            src={currentUser?.discordAvatar || ""}
                            size={`xs`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {chat.user == "01" && <Avatar isProject size={`xs`} />}
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
