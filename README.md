# EasyWedding - Digital Wedding Invitations

Beautiful digital wedding invitation service for Southeast Asia. Create mobile-optimized, customizable wedding invitations that are easy to share with your loved ones.

## 🎯 Features

- **Mobile-First Design**: Optimized for mobile devices with beautiful, responsive layouts
- **Beautiful Templates**: Choose from elegant, traditional, and modern design themes
- **Easy Sharing**: Share your invitation instantly via link, social media, or QR code
- **Customizable**: Add your photos, customize messages, and choose your preferred theme
- **Payment Integration**: Secure payment processing with Stripe
- **Multi-language Support**: Ready for Southeast Asian languages (Vietnamese, Thai, Indonesian)
- **Guest & Member Access**: Both registered users and guests can create invitations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation
- **Heroicons**: Beautiful SVG icons

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Stripe**: Payment processing
- **AWS S3**: File storage for images

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Stripe account
- AWS S3 bucket (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mblileWedding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mblileWedding/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                   # Utility libraries
│   └── db.ts             # Database connection
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Utility functions
│   ├── constants.ts
│   ├── validation.ts
│   └── helpers.ts
├── public/                # Static assets
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#f1943d → #ed7516)
- **Secondary**: Purple gradient (#e879f9 → #d946ef)
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Sans**: Inter (UI elements)
- **Serif**: Playfair Display (headings and elegant text)

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Cards**: Hover effects and shadows
- **Forms**: Consistent styling with validation states
- **Navigation**: Responsive header with mobile menu

## 📱 Mobile-First Approach

The application is designed with mobile users in mind:

- **Responsive Design**: All components adapt to different screen sizes
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Fast Loading**: Optimized images and minimal bundle size
- **Offline Ready**: Progressive Web App features

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Zod schemas for all user inputs
- **CORS Protection**: Configured for production security
- **Rate Limiting**: API rate limiting (to be implemented)

## 💳 Payment Integration

### Stripe Setup
1. Create a Stripe account
2. Get your API keys from the dashboard
3. Add keys to environment variables
4. Test with Stripe's test cards

### Supported Payment Methods
- Credit/Debit Cards
- Digital Wallets (future)
- Local payment methods (future expansion)

## 🌏 Internationalization

The application is prepared for multi-language support:

- **Supported Languages**: English, Vietnamese, Thai, Indonesian
- **Currency Support**: USD, VND, THB, IDR, SGD, MYR, PHP
- **Date Formatting**: Locale-aware date displays
- **RTL Support**: Ready for right-to-left languages

## 📊 Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  name: string,
  isGuest: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Wedding Invitations Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  uuid: string,
  groomName: string,
  brideName: string,
  weddingDate: Date,
  weddingTime: string,
  venueName: string,
  venueAddress: string,
  venueMapLink?: string,
  contactInfo?: string,
  message: string,
  photos: string[],
  theme: 'simple' | 'traditional' | 'modern',
  isActive: boolean,
  expiresAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Similar to Vercel setup
- **Railway**: Good for full-stack deployment
- **AWS**: EC2 or ECS for more control

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful commit messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the docs folder
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Email**: support@easywedding.com

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Basic invitation creation
- [x] Payment integration
- [x] Mobile-responsive design
- [x] User authentication

### Phase 2 (Next)
- [ ] Multi-language support
- [ ] QR code generation
- [ ] RSVP functionality
- [ ] Guest book feature

### Phase 3 (Future)
- [ ] Wedding vendor marketplace
- [ ] Advanced analytics
- [ ] Wedding planning tools
- [ ] Social media integration

---

Made with ❤️ for Southeast Asian couples #   f i r s t A p p  
 #   f i r s t A p p  
 