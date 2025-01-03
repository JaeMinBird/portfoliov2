'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ParallaxText } from '@/components/ParallaxText';
import { About } from '@/components/About';
import { ParallaxGrid } from '@/components/ParallaxGrid';
import { ExperienceTerminal } from '@/components/ExperienceTerminal';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const circlePositionRef = useRef({ x: -100, y: -100 });
  const [isHoveringInteractable, setIsHoveringInteractable] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  const updateCirclePosition = useCallback(() => {
    const current = circlePositionRef.current;
    const target = mousePosition;
    
    const smoothing = 0.3;
    
    const newX = current.x + (target.x - current.x) * smoothing;
    const newY = current.y + (target.y - current.y) * smoothing;
    
    circlePositionRef.current = { x: newX, y: newY };
    
    setMousePosition(prev => ({ ...prev }));
  }, [mousePosition]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Remove pointer cursor for interactables, but keep standard cursor
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      a, button, [role="button"], .interactable {
        cursor: inherit !important;
      }
    `;
    document.head.appendChild(styleElement);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smooth animation
    const animate = () => {
      updateCirclePosition();
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateCirclePosition]);

  // Add event listeners for interactable elements
  useEffect(() => {
    const handleInteractableEnter = () => setIsHoveringInteractable(true);
    const handleInteractableLeave = () => setIsHoveringInteractable(false);

    // Select all interactable elements
    const interactables = document.querySelectorAll('a, button, [role="button"], .interactable');
    
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleInteractableEnter);
      el.addEventListener('mouseleave', handleInteractableLeave);
    });

    return () => {
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractableEnter);
        el.removeEventListener('mouseleave', handleInteractableLeave);
      });
    };
  }, []);

  const headerStyle = {
    opacity: Math.max(0, 1 - scrollY / 500),
    transform: `translate(-50%, calc(-50% - ${scrollY * 0.2}px))`,
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:p-8 relative">
      <div 
        className="pointer-events-none fixed mix-blend-difference will-change-transform"
        style={{
          width: isHoveringInteractable ? '20px' : '15px',
          height: isHoveringInteractable ? '20px' : '15px',
          background: 'white',
          borderRadius: isHoveringInteractable ? '0%' : '50%',
          transform: `translate3d(${circlePositionRef.current.x - 39}px, ${circlePositionRef.current.y - 39}px, 0) 
                     ${isHoveringInteractable ? 'rotate(45deg)' : ''}`,
          zIndex: 9999,
          opacity: circlePositionRef.current.x < 0 ? 0 : 1,
          transition: 'all 0.1s ease-out',
          filter: 'blur(0.5px)',
          pointerEvents: 'none',
        }}
      />
      <ParallaxGrid scrollY={scrollY} />
      <div className="parallax-header text-backdrop" style={headerStyle}>
        <h1 className="floating-title font-['Black_Han_Sans'] flex flex-col sm:flex-row sm:gap-4">
          <span>Jae</span>
          <span>Birdsall</span>
        </h1>
      </div>

      <div className="mt-[80vh] flex flex-col gap-2">
        <ParallaxText baseVelocity={-1}>
          WELCOME TO THE FUTURE | 미래에 오신 것을 환영합니다 |
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          혁신은 여기서 시작됩니다 | INNOVATION STARTS HERE |
        </ParallaxText>
        <ParallaxText baseVelocity={-1}>
          BUILDING TOMORROW TODAY | 오늘 내일을 만듭니다 |
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          한계를 넘어서다 | PUSH THE BOUNDARIES |
        </ParallaxText>
        <ParallaxText baseVelocity={-1}>
          BREAK THE LIMITS | 한계를 깨다 |
        </ParallaxText>
      </div>

      <About />

      <div className="relative z-10">
        <ExperienceTerminal />
      </div>

      <div className="vhs-overlay"></div>
    </div>
  );
}
