// Story data for the photography portfolio
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

export const stories: Story[] = [
  {
    slug: 'anika-and-rohan',
    title: 'A Tuscan Affair',
    subtitle: 'Where ancient olive groves witnessed a modern love story',
    couple: 'Anika & Rohan',
    location: 'Florence, Italy',
    venue: 'Villa La Vedetta',
    date: 'September 2024',
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80',
    introduction: 'Under the amber skies of Tuscany, Anika and Rohan exchanged vows in a ceremony that blended Indian tradition with Italian elegance. The villa\'s ancient stone walls echoed with laughter, and the olive groves stood as silent witnesses to a love story that had been unfolding across continents for seven years.',
    quote: 'They didn\'t just photograph our wedding — they captured the feeling of it. Every time I look at our images, I\'m transported back to that golden afternoon.',
    quoteAuthor: 'Anika',
    category: 'Destination Wedding',
    images: [
      { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80', alt: 'Bride in golden light', layout: 'full' },
      { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Ceremony under arches', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', alt: 'First dance', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80', alt: 'Garden reception', layout: 'full' },
      { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', alt: 'Ring details', layout: 'third' },
      { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80', alt: 'Candid laughter', layout: 'third' },
      { src: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80', alt: 'Sunset portrait', layout: 'third' },
    ],
  },
  {
    slug: 'mira-and-james',
    title: 'Golden Hour Romance',
    subtitle: 'A love letter written in light against the Aegean Sea',
    couple: 'Mira & James',
    location: 'Santorini, Greece',
    venue: 'Aenaon Villas',
    date: 'June 2024',
    coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80',
    introduction: 'Perched high above the caldera with the Aegean stretching endlessly below, Mira and James celebrated their love in a ceremony painted entirely in golden light. Every moment felt suspended in time — the gentle Mediterranean breeze, the warmth of the setting sun, and the quiet magic of two souls becoming one.',
    quote: 'What struck me most was their stillness. In the midst of all the chaos and joy, they moved like shadows — quiet, present, and impossibly perceptive.',
    quoteAuthor: 'Mira',
    category: 'Destination Wedding',
    images: [
      { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80', alt: 'Cliffside ceremony', layout: 'full' },
      { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Bridal portrait', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', alt: 'Reception setup', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80', alt: 'Golden hour embrace', layout: 'full' },
    ],
  },
  {
    slug: 'leila-and-arjun',
    title: 'Palace of Dreams',
    subtitle: 'Royal grandeur meets intimate emotion in the city of lakes',
    couple: 'Leila & Arjun',
    location: 'Udaipur, India',
    venue: 'Taj Lake Palace',
    date: 'December 2023',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80',
    introduction: 'Surrounded by the shimmering waters of Lake Pichola, Leila and Arjun\'s wedding was a celebration of heritage, art, and an extraordinary love. Three days of festivities unfolded across the palace — each moment more breathtaking than the last, from the intimate mehndi ceremony to the grand reception under a canopy of ten thousand marigolds.',
    quote: 'We wanted authenticity, and that\'s exactly what we received. No forced smiles, no awkward poses. Just us — raw, real, and radiant.',
    quoteAuthor: 'Leila',
    category: 'Wedding',
    images: [
      { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80', alt: 'Palace grounds', layout: 'full' },
      { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', alt: 'Mehendi ceremony', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', alt: 'Lake backdrop', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80', alt: 'Reception details', layout: 'third' },
      { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', alt: 'Jewelry closeup', layout: 'third' },
      { src: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80', alt: 'Couple silhouette', layout: 'third' },
      { src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80', alt: 'Grand finale', layout: 'full' },
    ],
  },
  {
    slug: 'sofia-and-karan',
    title: 'Parisian Reverie',
    subtitle: 'An engagement beneath the city of light',
    couple: 'Sofia & Karan',
    location: 'Paris, France',
    venue: 'Jardin du Luxembourg',
    date: 'April 2024',
    coverImage: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1920&q=80',
    introduction: 'On a quiet spring morning in Paris, before the crowds arrived and the city fully woke, Sofia and Karan walked through the Luxembourg Gardens as if the entire city had been arranged just for them. The light was soft and forgiving, the air carried the scent of cherry blossoms, and every frame became a love letter to the city and to each other.',
    quote: 'From the first call to the final gallery, everything felt curated and intentional. Working with them is less like hiring a photographer and more like collaborating with an artist.',
    quoteAuthor: 'Sofia',
    category: 'Engagement',
    images: [
      { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80', alt: 'Morning in Luxembourg', layout: 'full' },
      { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Portrait by fountain', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Bridge moment', layout: 'half' },
      { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80', alt: 'Golden light embrace', layout: 'full' },
    ],
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getRelatedStories(currentSlug: string, count = 2): Story[] {
  return stories.filter((s) => s.slug !== currentSlug).slice(0, count);
}

// Films data
export interface Film {
  id: string;
  title: string;
  couple: string;
  location: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
}

export const films: Film[] = [
  {
    id: 'film-1',
    title: 'A Tuscan Love Story',
    couple: 'Anika & Rohan',
    location: 'Florence, Italy',
    category: 'Wedding Films',
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '4:32',
  },
  {
    id: 'film-2',
    title: 'Santorini Sunset',
    couple: 'Mira & James',
    location: 'Santorini, Greece',
    category: 'Highlight Films',
    thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '3:18',
  },
  {
    id: 'film-3',
    title: 'Royal Celebrations',
    couple: 'Leila & Arjun',
    location: 'Udaipur, India',
    category: 'Wedding Films',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '5:45',
  },
  {
    id: 'film-4',
    title: 'Parisian Morning',
    couple: 'Sofia & Karan',
    location: 'Paris, France',
    category: 'Pre-Wedding Films',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '2:56',
  },
  {
    id: 'film-5',
    title: 'Aerial Perspectives',
    couple: 'Various',
    location: 'Worldwide',
    category: 'Drone Footage',
    thumbnail: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '6:12',
  },
  {
    id: 'film-6',
    title: 'Behind the Lens',
    couple: 'Studio',
    location: 'Mumbai, India',
    category: 'Behind the Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '3:40',
  },
];

// FAQ data
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 8-12 months in advance for weddings, especially during peak season (October to March). For destination weddings, we suggest reaching out even earlier — 12-18 months — to ensure availability and allow time for travel planning.',
  },
  {
    category: 'Booking',
    question: 'Do you travel for destination weddings?',
    answer: 'Absolutely. We have photographed weddings across 20+ countries, from Tuscany and Santorini to Bali and the Scottish Highlands. Travel costs are quoted separately based on the destination, and we handle all logistics so you can focus on your celebration.',
  },
  {
    category: 'Pricing',
    question: 'What are your packages and pricing?',
    answer: 'Our collections start at ₹3,50,000 for intimate weddings and range upward based on coverage days, team size, deliverables, and destination. We believe in transparent pricing — reach out through our booking page for a detailed proposal tailored to your event.',
  },
  {
    category: 'Pricing',
    question: 'Is there a deposit required?',
    answer: 'Yes, we require a 30% retainer fee to secure your date, with the balance due two weeks before the event. For destination weddings, we may request an additional travel advance.',
  },
  {
    category: 'Process',
    question: 'How many photos will we receive?',
    answer: 'For a full-day wedding, you can expect 400-800 carefully curated and hand-edited images. We believe in delivering a refined gallery rather than thousands of unedited shots — every image in your collection is one we\'re proud of.',
  },
  {
    category: 'Process',
    question: 'When will we receive our photos?',
    answer: 'Your curated online gallery is typically delivered within 6-8 weeks. A selection of 30-50 highlights is shared within 72 hours so you have something beautiful to share while we work on the full collection.',
  },
  {
    category: 'Process',
    question: 'Do you shoot video as well?',
    answer: 'Yes, we offer cinematic wedding films alongside photography. Our film team works seamlessly with our photographers to ensure nothing is missed. We offer highlight films (3-5 minutes), feature films (15-30 minutes), and documentary edits.',
  },
  {
    category: 'Albums',
    question: 'Do you offer printed albums?',
    answer: 'We offer handcrafted Italian leather albums, fine-art museum-quality prints, and luxury coffee-table books. Each album is designed by us, reviewed by you, and printed on archival-grade paper that will last generations.',
  },
  {
    category: 'Albums',
    question: 'Can we order prints?',
    answer: 'Absolutely. Your online gallery includes an integrated print shop where you and your family can order fine-art prints, canvases, and framed pieces directly — all color-managed and printed on museum-grade paper.',
  },
];

// Blog data
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
    title: 'The Art of Golden Hour',
    excerpt: 'Why the last hour of sunlight transforms ordinary moments into extraordinary memories.',
    date: 'January 15, 2025',
    category: 'Photography Tips',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    content: 'Golden hour — that fleeting window of warm, diffused light just before sunset — is a photographer\'s most treasured ally. Unlike the harsh overhead light of midday, golden hour wraps subjects in a soft, warm embrace that flatters skin tones, creates depth through long shadows, and paints the sky in gradients of amber and rose.\n\nFor wedding photography, timing the couple\'s portrait session during golden hour can elevate images from beautiful to breathtaking. We always work with our couples to build a timeline that protects this window — usually 45 minutes to an hour before sunset.\n\nThe key is preparation. Scout your location beforehand. Know where the light falls. Have your compositions planned so you can work quickly and keep the energy flowing. Golden hour waits for no one, and the most magical light often lasts only 15-20 minutes.',
  },
  {
    slug: 'choosing-destination-wedding-venue',
    title: 'Choosing Your Destination Wedding Venue',
    excerpt: 'A photographer\'s perspective on what makes a venue truly unforgettable.',
    date: 'December 20, 2024',
    category: 'Wedding Planning',
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80',
    content: 'After photographing over 500 weddings across 20 countries, we\'ve learned that the most photogenic venues share certain qualities that go beyond aesthetics.\n\nNatural light is paramount. Venues with large windows, open courtyards, or outdoor ceremony spaces allow us to work with the kind of soft, directional light that creates emotional, timeless images.\n\nArchitectural character matters. Whether it\'s the weathered stone of a Tuscan villa, the clean lines of a modernist gallery, or the ornate arches of a Rajasthani palace — texture and character in the backdrop add depth to every frame.\n\nPrivacy creates authenticity. Venues that offer secluded spaces for the couple allow for intimate, unguarded moments that produce the most powerful photographs.',
  },
  {
    slug: 'why-film-inspired-editing',
    title: 'Why We Edit with Film-Inspired Tones',
    excerpt: 'The philosophy behind our warm, timeless editing style and why it matters for your legacy.',
    date: 'November 8, 2024',
    category: 'Behind the Scenes',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    content: 'In an era of trendy presets and heavy filters, we\'ve made a deliberate choice: our editing style is rooted in the warmth and soul of analog film photography.\n\nWhy? Because trends fade, but the qualities that made film photography beautiful — its rich skin tones, its gentle grain, its warm shadows and creamy highlights — are timeless. A photograph edited in this style looks as beautiful today as it will in thirty years.\n\nEvery image we deliver is hand-edited. We never batch-apply presets. Each photograph is treated individually, with careful attention to color balance, exposure, and mood — ensuring the final gallery tells your story with consistency and emotional truth.',
  },
];
