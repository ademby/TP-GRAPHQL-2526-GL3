import { PubSub } from 'graphql-subscriptions';
import type { CvEvent, CvEventPublisher } from '../../application/ports/CvEventPublisher.js';

export const CV_EVENTS_TOPIC = 'CV_EVENTS';

export class GraphQLCvEventPublisher implements CvEventPublisher {
  constructor(private readonly pubSub: PubSub) {}

  async publish(event: CvEvent): Promise<void> {
    await this.pubSub.publish(CV_EVENTS_TOPIC, event);
  }
}
