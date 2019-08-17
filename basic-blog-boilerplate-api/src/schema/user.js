import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!
    signIn(login: String!, password: String!): Token!
    createUser(username: String!, firstName: String, lastName: String): User!
    deleteUser(id: ID!): Boolean!
    updateUser(id: ID!, username: String!, firstName: String, lastName: String): Boolean!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String
    lastName: String
    role: String
    posts: [Post!]
    comments: [Comment!]
  }

  type Token {
    token: String!
  }
`;
