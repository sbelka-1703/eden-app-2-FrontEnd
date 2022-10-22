import { render } from "../../../utils/jest-apollo";
import { FindTalentModal } from ".";

describe("FindTalentModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <FindTalentModal
        data={[
          {
            _id: "1",
            title: "Vibe check - what values should they possess?",
            subtitle:
              "Do you have carefullly curated culture in your team? Tell us what values are important for you!",
            itemsTitle: "Values & Culture fit:",
            battery: true,
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
          },
        ]}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
