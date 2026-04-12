import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const EntranceAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        onComplete?.();
      }
    });

    // Initial states
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(textRef.current, { y: 30, opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0 });

    // Animation sequence
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out'
    })
    .to(lineRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.4')
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
    .to({}, { duration: 0.6 }) // Pause
    .to([logoRef.current, textRef.current, lineRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut'
    }, '-=0.2');

    // Allow click to skip
    const handleClick = () => {
      if (isAnimating) {
        tl.kill();
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setIsAnimating(false);
            onComplete?.();
          }
        });
      }
    };

    containerRef.current?.addEventListener('click', handleClick);
    
    return () => {
      tl.kill();
      containerRef.current?.removeEventListener('click', handleClick);
    };
  }, [onComplete, isAnimating]);

  if (!isAnimating) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer"
      aria-hidden="true"
    >
      {/* Grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Logo/Icon */}
      <div
        ref={logoRef}
        className="relative mb-8"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#d4af37]/40 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d4af37]/60 flex items-center justify-center">
            <span className="text-[#d4af37] text-2xl sm:text-3xl font-light tracking-[0.2em]" id="font1">
              MF
            </span>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl -z-10" />
      </div>

      {/* Animated line */}
      <div
        ref={lineRef}
        className="w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8 origin-center"
      />

      {/* Brand text */}
      <div ref={textRef} className="text-center">
        <h1 
          id="font1" 
          className="text-white text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.3em] uppercase mb-3"
        >
          Meo Fusciuni
        </h1>
        <p 
          id="font2" 
          className="text-[#d4af37]/80 text-xs sm:text-sm tracking-[0.4em] uppercase"
        >
          Parfums
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-[#d4af37]/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-[#d4af37]/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-[#d4af37]/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-[#d4af37]/20" />

      {/* Skip hint */}
      <p 
        id="font3" 
        className="absolute bottom-12 text-white/30 text-xs tracking-[0.2em] animate-pulse"
      >
        Click to enter
      </p>
    </div>
  );
};

export default EntranceAnimation;
