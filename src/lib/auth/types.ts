import { User } from '@/store/types';

export interface Session {
  accessToken: string;
  accessTokenExpires: number;
  user: User;
}
