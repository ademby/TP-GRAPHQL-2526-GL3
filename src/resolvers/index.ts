import { Resolvers } from "../generated/graphql";
import { Query } from "./Query";
import { Cv } from "./Cv";
import { User } from "./User";
import { Mutation } from "./Mutation";
import { Subscription } from "./Subscription";
import { Skill } from "./Skill";

export const resolvers: Resolvers = {
  Query,
  Cv,
  User,
  Mutation,
  Subscription,
  Skill,
};
