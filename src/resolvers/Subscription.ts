import { SubscriptionResolvers } from "../generated/graphql";

export const Subscription: SubscriptionResolvers = {
  cvChanged: {
    subscribe: (parent, args, context, info) =>
      context.pubSub.subscribe("CV_CHANGED"),
    resolve: (payload) => payload,
  },
};
