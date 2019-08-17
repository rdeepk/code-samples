import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    posts(cursor: String, limit: Int): PostConnection!
    post(id: ID!): Post!
  }

  extend type Mutation {
    createPost(title: String!, body: String!): Post!
    deletePost(id: ID!): Boolean!
    updatePost(id: ID!, title: String!, body: String!): Boolean!
  }

  type PostConnection {
    edges: [Post!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Post {
   id: ID!
   title: String!
   body: String!
   user: User!
   comments: [Comment!]
   createdAt: Date!
 }

 extend type Subscription {
    postCreated: PostCreated!
  }

  type PostCreated {
    post: Post!
  }
`;
