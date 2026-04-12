import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import '../styles/ChromaGrid.css';

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  // Mobile swipe state
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const demo = [
    {
      image: '/download (15).jpg',
      title: 'Giuseppe Imprezzabile',
      subtitle: 'Founder & Master Perfumer',
      handle: '@giuseppe.meo',
      borderColor: '#d4af37',
      gradient: 'linear-gradient(145deg, #d4af37, #1a1a1a)',
    },
    {
      image: '/53d98034c77c1f9d85016dd9f9850cd3.jpg',
      title: 'Marco Romano',
      subtitle: 'Creative Director',
      handle: '@marco.romano',
      borderColor: '#c9a227',
      gradient: 'linear-gradient(210deg, #c9a227, #1a1a1a)',
    },
    {
      image: '/Black and white tech headshot.jpg',
      title: 'Marco Benedetti',
      subtitle: 'Head of Production',
      handle: '@marco.benedetti',
      borderColor: '#b8941f',
      gradient: 'linear-gradient(165deg, #b8941f, #1a1a1a)',
    },
    {
      image: '/download (16).jpg',
      title: 'Sofia Lombardi',
      subtitle: 'Fragrance Specialist',
      handle: '@sofia.lombardi',
      borderColor: '#a67c00',
      gradient: 'linear-gradient(195deg, #a67c00, #1a1a1a)',
    },
    {
      image: "/don't know his name but he fine.jpg",
      title: 'Alessandro Ricci',
      subtitle: 'Quality Control',
      handle: '@alessandro.ricci',
      borderColor: '#d4af37',
      gradient: 'linear-gradient(225deg, #d4af37, #1a1a1a)',
    },
    {
      image: '/download (19).jpg',
      title: 'Valentina Rossi',
      subtitle: 'Brand Manager',
      handle: '@valentina.rossi',
      borderColor: '#c9a227',
      gradient: 'linear-gradient(135deg, #c9a227, #1a1a1a)',
    }
  ];
  const data = items?.length ? items : demo;

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && activeIndex < data.length - 1) {
        // Swipe left - next card
        setActiveIndex(prev => prev + 1);
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe right - previous card
        setActiveIndex(prev => prev - 1);
      }
    }
  }, [activeIndex, data.length]);

  // Desktop GSAP setup
  useEffect(() => {
    if (isMobile) return;
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, [isMobile]);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Mobile carousel render
  if (isMobile) {
    return (
      <div className={`chroma-mobile-carousel ${className}`}>
        <div
          className="chroma-carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {data.map((c, i) => (
            <article
              key={i}
              className={`chroma-mobile-card ${i === activeIndex ? 'active' : ''} ${i < activeIndex ? 'prev' : ''} ${i > activeIndex ? 'next' : ''}`}
              style={{
                '--card-border': c.borderColor || 'transparent',
                '--card-gradient': c.gradient,
              }}
            >
              <div className="chroma-mobile-img-wrapper">
                <img src={c.image} alt={c.title} loading="lazy" decoding="async" />
              </div>
              <footer className="chroma-mobile-info">
                <h3 className="name" id="font1">{c.title}</h3>
                {c.handle && <span className="handle" id="font2">{c.handle}</span>}
                <p className="role" id="font3">{c.subtitle}</p>
              </footer>
            </article>
          ))}
        </div>

        {/* Swipe indicators */}
        <div className="chroma-carousel-dots">
          {data.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to team member ${i + 1}`}
            />
          ))}
        </div>

        <p className="chroma-swipe-hint" id="font3">Swipe to explore</p>
      </div>
    );
  }

  // Desktop grid render
  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" decoding="async" />
          </div>
          <footer className="chroma-info">
            <h3 className="name" id="font1">{c.title}</h3>
            {c.handle && <span className="handle" id="font2">{c.handle}</span>}
            <p className="role" id="font3">{c.subtitle}</p>
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
