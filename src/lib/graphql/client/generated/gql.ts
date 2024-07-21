/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation Register($email: String!, $password: String!, $name: String!) {\n  register(email: $email, password: $password, name: $name) {\n    token\n  }\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}": types.RegisterDocument,
    "query Feed($skip: Int, $filter: String) {\n  videos(filter: $filter, skip: $skip, take: 25, sortBy: {publishedAt: desc}) {\n    id\n    snippet {\n      id\n      title\n      description\n      publishedAt\n      thumbnailUrl\n      channel {\n        id\n        snippet {\n          title\n          thumbnailUrl\n        }\n      }\n    }\n    contentDetails {\n      id\n      duration\n      hasCaption\n    }\n    statistics {\n      viewCount\n      likeCount\n      commentCount\n    }\n  }\n}": types.FeedDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($email: String!, $password: String!, $name: String!) {\n  register(email: $email, password: $password, name: $name) {\n    token\n  }\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}"): (typeof documents)["mutation Register($email: String!, $password: String!, $name: String!) {\n  register(email: $email, password: $password, name: $name) {\n    token\n  }\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Feed($skip: Int, $filter: String) {\n  videos(filter: $filter, skip: $skip, take: 25, sortBy: {publishedAt: desc}) {\n    id\n    snippet {\n      id\n      title\n      description\n      publishedAt\n      thumbnailUrl\n      channel {\n        id\n        snippet {\n          title\n          thumbnailUrl\n        }\n      }\n    }\n    contentDetails {\n      id\n      duration\n      hasCaption\n    }\n    statistics {\n      viewCount\n      likeCount\n      commentCount\n    }\n  }\n}"): (typeof documents)["query Feed($skip: Int, $filter: String) {\n  videos(filter: $filter, skip: $skip, take: 25, sortBy: {publishedAt: desc}) {\n    id\n    snippet {\n      id\n      title\n      description\n      publishedAt\n      thumbnailUrl\n      channel {\n        id\n        snippet {\n          title\n          thumbnailUrl\n        }\n      }\n    }\n    contentDetails {\n      id\n      duration\n      hasCaption\n    }\n    statistics {\n      viewCount\n      likeCount\n      commentCount\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;