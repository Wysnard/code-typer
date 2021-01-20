import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  random: Github;
};


export type QueryRandomArgs = {
  language: Scalars['String'];
};

export type Github = {
  __typename?: 'Github';
  repository: Scalars['String'];
  name: Scalars['String'];
  content: Scalars['String'];
};

export type RandomQueryVariables = Exact<{
  language: Scalars['String'];
}>;


export type RandomQuery = (
  { __typename?: 'Query' }
  & { random: (
    { __typename?: 'Github' }
    & Pick<Github, 'repository' | 'name' | 'content'>
  ) }
);


export const RandomDocument = gql`
    query Random($language: String!) {
  random(language: $language) {
    repository
    name
    content
  }
}
    `;

export function useRandomQuery(options: Omit<Urql.UseQueryArgs<RandomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RandomQuery>({ query: RandomDocument, ...options });
};