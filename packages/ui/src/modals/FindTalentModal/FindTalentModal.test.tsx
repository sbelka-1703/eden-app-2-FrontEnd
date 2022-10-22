import { render } from "../../../utils/jest-apollo";
import { FindTalentModal } from ".";

describe("FindTalentModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <FindTalentModal
        data={{
          section1: {
            title: "Vibe check - what values should they possess?",
            subtitle:
              "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
          },
          section2: {
            title: "Values & Culture fit:",
          },
          items: [
            {
              _id: "1",
              name: "Ownership",
            },
            {
              _id: "2",
              name: "Passion",
            },
            {
              _id: "3",
              name: "Teamwork",
            },
            {
              _id: "4",
              name: "Honesty",
            },
            {
              _id: "5",
              name: "Integrity",
            },
          ],
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        onSubmit={function (data): void {
          console.log(data);

          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
