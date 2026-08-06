'use client';

import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { blogPosts } from '@/lib/stories';

export default function BlogListingPage() {
  return (
    <PageTransition>
      <Navbar />
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
              The Studio Journal
            </p>
            <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300 }}>
              Reflections & Guides
            </h1>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '3.5rem',
            }}
          >
            {blogPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ overflow: 'hidden', height: '300px', marginBottom: '1.5rem' }}>
                  <img
                    src={post.image}
                    alt={post.title}
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
                  {post.category} · {post.date}
                </p>
                <h3 className="font-heading" style={{ fontSize: '1.75rem', fontWeight: 300, margin: '0.4rem 0' }}>
                  {post.title}
                </h3>
                <p className="font-body" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </PageTransition>
  );
}
