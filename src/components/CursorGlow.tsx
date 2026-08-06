'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on desktop pointing devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button';

      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.08s ease-out',
      }}
    >
      <div
        style={{
          width: isHovered ? '48px' : '24px',
          height: isHovered ? '48px' : '24px',
          borderRadius: '50%',
          border: '1px solid rgba(191, 164, 111, 0.6)',
          backgroundColor: isHovered
            ? 'rgba(191, 164, 111, 0.15)'
            : 'rgba(191, 164, 111, 0.05)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
          boxShadow: '0 0 20px rgba(191, 164, 111, 0.2)',
        }}
      />
    </div>
  );
}
