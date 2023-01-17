// import { fireEvent, render } from "@testing-library/react";

// import { DescriptionGPT } from "./DescriptionGPT";
// import { MESSAGE_TO_GTP } from "./MESSAGE_TO_GTP";

// jest.mock("./MESSAGE_TO_GTP", () => jest.fn());

// describe("DescriptionGPT", () => {
//   let mockMutation, mockCategory, mockEvent, mockResponse;

//   beforeEach(() => {
//     mockMutation = jest.fn();
//     mockCategory = jest.fn();
//     mockEvent = jest.fn();
//     mockResponse = jest.fn();
//   });

//   it("should call mutation when the button is clicked", () => {
//     const { getByTestId } = render(<DescriptionGPT />);
//     const button = getByTestId("button");

//     fireEvent.click(button);
//     expect(mockMutation).toHaveBeenCalled();
//   });

//   it("should pass the correct category to the mutation when the button is clicked", () => {
//     const { getByTestId } = render(<DescriptionGPT />);
//     const button = getByTestId("button");

//     fireEvent.click(button);
//     expect(mockCategory).toHaveBeenCalledWith(Category.Project);
//   });

//   it("should set the message in the state when the text area is changed", () => {
//     const { getByTestId } = render(<DescriptionGPT />);
//     const textarea = getByTestId("textarea");

//     fireEvent.change(textarea, mockEvent);
//     expect(mockMutation).toHaveBeenCalledWith(mockEvent.target.value);
//   });

//   it("should pass the message to the mutation when it is triggered", () => {
//     const { getByTestId } = render(<DescriptionGPT />);
//     const textarea = getByTestId("textarea");

//     fireEvent.change(textarea, mockEvent);
//     fireEvent.click(getByTestId("button"));
//     expect(MESSAGE_TO_GTP).toHaveBeenCalledWith({
//       variables: {
//         fields: {
//           message: mockEvent.target.value,
//           category: Category.Project,
//         },
//       },
//       context: { serviceName: "soilservice" },
//     });
//   });

//   it("should return the correct message from the mutation", () => {
//     const { getByTestId } = render(<DescriptionGPT />);
//     const textarea = getByTestId("textarea");

//     fireEvent.change(textarea, mockEvent);
//     fireEvent.click(getByTestId("button"));
//     expect(mockResponse).toHaveBeenCalledWith(messageToGPT.message);
//   });

//   it("should set the message in the state when the mutation is completed", () => {
//     const { getByTestId } = render(<DescriptionGPT />);
//     const textarea = getByTestId("textarea");

//     fireEvent.change(textarea, mockEvent);
//     fireEvent.click(getByTestId("button"));
//     expect(setMessage).toHaveBeenCalledWith(messageToGPT.message);
//   });
// });
