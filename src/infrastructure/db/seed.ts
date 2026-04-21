import { UserRole } from '../../domain/entities/UserRole.js';
import type { Cv } from '../../domain/entities/Cv.js';
import type { Skill } from '../../domain/entities/Skill.js';
import type { User } from '../../domain/entities/User.js';

export const usersSeed: User[] = [
  {
    id: 'u1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    role: UserRole.USER,
  },
  {
    id: 'u2',
    name: 'Yassine Karim',
    email: 'yassine.karim@example.com',
    role: UserRole.ADMIN,
  },
  {
    id: 'u3',
    name: 'Nora Benali',
    email: 'nora.benali@example.com',
    role: UserRole.USER,
  },
];

export const skillsSeed: Skill[] = [
  { id: 's1', name: 'TypeScript' },
  { id: 's2', name: 'GraphQL' },
  { id: 's3', name: 'Docker' },
  { id: 's4', name: 'Node.js' },
  { id: 's5', name: 'Clean Architecture' },
];

export const cvsSeed: Cv[] = [
  {
    id: 'cv1',
    title: 'Backend Developer',
    description: 'API and architecture focused profile.',
    userId: 'u1',
    skillIds: ['s1', 's2', 's4', 's5'],
  },
  {
    id: 'cv2',
    title: 'Platform Engineer',
    description: 'Containerization and delivery pipelines.',
    userId: 'u2',
    skillIds: ['s1', 's3', 's4'],
  },
  {
    id: 'cv3',
    title: 'Full Stack Developer',
    description: 'Product oriented development with GraphQL.',
    userId: 'u3',
    skillIds: ['s1', 's2', 's4'],
  },
];

export const inMemorySeed = {
  users: usersSeed,
  skills: skillsSeed,
  cvs: cvsSeed,
};
