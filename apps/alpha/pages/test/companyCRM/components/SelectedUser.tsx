import React from "react";

type summaryQuestionType = {
  questionID: number;
  questionContent: string;
  answerContent: string;
  bestAnswerCompany: string;
  reason: string;
  score: number;
};

type User = {
  _id: number;
  name: string;
  avatar: string;
  score: number;
  summaryQuestions: summaryQuestionType[];
};

type Props = {
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const SelectedUser: React.FC<Props> = ({ selectedUser, setSelectedUser }) => {
  console.log("selectedUser = ", selectedUser);

  //   return (
  //     <div className="fixed inset-0 z-10 overflow-y-auto">
  //       <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
  //         <div
  //           className="fixed inset-0 transition-opacity"
  //           aria-hidden="true"
  //           onClick={() => {
  //             setSelectedUser(null);
  //           }}
  //         >
  //           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  //         </div>
  //         <span
  //           className="hidden sm:inline-block sm:h-screen sm:align-middle"
  //           aria-hidden="true"
  //         ></span>
  //         <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
  //           <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
  //             <div className="sm:flex sm:items-start">
  //               <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
  //                 <img
  //                   className="h-10 w-10 rounded-full"
  //                   src={selectedUser.avatar}
  //                   alt={selectedUser.name}
  //                 />
  //               </div>
  //               <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
  //                 <h3 className="mb-4 text-2xl font-medium leading-6 text-black">
  //                   {selectedUser.name}
  //                 </h3>
  //                 <div className="mt-2">
  //                   <p className="inline-block rounded-lg px-4 py-2 text-4xl font-bold text-indigo-600 shadow-lg">
  //                     {selectedUser.score}
  //                     <span className="tooltip">
  //                       <svg
  //                         className="h-6 w-6 text-gray-400 hover:text-gray-600"
  //                         viewBox="0 0 24 24"
  //                         fill="none"
  //                         stroke="currentColor"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth="2"
  //                           d="M12 19V12M12 8V8M12 4L12.01 4M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
  //                         ></path>
  //                       </svg>
  //                       <span className="tooltiptext">{selectedUser.reason}</span>
  //                     </span>
  //                   </p>
  //                   {selectedUser.summaryQuestions &&
  //                     selectedUser.summaryQuestions.map((question, index) => (
  //                       <div key={index}>
  //                         <p className="mb-2 mt-4 text-2xl font-medium leading-6 text-black">
  //                           {question.questionContent}
  //                         </p>
  //                         <p className="mb-2 text-sm text-gray-500">
  //                           Answer: {question.answerContent}
  //                           {question.skill && (
  //                             <span className="ml-2 text-xs font-medium text-gray-500">
  //                               (Skill: {question.skill})
  //                             </span>
  //                           )}
  //                         </p>
  //                         {question.reason && (
  //                           <p className="text-sm text-gray-500">
  //                             Reason: {question.reason}
  //                           </p>
  //                         )}
  //                       </div>
  //                     ))}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
  //             <button
  //               type="button"
  //               className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
  //               onClick={() => {
  //                 setSelectedUser(null);
  //               }}
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        ></span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                <img
                  className="h-10 w-10 rounded-full"
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="mb-4 text-2xl font-medium leading-6 text-black">
                  {selectedUser.name}
                </h3>
                <div className="mt-2">
                  <p className="inline-block rounded-lg px-4 py-2 text-4xl font-bold text-indigo-600 shadow-lg">
                    {selectedUser.score}
                    <span className="tooltip">
                      <svg
                        className="h-6 w-6 text-gray-400 hover:text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19V12M12 8V8M12 4L12.01 4M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                        ></path>
                      </svg>
                      <span className="tooltiptext">{selectedUser.reason}</span>
                    </span>
                  </p>
                  {selectedUser.summaryQuestions &&
                    selectedUser.summaryQuestions.map((question, index) => (
                      <div key={index}>
                        <p className="mb-2 mt-4 text-2xl font-medium leading-6 text-black">
                          {question.questionContent}
                        </p>
                        <p className="mb-2 text-sm text-gray-500">
                          Answer: {question.answerContent}
                        </p>
                        {question.score && (
                          <p className="inline-block rounded-lg px-4 py-2 text-lg font-bold text-indigo-400 shadow-xl">
                            Score: {question.score}
                          </p>
                        )}
                        {question.reason && (
                          <p className="text-sm text-gray-500">
                            Reason: {question.reason}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="px4 bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setSelectedUser(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div className="fixed inset-0 z-10 overflow-y-auto">
  //       <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
  //         <div
  //           className="fixed inset-0 transition-opacity"
  //           aria-hidden="true"
  //           //   onClick={onClose}
  //           onClick={() => {
  //             setSelectedUser(null);
  //           }}
  //         >
  //           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  //         </div>
  //         <span
  //           className="hidden sm:inline-block sm:h-screen sm:align-middle"
  //           aria-hidden="true"
  //         ></span>
  //         <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
  //           <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
  //             <div className="sm:flex sm:items-start">
  //               <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
  //                 <img
  //                   className="h-10 w-10 rounded-full"
  //                   src={selectedUser.avatar}
  //                   alt={selectedUser.name}
  //                 />
  //               </div>
  //               <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
  //                 <h3 className="text-lg font-medium leading-6 text-gray-900">
  //                   {selectedUser.name}
  //                 </h3>
  //                 <div className="mt-2">
  //                   <p className="text-sm text-gray-500">
  //                     Score: {selectedUser.score}
  //                   </p>
  //                   {selectedUser.summaryQuestions &&
  //                     selectedUser.summaryQuestions.map((question, index) => (
  //                       <div key={index}>
  //                         <p className="text-sm text-gray-500">
  //                           Question {index + 1}: {question.questionContent}
  //                         </p>
  //                         <p className="text-sm text-gray-500">
  //                           Answer: {question.answerContent}
  //                         </p>
  //                         {question.reason && (
  //                           <p className="text-sm text-gray-500">
  //                             Reason: {question.reason}
  //                           </p>
  //                         )}
  //   {question.score && (
  //     <p className="text-sm text-gray-500">
  //       Score: {question.score}
  //     </p>
  //   )}
  //                       </div>
  //                     ))}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
  //             <button
  //               type="button"
  //               className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
  //               //   onClick={onClose}
  //               onClick={() => {
  //                 setSelectedUser(null);
  //               }}
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default SelectedUser;
