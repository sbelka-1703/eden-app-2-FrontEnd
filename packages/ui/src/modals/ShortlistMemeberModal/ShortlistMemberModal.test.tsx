import { render } from "../../../utils/jest-apollo";
import { ShortlistMemberModal } from ".";

describe("ProjectInfoModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ShortlistMemberModal
        isModalOpen={true}
        roles={[
          {
            _id: "10",
            title: "Designer",
          },
          {
            _id: "11",
            title: "Frontend",
          },
          {
            _id: "12",
            title: "Backend",
          },
        ]}
        members={[
          {
            memberInfo: {
              _id: "1",
              discordName: "eloi",
              discriminator: "4567",
            },
            roleID: "10",
          },
          {
            memberInfo: {
              _id: "2",
              discordName: "miral",
              discriminator: "1234",
            },
            roleID: "11",
          },
          {
            memberInfo: {
              _id: "3",
              discordName: "blue",
              discriminator: "4578",
            },
            roleID: "10",
          },
          {
            memberInfo: {
              _id: "4",
              discordName: "moiz",
              discriminator: "9012",
              memberRole: {
                title: "Designer",
              },
            },

            roleID: "12",
          },
        ]}
      />
    );

    expect(container).toBeInTheDocument();
  });
});
