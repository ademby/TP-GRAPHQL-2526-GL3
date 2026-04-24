import { SubscriptionResolver } from "../generated/graphql";

export const Subscription : SubscriptionResolver = {
  cvChanged: {
    subscribe: (parent, {}, { pubSub }) => pubSub.subscribe("CV_CHANGED"),
    resolve: (payload) => payload,
  },
};
