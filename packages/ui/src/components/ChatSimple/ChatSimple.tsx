/* eslint-disable @next/next/no-img-element */
import "./styles.css";

import { useEffect, useRef, useState } from "react";

export interface IChatSimple {
  chatN?: any;
  handleSentMessage?: any;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const ChatSimple = ({ chatN, handleSentMessage }: IChatSimple) => {
  const componentRef = useRef<any>(null);
  const Users: any = {
    "01": {
      name: "EdenAI",
      img: "https://pbs.twimg.com/profile_images/1595723986524045312/fqOO4ZI__400x400.jpg",
    },
    "02": {
      name: "USer",
      img: "https://cdn.discordapp.com/avatars/961730944170090516/e5844ca759a74e995027a0e50c5cb1bf.png",
    },
  };

  const [inputMessage, setInputMessage] = useState("");

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
    <>
      <div className="flex h-full flex-col justify-between">
        <div
          ref={componentRef}
          // className="h-full overflow-y-auto bg-white p-4"
          className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
        >
          {/* <div className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6"> */}
          {/* <p className="text-lg font-bold">Message Title</p> */}
          <div className="my-4">
            {chatN.map((chat: any, index: any) => (
              <>
                <div className="chat-message p-2" key={index}>
                  <div
                    className={classNames(
                      chat.user == "01" ? "" : "justify-end",
                      "flex items-end"
                    )}
                  >
                    <div
                      key={index}
                      className={classNames(
                        chat.user == "01" ? "order-2" : "order-1",
                        "mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs"
                      )}
                    >
                      <div key={index}>
                        <span
                          // className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600"
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
                    <img
                      src={Users[chat.user].img}
                      alt="My profile"
                      className="order-1 h-6 w-6 rounded-full"
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <input
            type="text"
            className="mr-4 w-full rounded border border-gray-400 py-2 px-4"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => {
              handleSentMessage(inputMessage, "02");

              setInputMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="p:2 flex h-screen flex-1 flex-col justify-between sm:p-6">
      <div
        ref={componentRef}
        id="messages"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col space-y-4 overflow-y-auto p-3"
      >
        {chatN.map((chat: any, index: any) => (
          <>
            <div className="chat-message" key={index}>
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
                      // className="inline-block rounded-lg rounded-bl-none bg-gray-300 px-4 py-2 text-gray-600"
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
                <img
                  src={Users[chat.user].img}
                  alt="My profile"
                  className="order-1 h-6 w-6 rounded-full"
                />
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="mb-2 border-t-2 border-gray-200 px-4 pt-4 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Write your message!"
            className="w-full rounded-md bg-gray-200 py-3 pl-12 text-gray-600 placeholder-gray-600 focus:placeholder-gray-400 focus:outline-none"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 hidden items-center sm:flex">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition duration-500 ease-in-out hover:bg-gray-300 focus:outline-none"
              onClick={() => {
                handleSentMessage(inputMessage, "01");

                setInputMessage("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            <button
              onClick={() => {
                handleSentMessage(inputMessage, "02");
                setInputMessage("");
              }}
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-white transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-2 h-6 w-6 rotate-90 transform"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
