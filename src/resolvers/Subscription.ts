export const Subscription = {
  cvChanged: {
    subscribe: (parent, {}, { pubSub }) => pubSub.subscribe("CV_CHANGED"),
    resolve: (payload) => payload,
  },
};
