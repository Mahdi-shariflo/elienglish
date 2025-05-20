import { User } from '@/types';

export interface Session {
  accessToken: string;
  accessTokenExpires: number;
  user: User;
}
