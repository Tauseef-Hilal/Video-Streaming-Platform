/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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
  platform: Platform;
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
  thumbnails: ThumbnailGroup;
  title: Scalars['String']['output'];
};

export type ChannelStatistics = {
  __typename?: 'ChannelStatistics';
  id: Scalars['ID']['output'];
  subscriberCount: Scalars['String']['output'];
  videoCount: Scalars['String']['output'];
  viewCount: Scalars['String']['output'];
};

export enum Platform {
  FusionFlix = 'FusionFlix',
  YouTube = 'YouTube'
}

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

export type Thumbnail = {
  __typename?: 'Thumbnail';
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ThumbnailGroup = {
  __typename?: 'ThumbnailGroup';
  high?: Maybe<Thumbnail>;
  id: Scalars['ID']['output'];
  low: Thumbnail;
  medium?: Maybe<Thumbnail>;
};

export type Video = {
  __typename?: 'Video';
  contentDetails: VideoContentDetails;
  id: Scalars['ID']['output'];
  platform: Platform;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
};

export type VideoContentDetails = {
  __typename?: 'VideoContentDetails';
  duration: Scalars['String']['output'];
  hasCaption: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type VideoSnippet = {
  __typename?: 'VideoSnippet';
  category: Category;
  channel: Channel;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  publishedAt: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  thumbnails: ThumbnailGroup;
  title: Scalars['String']['output'];
};

export type VideoSortByInput = {
  publishedAt?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type VideoStatistics = {
  __typename?: 'VideoStatistics';
  commentCount: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  likeCount: Scalars['String']['output'];
  viewCount: Scalars['String']['output'];
};

export type ThumbnailItemFragment = { __typename?: 'Thumbnail', id: string, url: string, width: number, height: number } & { ' $fragmentName'?: 'ThumbnailItemFragment' };

export type ThumbnailGroupItemFragment = { __typename?: 'ThumbnailGroup', id: string, low: (
    { __typename?: 'Thumbnail' }
    & { ' $fragmentRefs'?: { 'ThumbnailItemFragment': ThumbnailItemFragment } }
  ), medium?: (
    { __typename?: 'Thumbnail' }
    & { ' $fragmentRefs'?: { 'ThumbnailItemFragment': ThumbnailItemFragment } }
  ) | null, high?: (
    { __typename?: 'Thumbnail' }
    & { ' $fragmentRefs'?: { 'ThumbnailItemFragment': ThumbnailItemFragment } }
  ) | null } & { ' $fragmentName'?: 'ThumbnailGroupItemFragment' };

export type VideoItemFragment = { __typename?: 'Video', id: string, snippet: { __typename?: 'VideoSnippet', id: string, title: string, description: string, publishedAt: string, thumbnails: (
      { __typename?: 'ThumbnailGroup' }
      & { ' $fragmentRefs'?: { 'ThumbnailGroupItemFragment': ThumbnailGroupItemFragment } }
    ), channel: { __typename?: 'Channel', id: string, snippet: { __typename?: 'ChannelSnippet', title: string, thumbnails: (
          { __typename?: 'ThumbnailGroup' }
          & { ' $fragmentRefs'?: { 'ThumbnailGroupItemFragment': ThumbnailGroupItemFragment } }
        ) } } }, contentDetails: { __typename?: 'VideoContentDetails', id: string, duration: string, hasCaption: boolean }, statistics: { __typename?: 'VideoStatistics', viewCount: string, likeCount: string, commentCount: string } } & { ' $fragmentName'?: 'VideoItemFragment' };

export type FeedQueryVariables = Exact<{ [key: string]: never; }>;


export type FeedQuery = { __typename?: 'Query', videos: Array<(
    { __typename?: 'Video' }
    & { ' $fragmentRefs'?: { 'VideoItemFragment': VideoItemFragment } }
  )> };

export const ThumbnailItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Thumbnail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<ThumbnailItemFragment, unknown>;
export const ThumbnailGroupItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailGroupItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ThumbnailGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"low"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"medium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"high"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Thumbnail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]} as unknown as DocumentNode<ThumbnailGroupItemFragment, unknown>;
export const VideoItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"snippet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailGroupItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"snippet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailGroupItem"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"hasCaption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Thumbnail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailGroupItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ThumbnailGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"low"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"medium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"high"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}}]}}]} as unknown as DocumentNode<VideoItemFragment, unknown>;
export const FeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Feed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"50"}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"publishedAt"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Thumbnail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThumbnailGroupItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ThumbnailGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"low"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"medium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"high"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"snippet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailGroupItem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"snippet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThumbnailGroupItem"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"hasCaption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}}]}}]}}]} as unknown as DocumentNode<FeedQuery, FeedQueryVariables>;