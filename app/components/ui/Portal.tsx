
"use client";
import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const portalRoot = document.getElementById('modal-root');
    setElement(portalRoot);
  }, []);

  return (mounted && element) ? createPortal(children, element) : null;
};

export default Portal;
