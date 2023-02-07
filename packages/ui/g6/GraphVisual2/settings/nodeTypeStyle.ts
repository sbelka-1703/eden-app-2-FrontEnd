interface styleData {
  fill: string;
  stroke: string;
  size: number;
  displayName: string;
  sizeRatio: number;
}

interface mockData {
  Member: styleData;
  sub_typeProject: styleData;
  typeProject: styleData;
  sub_expertise: styleData;
  expertise: styleData;
  Project: styleData;
  Role: styleData;
  disabledNode: styleData;
}

export const nodeTypeStyle: mockData = {
  Member: {
    fill: "#f9efff",
    stroke: "#bf55ff",
    size: 90,
    displayName: "Member",
    sizeRatio: 0.3,
  },
  // eslint-disable-next-line camelcase
  sub_typeProject: {
    fill: "#faffef",
    stroke: "#cdff52",
    size: 20,
    displayName: "Sub Project Type",
    sizeRatio: 0.05,
  },
  typeProject: {
    fill: "#f0fdaf",
    stroke: "#9AECaE",
    size: 40,
    displayName: "Project Type",
    sizeRatio: 0.15,
  },
  // eslint-disable-next-line camelcase
  sub_expertise: {
    fill: "#EBFCFF",
    stroke: "#9AECaE",
    size: 25,
    displayName: "Skill",
    sizeRatio: 0.15,
  },
  expertise: {
    fill: "#C2F7FF",
    stroke: "#9AECFE",
    size: 40,
    displayName: "Expertise",
    sizeRatio: 0.25,
  },
  Project: {
    fill: "#FDFFDC",
    stroke: "#FAE289",
    size: 75,
    displayName: "Project",
    sizeRatio: 1,
  },
  Role: {
    fill: "#E8FBDA",
    stroke: "#C8F4A4",
    size: 50,
    displayName: "Project Role",
    sizeRatio: 0.8,
  },
  disabledNode: {
    fill: "#E8EBED",
    stroke: "#505C68",
    size: 25,
    displayName: "Disabled Nodes",
    sizeRatio: 0,
  },
};
