"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isOpen: boolean;
  size?: number;
  onClick?: () => void;
}

const lineProps = {
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round' as const,
}

const HamburgerToggle: React.FC<Props> = ({ isOpen, size = 32, onClick }) => {
  return (
    <button aria-label="Toggle menu" onClick={onClick} className="inline-flex items-center justify-center">
      <motion.svg width={size} height={size} viewBox="0 0 24 24" initial={false}>
        <motion.line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          {...lineProps}
          animate={isOpen ? { y1: 12, rotate: 45, x1: 6, x2: 18 } : { y1: 6, rotate: 0, x1: 3, x2: 21 }}
          transition={{ duration: 0.25 }}
        />
        <motion.line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          {...lineProps}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          {...lineProps}
          animate={isOpen ? { y1: 12, rotate: -45, x1: 6, x2: 18 } : { y1: 18, rotate: 0, x1: 3, x2: 21 }}
          transition={{ duration: 0.25 }}
        />
      </motion.svg>
    </button>
  );
};

export default HamburgerToggle;
