'use client';

import { use } from 'react';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { blogPosts } from '@/lib/stories';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <PageTransition>
      <Navbar />
      <article style={{ paddingTop: '8rem', paddingBottom: '6rem' }} className="section-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="text-editorial-sm font-body" style={{ color: 'var(--accent)', marginBottom: '1rem', textAlign: 'center' }}>
            {post.category} · {post.date}
          </p>
          <h1 className="font-heading text-editorial-lg" style={{ fontWeight: 300, textAlign: 'center', marginBottom: '3rem' }}>
            {post.title}
          </h1>

          <div style={{ height: '480px', overflow: 'hidden', marginBottom: '3rem' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div
            className="font-body"
            style={{
              fontSize: '1.1rem',
              lineHeight: 2,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-line',
            }}
          >
            {post.content}
          </div>
        </div>
      </article>
      <Newsletter />
      <Footer />
    </PageTransition>
  );
}
