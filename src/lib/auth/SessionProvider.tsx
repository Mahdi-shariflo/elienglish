'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { User } from '@/types';

type SessionProvider =
  | null
  | (User & {
      updateSession: () => void;
      setSessionManually: (user: User) => void;
    });

export const SessionContext = createContext<SessionProvider | undefined>(undefined);

export function SessionProvider({
  children,
  session: initialSession,
}: {
  children: React.ReactNode;
  session: User | null;
}) {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  const updateSession = useCallback(async () => {
    const res = await fetch('/session');
    const newSession = await res.json();
    setSession(newSession);
  }, []);

  const setSessionManually = useCallback((user: User) => {
    setSession(user);
  }, []);

  const value = useMemo(() => {
    if (session) {
      return {
        ...session,
        updateSession,
        setSessionManually,
      };
    }
    return null;
  }, [session, updateSession, setSessionManually]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
