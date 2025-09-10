"use client";

import React from 'react';
import { NavLink } from '@/app/types';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  onSelect: (link: NavLink) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] bg-black/70 backdrop-blur-sm">
      <div className="absolute top-16 right-4 left-4 bg-neutral-900 rounded-lg p-4">
        <div className="flex flex-col gap-3">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { onSelect(link); onClose(); }}
              className="text-left px-3 py-2 rounded hover:bg-neutral-800"
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
