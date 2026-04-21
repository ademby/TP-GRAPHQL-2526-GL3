import { withFilter } from 'graphql-subscriptions';
import {
  CV_EVENT_TYPES,
  type CvEvent,
  type CvEventType,
} from '../../application/ports/CvEventPublisher.js';
import type { GraphQLContext } from '../context/GraphQLContext.js';
import { CV_EVENTS_TOPIC } from '../subscriptions/cvEvents.js';

const subscribeByType = (eventType: CvEventType) =>
  withFilter(
    (_parent: unknown, _args: unknown, context?: GraphQLContext) => {
      if (!context) {
        throw new Error('GraphQL context is required for subscriptions.');
      }

      return context.pubSub.asyncIterableIterator(CV_EVENTS_TOPIC);
    },
    (payload: unknown) => {
      const event = payload as CvEvent;
      return event.type === eventType;
    },
  );

export const subscriptionResolvers = {
  cvAdded: {
    subscribe: subscribeByType(CV_EVENT_TYPES.ADDED),
    resolve: (payload: CvEvent) => payload.cv,
  },
  cvUpdated: {
    subscribe: subscribeByType(CV_EVENT_TYPES.UPDATED),
    resolve: (payload: CvEvent) => payload.cv,
  },
  cvDeleted: {
    subscribe: subscribeByType(CV_EVENT_TYPES.DELETED),
    resolve: (payload: CvEvent) => payload.cv,
  },
};
