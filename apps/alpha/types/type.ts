/* eslint-disable no-unused-vars */
export interface PartialMember {
  user?: PartialUser;
  nick?: string;
  avatar?: string;
}

interface PartialUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
}

export interface PartialChannel {
  id: string;
  permissions: number;
}

export interface PartialMessage {
  id: string;
  channel_id: string;
}

export enum AutoArchiveDuration {
  OneHour = 60,
  OneDay = 1440,
  ThreeDay = 4320,
  SevenDay = 10080,
}

export interface CreateThreadResponse {
  threadId: string;
}

export interface FetchGuildMembersResponse {
  members: Array<PartialMember>;
}

export interface CreateThreadApiRequestBody {
  message: string;
  embedMessage: string;
  senderName: string;
  senderAvatarURL: string;
  channelId: string;
  threadName: string;
  autoArchiveDuration: AutoArchiveDuration;
}
