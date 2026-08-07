'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { films, Film } from '@/lib/stories';
import VideoPlayer from './VideoPlayer';

const filmCategories = [
  'All Films',
  'Wedding Films',
  'Highlight Films',
  'Drone Footage',
];

export default function FilmsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All Films');
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

  const filteredFilms =
    selectedCategory === 'All Films'
      ? films
      : films.filter((f) => f.category === selectedCategory);

  return (
    <section id="films" className="section-padding">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {filmCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: selectedCategory === cat ? 700 : 500,
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                background: selectedCategory === cat ? '#D40000' : 'transparent',
                border: selectedCategory === cat ? '1.5px solid #D40000' : '1.5px solid var(--border-medium)',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Films Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredFilms.map((film) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => setActiveFilm(film)}
              style={{ cursor: 'pointer' }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  boxShadow: 'var(--shadow-subtle)',
                }}
              >
                <img
                  src={film.thumbnail}
                  alt={film.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(212, 0, 0, 0.85)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      paddingLeft: '3px',
                      boxShadow: '0 4px 14px rgba(212,0,0,0.5)',
                    }}
                  >
                    ▶
                  </div>
                </div>

                <span
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: '#FFD700',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {film.duration}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#D40000',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontFamily: "'Manrope', sans-serif",
                  marginBottom: '0.25rem',
                }}
              >
                {film.location}
              </p>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {film.title}
              </h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {film.couple}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {activeFilm && (
            activeFilm.videoUrl ? (
              <VideoPlayer
                isOpen={!!activeFilm}
                videoUrl={activeFilm.videoUrl}
                title={`${activeFilm.title} — ${activeFilm.couple}`}
                onClose={() => setActiveFilm(null)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveFilm(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9999,
                  background: 'rgba(0,0,0,0.92)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={activeFilm.thumbnail}
                  alt={activeFilm.title}
                  style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => setActiveFilm(null)}
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '40px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '1.25rem', border: 'none', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
