export interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeddingInvitation {
  id: string;
  userId: string;
  uuid: string;
  groomName: string;
  brideName: string;
  weddingDate: Date;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  venueMapLink?: string;
  contactInfo?: string;
  message: string;
  photos: string[];
  theme: 'simple' | 'traditional' | 'modern';
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type ThemeType = 'simple' | 'traditional' | 'modern';

export interface Template {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  theme: 'simple' | 'traditional' | 'modern';
  message: string;
}

export interface Payment {
  id: string;
  invitationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  stripePaymentIntentId?: string;
  createdAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateInvitationRequest {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  venueMapLink?: string;
  contactInfo?: string;
  message: string;
  photos: File[];
  theme: 'simple' | 'traditional' | 'modern';
  userEmail: string;
  userName?: string;
}

export interface UpdateInvitationRequest {
  groomName?: string;
  brideName?: string;
  weddingDate?: string;
  weddingTime?: string;
  venueName?: string;
  venueAddress?: string;
  venueMapLink?: string;
  contactInfo?: string;
  message?: string;
  photos?: File[];
  theme?: 'simple' | 'traditional' | 'modern';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface GuestInvitationRequest {
  email: string;
  name: string;
  invitationData: Omit<CreateInvitationRequest, 'userEmail' | 'userName'>;
} 