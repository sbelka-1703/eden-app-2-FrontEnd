import { Maybe, RoleTemplate } from "@eden/package-graphql/generated";

export const findRoleTemplates: Maybe<Array<Maybe<RoleTemplate>>> = [
  {
    _id: "62f14dc33235560004a48119",
    description: null,
    title: "Workshop Guid",
    skills: [
      {
        _id: "63098c32b003e10004f99c92",
        name: "Cascading Style Sheets (CSS)",
      },
      {
        _id: "63098c36b003e10004f99d33",
        name: "Bootstrap (Front-End Framework)",
      },
    ],
  },
  {
    _id: "62f14de73235560004a48138",
    description: null,
    title: "Blockchain Engineer",
    skills: [
      {
        _id: "63098d06b003e10004f9aacd",
        name: "Angular (Web Framework)",
      },
      {
        _id: "63098d0db003e10004f9ab8f",
        name: "Blockchain",
      },
    ],
  },
  {
    _id: "62f3deeb184afd000459a848",
    description: null,
    title: "FrontEnd ",
    skills: [
      {
        _id: "63098c39b003e10004f99d46",
        name: "Browser Compatibility",
      },
      {
        _id: "63098c3cb003e10004f99d59",
        name: "HTML5",
      },
    ],
  },
  {
    _id: "62f3def8184afd000459a850",
    description: null,
    title: "BackEnd ",
    skills: [
      {
        _id: "63098d1db003e10004f9ac92",
        name: "ECMAScript 2015",
      },
    ],
  },
];
