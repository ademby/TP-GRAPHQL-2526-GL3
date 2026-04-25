import { SubscriptionResolvers } from "../generated/graphql";

export const Subscription: SubscriptionResolvers = {
  cvChanged: {
    subscribe: (parent, {}, { pubSub }) => pubSub.subscribe("CV_CHANGED"),
    resolve: (payload) => payload,
  },
};
