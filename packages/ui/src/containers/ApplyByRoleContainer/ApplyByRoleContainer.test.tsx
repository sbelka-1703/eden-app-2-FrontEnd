import { getProject } from "@eden/package-mock";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";

import { render, screen } from "../../../utils/jest-apollo";
import { createMockRouter } from "../../../utils/test-utils/createMockRouter";
import { ApplyByRoleContainer } from "./";

jest.mock("react-confetti");

test("User can get to the YOU DID IT modal ", async () => {
  const user = userEvent.setup();

  await render(
    <MockRouter>
      <ApplyByRoleContainer
        onViewProject={(val) => console.log(val)}
        loadingProject={false}
        project={getProject()}
      />
    </MockRouter>
  );

  //There are multiple roles on a page with multiple "more" buttons. Here I am clicking on the first one:
  await user.click(screen.getAllByText("More")[0]);

  /*
   By clicking on the "More" button we open up the ApplyByRoleModal in which a user can fill out more information

   --Bellow are the tests for this modal:
 */
  //User selects the timezone from the dropdown
  await user.click(screen.getByRole("combobox"));
  await user.click(screen.getByText("UTC-10"));
  await expect(screen.getByDisplayValue("UTC-10")).toBeInTheDocument();

  //User types in that they can work 69 hour/week
  const hoursInput = screen.getByPlaceholderText("Hours");

  await user.click(hoursInput);
  await user.type(hoursInput, "69");
  await expect(screen.getByDisplayValue("69")).toBeInTheDocument();

  //User inputs their social handles

  //Twitter
  const twitterHandleInput = screen.getByPlaceholderText("Twitter Handle");

  await user.click(twitterHandleInput);
  await user.type(twitterHandleInput, "sbelka");
  await expect(screen.getByDisplayValue("sbelka")).toBeInTheDocument();

  //GitHub
  const GitHubHandleInput = screen.getByPlaceholderText("Github Handle");

  await user.click(GitHubHandleInput);
  await user.type(GitHubHandleInput, "sbelka-1703");
  await expect(screen.getByDisplayValue("sbelka-1703")).toBeInTheDocument();

  //Telegram
  const TelegramHandleInput = screen.getByPlaceholderText("Telegram Handle");

  await user.click(TelegramHandleInput);
  await user.type(TelegramHandleInput, "sbelka_1703");
  await expect(screen.getByDisplayValue("sbelka_1703")).toBeInTheDocument();

  //User clicks on the Submit Button and sees the YOU DID IT! modal with confetti
  await user.click(screen.getByText("Submit Application"));

  expect(screen.getByText("YOU DID IT!")).toBeInTheDocument();
});
