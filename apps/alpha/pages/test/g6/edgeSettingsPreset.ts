/* eslint-disable camelcase */
export const edgeSettingsPreset = {
  "skill|Member": {
    edge: {
      mainEdge: {
        nodeTypeSource: "skill",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 170,
          strength: 0.5,
        },
      },
    },
    sub_expertise: {
      mainEdge: {
        nodeTypeSource: "skill",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 200,
          strength: 0.5,
        },
      },
      moreThanSplit: 2,
      splitEdge: [
        {
          nodeTypeSource: "skill",
          nodeTypeMiddle: "sub_expertise",
          nodeTypeTarget: "Member",
        },
      ],
    },
    doubleSplitEdge: {
      mainEdge: {
        nodeTypeSource: "skill",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 200,
          strength: 0.5,
        },
      },
      moreThanSplit: 2,
      splitEdge: [
        {
          nodeTypeSource: "skill",
          nodeTypeMiddle: "sub_expertise",
          nodeTypeTarget: "expertise",
        },
        {
          nodeTypeSource: "sub_expertise",
          nodeTypeMiddle: "expertise",
          nodeTypeTarget: "Member",
        },
      ],
    },
  },
  "skill|Role": {
    edge: {
      mainEdge: {
        nodeTypeSource: "skill",
        nodeTypeTarget: "Role",
        style: {
          color: "#E0E0E0",
          distance: 170,
          strength: 0.5,
        },
      },
    },
  },
  "skill|sub_expertise": {
    edge: {
      mainEdge: {
        nodeTypeSource: "skill",
        nodeTypeTarget: "sub_expertise",
        style: {
          color: "#E0E0E0",
          distance: 60,
          strength: 0.5,
        },
      },
    },
  },
  "sub_expertise|expertise": {
    edge: {
      mainEdge: {
        nodeTypeSource: "sub_expertise",
        nodeTypeTarget: "expertise",
        style: {
          color: "#E0E0E0",
          distance: 95,
          strength: 0.5,
        },
      },
    },
  },
  "expertise|Member": {
    edge: {
      mainEdge: {
        nodeTypeSource: "expertise",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 170,
          strength: 0.5,
        },
      },
    },
  },
  "sub_expertise|Member": {
    edge: {
      mainEdge: {
        nodeTypeSource: "sub_expertise",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 200,
          strength: 0.5,
        },
      },
    },
    expertise: {
      mainEdge: {
        nodeTypeSource: "sub_expertise",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 200,
          strength: 0.5,
        },
      },
      moreThanSplit: 2,
      splitEdge: [
        {
          nodeTypeSource: "sub_expertise",
          nodeTypeMiddle: "expertise",
          nodeTypeTarget: "Member",
        },
      ],
    },
  },
  "sub_typeProject|typeProject": {
    edge: {
      mainEdge: {
        nodeTypeSource: "sub_typeProject",
        nodeTypeTarget: "typeProject",
        style: {
          color: "#E0E0E0",
          distance: 70,
          strength: 0.5,
        },
      },
    },
  },
  "Project|Role": {
    edge: {
      mainEdge: {
        nodeTypeSource: "Project",
        nodeTypeTarget: "Role",
        style: {
          color: "#E0E0E0",
          distance: 90,
          strength: 0.5,
        },
      },
    },
  },
  "expertise|Role": {
    edge: {
      mainEdge: {
        nodeTypeSource: "expertise",
        nodeTypeTarget: "Role",
        style: {
          color: "#E0E0E0",
          distance: 90,
          strength: 0.5,
        },
      },
    },
  },
  "sub_expertise|Role": {
    edge: {
      mainEdge: {
        nodeTypeSource: "sub_expertise",
        nodeTypeTarget: "Role",
        style: {
          color: "#E0E0E0",
          distance: 130,
          strength: 0.5,
        },
      },
    },
    expertise: {
      mainEdge: {
        nodeTypeSource: "sub_expertise",
        nodeTypeTarget: "Role",
        style: {
          color: "#E0E0E0",
          distance: 200,
          strength: 0.5,
        },
      },
      moreThanSplit: 2,
      splitEdge: [
        {
          nodeTypeSource: "sub_expertise",
          nodeTypeMiddle: "expertise",
          nodeTypeTarget: "Role",
        },
      ],
    },
  },
  "sub_typeProject|Role": {
    edge: {
      mainEdge: {
        nodeTypeSource: "sub_typeProject",
        nodeTypeTarget: "Role",
        style: {
          color: "#E0E0E0",
          distance: 150,
          strength: 0.5,
        },
      },
    },
  },
  "typeProject|Member": {
    edge: {
      mainEdge: {
        nodeTypeSource: "typeProject",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 170,
          strength: 0.5,
        },
      },
    },
  },
  "sub_typeProject|Member": {
    edge: {
      mainEdge: {
        nodeTypeSource: "sub_typeProject",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 110,
          strength: 0.5,
        },
      },
    },
    typeProject: {
      mainEdge: {
        nodeTypeSource: "sub_typeProject",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 110,
          strength: 0.5,
        },
      },
      moreThanSplit: 2,
      splitEdge: [
        {
          nodeTypeSource: "sub_typeProject",
          nodeTypeMiddle: "typeProject",
          nodeTypeTarget: "Member",
        },
      ],
    },
  },
  "Project|Member": {
    edge: {
      mainEdge: {
        nodeTypeSource: "Project",
        nodeTypeTarget: "Member",
        style: {
          color: "#E0E0E0",
          distance: 110,
          strength: 0.5,
        },
      },
    },
    hiddenEdge: {
      mainEdge: {
        nodeTypeSource: "Project",
        nodeTypeTarget: "Member",
        style: {
          color: "#FFFFFF",
          distance: 500,
          strength: 0.5,
        },
      },
      hiddenEdge: true,
    },
  },
  "typeProject|expertise": {
    edge: {
      mainEdge: {
        nodeTypeSource: "typeProject",
        nodeTypeTarget: "expertise",
        style: {
          color: "#E0E0E0",
          distance: 210,
          strength: 0.5,
        },
      },
    },
    hiddenEdge: {
      mainEdge: {
        nodeTypeSource: "typeProject",
        nodeTypeTarget: "expertise",
        style: {
          color: "#FFFFFF",
          distance: 300,
          strength: 0.5,
        },
      },
      hiddenEdge: true,
    },
  },
};
