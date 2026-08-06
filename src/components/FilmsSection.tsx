'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { films, Film } from '@/lib/stories';
import VideoPlayer from './VideoPlayer';

const filmCategories = [
  'All Films',
  'Wedding Films',
  'Highlight Films',
  'Pre-Wedding Films',
  'Drone Footage',
  'Behind the Scenes',
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
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '4rem',
          }}
        >
          {filmCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.5rem 1.25rem',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: selectedCategory === cat ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: `2px solid ${
                  selectedCategory === cat ? 'var(--accent)' : 'transparent'
                }`,
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem',
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
                  height: '260px',
                  overflow: 'hidden',
                  marginBottom: '1rem',
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
                    backgroundColor: 'rgba(15,35,27,0.3)',
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
                      border: '1px solid rgba(248, 245, 239, 0.8)',
                      backgroundColor: 'rgba(15, 35, 27, 0.6)',
                      backdropFilter: 'blur(5px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F8F5EF',
                      paddingLeft: '4px',
                    }}
                  >
                    ▶
                  </div>
                </div>

                <span
                  className="font-body"
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(15, 35, 27, 0.8)',
                    color: '#F8F5EF',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '2px',
                  }}
                >
                  {film.duration}
                </span>
              </div>

              <p
                className="font-body"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {film.location}
              </p>
              <h4 className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 300 }}>
                {film.title}
              </h4>
              <p
                className="font-body"
                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
              >
                {film.couple}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeFilm && (
          <VideoPlayer
            isOpen={!!activeFilm}
            videoUrl={activeFilm.videoUrl}
            title={`${activeFilm.title} — ${activeFilm.couple}`}
            onClose={() => setActiveFilm(null)}
          />
        )}
      </div>
    </section>
  );
}
