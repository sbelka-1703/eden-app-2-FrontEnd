import { gql } from "@apollo/client";

export const EDEN_GPT_REPLY = gql`
  query ($fields: edenGPTreplyInput!) {
    edenGPTreply(fields: $fields) {
      reply
    }
  }
`;

export const EDEN_GPT_REPLY_MEMORY = gql`
  query ($fields: edenGPTreplyMemoryInput!) {
    edenGPTreplyMemory(fields: $fields) {
      reply
    }
  }
`;

export const EDEN_GPT_REPLY_CHAT_API = gql`
  query ($fields: edenGPTreplyChatAPIInput!) {
    edenGPTreplyChatAPI(fields: $fields) {
      reply
    }
  }
`;
export const EDEN_GPT_REPLY_CHAT_API_V2 = gql`
  query ($fields: edenGPTreplyChatAPI_V2Input!) {
    edenGPTreplyChatAPI_V2(fields: $fields) {
      reply
    }
  }
`;

export const MESSAGE_MAP_KG = gql`
  query ($fields: messageMapKGInput!) {
    messageMapKG(fields: $fields) {
      keywords {
        keyword
        confidence
        nodeID
      }
    }
  }
`;

export const MESSAGE_MAP_KG_V2 = gql`
  query ($fields: messageMapKG_V2Input!) {
    messageMapKG_V2(fields: $fields) {
      keywords {
        keyword
        confidence
        nodeID
        node {
          _id
          name
          node
          categoryNodes {
            name
          }
          groupNodes {
            name
          }
        }
      }
    }
  }
`;

export const STORE_LONG_TERM_MEMORY = gql`
  mutation ($fields: storeLongTermMemoryInput!) {
    storeLongTermMemory(fields: $fields) {
      summary
      success
    }
  }
`;
