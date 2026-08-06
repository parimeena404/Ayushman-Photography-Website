'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Story, getRelatedStories } from '@/lib/stories';
import GalleryLightbox from './GalleryLightbox';
import PageTransition from './PageTransition';
import Navbar from './Navbar';
import Footer from './Footer';

export default function StoryPage({ story }: { story: Story }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const related = getRelatedStories(story.slug);

  const openLightboxAtIndex = (index: number) => {
    setInitialImageIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = story.images.map((img) => ({
    src: img.src,
    title: story.couple,
    location: story.location,
    date: story.date,
  }));

  return (
    <PageTransition>
      <Navbar />

      {/* Hero Cover */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '90vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '4rem clamp(1.5rem, 5vw, 6rem)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${story.coverImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15,35,27,0.85) 0%, transparent 70%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', color: '#F8F5EF' }}>
          <p
            className="text-editorial-sm font-body"
            style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}
          >
            {story.category} · {story.location}
          </p>
          <h1
            className="font-heading"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            {story.title}
          </h1>
          <p
            className="font-body"
            style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px' }}
          >
            {story.subtitle}
          </p>
        </div>
      </div>

      {/* Story Details Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--divider)',
          padding: '2rem clamp(1.5rem, 5vw, 6rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <p className="font-body" style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Couple
            </p>
            <p className="font-heading" style={{ fontSize: '1.2rem' }}>{story.couple}</p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Location
            </p>
            <p className="font-heading" style={{ fontSize: '1.2rem' }}>{story.location}</p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Venue
            </p>
            <p className="font-heading" style={{ fontSize: '1.2rem' }}>{story.venue}</p>
          </div>
          <div>
            <p className="font-body" style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Date
            </p>
            <p className="font-heading" style={{ fontSize: '1.2rem' }}>{story.date}</p>
          </div>
        </div>
      </div>

      {/* Intro Narrative */}
      <section className="section-padding" style={{ maxWidth: '850px', margin: '0 auto' }}>
        <p
          className="font-body"
          style={{
            fontSize: '1.2rem',
            lineHeight: 2,
            color: 'var(--text-primary)',
          }}
        >
          {story.introduction}
        </p>
      </section>

      {/* Editorial Image Gallery Grid */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 6rem) 6rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem',
          }}
        >
          {story.images.map((img, i) => {
            const isFull = img.layout === 'full';
            const isHalf = img.layout === 'half';
            const colSpan = isFull ? 12 : isHalf ? 6 : 4;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                onClick={() => openLightboxAtIndex(i)}
                style={{
                  gridColumn: `span ${colSpan}`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                className="gallery-grid-item"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: isFull ? '70vh' : '450px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quote Banner */}
      <section
        style={{
          backgroundColor: 'var(--bg-dark)',
          color: '#F8F5EF',
          padding: '6rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p
            className="font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            &ldquo;{story.quote}&rdquo;
          </p>
          <p
            className="font-body"
            style={{
              color: 'var(--accent)',
              fontSize: '0.9rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            — {story.quoteAuthor}
          </p>
        </div>
      </section>

      {/* Related Stories */}
      {related.length > 0 && (
        <section className="section-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h3
            className="font-heading text-editorial-md"
            style={{ fontWeight: 300, marginBottom: '3rem', textAlign: 'center' }}
          >
            More Stories
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {related.map((rel) => (
              <a
                key={rel.slug}
                href={`/stories/${rel.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ overflow: 'hidden', height: '360px', marginBottom: '1.25rem' }}>
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <p className="font-body" style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {rel.location}
                </p>
                <h4 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 300 }}>
                  {rel.title}
                </h4>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        initialIndex={initialImageIndex}
        onClose={() => setLightboxOpen(false)}
      />

      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .gallery-grid-item {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </PageTransition>
  );
}
