'use client';

import { use } from 'react';
import { getStoryBySlug } from '@/lib/stories';
import StoryPage from '@/components/StoryPage';
import { notFound } from 'next/navigation';

export default function StorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const story = getStoryBySlug(resolvedParams.slug);

  if (!story) {
    notFound();
  }

  return <StoryPage story={story} />;
}
