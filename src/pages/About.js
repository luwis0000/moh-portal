import React, { useState, useEffect } from "react";
import Card from "../components/Card";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    {
      src: "./assets/images/nav-gallery/healthcare-1.jpg",
    },
    {
      src: "./assets/images/nav-gallery/healthcare-2.jpg", 
    },
    {
      src: "./assets/images/nav-gallery/healthcare-3.jpg",
    },
    {
      src: "./assets/images/nav-gallery/healthcare-4.jpg",
    }
  ];

  // Auto-slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    setCurrentImageIndex(current => 
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex(current => 
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  return (
    <div className="page">
      <h2>About the Ministry of Health</h2>
      <p>
        The Ministry of Health is responsible for the stewardship of the national health system, including policy, services, and public health programs.
      </p>

      {/* Image Slideshow Section */}
      <div className="about-gallery" style={{ margin: '2rem 0' }}>
        
        {/* Main Slideshow */}
        <div className="slideshow-container" style={{
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto 2rem auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }}>
          <div className="slide" style={{
            position: 'relative',
            height: '400px',
            overflow: 'hidden'
          }}>
            <img 
              src={galleryImages[currentImageIndex].src}
              alt="Ministry of Health"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'opacity 0.5s ease'
              }}
              onError={(e) => {
                console.log(`Image failed to load: ${galleryImages[currentImageIndex].src}`);
                e.target.style.display = 'none';
              }}
            />
            
            {/* Slide Navigation Arrows */}
            <button 
              className="slide-arrow prev" 
              onClick={prevSlide}
              style={{
                position: 'absolute',
                top: '50%',
                left: '15px',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,1)';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.8)';
                e.target.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ‹
            </button>
            
            <button 
              className="slide-arrow next" 
              onClick={nextSlide}
              style={{
                position: 'absolute',
                top: '50%',
                right: '15px',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,1)';
                e.target.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.8)';
                e.target.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              ›
            </button>

            {/* Slide Indicator */}
            <div className="slide-indicator" style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              background: 'rgba(0,0,0,0.5)',
              padding: '8px 12px',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    background: index === currentImageIndex ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    transform: index === currentImageIndex ? 'scale(1.2)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (index !== currentImageIndex) {
                      e.target.style.background = 'rgba(255,255,255,0.8)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentImageIndex) {
                      e.target.style.background = 'rgba(255,255,255,0.5)';
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="thumbnail-gallery" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail-item ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              style={{
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: index === currentImageIndex ? '3px solid var(--primary)' : '3px solid transparent',
                transform: index === currentImageIndex ? 'scale(1.05)' : 'scale(1)',
                boxShadow: index === currentImageIndex ? '0 4px 12px rgba(30, 136, 229, 0.4)' : '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (index !== currentImageIndex) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentImageIndex) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }
              }}
            >
              <img 
                src={image.src}
                alt=""
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={(e) => {
                  console.log(`Thumbnail failed to load: ${image.src}`);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="card-container">
        <Card 
          title="Mission" 
          text="To provide equitable, accessible, and quality health services for all citizens." 
        />
        <Card 
          title="Vision" 
          text="A healthy nation with resilient health systems." 
        />
      </div>

      {/* Additional Content Sections */}
      <div className="about-content" style={{ marginTop: '2rem' }}>
        <div className="content-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div className="content-section">
            <h3>Our Values</h3>
            <ul style={{ lineHeight: '1.6', color: 'var(--muted)' }}>
              <li>Compassion and empathy in service delivery</li>
              <li>Integrity and accountability in all operations</li>
              <li>Innovation and continuous improvement</li>
              <li>Collaboration and partnership</li>
              <li>Equity and social justice</li>
            </ul>
          </div>
          
          <div className="content-section">
            <h3>Strategic Goals</h3>
            <ul style={{ lineHeight: '1.6', color: 'var(--muted)' }}>
              <li>Strengthen primary healthcare systems</li>
              <li>Enhance disease prevention and control</li>
              <li>Improve maternal and child health outcomes</li>
              <li>Develop health workforce capacity</li>
              <li>Promote health research and innovation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="about-stats" style={{
        background: 'var(--card)',
        padding: '2rem',
        borderRadius: '12px',
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <h3>Our Impact</h3>
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>50+</div>
            <div style={{ color: 'var(--muted)' }}>Health Facilities</div>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>1000+</div>
            <div style={{ color: 'var(--muted)' }}>Healthcare Workers</div>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>24/7</div>
            <div style={{ color: 'var(--muted)' }}>Emergency Services</div>
          </div>
          <div className="stat-item">
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>1M+</div>
            <div style={{ color: 'var(--muted)' }}>Patients Served Annually</div>
          </div>
        </div>
      </div>
    </div>
  );
}