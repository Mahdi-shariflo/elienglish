// app/components/ThemeSwitcher.tsx
'use client';

import { useEffect } from 'react';

export function ThemeSwitcher() {
  function changeTheme(themeName?: string) {
    if (themeName === 'dark') {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (themeName === 'light') {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.removeItem('theme');
      // if alreay set the value will remove it
      document.body.classList.remove('dark');
    }
  }

  function getDefautTheme() {
    const defaultTheme = localStorage.getItem('theme');

    if (
      defaultTheme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark');
    } else {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
      }
    }
  }

  useEffect(() => {
    getDefautTheme();
  }, []);

  return (
    <div>
      <button onClick={() => changeTheme('light')}>Light Mode</button>
      <button onClick={() => changeTheme('dark')}>Dark Mode</button>
    </div>
  );
}
