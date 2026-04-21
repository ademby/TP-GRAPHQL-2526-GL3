import type { Cv } from '../../domain/entities/Cv.js';

export const CV_EVENT_TYPES = {
  ADDED: 'CV_ADDED',
  UPDATED: 'CV_UPDATED',
  DELETED: 'CV_DELETED',
} as const;

export type CvEventType = (typeof CV_EVENT_TYPES)[keyof typeof CV_EVENT_TYPES];

export interface CvEvent {
  type: CvEventType;
  cv: Cv;
}

export interface CvEventPublisher {
  publish(event: CvEvent): Promise<void>;
}
