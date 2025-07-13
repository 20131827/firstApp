import { z } from 'zod';
import { MAX_PHOTOS, MAX_PHOTO_SIZE, ALLOWED_PHOTO_TYPES, ThemeKey } from './constants';

export const createInvitationSchema = z.object({
  groomName: z.string().min(1, '신랑 이름을 입력해주세요').max(50, '이름은 50자 이하여야 합니다'),
  brideName: z.string().min(1, '신부 이름을 입력해주세요').max(50, '이름은 50자 이하여야 합니다'),
  weddingDate: z.string().min(1, '결혼 날짜를 선택해주세요'),
  weddingTime: z.string().min(1, '결혼 시간을 입력해주세요'),
  venueName: z.string().min(1, '장소 이름을 입력해주세요').max(100, '장소 이름은 100자 이하여야 합니다'),
  venueAddress: z.string().min(1, '장소 주소를 입력해주세요').max(200, '주소는 200자 이하여야 합니다'),
  venueMapLink: z.string().url('올바른 URL을 입력해주세요').optional().or(z.literal('')),
  contactInfo: z.string().max(100, '연락처는 100자 이하여야 합니다').optional().or(z.literal('')),
  message: z.string().min(10, '메시지는 최소 10자 이상이어야 합니다').max(500, '메시지는 500자 이하여야 합니다'),
  theme: z.enum(['simple', 'traditional', 'modern'] as const, {
    required_error: '테마를 선택해주세요',
  }),
  userEmail: z.string().email('올바른 이메일 주소를 입력해주세요'),
  userName: z.string().max(50, '이름은 50자 이하여야 합니다').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

export const registerSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  name: z.string().min(1, '이름을 입력해주세요').max(50, '이름은 50자 이하여야 합니다'),
});

export const guestInvitationSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요').max(50, '이름은 50자 이하여야 합니다'),
  invitationData: createInvitationSchema.omit({ userEmail: true, userName: true }),
});

export const photoValidationSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .max(MAX_PHOTOS, `최대 ${MAX_PHOTOS}장의 사진만 업로드 가능합니다`)
    .refine(
      (files) => files.every((file) => file.size <= MAX_PHOTO_SIZE),
      `각 사진은 ${MAX_PHOTO_SIZE / (1024 * 1024)}MB 이하여야 합니다`
    )
    .refine(
      (files) => files.every((file) => ALLOWED_PHOTO_TYPES.includes(file.type)),
      'JPG, PNG, WebP 형식의 파일만 업로드 가능합니다'
    ),
});

export const updateInvitationSchema = createInvitationSchema.partial();

export type CreateInvitationFormData = z.infer<typeof createInvitationSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type GuestInvitationFormData = z.infer<typeof guestInvitationSchema>;
export type UpdateInvitationFormData = z.infer<typeof updateInvitationSchema>; 