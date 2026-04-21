import { cvResolvers } from './cvResolvers.js';
import { mutationResolvers } from './mutationResolvers.js';
import { queryResolvers } from './queryResolvers.js';
import { subscriptionResolvers } from './subscriptionResolvers.js';

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers,
  Cv: cvResolvers,
};
