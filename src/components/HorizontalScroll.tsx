import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isScrolling = useRef(false);
  const lastTime = useRef(Date.now());
  const lastDelta = useRef(0);
  const totalSlides = React.Children.count(children);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isDesktop) return;
    
    // Allow vertical scrolling inside designated containers without triggering slide change
    if ((e.target as HTMLElement).closest('.stop-horizontal-scroll')) {
      return;
    }
    
    const now = Date.now();
    const dt = now - (lastTime.current || now);
    lastTime.current = now;

    const currentDelta = Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY));
    
    // If it's been more than 150ms since the last event, it's a new scroll action.
    // Reset our lastDelta so the new scroll registers as an acceleration.
    if (dt > 150) {
      lastDelta.current = 0;
    }
    
    const isAccelerating = currentDelta > lastDelta.current;
    lastDelta.current = currentDelta;

    if (currentDelta < 30) return;

    e.preventDefault();

    if (isScrolling.current) return;
    
    // Ignore decelerating scroll events (trackpad inertia) 
    // to prevent double-triggering after the 1000ms lock expires.
    if (!isAccelerating) return;

    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const direction = isHorizontal ? (e.deltaX > 0 ? 1 : -1) : (e.deltaY > 0 ? 1 : -1);
    
    setCurrentSlide((prev) => {
      const nextSlide = prev + direction;
      if (nextSlide >= 0 && nextSlide < totalSlides) {
        return nextSlide;
      }
      return prev;
    });

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  }, [isDesktop, totalSlides]);

  useEffect(() => {
    if (isDesktop) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isDesktop, handleWheel]);

  if (!isDesktop) {
    return <div className="flex flex-col">{children}</div>;
  }

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-apple-gray-50">
      <motion.div 
        animate={{ x: `-${currentSlide * 100}vw` }}
        transition={{ type: 'spring', damping: 25, stiffness: 100 }}
        className="flex h-full w-full"
      >
        {children}
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-apple-gray-900 scale-125' : 'bg-apple-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
};
