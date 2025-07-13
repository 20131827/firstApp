export const APP_NAME = 'EasyWedding';
export const APP_DESCRIPTION = 'Create beautiful digital wedding invitations for Southeast Asia';

export const THEMES = {
  simple: {
    name: 'Simple',
    description: 'Clean and minimal design',
    previewImage: '/themes/simple-preview.jpg',
  },
  traditional: {
    name: 'Traditional',
    description: 'Elegant and classic style',
    previewImage: '/themes/traditional-preview.jpg',
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary and trendy',
    previewImage: '/themes/modern-preview.jpg',
  },
} as const;

export const MESSAGE_TEMPLATES = [
  {
    id: 'template-1',
    name: 'Traditional Invitation',
    message: 'We are delighted to invite you to celebrate our wedding ceremony. Your presence would make our special day even more meaningful.',
  },
  {
    id: 'template-2',
    name: 'Modern Celebration',
    message: 'Join us for a celebration of love and commitment. We can\'t wait to share this beautiful moment with you.',
  },
  {
    id: 'template-3',
    name: 'Intimate Gathering',
    message: 'We would be honored by your presence at our intimate wedding celebration. Your love and support mean the world to us.',
  },
  {
    id: 'template-4',
    name: 'Joyful Union',
    message: 'Come celebrate the beginning of our forever. We\'re excited to share this joyous occasion with family and friends.',
  },
  {
    id: 'template-5',
    name: 'Simple Elegance',
    message: 'We invite you to witness and celebrate our wedding day. Your presence will add to the joy of our special moment.',
  },
];

export const PRICING = {
  BASIC: {
    name: 'Basic Package',
    price: 29.99,
    currency: 'USD',
    features: [
      'Beautiful digital invitation',
      '30 days validity',
      'Mobile-optimized design',
      'Photo upload (up to 5 photos)',
      'Custom message',
      'Email delivery',
    ],
  },
};

export const INVITATION_EXPIRY_DAYS = 30;

export const MAX_PHOTOS = 5;
export const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const SUPPORTED_LANGUAGES = {
  en: 'English',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
};

export const COUNTRIES = {
  VN: 'Vietnam',
  TH: 'Thailand',
  ID: 'Indonesia',
  SG: 'Singapore',
  MY: 'Malaysia',
  PH: 'Philippines',
};

export const CURRENCIES = {
  USD: '$',
  VND: '₫',
  THB: '฿',
  IDR: 'Rp',
  SGD: 'S$',
  MYR: 'RM',
  PHP: '₱',
}; 