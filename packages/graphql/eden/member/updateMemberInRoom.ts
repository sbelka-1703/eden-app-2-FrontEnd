import { gql } from "@apollo/client";

export const UPDATE_MEMBER_IN_ROOM = gql`
  mutation ($fields: updateMemberInRoomInput) {
    updateMemberInRoom(fields: $fields) {
      _id
    }
  }
`;
