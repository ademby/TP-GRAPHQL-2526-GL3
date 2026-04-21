export const typeDefs = /* GraphQL */ `
  enum UserRole {
    USER
    ADMIN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: UserRole!
  }

  type Skill {
    id: ID!
    name: String!
  }

  type Cv {
    id: ID!
    title: String!
    description: String!
    user: User!
    skills: [Skill!]!
  }

  input AddCvInput {
    title: String!
    description: String!
    userId: ID!
    skillIds: [ID!]!
  }

  input UpdateCvInput {
    id: ID!
    title: String
    description: String
    userId: ID
    skillIds: [ID!]
  }

  type Query {
    cvs: [Cv!]!
    cv(id: ID!): Cv!
  }

  type Mutation {
    addCv(input: AddCvInput!): Cv!
    updateCv(input: UpdateCvInput!): Cv!
    deleteCv(id: ID!): Cv!
  }

  type Subscription {
    cvAdded: Cv!
    cvUpdated: Cv!
    cvDeleted: Cv!
  }
`;
