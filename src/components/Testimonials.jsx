import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    image: '/download (15).jpg',
    quote: "Meo Fusciuni's fragrances are nothing short of extraordinary. Each scent tells a story that resonates deeply with my soul. The craftsmanship and attention to detail is unparalleled in the industry.",
    name: 'Adrián Moretti',
    role: 'Creative Director at Lumière',
    featured: false
  },
  {
    id: 2,
    image: '/53d98034c77c1f9d85016dd9f9850cd3.jpg',
    quote: "The moment I discovered Meo Fusciuni, my perception of perfumery changed forever. These aren't just fragrances—they are liquid poetry that captures emotions and memories in the most beautiful way possible.",
    name: 'Elena Rossi',
    role: 'Fashion Editor at Vogue Italia',
    featured: true
  },
  {
    id: 3,
    image: "/don't know his name but he fine.jpg",
    quote: "I've collected perfumes for over two decades, and Meo Fusciuni stands in a league of its own. The complexity, longevity, and evolution of each fragrance on the skin is masterfully orchestrated.",
    name: 'Marcus Chen',
    role: 'CEO of Chen & Associates',
    featured: false
  },
  {
    id: 4,
    image: '/f45a98fefc03972f92f31cdbd24e0b9d.jpg',
    quote: "Every Meo Fusciuni creation I've experienced has been a journey. The brand understands that true luxury lies not in opulence, but in the ability to evoke profound emotional responses through scent.",
    name: 'Isabella Ferreira',
    role: 'Art Curator at Galleria Moderna',
    featured: false
  },
  {
    id: 5,
    image: '/download (16).jpg',
    quote: "The philosophy behind Meo Fusciuni resonates with everything I believe about artistry and authenticity. These fragrances don't just smell beautiful—they speak to the depths of human experience.",
    name: 'Sofia Laurent',
    role: 'Founder of Essence Studio',
    featured: false
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        if (!isAnimating) {
          setIsAnimating(true);
          setActiveIndex((prev) => (prev + 1) % testimonials.length);
          setTimeout(() => setIsAnimating(false), 600);
        }
      }, 2000); // Change slide every 2 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isAnimating]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    
    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (normalizedDiff === 1 || normalizedDiff === -4) {
      return {
        transform: 'translateX(110%) scale(0.85)',
        opacity: 0.5,
        zIndex: 5,
      };
    } else if (normalizedDiff === testimonials.length - 1 || normalizedDiff === -1) {
      return {
        transform: 'translateX(-110%) scale(0.85)',
        opacity: 0.5,
        zIndex: 5,
      };
    } else {
      return {
        transform: 'translateX(0) scale(0.7)',
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <span className="testimonials-label" id="font2">Testimonials</span>
          <h2 className="testimonials-title" id="font1" style={{ whiteSpace: 'nowrap' }}>
            Don't take our word for it!
          </h2>
          <p className="testimonials-subtitle" id="font1" style={{ whiteSpace: 'nowrap' }}>
            Hear it from our partners.
          </p>
        </div>

        {/* Carousel */}
        <div 
          className="testimonials-carousel" 
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const style = getCardStyle(index);
              
              return (
                <div
                  key={testimonial.id}
                  className={`testimonial-card ${isActive ? 'active' : ''} ${testimonial.featured ? 'featured' : ''}`}
                  style={style}
                >
                  
                  <div className="testimonial-content">
                    <div className="testimonial-avatar">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                    
                    <blockquote className="testimonial-quote" id="font3">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="testimonial-author">
                      <span className="author-name" id="font1">{testimonial.name}</span>
                      <span className="author-role" id="font2">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="testimonials-nav">
            <button 
              className="nav-button prev"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="nav-button next"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
