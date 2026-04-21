import { UserRole } from './UserRole.js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
