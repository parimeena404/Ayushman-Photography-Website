'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { stories } from '@/lib/stories';

export default function StoriesListingPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
              Visual Journals
            </p>
            <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300 }}>
              All Stories
            </h1>
          </div>

          {/* Stories Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '3.5rem',
            }}
          >
            {stories.map((story) => (
              <a
                key={story.slug}
                href={`/stories/${story.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '480px', marginBottom: '1.5rem' }}>
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15,35,27,0.7) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '2rem',
                      left: '2rem',
                      right: '2rem',
                      color: '#F8F5EF',
                    }}
                  >
                    <p className="font-body" style={{ fontSize: '0.75rem', color: '#BFA46F', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {story.location}
                    </p>
                    <h3 className="font-heading" style={{ fontSize: '2rem', fontWeight: 300 }}>
                      {story.title}
                    </h3>
                    <p className="font-body" style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      {story.couple}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
