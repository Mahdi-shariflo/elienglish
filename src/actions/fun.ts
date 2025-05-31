'use server';
import { signIn } from 'next-auth/react';

export const onGoogleSignin = async () => await signIn('google');
