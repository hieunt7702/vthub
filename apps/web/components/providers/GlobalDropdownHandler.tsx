'use client';

import { useEffect } from 'react';

export function GlobalDropdownHandler() {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const openDropdowns = document.querySelectorAll('details[data-hh-nav-dropdown][open]');
      
      openDropdowns.forEach((dropdown) => {
        if (!dropdown.contains(target)) {
          dropdown.removeAttribute('open');
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return null;
}
