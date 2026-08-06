'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';
import PressCarousel from '@/components/PressCarousel';
import WorldMap from '@/components/WorldMap';

const teamMembers = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Principal Photographer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Pioneer of fine art wedding photography in India with 12+ years of international editorial experience.',
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Cinematographer',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    bio: 'Documentary film director bringing cinematic motion and analog warmth to destination wedding films.',
  },
  {
    name: 'Karan Sharma',
    role: 'Senior Associate & Colorist',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    bio: 'Master of hand-crafted film tonal grading and fine-art album curation.',
  },
];

const equipment = [
  { category: 'Cameras', items: 'Leica M11, Hasselblad X2D, Sony A1 Cinema Rig' },
  { category: 'Lenses', items: 'Leica Summilux Prime Lenses 35mm, 50mm, 85mm f/1.2' },
  { category: 'Lighting', items: 'Profoto B10X Location Lighting, Natural Light Scrims' },
  { category: 'Aerial', items: 'DJI Inspire 3 Cinema Aerial System' },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <Navbar />

      {/* Main Storytelling Section */}
      <div style={{ paddingTop: '5rem' }}>
        <About />
      </div>

      <PressCarousel />

      {/* Team Showcase */}
      <section className="section-padding" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
            The Artisans
          </p>
          <h2 className="font-heading text-editorial-lg" style={{ fontWeight: 300 }}>
            Meet the Studio
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
          }}
        >
          {teamMembers.map((member, i) => (
            <div key={i}>
              <div style={{ overflow: 'hidden', height: '420px', marginBottom: '1.5rem' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <p className="font-body" style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {member.role}
              </p>
              <h3 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, margin: '0.25rem 0 0.75rem 0' }}>
                {member.name}
              </h3>
              <p className="font-body" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment & Craftsmanship */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-dark)', color: '#F8F5EF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
              Precision & Craft
            </p>
            <h2 className="font-heading text-editorial-lg" style={{ color: '#F8F5EF', fontWeight: 300 }}>
              The Tools of Light
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            {equipment.map((eq, i) => (
              <div key={i} style={{ borderLeft: '1px solid var(--accent)', paddingLeft: '1.5rem' }}>
                <p className="font-body" style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  {eq.category}
                </p>
                <p className="font-body" style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.7 }}>
                  {eq.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorldMap />

      <Footer />
    </PageTransition>
  );
}
