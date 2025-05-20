import React, { ReactNode, useEffect, useState } from 'react';

const IsClient = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // جلوگیری از رندر در SSR
  return children;
};

export default IsClient;
