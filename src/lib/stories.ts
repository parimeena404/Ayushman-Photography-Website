// Story & Films data for the photography portfolio
export interface StoryImage {
  src: string;
  alt: string;
  layout?: 'full' | 'half' | 'third';
}

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  couple: string;
  location: string;
  venue: string;
  date: string;
  coverImage: string;
  introduction: string;
  quote: string;
  quoteAuthor: string;
  images: StoryImage[];
  videoUrl?: string;
  category: string;
}

export interface Film {
  id: string;
  title: string;
  couple: string;
  location: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
}

export const films: Film[] = [
  {
    id: 'film-1',
    title: '🤝 Gathbandhan Sacred Vows Ritual Film',
    couple: 'Anika & Rohan',
    location: 'Jaipur Palace, Rajasthan',
    category: 'Wedding Films',
    thumbnail: '/images/wedding/wedding6.png',
    duration: '4:15',
  },
  {
    id: 'film-2',
    title: '⛵ Sunset Voyage & Aerial Destination Film',
    couple: 'Royal Destination Feature',
    location: 'Ujjain & Heritage Lakes MP',
    category: 'Drone Footage',
    thumbnail: '/images/festivals/rainbow-sails.png',
    duration: '3:45',
  },
  {
    id: 'film-3',
    title: '💃 Royal Palace Garba Night Cinema Highlight',
    couple: 'Festive Heritage Special',
    location: 'Ujjain, Madhya Pradesh',
    category: 'Highlight Films',
    thumbnail: '/images/festivals/palace-dance.jpg',
    duration: '5:20',
  },
];

export const stories: Story[] = [
  {
    slug: 'anika-and-rohan',
    title: 'A Royal Rajasthani Affair',
    subtitle: 'Where ancient palace courtyards witnessed a magnificent love story',
    couple: 'Anika & Rohan',
    location: 'Jaipur, Rajasthan',
    venue: 'City Palace & Rambagh',
    date: 'September 2024',
    coverImage: '/images/wedding/wedding5.jpg',
    introduction: 'Under the golden skies of Jaipur, Anika and Rohan exchanged vows in a grand royal ceremony. The ancient palace walls echoed with music, and the courtyards stood as silent witnesses to a celebration that brought together centuries of Indian heritage, royal elegance, and profound emotion.',
    quote: 'They didn\'t just photograph our wedding — they captured the feeling of it. Every time I look at our images, I\'m transported back to that golden afternoon.',
    quoteAuthor: 'Anika',
    category: 'Royal Wedding',
    images: [
      { src: '/images/wedding/wedding5.jpg', alt: 'Varmala Rose Petal Canopy', layout: 'full' },
      { src: '/images/wedding/wedding1.jpg', alt: 'Stone Jali Silhouette', layout: 'half' },
      { src: '/images/wedding/wedding3.jpg', alt: 'Ivy Steps Couple', layout: 'half' },
      { src: '/images/wedding/wedding4.jpg', alt: 'Palace Night Walk', layout: 'full' },
    ],
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getRelatedStories(currentSlug: string): Story[] {
  return stories.filter((s) => s.slug !== currentSlug).slice(0, 3);
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 8-12 months in advance for weddings, especially during peak season (October to March). For destination weddings, we suggest reaching out even earlier.',
  },
  {
    category: 'Pricing',
    question: 'What are your packages and pricing?',
    answer: 'Our collections start at ₹15,000 for festive shoots and ₹45,000 for full-day wedding coverage.',
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'golden-hour-photography-guide',
    title: 'The Art of Golden Hour Photography',
    excerpt: 'Why the last hour of sunlight transforms ordinary wedding and festive moments into extraordinary memories.',
    date: 'January 15, 2025',
    category: 'Photography Tips',
    image: '/images/wedding/wedding2.png',
    content: 'Golden hour wraps subjects in a soft, warm embrace that flatters skin tones and paints the sky in gradients of amber and gold.',
  },
];
