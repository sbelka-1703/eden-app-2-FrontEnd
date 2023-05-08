import { useQuery } from "@apollo/client";
import { FIND_COMPANY_FULL } from "@eden/package-graphql";
import { CandidateType } from "@eden/package-graphql/generated";
import {
  AppUserLayout,
  CandidateInfo,
  CandidatesTableList,
} from "@eden/package-ui";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NextPageWithLayout } from "../_app";

const CompanyCRM: NextPageWithLayout = () => {
  const router = useRouter();
  const { companyID } = router.query;

  const [candidates, setCandidates] = useState<CandidateType[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserScore, setSelectedUserScore] = useState<number | null>(
    null
  );
  const [selectedUserSummaryQuestions, setSelectedUserSummaryQuestions] =
    useState<any[]>([]);

  const {
    // data: findCompanyData,
    loading: findCompanyIsLoading,
    // error: findCompanyError,
  } = useQuery(FIND_COMPANY_FULL, {
    variables: {
      fields: {
        _id: companyID,
      },
    },
    skip: !Boolean(companyID),
    ssr: false,
    onCompleted: (data: any) => {
      setCandidates(data.findCompany.candidates);
    },
  });

  const handleRowClick = (user: CandidateType) => {
    if (user.user?._id) setSelectedUserId(user.user?._id);
    if (user.overallScore) setSelectedUserScore(user.overallScore);
    if (user.summaryQuestions)
      setSelectedUserSummaryQuestions(user.summaryQuestions);
  };

  return (
    <div className="grid flex-1 grid-cols-2 gap-4">
      <div className="col-1">
        <div className="container m-4 border border-gray-500 p-4">
          <CandidatesTableList
            candidatesList={candidates}
            fetchIsLoading={findCompanyIsLoading}
            setRowObjectData={handleRowClick}
          />
        </div>
      </div>
      <div className="col-2">
        <div className="m-4 border border-gray-500 bg-white p-10">
          <CandidateInfo
            memberID={selectedUserId || ""}
            percentage={selectedUserScore}
            summaryQuestions={selectedUserSummaryQuestions}
          />
        </div>
      </div>
    </div>
  );
};

CompanyCRM.getLayout = (page: any) => <AppUserLayout>{page}</AppUserLayout>;

export default CompanyCRM;
