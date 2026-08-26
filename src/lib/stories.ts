// Card Printing & Graphics Showcase data
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
    title: '✨ Hot Gold Foil Stamping & Velvet Card Crafting Showcase',
    couple: 'Ayushman Crafts Studio',
    location: 'Freeganj Press, Ujjain MP',
    category: 'Card Printing Craft',
    thumbnail: '/images/wedding/scroll_royal_blue_velvet.png',
    duration: '2:15',
  },
  {
    id: 'film-2',
    title: ' Laser Cut Acrylic Wedding Box Invitation Assembly',
    couple: 'Royal Wedding Suite',
    location: 'Ujjain Press Studio',
    category: 'Laser Cutting',
    thumbnail: '/images/wedding/acrylic_navy_gold.png',
    duration: '1:45',
  },
  {
    id: 'film-3',
    title: '🚩 German Offset Printing & Heavy Duty Star Flex Production',
    couple: 'Commercial Press Unit',
    location: 'Ujjain, Madhya Pradesh',
    category: 'Offset Press',
    thumbnail: '/images/banners/outdoor_flex_banner.jpg',
    duration: '3:10',
  },
];

export const stories: Story[] = [
  {
    slug: 'anika-and-rohan-royal-cards',
    title: 'A Royal Velvet & Gold Foil Invitation Suite',
    subtitle: 'Crafting luxury handmade box wedding cards with metallic Farman scrolls',
    couple: 'Anika & Rohan',
    location: 'Jaipur & Ujjain',
    venue: 'Ayushman Cards & Graphics Studio',
    date: 'September 2024',
    coverImage: '/images/wedding/scroll_royal_blue_velvet.png',
    introduction: 'For Anika & Rohan\'s grand wedding, our designers created a bespoke royal velvet box invitation suite featuring hot gold foil stamping, custom wax seals, and matching acrylic place cards.',
    quote: 'The wedding cards designed by Ayushman Cards & Graphics set the perfect royal tone for our celebration. All our relatives were in awe!',
    quoteAuthor: 'Anika',
    category: 'Royal Wedding Cards',
    images: [
      { src: '/images/wedding/scroll_royal_blue_velvet.png', alt: 'Royal Velvet Box Card', layout: 'full' },
      { src: '/images/wedding/acrylic_navy_gold.png', alt: 'Clear Acrylic Wax Seal Card', layout: 'half' },
      { src: '/images/wedding/scroll_white_gold.png', alt: 'Metallic Farman Scroll', layout: 'half' },
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
    category: 'Printing Orders',
    question: 'How far in advance should I order wedding cards?',
    answer: 'We recommend ordering 3-4 weeks prior to distribution to allow time for design proofing and custom foil stamping.',
  },
  {
    category: 'Pricing',
    question: 'What are your rates for visiting cards and flex banners?',
    answer: 'Visiting cards start at ₹2.5 per unit (bulk rates) and flex banners start at ₹12 per sq. ft.',
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
    slug: 'wedding-card-paper-gsm-guide',
    title: 'The Ultimate Guide to Paper Board GSM for Wedding Cards',
    excerpt: 'How to choose between 300 GSM Art Card, Imported Metallic Board, and Velvet Hardcover for your wedding invitations.',
    date: 'January 15, 2025',
    category: 'Printing Guide',
    image: '/images/wedding/scroll_white_gold.png',
    content: 'GSM (Grams per Square Meter) defines paper thickness. For luxury wedding box cards, 350+ GSM heavy board provides a sturdy, premium handfeel.',
  },
];
