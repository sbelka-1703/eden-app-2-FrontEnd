export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Chats = {
  __typename?: 'Chats';
  _id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  projectID?: Maybe<Scalars['ID']>;
  projectRoleID?: Maybe<Scalars['ID']>;
  receiverID?: Maybe<Scalars['ID']>;
  reply?: Maybe<ReplyType>;
  result?: Maybe<ResultEnum>;
  senderID?: Maybe<Scalars['ID']>;
  serverID?: Maybe<Scalars['ID']>;
  threadID?: Maybe<Scalars['ID']>;
};

export type DistanceType = {
  __typename?: 'DistanceType';
  hop0?: Maybe<Array<Maybe<Scalars['ID']>>>;
  hop1?: Maybe<Array<Maybe<Scalars['ID']>>>;
  hop2?: Maybe<Array<Maybe<Scalars['ID']>>>;
  hop3?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Epic = {
  __typename?: 'Epic';
  _id?: Maybe<Scalars['ID']>;
  author?: Maybe<Members>;
  champion?: Maybe<Members>;
  channelDiscordlID?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Members>>>;
  name?: Maybe<Scalars['String']>;
  notifyUsers?: Maybe<Array<Maybe<Members>>>;
  phase?: Maybe<PhaseEpicType>;
  project?: Maybe<Project>;
  serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
  task?: Maybe<Array<Maybe<ProjectUpdate>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type ErrorLog = {
  __typename?: 'ErrorLog';
  _id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  component?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  stacktrace?: Maybe<Array<Maybe<Scalars['String']>>>;
  user?: Maybe<User>;
};

export type MatchPercentage = {
  __typename?: 'MatchPercentage';
  budgetPercentage?: Maybe<Scalars['Float']>;
  hoursPercentage?: Maybe<Scalars['Float']>;
  realTotalPercentage?: Maybe<Scalars['Float']>;
  skillTotalPercentage?: Maybe<Scalars['Float']>;
  totalPercentage?: Maybe<Scalars['Float']>;
};

export type MatchType = {
  __typename?: 'MatchType';
  distanceMembers?: Maybe<DistanceType>;
  distanceProject?: Maybe<DistanceType>;
  distanceProjectRoles?: Maybe<DistanceType>;
  recalculateMembers?: Maybe<Scalars['Boolean']>;
  recalculateProject?: Maybe<Scalars['Boolean']>;
  recalculateProjectRoles?: Maybe<Scalars['Boolean']>;
};

export type Members = {
  __typename?: 'Members';
  _id?: Maybe<Scalars['ID']>;
  archiveProjects?: Maybe<Array<Maybe<Scalars['String']>>>;
  attributes?: Maybe<AttributesType>;
  bio?: Maybe<Scalars['String']>;
  chat?: Maybe<ChatResponse>;
  content?: Maybe<ContentType>;
  discordAvatar?: Maybe<Scalars['String']>;
  discordName?: Maybe<Scalars['String']>;
  discriminator?: Maybe<Scalars['String']>;
  endorsements?: Maybe<Array<Maybe<Endorsements>>>;
  gardenUpdate?: Maybe<GardenUpdateType>;
  hoursPerWeek?: Maybe<Scalars['Float']>;
  interest?: Maybe<Scalars['String']>;
  invitedBy?: Maybe<MembersSmallType>;
  links?: Maybe<Array<Maybe<LinkType>>>;
  memberRole?: Maybe<RoleTemplate>;
  network?: Maybe<Array<Maybe<Members>>>;
  onbording?: Maybe<OnboardingType>;
  previusProjects?: Maybe<Array<Maybe<PreviusProjectsType>>>;
  projects?: Maybe<Array<Maybe<ProjectMemberType>>>;
  registeredAt?: Maybe<Scalars['String']>;
  serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
  skills?: Maybe<Array<Maybe<SkillType_Member>>>;
  timeZone?: Maybe<Scalars['String']>;
  tweets?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MembersSmallType = {
  __typename?: 'MembersSmallType';
  _id?: Maybe<Scalars['ID']>;
  discordAvatar?: Maybe<Scalars['String']>;
  discordName?: Maybe<Scalars['String']>;
  discriminator?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEndorsement?: Maybe<Members>;
  addFavoriteProject?: Maybe<Members>;
  addNewChat?: Maybe<Chats>;
  addNewMember?: Maybe<Members>;
  addSkillToMember?: Maybe<Members>;
  approveOrRejectSkill?: Maybe<Skills>;
  approveTweet?: Maybe<Project>;
  changeTeamMember_Phase_Project?: Maybe<Project>;
  createApprovedSkill?: Maybe<Skills>;
  createNewEpic?: Maybe<Epic>;
  createNewRole?: Maybe<Role>;
  createNewTeam?: Maybe<Team>;
  createNode?: Maybe<Node>;
  createProjectUpdate?: Maybe<ProjectUpdate>;
  createRoom?: Maybe<Rooms>;
  createSkill?: Maybe<Skills>;
  createSkills?: Maybe<Array<Maybe<Skills>>>;
  endorseAttribute?: Maybe<Members>;
  enterRoom?: Maybe<Rooms>;
  exitRoom?: Maybe<Rooms>;
  login: User;
  newTweetProject?: Maybe<TweetsProject>;
  relatedNode?: Maybe<Node>;
  relatedNode_name?: Maybe<Node>;
  relatedSkills?: Maybe<Skills>;
  updateChatReply?: Maybe<Chats>;
  updateChatResult?: Maybe<Chats>;
  updateMember?: Maybe<Members>;
  updateMemberInRoom?: Maybe<Members>;
  updateProject?: Maybe<Project>;
  updateRoleTemplate?: Maybe<RoleTemplate>;
  updateServer?: Maybe<ServerTemplate>;
  updateSkillCategory?: Maybe<SkillCategory>;
  updateSkillSubCategory?: Maybe<SkillSubCategory>;
};


export type MutationAddEndorsementArgs = {
  fields?: InputMaybe<AddEndorsementInput>;
};


export type MutationAddFavoriteProjectArgs = {
  fields: AddFavoriteProjectInput;
};


export type MutationAddNewChatArgs = {
  fields?: InputMaybe<AddNewChatInput>;
};


export type MutationAddNewMemberArgs = {
  fields: AddNewMemberInput;
};


export type MutationAddSkillToMemberArgs = {
  fields: AddSkillToMember_Input;
};


export type MutationApproveOrRejectSkillArgs = {
  fields?: InputMaybe<ApproveOrRejectSkillInput>;
};


export type MutationApproveTweetArgs = {
  fields: ApproveTweetInput;
};


export type MutationChangeTeamMember_Phase_ProjectArgs = {
  fields: ChangeTeamMember_Phase_ProjectInput;
};


export type MutationCreateApprovedSkillArgs = {
  fields?: InputMaybe<CreateApprovedSkillInput>;
};


export type MutationCreateNewEpicArgs = {
  fields: CreateNewEpicInput;
};


export type MutationCreateNewRoleArgs = {
  fields: CreateNewRoleInput;
};


export type MutationCreateNewTeamArgs = {
  fields: CreateNewTeamInput;
};


export type MutationCreateNodeArgs = {
  fields?: InputMaybe<CreateNodeInput>;
};


export type MutationCreateProjectUpdateArgs = {
  fields: CreateProjectUpdateInput;
};


export type MutationCreateRoomArgs = {
  fields: CreateRoomInput;
};


export type MutationCreateSkillArgs = {
  fields?: InputMaybe<CreateSkillInput>;
};


export type MutationCreateSkillsArgs = {
  fields?: InputMaybe<CreateSkillsInput>;
};


export type MutationEndorseAttributeArgs = {
  fields: EndorseAttributeInput;
};


export type MutationEnterRoomArgs = {
  fields: EnterRoomInput;
};


export type MutationExitRoomArgs = {
  fields: EnterRoomInput;
};


export type MutationLoginArgs = {
  fields: LoginInput;
};


export type MutationNewTweetProjectArgs = {
  fields: NewTweetProjectInput;
};


export type MutationRelatedNodeArgs = {
  fields?: InputMaybe<RelatedNodeInput>;
};


export type MutationRelatedNode_NameArgs = {
  fields?: InputMaybe<RelatedNode_NameInput>;
};


export type MutationRelatedSkillsArgs = {
  fields?: InputMaybe<RelatedSkillsInput>;
};


export type MutationUpdateChatReplyArgs = {
  fields?: InputMaybe<UpdateChatReplyInput>;
};


export type MutationUpdateChatResultArgs = {
  fields?: InputMaybe<UpdateChatResultInput>;
};


export type MutationUpdateMemberArgs = {
  fields: UpdateMemberInput;
};


export type MutationUpdateMemberInRoomArgs = {
  fields?: InputMaybe<UpdateMemberInRoomInput>;
};


export type MutationUpdateProjectArgs = {
  fields: UpdateProjectInput;
};


export type MutationUpdateRoleTemplateArgs = {
  fields?: InputMaybe<CreateRoleInput>;
};


export type MutationUpdateServerArgs = {
  fields?: InputMaybe<UpdateServerInput>;
};


export type MutationUpdateSkillCategoryArgs = {
  fields?: InputMaybe<UpdateSkillCategoryInput>;
};


export type MutationUpdateSkillSubCategoryArgs = {
  fields?: InputMaybe<UpdateSkillSubCategoryInput>;
};

export type Node = {
  __typename?: 'Node';
  _id?: Maybe<Scalars['ID']>;
  aboveNodes?: Maybe<Array<Maybe<Node>>>;
  match?: Maybe<MatchType>;
  name?: Maybe<Scalars['String']>;
  node?: Maybe<Scalars['String']>;
  registeredAt?: Maybe<Scalars['String']>;
  relatedNodes?: Maybe<Array<Maybe<Node>>>;
  state?: Maybe<StateEnum>;
  subNodes?: Maybe<Array<Maybe<Node>>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  end?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPrevPage?: Maybe<Scalars['Boolean']>;
  start?: Maybe<Scalars['String']>;
};

export type PaginatedSkills = {
  __typename?: 'PaginatedSkills';
  data?: Maybe<Array<Maybe<Skills>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['ID']>;
  backColorEmoji?: Maybe<Scalars['String']>;
  budget?: Maybe<BudgetType>;
  champion?: Maybe<Members>;
  collaborationLinks?: Maybe<Array<Maybe<CollaborationLinksType>>>;
  dates?: Maybe<DatesType>;
  description?: Maybe<Scalars['String']>;
  descriptionOneLine?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  gardenServerID?: Maybe<Scalars['String']>;
  garden_teams?: Maybe<Array<Maybe<Team>>>;
  role?: Maybe<Array<Maybe<RoleType>>>;
  serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
  stepsJoinProject?: Maybe<Array<Maybe<Scalars['String']>>>;
  team?: Maybe<Array<Maybe<TeamType>>>;
  title?: Maybe<Scalars['String']>;
  tweets?: Maybe<Array<Maybe<TweetsType>>>;
};

export type ProjectUpdate = {
  __typename?: 'ProjectUpdate';
  _id?: Maybe<Scalars['ID']>;
  author?: Maybe<Members>;
  champion?: Maybe<Members>;
  content?: Maybe<Scalars['String']>;
  deWorkLink?: Maybe<Scalars['String']>;
  deadline?: Maybe<Scalars['String']>;
  epic?: Maybe<Epic>;
  members?: Maybe<Array<Maybe<Members>>>;
  notifyUsers?: Maybe<Array<Maybe<Members>>>;
  phase?: Maybe<PhaseEpicType>;
  priority?: Maybe<Scalars['Int']>;
  projects?: Maybe<Project>;
  registeredAt?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Maybe<Role>>>;
  serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
  task?: Maybe<ProjectUpdate>;
  team?: Maybe<Array<Maybe<Team>>>;
  threadDiscordID?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  adminFindAllSkillsEveryState?: Maybe<Array<Maybe<Skills>>>;
  errors?: Maybe<Array<Maybe<ErrorLog>>>;
  findAllProjectsTeamsAnouncments?: Maybe<Array<Maybe<FindAllProjectsTeamsAnouncmentsOutput>>>;
  findChat?: Maybe<Chats>;
  findEpic?: Maybe<Array<Maybe<Epic>>>;
  findGarden?: Maybe<Array<Maybe<FindGardenOutput>>>;
  findMember?: Maybe<Members>;
  findMembers?: Maybe<Array<Maybe<Members>>>;
  findNode?: Maybe<Node>;
  findNodes?: Maybe<Array<Maybe<Node>>>;
  findProject?: Maybe<Project>;
  findProjectUpdates?: Maybe<Array<Maybe<ProjectUpdate>>>;
  findProjects?: Maybe<Array<Maybe<Project>>>;
  findProjects_RecommendedToUser?: Maybe<Array<Maybe<ProjectMatchType>>>;
  findProjects_RequireSkill?: Maybe<Array<Maybe<Project>>>;
  findRoleTemplate?: Maybe<RoleTemplate>;
  findRoleTemplates?: Maybe<Array<Maybe<RoleTemplate>>>;
  findRoles?: Maybe<Array<Maybe<Role>>>;
  findRoom?: Maybe<Rooms>;
  findServers?: Maybe<Array<Maybe<ServerTemplate>>>;
  findSkill?: Maybe<Skills>;
  findSkillCategories?: Maybe<Array<Maybe<SkillCategory>>>;
  findSkillCategory?: Maybe<SkillCategory>;
  findSkillSubCategories?: Maybe<Array<Maybe<SkillSubCategory>>>;
  findSkillSubCategory?: Maybe<SkillSubCategory>;
  findSkills?: Maybe<Array<Maybe<Skills>>>;
  findTeams?: Maybe<Array<Maybe<Team>>>;
  matchMembersToProject?: Maybe<Array<Maybe<MatchMembersToProjectOutput>>>;
  matchMembersToProjectRole?: Maybe<Array<Maybe<MatchMembersToProjectRoleOutput>>>;
  matchMembersToSkills?: Maybe<Array<Maybe<MatchMembersToSkillOutput>>>;
  matchMembersToUser?: Maybe<Array<Maybe<MatchMembersToUserOutput>>>;
  matchPrepareSkillToMembers?: Maybe<Skills>;
  matchPrepareSkillToProjectRoles?: Maybe<Skills>;
  matchProjectsToMember?: Maybe<Array<Maybe<Project>>>;
  matchSkillsToMembers?: Maybe<Array<Maybe<MatchMembersToSkillOutput>>>;
  matchSkillsToProjects?: Maybe<Array<Maybe<MatchSkillsToProjectsOutput>>>;
  match_projectToUser?: Maybe<ProjectUserMatchType>;
  members_autocomplete?: Maybe<Array<Maybe<Members>>>;
  skills?: Maybe<PaginatedSkills>;
  skills_autocomplete?: Maybe<Array<Maybe<Skills>>>;
  waitingToAproveSkills?: Maybe<Array<Maybe<Skills>>>;
};


export type QueryAdminFindAllSkillsEveryStateArgs = {
  fields?: InputMaybe<FindSkillsInput>;
};


export type QueryFindAllProjectsTeamsAnouncmentsArgs = {
  fields?: InputMaybe<FindAllProjectsTeamsAnouncmentsInput>;
};


export type QueryFindChatArgs = {
  fields?: InputMaybe<FindChatInput>;
};


export type QueryFindEpicArgs = {
  fields?: InputMaybe<FindEpicInput>;
};


export type QueryFindGardenArgs = {
  fields?: InputMaybe<FindGardenInput>;
};


export type QueryFindMemberArgs = {
  fields?: InputMaybe<FindMemberInput>;
};


export type QueryFindMembersArgs = {
  fields?: InputMaybe<FindMembersInput>;
};


export type QueryFindNodeArgs = {
  fields?: InputMaybe<FindNodeInput>;
};


export type QueryFindNodesArgs = {
  fields?: InputMaybe<FindNodesInput>;
};


export type QueryFindProjectArgs = {
  fields?: InputMaybe<FindProjectInput>;
};


export type QueryFindProjectUpdatesArgs = {
  fields?: InputMaybe<FindProjectUpdatesInput>;
};


export type QueryFindProjectsArgs = {
  fields?: InputMaybe<FindProjectsInput>;
};


export type QueryFindProjects_RecommendedToUserArgs = {
  fields?: InputMaybe<FindProjects_RecommendedToUserInput>;
};


export type QueryFindProjects_RequireSkillArgs = {
  fields?: InputMaybe<FindProjects_RequireSkillInput>;
};


export type QueryFindRoleTemplateArgs = {
  fields?: InputMaybe<FindRoleTemplateInput>;
};


export type QueryFindRoleTemplatesArgs = {
  fields?: InputMaybe<FindRoleTemplatesInput>;
};


export type QueryFindRolesArgs = {
  fields?: InputMaybe<FindRolesInput>;
};


export type QueryFindRoomArgs = {
  fields?: InputMaybe<FindRoomsInput>;
};


export type QueryFindServersArgs = {
  fields?: InputMaybe<FindServersInput>;
};


export type QueryFindSkillArgs = {
  fields?: InputMaybe<FindSkillInput>;
};


export type QueryFindSkillCategoriesArgs = {
  fields?: InputMaybe<FindSkillCategoriesInput>;
};


export type QueryFindSkillCategoryArgs = {
  fields?: InputMaybe<FindSkillCategoryInput>;
};


export type QueryFindSkillSubCategoriesArgs = {
  fields?: InputMaybe<FindSkillSubCategoriesInput>;
};


export type QueryFindSkillSubCategoryArgs = {
  fields?: InputMaybe<FindSkillSubCategoryInput>;
};


export type QueryFindSkillsArgs = {
  fields?: InputMaybe<FindSkillsInput>;
};


export type QueryFindTeamsArgs = {
  fields?: InputMaybe<FindTeamsInput>;
};


export type QueryMatchMembersToProjectArgs = {
  fields?: InputMaybe<MatchMembersToProjectInput>;
};


export type QueryMatchMembersToProjectRoleArgs = {
  fields?: InputMaybe<MatchMembersToProjectRoleInput>;
};


export type QueryMatchMembersToSkillsArgs = {
  fields?: InputMaybe<MatchMembersToSkillInput>;
};


export type QueryMatchMembersToUserArgs = {
  fields?: InputMaybe<MatchMembersToUserInput>;
};


export type QueryMatchPrepareSkillToMembersArgs = {
  fields?: InputMaybe<MatchPrepareSkillToMembersInput>;
};


export type QueryMatchPrepareSkillToProjectRolesArgs = {
  fields?: InputMaybe<MatchPrepareSkillToProjectRolesInput>;
};


export type QueryMatchProjectsToMemberArgs = {
  fields?: InputMaybe<MatchProjectsToMemberInput>;
};


export type QueryMatchSkillsToMembersArgs = {
  fields?: InputMaybe<MatchSkillsToMembersInput>;
};


export type QueryMatchSkillsToProjectsArgs = {
  fields?: InputMaybe<MatchSkillsToProjectsInput>;
};


export type QueryMatch_ProjectToUserArgs = {
  fields?: InputMaybe<Match_ProjectToUserInput>;
};


export type QueryMembers_AutocompleteArgs = {
  fields?: InputMaybe<Members_AutocompleteInput>;
};


export type QuerySkillsArgs = {
  fields?: InputMaybe<FindSkillsInputPaginated>;
};


export type QuerySkills_AutocompleteArgs = {
  fields?: InputMaybe<Skills_AutocompleteInput>;
};


export type QueryWaitingToAproveSkillsArgs = {
  fields?: InputMaybe<FindSkillsInput>;
};

export type Role = {
  __typename?: 'Role';
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Members>>>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Project>;
  serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type RoleTemplate = {
  __typename?: 'RoleTemplate';
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Maybe<Skills>>>;
  title?: Maybe<Scalars['String']>;
};

export type RoleType_Garden = {
  __typename?: 'RoleType_garden';
  announcement?: Maybe<Array<Maybe<ProjectUpdate>>>;
  roleData?: Maybe<Role>;
};

export type Rooms = {
  __typename?: 'Rooms';
  _id?: Maybe<Scalars['ID']>;
  members?: Maybe<Array<Maybe<Members>>>;
  name?: Maybe<Scalars['String']>;
  registeredAt?: Maybe<Scalars['String']>;
};

export type ServerTemplate = {
  __typename?: 'ServerTemplate';
  _id?: Maybe<Scalars['ID']>;
  adminCommands?: Maybe<Array<Maybe<Scalars['String']>>>;
  adminID?: Maybe<Array<Maybe<Scalars['String']>>>;
  adminRoles?: Maybe<Array<Maybe<Scalars['String']>>>;
  channel?: Maybe<ChannelOutput>;
  name?: Maybe<Scalars['String']>;
  serverAvatar?: Maybe<Scalars['String']>;
  serverType?: Maybe<Scalars['String']>;
};

export type SkillCategory = {
  __typename?: 'SkillCategory';
  _id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  id_lightcast?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Maybe<Skills>>>;
  subCategorySkill?: Maybe<Array<Maybe<SkillSubCategory>>>;
};

export type SkillSubCategory = {
  __typename?: 'SkillSubCategory';
  _id?: Maybe<Scalars['ID']>;
  categorySkills?: Maybe<Array<Maybe<SkillCategory>>>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  id_lightcast?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Maybe<Skills>>>;
};

export type Skills = {
  __typename?: 'Skills';
  _id?: Maybe<Scalars['ID']>;
  authors?: Maybe<Array<Maybe<Members>>>;
  categorySkills?: Maybe<Array<Maybe<SkillCategory>>>;
  id_lightcast?: Maybe<Scalars['String']>;
  match?: Maybe<MatchType>;
  members?: Maybe<Array<Maybe<Members>>>;
  name?: Maybe<Scalars['String']>;
  registeredAt?: Maybe<Scalars['String']>;
  relatedSkills?: Maybe<Array<Maybe<Skills>>>;
  state?: Maybe<ApprovedSkillEnum>;
  subCategorySkill?: Maybe<Array<Maybe<SkillSubCategory>>>;
  tweets?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SkillsPercentage = {
  __typename?: 'SkillsPercentage';
  info?: Maybe<Skills>;
  percentage100?: Maybe<Scalars['Float']>;
  percentageReal?: Maybe<Scalars['Float']>;
};

export type SortBySkill = {
  direction?: InputMaybe<SortDirection>;
  field?: InputMaybe<SortableSkillFields>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SortableSkillFields {
  Id = '_id',
  Name = 'name',
  RegisteredAt = 'registeredAt'
}

export type Subscription = {
  __typename?: 'Subscription';
  memberUpdated?: Maybe<Members>;
  memberUpdatedInRoom?: Maybe<Members>;
  roomUpdated?: Maybe<Rooms>;
};


export type SubscriptionMemberUpdatedArgs = {
  fields?: InputMaybe<FindMembersInput>;
};


export type SubscriptionMemberUpdatedInRoomArgs = {
  fields?: InputMaybe<FindRoomsInput>;
};


export type SubscriptionRoomUpdatedArgs = {
  fields?: InputMaybe<FindRoomsInput>;
};

export type Team = {
  __typename?: 'Team';
  _id?: Maybe<Scalars['ID']>;
  categoryDiscordlD?: Maybe<Scalars['String']>;
  champion?: Maybe<Array<Maybe<Members>>>;
  channelGeneralDiscordID?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  epics?: Maybe<Array<Maybe<Epic>>>;
  forumDiscordID?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Members>>>;
  name?: Maybe<Scalars['String']>;
  projects?: Maybe<Project>;
  roles?: Maybe<Array<Maybe<Role>>>;
  serverID?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  isPasswordRandom?: Maybe<Scalars['Boolean']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  registeredAt?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type AddEndorsementInput = {
  endorseeID?: InputMaybe<Scalars['ID']>;
  endorsementMessage?: InputMaybe<Scalars['String']>;
  endorserID?: InputMaybe<Scalars['ID']>;
};

export type AddFavoriteProjectInput = {
  favorite?: InputMaybe<Scalars['Boolean']>;
  memberID?: InputMaybe<Scalars['ID']>;
  projectID?: InputMaybe<Scalars['ID']>;
};

export type AddNewChatInput = {
  message: Scalars['String'];
  projectID: Scalars['ID'];
  projectRoleID?: InputMaybe<Scalars['ID']>;
  receiverID: Scalars['ID'];
  senderID: Scalars['ID'];
  serverID: Scalars['ID'];
  threadID: Scalars['ID'];
};

export type AddNewMemberInput = {
  _id?: InputMaybe<Scalars['ID']>;
  bio?: InputMaybe<Scalars['String']>;
  discordAvatar?: InputMaybe<Scalars['String']>;
  discordName?: InputMaybe<Scalars['String']>;
  discriminator?: InputMaybe<Scalars['String']>;
  hoursPerWeek?: InputMaybe<Scalars['Float']>;
  invitedBy?: InputMaybe<Scalars['String']>;
  previusProjects?: InputMaybe<Array<InputMaybe<PreviusProjectsInput>>>;
  serverID?: InputMaybe<Scalars['String']>;
};

export type AddSkillToMember_Input = {
  authorID?: InputMaybe<Scalars['ID']>;
  memberID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillID?: InputMaybe<Scalars['ID']>;
};

export type ApproveOrRejectSkillInput = {
  _id?: InputMaybe<Scalars['ID']>;
  categorySkills?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  state?: InputMaybe<ApprovedSkillEnum>;
  subCategorySkill?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ApproveTweetInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  projectID?: InputMaybe<Scalars['ID']>;
  tweetID?: InputMaybe<Scalars['ID']>;
};

export enum ApprovedSkillEnum {
  Approved = 'approved',
  Rejected = 'rejected',
  Waiting = 'waiting'
}

export enum AttributesEnum {
  Coordinator = 'Coordinator',
  Director = 'Director',
  Helper = 'Helper',
  Inspirer = 'Inspirer',
  Motivator = 'Motivator',
  Observer = 'Observer',
  Reformer = 'Reformer',
  Supporter = 'Supporter'
}

export type AttributesType = {
  __typename?: 'attributesType';
  Coordinator?: Maybe<Scalars['Int']>;
  Director?: Maybe<Scalars['Int']>;
  Helper?: Maybe<Scalars['Int']>;
  Inspirer?: Maybe<Scalars['Int']>;
  Motivator?: Maybe<Scalars['Int']>;
  Observer?: Maybe<Scalars['Int']>;
  Reformer?: Maybe<Scalars['Int']>;
  Supporter?: Maybe<Scalars['Int']>;
};

export type BudgetInput = {
  perHour?: InputMaybe<Scalars['String']>;
  perMonth?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  totalBudget?: InputMaybe<Scalars['String']>;
};

export type BudgetType = {
  __typename?: 'budgetType';
  perHour?: Maybe<Scalars['String']>;
  perMonth?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  totalBudget?: Maybe<Scalars['String']>;
};

export type ChangeTeamMember_Phase_ProjectInput = {
  memberID?: InputMaybe<Scalars['ID']>;
  phase?: InputMaybe<PhaseType>;
  projectID?: InputMaybe<Scalars['ID']>;
  roleID?: InputMaybe<Scalars['ID']>;
};

export type ChannelOutput = {
  __typename?: 'channelOutput';
  chatID?: Maybe<Scalars['ID']>;
};

export type ChatResponse = {
  __typename?: 'chatResponse';
  numChat?: Maybe<Scalars['Int']>;
  numReply?: Maybe<Scalars['Int']>;
};

export type CollaborationLinksInput = {
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CollaborationLinksType = {
  __typename?: 'collaborationLinksType';
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ContentInput = {
  interest?: InputMaybe<Scalars['String']>;
  mostProud?: InputMaybe<Scalars['String']>;
  showCaseAbility?: InputMaybe<Scalars['String']>;
};

export type ContentType = {
  __typename?: 'contentType';
  interest?: Maybe<Scalars['String']>;
  mostProud?: Maybe<Scalars['String']>;
  showCaseAbility?: Maybe<Scalars['String']>;
};

export type CreateApprovedSkillInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreateNewEpicInput = {
  _id?: InputMaybe<Scalars['ID']>;
  authorID?: InputMaybe<Scalars['String']>;
  championID?: InputMaybe<Scalars['String']>;
  channelDiscordlID?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  memberID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  notifyUserID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  phase?: InputMaybe<PhaseEpicType>;
  projectID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CreateNewRoleInput = {
  _id?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  memberID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  projectID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CreateNewTeamInput = {
  _id?: InputMaybe<Scalars['ID']>;
  categoryDiscordlD?: InputMaybe<Scalars['String']>;
  championID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  channelGeneralDiscordID?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  forumDiscordID?: InputMaybe<Scalars['String']>;
  memberID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  projectID?: InputMaybe<Scalars['String']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CreateNodeInput = {
  aboveNodes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  node?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateEnum>;
  subNodes?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CreateProjectUpdateInput = {
  _id?: InputMaybe<Scalars['ID']>;
  authorID?: InputMaybe<Scalars['String']>;
  championID?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  deWorkLink?: InputMaybe<Scalars['String']>;
  deadline?: InputMaybe<Scalars['String']>;
  epicID?: InputMaybe<Scalars['String']>;
  memberID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notifyUserID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  phase?: InputMaybe<PhaseEpicType>;
  priority?: InputMaybe<Scalars['Int']>;
  projectID?: InputMaybe<Scalars['String']>;
  roleID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  taskID?: InputMaybe<Scalars['String']>;
  teamID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  threadDiscordID?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type CreateRoleInput = {
  _id?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateRoomInput = {
  _id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateSkillInput = {
  categorySkills?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  id_lightcast?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<ApprovedSkillEnum>;
  subCategorySkill?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type CreateSkillsInput = {
  names?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  state?: InputMaybe<ApprovedSkillEnum>;
};

export type DatesInput = {
  complition?: InputMaybe<Scalars['String']>;
  kickOff?: InputMaybe<Scalars['String']>;
};

export type DatesType = {
  __typename?: 'datesType';
  complition?: Maybe<Scalars['String']>;
  kickOff?: Maybe<Scalars['String']>;
};

export type EndorcmentInput = {
  registeredAt?: InputMaybe<Scalars['String']>;
  skillID?: InputMaybe<Scalars['ID']>;
};

export type EndorseAttributeInput = {
  _id?: InputMaybe<Scalars['ID']>;
  attribute?: InputMaybe<AttributesEnum>;
};

export type Endorsements = {
  __typename?: 'endorsements';
  arweaveTransactionID?: Maybe<Scalars['String']>;
  endorsementMessage?: Maybe<Scalars['String']>;
  endorser?: Maybe<MembersSmallType>;
};

export type EnterRoomInput = {
  memberID?: InputMaybe<Scalars['ID']>;
  roomID?: InputMaybe<Scalars['ID']>;
};

export type FindAllProjectsTeamsAnouncmentsInput = {
  _id?: InputMaybe<Scalars['ID']>;
  dateEnd?: InputMaybe<Scalars['String']>;
  dateStart?: InputMaybe<Scalars['String']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindAllProjectsTeamsAnouncmentsOutput = {
  __typename?: 'findAllProjectsTeamsAnouncmentsOutput';
  _id?: Maybe<Scalars['ID']>;
  project?: Maybe<Project>;
  team?: Maybe<Array<Maybe<TeamsType>>>;
};

export type FindChatInput = {
  _id?: InputMaybe<Scalars['ID']>;
  threadID?: InputMaybe<Scalars['ID']>;
};

export type FindEpicInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FindGardenInput = {
  _id?: InputMaybe<Scalars['ID']>;
  dateEnd?: InputMaybe<Scalars['String']>;
  dateStart?: InputMaybe<Scalars['String']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindGardenOutput = {
  __typename?: 'findGardenOutput';
  _id?: Maybe<Scalars['ID']>;
  project?: Maybe<Project>;
  team?: Maybe<Array<Maybe<TeamsType_Garden>>>;
};

export type FindMemberInput = {
  _id?: InputMaybe<Scalars['ID']>;
  discordName?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindMembersInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindNodeInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type FindNodesInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  node?: InputMaybe<Scalars['String']>;
};

export type FindProjectInput = {
  _id?: InputMaybe<Scalars['ID']>;
  gardenServerID?: InputMaybe<Scalars['String']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindProjectUpdatesInput = {
  _id?: InputMaybe<Scalars['ID']>;
  dateEnd?: InputMaybe<Scalars['String']>;
  dateStart?: InputMaybe<Scalars['String']>;
  memberID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  projectID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  roleID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindProjectsInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  gardenServerID?: InputMaybe<Scalars['String']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindProjects_RecommendedToUserInput = {
  memberID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type FindProjects_RequireSkillInput = {
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FindRoleTemplateInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type FindRoleTemplatesInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FindRolesInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  teamID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FindRoomsInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type FindServersInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type FindSkillCategoriesInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  id_lightcast?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FindSkillCategoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
  id_lightcast?: InputMaybe<Scalars['ID']>;
};

export type FindSkillInput = {
  _id?: InputMaybe<Scalars['ID']>;
  id_lightcast?: InputMaybe<Scalars['ID']>;
};

export type FindSkillSubCategoriesInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type FindSkillSubCategoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type FindSkillsInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  recalculateMembers?: InputMaybe<Scalars['Boolean']>;
  recalculateProjectRoles?: InputMaybe<Scalars['Boolean']>;
};

export type FindSkillsInputPaginated = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  request?: InputMaybe<FindSkillsInput>;
  sortBy?: InputMaybe<SortBySkill>;
};

export type FindTeamsInput = {
  _id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GardenUpdateType = {
  __typename?: 'gardenUpdateType';
  epic?: Maybe<Array<Maybe<Epic>>>;
  task?: Maybe<Array<Maybe<ProjectUpdate>>>;
};

export enum LevelEnum {
  Junior = 'junior',
  Learning = 'learning',
  Mid = 'mid',
  Senior = 'senior'
}

export type LinkInput = {
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type LinkType = {
  __typename?: 'linkType';
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type MatchMembersToProjectInput = {
  projectID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MatchMembersToProjectOutput = {
  __typename?: 'matchMembersToProjectOutput';
  commonSkills?: Maybe<Array<Maybe<Skills>>>;
  matchPercentage?: Maybe<Scalars['Float']>;
  member?: Maybe<Members>;
};

export type MatchMembersToProjectRoleInput = {
  projectRoleID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MatchMembersToProjectRoleOutput = {
  __typename?: 'matchMembersToProjectRoleOutput';
  commonSkills?: Maybe<Array<Maybe<Skills>>>;
  matchPercentage?: Maybe<Scalars['Float']>;
  member?: Maybe<Members>;
};

export type MatchMembersToSkillInput = {
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillsID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type MatchMembersToSkillOutput = {
  __typename?: 'matchMembersToSkillOutput';
  matchPercentage?: Maybe<MatchPercentage>;
  member?: Maybe<Members>;
  skillsPercentage?: Maybe<Array<Maybe<SkillsPercentage>>>;
};

export type MatchMembersToUserInput = {
  memberID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MatchMembersToUserOutput = {
  __typename?: 'matchMembersToUserOutput';
  commonSkills?: Maybe<Array<Maybe<Skills>>>;
  matchPercentage?: Maybe<Scalars['Float']>;
  member?: Maybe<Members>;
};

export type MatchPrepareSkillToMembersInput = {
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillID?: InputMaybe<Scalars['ID']>;
};

export type MatchPrepareSkillToMembersOutput = {
  __typename?: 'matchPrepareSkillToMembersOutput';
  commonSkills?: Maybe<Array<Maybe<Skills>>>;
  matchPercentage?: Maybe<Scalars['Float']>;
  member?: Maybe<Members>;
};

export type MatchPrepareSkillToProjectRolesInput = {
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillID?: InputMaybe<Scalars['ID']>;
};

export type MatchProjectRoles = {
  __typename?: 'matchProjectRoles';
  commonSkills?: Maybe<Array<Maybe<Skills>>>;
  matchPercentage?: Maybe<Scalars['Float']>;
  projectRole?: Maybe<RoleType>;
};

export type MatchProjectsToMemberInput = {
  memberID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MatchSkillsToMembersInput = {
  budgetAmount?: InputMaybe<Scalars['Float']>;
  hoursPerWeek?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillsID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type MatchSkillsToProjectsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  skillsID?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type MatchSkillsToProjectsOutput = {
  __typename?: 'matchSkillsToProjectsOutput';
  commonSkills?: Maybe<Array<Maybe<Skills>>>;
  matchPercentage?: Maybe<Scalars['Float']>;
  project?: Maybe<Project>;
  projectRoles?: Maybe<Array<Maybe<MatchProjectRoles>>>;
};

export type Match_ProjectToUserInput = {
  memberID?: InputMaybe<Scalars['ID']>;
  projectID?: InputMaybe<Scalars['ID']>;
  roleID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Members_AutocompleteInput = {
  search?: InputMaybe<Scalars['String']>;
};

export type NetworkInput = {
  endorcment?: InputMaybe<Array<InputMaybe<EndorcmentInput>>>;
  memberID?: InputMaybe<Scalars['ID']>;
};

export type NewTweetProjectInput = {
  approved?: InputMaybe<Scalars['Boolean']>;
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  projectID?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type OnboardingInput = {
  percentage?: InputMaybe<Scalars['Int']>;
  signup?: InputMaybe<Scalars['Boolean']>;
};

export type OnboardingType = {
  __typename?: 'onboardingType';
  percentage?: Maybe<Scalars['Int']>;
  signup?: Maybe<Scalars['Boolean']>;
};

export enum PhaseEpicType {
  Archive = 'archive',
  Open = 'open'
}

export enum PhaseType {
  Committed = 'committed',
  Engaged = 'engaged',
  Invited = 'invited',
  Rejected = 'rejected',
  Shortlisted = 'shortlisted'
}

export type PreviusProjectsInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  positionName?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PreviusProjectsType = {
  __typename?: 'previusProjectsType';
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  positionName?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ProjectMatchType = {
  __typename?: 'projectMatchType';
  matchPercentage?: Maybe<Scalars['Float']>;
  projectData?: Maybe<Project>;
  role?: Maybe<RoleType>;
};

export type ProjectMemberType = {
  __typename?: 'projectMemberType';
  champion?: Maybe<Scalars['Boolean']>;
  favorite?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Project>;
  phase?: Maybe<PhaseType>;
  role?: Maybe<RoleType>;
};

export type ProjectUserMatchType = {
  __typename?: 'projectUserMatchType';
  matchPercentage?: Maybe<Scalars['Float']>;
  projectData?: Maybe<Project>;
  skillsDontMatch?: Maybe<Array<Maybe<Skills>>>;
  skillsMatch?: Maybe<Array<Maybe<Skills>>>;
};

export type RelatedNodeInput = {
  _id?: InputMaybe<Scalars['ID']>;
  relatedNode_id?: InputMaybe<Scalars['ID']>;
};

export type RelatedNode_NameInput = {
  name?: InputMaybe<Scalars['String']>;
  relatedNode_name?: InputMaybe<Scalars['String']>;
};

export type RelatedSkillsInput = {
  _id?: InputMaybe<Scalars['ID']>;
  relatedSkills_id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type Reply = {
  receiver?: InputMaybe<Scalars['Boolean']>;
  sender?: InputMaybe<Scalars['Boolean']>;
};

export type ReplyType = {
  __typename?: 'replyType';
  receiver?: Maybe<Scalars['Boolean']>;
  sender?: Maybe<Scalars['Boolean']>;
};

export enum ResultEnum {
  Successful = 'successful',
  Unsuccesful = 'unsuccesful'
}

export type RoleInput = {
  _id?: InputMaybe<Scalars['ID']>;
  archive?: InputMaybe<Scalars['Boolean']>;
  budget?: InputMaybe<BudgetInput>;
  dateRangeEnd?: InputMaybe<Scalars['String']>;
  dateRangeStart?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  hoursPerWeek?: InputMaybe<Scalars['Int']>;
  keyRosponsibilities?: InputMaybe<Scalars['String']>;
  openPositions?: InputMaybe<Scalars['Int']>;
  skills?: InputMaybe<Array<InputMaybe<SkillRoleInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type RoleType = {
  __typename?: 'roleType';
  _id?: Maybe<Scalars['ID']>;
  archive?: Maybe<Scalars['Boolean']>;
  budget?: Maybe<BudgetType>;
  dateRangeEnd?: Maybe<Scalars['String']>;
  dateRangeStart?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hoursPerWeek?: Maybe<Scalars['Int']>;
  keyRosponsibilities?: Maybe<Scalars['String']>;
  openPositions?: Maybe<Scalars['Int']>;
  skills?: Maybe<Array<Maybe<SkillRoleType>>>;
  title?: Maybe<Scalars['String']>;
};

export enum ServerTypeEnum {
  Dao = 'DAO',
  Hackathon = 'Hackathon',
  Project = 'Project'
}

export type SkillInput_Member = {
  id?: InputMaybe<Scalars['ID']>;
  level?: InputMaybe<LevelEnum>;
};

export type SkillRoleInput = {
  _id?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  level?: InputMaybe<Scalars['String']>;
  numEndorsement?: InputMaybe<Scalars['String']>;
};

export type SkillRoleType = {
  __typename?: 'skillRoleType';
  comment?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  numEndorsement?: Maybe<Scalars['String']>;
  skillData?: Maybe<Skills>;
};

export type SkillType_Member = {
  __typename?: 'skillType_member';
  author?: Maybe<Members>;
  level?: Maybe<LevelEnum>;
  skillInfo?: Maybe<Skills>;
};

export type SkillsType = {
  __typename?: 'skillsType';
  authors?: Maybe<Array<Maybe<Members>>>;
  id?: Maybe<Scalars['String']>;
  points?: Maybe<Scalars['Float']>;
};

export type SkillsTypeRole = {
  __typename?: 'skillsTypeRole';
  skill?: Maybe<Scalars['String']>;
};

export type SkillsUpdateMemberInput = {
  authors?: InputMaybe<Scalars['String']>;
  communityLevel?: InputMaybe<Scalars['Float']>;
  selfEndorsedLevel?: InputMaybe<Scalars['Float']>;
  skillID?: InputMaybe<Scalars['ID']>;
};

export type Skills_AutocompleteInput = {
  search?: InputMaybe<Scalars['String']>;
};

export enum StateEnum {
  Approved = 'approved',
  Rejected = 'rejected',
  Waiting = 'waiting'
}

export type TeamInput = {
  memberID?: InputMaybe<Scalars['String']>;
  phase?: InputMaybe<PhaseType>;
  roleID?: InputMaybe<Scalars['String']>;
};

export type TeamType = {
  __typename?: 'teamType';
  memberInfo?: Maybe<Members>;
  phase?: Maybe<PhaseType>;
  roleID?: Maybe<Scalars['String']>;
};

export type TeamsType = {
  __typename?: 'teamsType';
  announcement?: Maybe<Array<Maybe<ProjectUpdate>>>;
  teamData?: Maybe<Team>;
};

export type TeamsType_Garden = {
  __typename?: 'teamsType_garden';
  role?: Maybe<Array<Maybe<RoleType_Garden>>>;
  teamData?: Maybe<Team>;
};

export type TweetsInput = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
};

export type TweetsProject = {
  __typename?: 'tweetsProject';
  newTweetID?: Maybe<Scalars['ID']>;
  numTweets?: Maybe<Scalars['Int']>;
  tweets?: Maybe<Array<Maybe<TweetsType>>>;
};

export type TweetsType = {
  __typename?: 'tweetsType';
  _id?: Maybe<Scalars['ID']>;
  approved?: Maybe<Scalars['Boolean']>;
  author?: Maybe<Members>;
  content?: Maybe<Scalars['String']>;
  registeredAt?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type UpdateChatReplyInput = {
  _id?: InputMaybe<Scalars['ID']>;
  receiverReply: Scalars['Boolean'];
  replyUserID?: InputMaybe<Scalars['ID']>;
  threadID?: InputMaybe<Scalars['ID']>;
};

export type UpdateChatResultInput = {
  _id?: InputMaybe<Scalars['ID']>;
  result?: InputMaybe<ResultEnum>;
  threadID?: InputMaybe<Scalars['ID']>;
};

export type UpdateMemberInRoomInput = {
  bio?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<ContentInput>;
  discordAvatar?: InputMaybe<Scalars['String']>;
  discordName?: InputMaybe<Scalars['String']>;
  discriminator?: InputMaybe<Scalars['String']>;
  hoursPerWeek?: InputMaybe<Scalars['Float']>;
  interest?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Array<InputMaybe<LinkInput>>>;
  memberID?: InputMaybe<Scalars['ID']>;
  memberRole?: InputMaybe<FindRoleTemplateInput>;
  onbording?: InputMaybe<OnboardingInput>;
  previusProjects?: InputMaybe<Array<InputMaybe<PreviusProjectsInput>>>;
  roomID?: InputMaybe<Scalars['ID']>;
  serverID?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput_Member>>>;
  timeZone?: InputMaybe<Scalars['String']>;
};

export type UpdateMemberInput = {
  _id?: InputMaybe<Scalars['ID']>;
  bio?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<ContentInput>;
  discordAvatar?: InputMaybe<Scalars['String']>;
  discordName?: InputMaybe<Scalars['String']>;
  discriminator?: InputMaybe<Scalars['String']>;
  hoursPerWeek?: InputMaybe<Scalars['Float']>;
  interest?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Array<InputMaybe<LinkInput>>>;
  memberRole?: InputMaybe<Scalars['ID']>;
  onbording?: InputMaybe<OnboardingInput>;
  previusProjects?: InputMaybe<Array<InputMaybe<PreviusProjectsInput>>>;
  serverID?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<SkillInput_Member>>>;
  timeZone?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  _id?: InputMaybe<Scalars['ID']>;
  backColorEmoji?: InputMaybe<Scalars['String']>;
  budget?: InputMaybe<BudgetInput>;
  champion?: InputMaybe<Scalars['String']>;
  collaborationLinks?: InputMaybe<Array<InputMaybe<CollaborationLinksInput>>>;
  dates?: InputMaybe<DatesInput>;
  description?: InputMaybe<Scalars['String']>;
  descriptionOneLine?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  gardenServerID?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Array<InputMaybe<RoleInput>>>;
  serverID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  stepsJoinProject?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  team?: InputMaybe<Array<InputMaybe<TeamInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateServerInput = {
  _id?: InputMaybe<Scalars['ID']>;
  adminCommands?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  adminID?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  adminRoles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  channelChatID?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  serverAvatar?: InputMaybe<Scalars['String']>;
  serverType?: InputMaybe<ServerTypeEnum>;
};

export type UpdateSkillCategoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  id_lightcast?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  subCategorySkill?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UpdateSkillSubCategoryInput = {
  _id?: InputMaybe<Scalars['ID']>;
  categorySkills?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  description?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  id_lightcast?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    