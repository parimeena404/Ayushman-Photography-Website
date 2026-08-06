<div align="center">

# 💎 Ayushman Cards n Graphics

### *Luxury Event Photography, Invitation Design & Fine Art Studio Platform*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment_Gateway-02042B?style=for-the-badge&logo=razorpay)](https://razorpay.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

**Ayushman Cards n Graphics** is a web platform built for a premier printing and fine art photography studio in Ujjain, Madhya Pradesh (*Since 2001*). 

Designed with an editorial aesthetic, fluid micro-animations, dynamic theme switching, 4K media showcases, and integrated Razorpay payment verification.

[Live Demo](https://photography-website-gold.vercel.app/) · [Contact Studio](tel:+919479784979) · [Report Bug](https://github.com/parimeena404/Photography-Website/issues)

</div>

---

## 🌟 Key Highlights & Features

- **🎨 Dual Luxury Design System**:
  - **Light Theme**: Dusty Vintage Rose (`#A06A73`, `#FCF7F6`) inspired by royal Indian bridal couture.
  - **Dark Theme**: Midnight Blue (`#0E1624`, `#6E8FB8`) inspired by moonlit palace courtyards.
- **🖼️ High-Definition Photography Showcase**:
  - Automatic Ken Burns slideshow & ambient video background in Hero section.
  - Curated 4K retina photography covering Royal Indian Weddings, Sangeet/Haldi, Ghats, and Performing Arts.
- **💳 Razorpay Payment & Reservation Engine**:
  - Built-in multi-step booking wizard with package selection and token reservation deposit payment (₹1,000 – ₹5,000).
  - Encrypted HMAC-SHA256 signature verification via Next.js backend API routes.
- **🗄️ SQLite Database & Prisma ORM**:
  - Structured data models for `Booking`, `Inquiry`, and `ServicePackage`.
  - Atomically tracks payment status (`PENDING` / `PAID` / `FAILED`) and syncs Razorpay Payment IDs.
- **📱 Responsive & Interactive**:
  - One-click Floating WhatsApp integration (`+91 94797 84979`).
  - Route-aware floating Navbar with adaptive transparency and blur backdrop.
  - Smooth Framer Motion transitions & GSAP animation sequences.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server-Side Rendering, Static Generation & API Routes |
| **Language** | TypeScript 5 | End-to-end type safety |
| **Styling** | Vanilla CSS + Tailwind CSS v4 | CSS Variables, Typography & Design Tokens |
| **Animations** | Framer Motion & GSAP | Micro-interactions, transitions & scroll triggers |
| **Database** | SQLite + Prisma ORM (v7.9) | Data persistence for bookings, inquiries & packages |
| **Payments** | Razorpay SDK & Node API | Payment order generation & HMAC SHA256 verification |
| **Deployment** | Vercel Platform | Continuous Integration & Global CDN Deployment |

---

## 📁 Project Architecture

```text
photography-website/
├── prisma/
│   ├── dev.db                 # SQLite local database instance
│   └── schema.prisma          # Prisma models (Booking, Inquiry, ServicePackage)
├── prisma.config.ts           # Prisma 7 configuration file
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bookings/      # GET bookings API route
│   │   │   ├── inquiries/     # POST contact inquiries API route
│   │   │   └── razorpay/
│   │   │       ├── create-order/   # Razorpay Order creation API
│   │   │       └── verify-payment/ # Razorpay HMAC signature verification
│   │   ├── about/             # Heritage & Studio About Page
│   │   ├── blog/              # Editorial Photography Blog & Articles
│   │   ├── booking/           # Multi-step Booking & Razorpay Payment Page
│   │   ├── faq/               # Frequently Asked Questions
│   │   ├── films/             # Cinema & Video Highlights Gallery
│   │   ├── reviews/           # Client Testimonials & Submissions
│   │   ├── stories/           # Feature Photo Stories & Galleries
│   │   ├── globals.css        # Core Design Tokens & Theme Variables
│   │   ├── layout.tsx         # Root Layout with Font & Metadata Configuration
│   │   └── page.tsx           # Home Page Assembly
│   ├── components/            # UI Components (Hero, Navbar, Footer, BookingWizard, etc.)
│   ├── context/               # Theme Context (Light/Dark mode)
│   ├── hooks/                 # Custom React Hooks (Scroll Direction, InView)
│   └── lib/                   # Database Client, Razorpay Helper & Animation Utilities
├── public/                    # Static Media Assets & Graphics
├── .env.local                 # Local Environment Variables
├── LICENSE                    # MIT License
├── next.config.ts             # Next.js Build Configuration
├── package.json               # Dependencies & NPM Scripts
└── README.md                  # Project Documentation
```

---

## 🚀 Local Setup & Installation

Follow these steps to run the application on your local environment:

### 1. Clone the Repository
```bash
git clone https://github.com/parimeena404/Photography-Website.git
cd Photography-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
DATABASE_URL="file:./dev.db"

# Razorpay Test Credentials (Replace with Live credentials for production)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_AyushmanCards2025"
RAZORPAY_KEY_SECRET="Secret_AyushmanCards2025"
```

### 4. Initialize Database
Push the Prisma schema to generate the local SQLite database (`dev.db`):
```bash
npx prisma db push
npx prisma generate
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🧪 Production Build & Type Checking

To verify production compilation and TypeScript type checking:
```bash
npm run build
npm run start
```

---

## 🏢 Studio Information

**Ayushman Cards n Graphics**  
*Complete Printing Solutions & Fine Art Photography — Since 2001*  
📍 **Address**: 63, Varruchi Marg, Freeganj, Madhav Nagar, Ujjain, Madhya Pradesh  
📞 **Direct Contacts**: `+91 94797 84979` | `+91 98930 22451`  
💬 **WhatsApp**: [Chat on WhatsApp](https://wa.me/919479784979)  

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

<div align="center">
Crafted with ❤️ for <b>Ayushman Cards n Graphics</b>
</div>
