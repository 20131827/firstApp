'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  HeartIcon, 
  PhotoIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { createInvitationSchema, type CreateInvitationFormData } from '@/utils/validation';
import { THEMES, MAX_PHOTOS } from '@/utils/constants';

const steps = [
  { id: 1, name: '기본 정보', description: '신랑/신부 정보 입력' },
  { id: 2, name: '결혼 정보', description: '날짜, 시간, 장소 입력' },
  { id: 3, name: '메시지', description: '초대 메시지 작성' },
  { id: 4, name: '사진 업로드', description: '사진 추가' },
  { id: 5, name: '미리보기', description: '최종 확인' },
];

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CreateInvitationFormData>({
    resolver: zodResolver(createInvitationSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  // URL 파라미터에서 템플릿 정보 가져오기
  useEffect(() => {
    const template = searchParams.get('template');
    const theme = searchParams.get('theme');
    const message = searchParams.get('message');

    if (template && theme) {
      setValue('theme', theme as 'simple' | 'traditional' | 'modern');
    }
    if (message) {
      setValue('message', message);
    }
  }, [searchParams, setValue]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (uploadedPhotos.length + files.length > MAX_PHOTOS) {
      alert(`최대 ${MAX_PHOTOS}장의 사진만 업로드 가능합니다.`);
      return;
    }

    const newPhotos = [...uploadedPhotos, ...files];
    setUploadedPhotos(newPhotos);

    // 미리보기 URL 생성
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = uploadedPhotos.filter((_, i) => i !== index);
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    
    setUploadedPhotos(newPhotos);
    setPreviewUrls(newPreviewUrls);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: CreateInvitationFormData) => {
    try {
      // FormData 생성
      const formData = new FormData();
      
      // 기본 데이터 추가
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'photos') {
          formData.append(key, value);
        }
      });

      // 사진 파일 추가
      uploadedPhotos.forEach((photo, index) => {
        formData.append(`photos`, photo);
      });

      // API 호출 (실제 구현시)
      console.log('Form data:', data);
      console.log('Photos:', uploadedPhotos);

      // 결제 페이지로 이동
      router.push('/payment');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="form-label">신랑 이름 *</label>
              <input
                type="text"
                {...register('groomName')}
                className="form-input"
                placeholder="신랑 이름을 입력하세요"
              />
              {errors.groomName && (
                <p className="form-error">{errors.groomName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">신부 이름 *</label>
              <input
                type="text"
                {...register('brideName')}
                className="form-input"
                placeholder="신부 이름을 입력하세요"
              />
              {errors.brideName && (
                <p className="form-error">{errors.brideName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">이메일 *</label>
              <input
                type="email"
                {...register('userEmail')}
                className="form-input"
                placeholder="your@email.com"
              />
              {errors.userEmail && (
                <p className="form-error">{errors.userEmail.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">이름 (선택사항)</label>
              <input
                type="text"
                {...register('userName')}
                className="form-input"
                placeholder="귀하의 이름"
              />
              {errors.userName && (
                <p className="form-error">{errors.userName.message}</p>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="form-label">결혼 날짜 *</label>
              <input
                type="date"
                {...register('weddingDate')}
                className="form-input"
              />
              {errors.weddingDate && (
                <p className="form-error">{errors.weddingDate.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">결혼 시간 *</label>
              <input
                type="time"
                {...register('weddingTime')}
                className="form-input"
              />
              {errors.weddingTime && (
                <p className="form-error">{errors.weddingTime.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">장소 이름 *</label>
              <input
                type="text"
                {...register('venueName')}
                className="form-input"
                placeholder="예: 그랜드 호텔"
              />
              {errors.venueName && (
                <p className="form-error">{errors.venueName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">장소 주소 *</label>
              <input
                type="text"
                {...register('venueAddress')}
                className="form-input"
                placeholder="예: 서울시 강남구 테헤란로 123"
              />
              {errors.venueAddress && (
                <p className="form-error">{errors.venueAddress.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">구글맵 링크 (선택사항)</label>
              <input
                type="url"
                {...register('venueMapLink')}
                className="form-input"
                placeholder="https://maps.google.com/..."
              />
              {errors.venueMapLink && (
                <p className="form-error">{errors.venueMapLink.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">연락처 (선택사항)</label>
              <input
                type="text"
                {...register('contactInfo')}
                className="form-input"
                placeholder="예: 010-1234-5678"
              />
              {errors.contactInfo && (
                <p className="form-error">{errors.contactInfo.message}</p>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="form-label">초대 메시지 *</label>
              <textarea
                {...register('message')}
                className="form-input min-h-[120px] resize-none"
                placeholder="초대 메시지를 입력하세요..."
              />
              {errors.message && (
                <p className="form-error">{errors.message.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {watchedValues.message?.length || 0}/500자
              </p>
            </div>

            <div>
              <label className="form-label">디자인 테마 *</label>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(THEMES).map(([key, theme]) => (
                  <div
                    key={key}
                    className={`card-hover cursor-pointer p-4 text-center ${
                      watchedValues.theme === key ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => setValue('theme', key as any)}
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <HeartIcon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h4 className="font-medium text-sm">{theme.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{theme.description}</p>
                  </div>
                ))}
              </div>
              {errors.theme && (
                <p className="form-error">{errors.theme.message}</p>
              )}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="form-label">사진 업로드</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  최대 {MAX_PHOTOS}장의 사진을 업로드할 수 있습니다
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  JPG, PNG, WebP 형식, 각 파일 최대 5MB
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="btn-primary cursor-pointer inline-flex items-center"
                >
                  <PhotoIcon className="h-5 w-5 mr-2" />
                  사진 선택
                </label>
              </div>
            </div>

            {previewUrls.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">업로드된 사진</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">청첩장 미리보기</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {watchedValues.groomName} & {watchedValues.brideName}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {watchedValues.weddingDate} {watchedValues.weddingTime}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {watchedValues.venueName}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {watchedValues.message}
                  </p>
                </div>
                
                {previewUrls.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">
                      업로드된 사진: {previewUrls.length}장
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {previewUrls.slice(0, 3).map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="mobile-container py-8 sm:tablet-container lg:desktop-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            청첩장 만들기
          </h1>
          <p className="text-lg text-gray-600">
            아름다운 디지털 청첩장을 만들어보세요
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-primary-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {steps[currentStep - 1].name}
            </h2>
            <p className="text-sm text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="card">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                이전
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary inline-flex items-center"
                >
                  다음
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center"
                >
                  청첩장 생성하기
                  <HeartIcon className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 