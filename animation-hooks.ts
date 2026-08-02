/**
 * Custom Animation Hooks and Utilities
 * Reusable hooks for GSAP and Framer Motion animations
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: Fade in and slide up animation on scroll
 * Perfect for revealing content as user scrolls
 */
export const useFadeInUp = (
  options = {}
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          ...options,
        },
      }
    );
  }, [options]);

  return ref;
};

/**
 * Hook: Staggered children animation
 * Animates child elements with delay between each
 */
export const useStaggerChildren = (
  selector: string,
  {
    duration = 0.6,
    stagger = 0.1,
    delay = 0,
  } = {}
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [selector, duration, stagger, delay]);

  return ref;
};

/**
 * Hook: Parallax scroll effect
 * Creates depth effect as user scrolls
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });
  }, [speed]);

  return ref;
};

/**
 * Hook: Rotating animation
 * Continuous smooth rotation effect
 */
export const useRotation = (
  duration = 20,
  reverse = false
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      rotation: reverse ? -360 : 360,
      duration,
      repeat: -1,
      ease: 'none',
    });
  }, [duration, reverse]);

  return ref;
};

/**
 * Hook: Text reveal animation
 * Reveals text letter by letter
 */
export const useTextReveal = (
  trigger = true
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !trigger) return;

    const text = ref.current.textContent || '';
    const chars = text.split('');

    ref.current.innerHTML = chars
      .map((char) => `<span>${char}</span>`)
      .join('');

    gsap.fromTo(
      ref.current.querySelectorAll('span'),
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'back.out',
      }
    );
  }, [trigger]);

  return ref;
};

/**
 * Hook: Magnetic button hover effect
 * Button follows cursor on hover
 */
export const useMagneticHover = () => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

/**
 * Hook: Animated counter
 * Counts from 0 to target number
 */
export const useAnimatedCounter = (
  target: number,
  {
    duration = 2,
    triggerOnScroll = true,
  } = {}
) => {
  const ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;

    const animationProps: any = {
      duration,
      ease: 'power2.out',
    };

    if (triggerOnScroll) {
      animationProps.scrollTrigger = {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      };
    }

    gsap.to(counterRef, {
      current: target,
      ...animationProps,
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.ceil(counterRef.current).toString();
        }
      },
      snap: { current: 1 },
    });
  }, [target, duration, triggerOnScroll]);

  return ref;
};

/**
 * Hook: Blur in effect
 * Animates blur from heavy to none as you scroll
 */
export const useBlurIn = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        filter: 'blur(10px)',
        opacity: 0,
      },
      {
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return ref;
};

/**
 * Hook: Scale animation
 * Elements scale in from small to full size
 */
export const useScaleIn = (
  duration = 0.8,
  delay = 0
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration,
        delay,
        ease: 'back.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [duration, delay]);

  return ref;
};

/**
 * Hook: Clip path mask reveal
 * Reveals element with animated clip-path
 */
export const useMaskReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return ref;
};

/**
 * Utility: Create staggered delay array
 * Useful for animating lists
 */
export const createStaggerDelays = (
  length: number,
  baseDelay = 0.1
): number[] => {
  return Array.from({ length }, (_, i) => i * baseDelay);
};

/**
 * Utility: Ease functions
 */
export const easeFunctions = {
  inOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  inOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * (t - 2)) * (2 * (t - 2)) + 1,
  easeOutExpo: (t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  elasticOut: (t: number) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c5) + 1;
  },
};

/**
 * Utility: Check if animation is preferred to be reduced
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hook: Respect user's motion preferences
 * Disables animations if user prefers reduced motion
 */
export const useAnimationPreference = () => {
  const ref = useRef(prefersReducedMotion());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      ref.current = e.matches;
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return ref.current;
};

/**
 * Utility: Safe animation wrapper
 * Runs animation only if motion is not reduced
 */
export const safeAnimate = (
  element: HTMLElement | null,
  animation: () => void
) => {
  if (!prefersReducedMotion() && element) {
    animation();
  }
};
