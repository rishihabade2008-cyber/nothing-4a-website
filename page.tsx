'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import LandingPage from './nothing-landing';

// ============================================
// SMOOTH SCROLL PROVIDER
// ============================================
export default function Page() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Update Framer Motion and GSAP scroll position
    let lastTime = Date.now();
    const onFrame = (time: number) => {
      lenis.raf(time);

      // Update custom scroll property for GSAP animations
      const scrollTop = window.scrollY;
      document.documentElement.style.setProperty(
        '--scroll',
        `${scrollTop}px`
      );
    };

    // Use RAF instead of RAF for better performance
    const raf = (time: number) => {
      onFrame(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Stop Lenis on scroll wheel to prevent momentum issues
    const handleWheel = (e: WheelEvent) => {
      lenis.setVelocity(e.deltaY);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-black text-white">
      <LandingPage />
    </main>
  );
}
