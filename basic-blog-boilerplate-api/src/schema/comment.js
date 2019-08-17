import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    comments: [Comment!]!
    comment(id: ID!): Comment!
  }

  extend type Mutation {
    createComment(text: String!, postId: ID!): Comment!
    deleteComment(id: ID!): Boolean!
    updateComment(id: ID!, text: String!): Boolean!
  }

  type Comment {
   id: ID!
   text: String!
   user: User!
   post: Post!
 }
`;
