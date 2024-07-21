import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { VideoModel, VideoSnippetModel, CategoryModel, ChannelModel, ChannelSnippetModel } from '../models';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Category = {
  __typename?: 'Category';
  assignable?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  videos: Array<Video>;
};


export type CategoryVideosArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<VideoSortByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID']['output'];
  snippet: ChannelSnippet;
  statistics: ChannelStatistics;
  videos: Array<Video>;
};


export type ChannelVideosArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<VideoSortByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ChannelSnippet = {
  __typename?: 'ChannelSnippet';
  country: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  keywords: Array<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ChannelStatistics = {
  __typename?: 'ChannelStatistics';
  id: Scalars['ID']['output'];
  subscriberCount: Scalars['Int']['output'];
  videoCount: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  greetings: Scalars['String']['output'];
  videos: Array<Video>;
};


export type QueryVideosArgs = {
  filter?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<VideoSortByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  channel?: Maybe<Channel>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Video = {
  __typename?: 'Video';
  contentDetails: VideoContentDetails;
  id: Scalars['ID']['output'];
  snippet: VideoSnippet;
  statistics: VideoStatistics;
};

export type VideoContentDetails = {
  __typename?: 'VideoContentDetails';
  duration: Scalars['Int']['output'];
  hasCaption: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type VideoSnippet = {
  __typename?: 'VideoSnippet';
  category: Category;
  channel: Channel;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publishedAt: Scalars['DateTime']['output'];
  tags: Array<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type VideoSortByInput = {
  publishedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type VideoStatistics = {
  __typename?: 'VideoStatistics';
  commentCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  likeCount: Scalars['Int']['output'];
  viewCount: Scalars['Int']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversTypes['User']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<CategoryModel>;
  Channel: ResolverTypeWrapper<ChannelModel>;
  ChannelSnippet: ResolverTypeWrapper<ChannelSnippetModel>;
  ChannelStatistics: ResolverTypeWrapper<ChannelStatistics>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<Omit<User, 'channel'> & { channel?: Maybe<ResolversTypes['Channel']> }>;
  Video: ResolverTypeWrapper<VideoModel>;
  VideoContentDetails: ResolverTypeWrapper<VideoContentDetails>;
  VideoSnippet: ResolverTypeWrapper<VideoSnippetModel>;
  VideoSortByInput: VideoSortByInput;
  VideoStatistics: ResolverTypeWrapper<VideoStatistics>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: Omit<AuthPayload, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  Boolean: Scalars['Boolean']['output'];
  Category: CategoryModel;
  Channel: ChannelModel;
  ChannelSnippet: ChannelSnippetModel;
  ChannelStatistics: ChannelStatistics;
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: Omit<User, 'channel'> & { channel?: Maybe<ResolversParentTypes['Channel']> };
  Video: VideoModel;
  VideoContentDetails: VideoContentDetails;
  VideoSnippet: VideoSnippetModel;
  VideoSortByInput: VideoSortByInput;
  VideoStatistics: VideoStatistics;
};

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  assignable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['Video']>, ParentType, ContextType, Partial<CategoryVideosArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  snippet?: Resolver<ResolversTypes['ChannelSnippet'], ParentType, ContextType>;
  statistics?: Resolver<ResolversTypes['ChannelStatistics'], ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['Video']>, ParentType, ContextType, Partial<ChannelVideosArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelSnippetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChannelSnippet'] = ResolversParentTypes['ChannelSnippet']> = {
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keywords?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnailUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelStatisticsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ChannelStatistics'] = ResolversParentTypes['ChannelStatistics']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subscriberCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  videoCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'name' | 'password'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  greetings?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videos?: Resolver<Array<ResolversTypes['Video']>, ParentType, ContextType, Partial<QueryVideosArgs>>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Video'] = ResolversParentTypes['Video']> = {
  contentDetails?: Resolver<ResolversTypes['VideoContentDetails'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  snippet?: Resolver<ResolversTypes['VideoSnippet'], ParentType, ContextType>;
  statistics?: Resolver<ResolversTypes['VideoStatistics'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoContentDetailsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VideoContentDetails'] = ResolversParentTypes['VideoContentDetails']> = {
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasCaption?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoSnippetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VideoSnippet'] = ResolversParentTypes['VideoSnippet']> = {
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  thumbnailUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoStatisticsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['VideoStatistics'] = ResolversParentTypes['VideoStatistics']> = {
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  viewCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  ChannelSnippet?: ChannelSnippetResolvers<ContextType>;
  ChannelStatistics?: ChannelStatisticsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Video?: VideoResolvers<ContextType>;
  VideoContentDetails?: VideoContentDetailsResolvers<ContextType>;
  VideoSnippet?: VideoSnippetResolvers<ContextType>;
  VideoStatistics?: VideoStatisticsResolvers<ContextType>;
};

