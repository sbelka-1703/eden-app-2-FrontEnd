/* eslint-disable no-unused-vars */
import {
  APIGuild,
  APIGuildMember,
  ThreadAutoArchiveDuration,
} from "discord-api-types/v10";

export interface CreateThreadResponse {
  threadId: string;
}

export interface FetchGuildMembersResponse {
  members: Array<APIGuildMember>;
}

export interface FetchMutualGuildsResponse {
  guilds: Array<APIGuild>;
}

export interface CreateThreadApiRequestBody {
  message: string;
  embedMessage: string;
  senderName: string;
  senderAvatarURL: string;
  channelId: string;
  threadName: string;
  ThreadAutoArchiveDuration: ThreadAutoArchiveDuration;
}

export interface CreateMessageApiRequestBody {
  message: string;
  thread: string;
  embedMessage?: string;
  senderName?: string;
  senderAvatarURL?: string;
  channelId?: string;
  threadName?: string;
  ThreadAutoArchiveDuration?: ThreadAutoArchiveDuration;
}
