import React from "react";

// interface Props {}

// interface Props {
//   selectedOption: string;
//   setSelectedOption: (newValue: string) => void;
//   setSelectedOption: (newValue: string) => void;
// }

const MenuOption = (props: any) => {
  return (
    <div>
      <div>
        <label style={{ margin: "10px" }}>
          <input
            type="radio"
            name="menuOption"
            value="Option 1"
            checked={props.selectedOption === "Option 1"}
            onChange={(e) => props.setSelectedOption(e.target.value)}
          />
          Test Graph
        </label>
        <label style={{ margin: "10px" }}>
          <input
            type="radio"
            name="menuOption"
            value="Option 2"
            checked={props.selectedOption === "Option 2"}
            onChange={(e) => props.setSelectedOption(e.target.value)}
          />
          Member to Project Graph
        </label>
        <label style={{ margin: "10px" }}>
          <input
            type="radio"
            name="menuOption"
            value="Option 3"
            checked={props.selectedOption === "Option 3"}
            onChange={(e) => props.setSelectedOption(e.target.value)}
          />
          Member Graph
        </label>
        <label style={{ margin: "10px" }}>
          <input
            type="radio"
            name="menuOption"
            value="Option 4"
            checked={props.selectedOption === "Option 4"}
            onChange={(e) => props.setSelectedOption(e.target.value)}
          />
          Project Graph
        </label>
        {props.selectedOption === "Option 1" && (
          <div>
            <label htmlFor="checkbox" style={{ paddingRight: "10px" }}>
              Show Avatar:
            </label>
            <input
              style={{ padding: "10px" }}
              id="checkbox"
              type="checkbox"
              checked={props.settingsGraphs.useAvatar}
              onChange={() =>
                props.updateSettings({
                  ...props.settingsGraphs,
                  useAvatar: !props.settingsGraphs.useAvatar,
                  updateGraph: true,
                })
              }
            />
          </div>
        )}
        {props.selectedOption === "Option 2" && (
          <div>
            <div>
              <label htmlFor="checkbox" style={{ paddingRight: "10px" }}>
                Show Avatar:
              </label>
              <input
                style={{ padding: "10px" }}
                id="checkbox"
                type="checkbox"
                checked={props.settingsGraphs.useAvatar}
                onChange={() =>
                  props.updateSettings({
                    ...props.settingsGraphs,
                    useAvatar: !props.settingsGraphs.useAvatar,
                    updateGraph: true,
                  })
                }
              />
            </div>
            <br />
            <label htmlFor="input1" style={{ paddingRight: "10px" }}>
              Member ID:
            </label>
            <input
              id="input1"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid gray",
                fontSize: "0.8em",
                width: "200px",
              }}
              type="text"
              value={props.settingsGraphs.memberID1}
              onChange={(e) =>
                props.updateSettings({
                  ...props.settingsGraphs,
                  memberID1: e.target.value,
                  updateGraph: false,
                })
              }
            />
            <br />
            <label htmlFor="input1" style={{ paddingRight: "10px" }}>
              Project ID:
            </label>
            <input
              id="input1"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid gray",
                fontSize: "0.8em",
                width: "200px",
              }}
              type="text"
              value={props.settingsGraphs.projectID1}
              onChange={(e) =>
                props.updateSettings({
                  ...props.settingsGraphs,
                  projectID1: e.target.value,
                  updateGraph: false,
                })
              }
            />
          </div>
        )}
        {props.selectedOption === "Option 3" && (
          <div>
            <div>
              <label htmlFor="checkbox" style={{ paddingRight: "10px" }}>
                Show Avatar:
              </label>
              <input
                style={{ padding: "10px" }}
                id="checkbox"
                type="checkbox"
                checked={props.settingsGraphs.useAvatar}
                onChange={() =>
                  props.updateSettings({
                    ...props.settingsGraphs,
                    useAvatar: !props.settingsGraphs.useAvatar,
                    updateGraph: true,
                  })
                }
              />
            </div>
            <br />
            <label htmlFor="input1" style={{ paddingRight: "10px" }}>
              MemberID:
            </label>
            <input
              id="input1"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid gray",
                fontSize: "0.8em",
                width: "200px",
              }}
              type="text"
              value={props.settingsGraphs.memberID1}
              onChange={(e) =>
                props.updateSettings({
                  ...props.settingsGraphs,
                  memberID1: e.target.value,
                })
              }
            />
          </div>
        )}
        {props.selectedOption === "Option 4" && (
          <div>
            <br />
            <div>
              <label htmlFor="checkbox" style={{ paddingRight: "10px" }}>
                Show Avatar:
              </label>
              <input
                style={{ padding: "10px" }}
                id="checkbox"
                type="checkbox"
                checked={props.settingsGraphs.useAvatar}
                onChange={() =>
                  props.updateSettings({
                    ...props.settingsGraphs,
                    useAvatar: !props.settingsGraphs.useAvatar,
                    updateGraph: true,
                  })
                }
              />
            </div>
            <br />
            <label htmlFor="input1" style={{ paddingRight: "10px" }}>
              Project ID:
            </label>
            <input
              id="input1"
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid gray",
                fontSize: "0.8em",
                width: "200px",
              }}
              type="text"
              value={props.settingsGraphs.projectID1}
              onChange={(e) =>
                props.updateSettings({
                  ...props.settingsGraphs,
                  projectID1: e.target.value,
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuOption;
