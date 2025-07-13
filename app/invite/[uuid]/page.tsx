'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  HeartIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  ShareIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { THEMES } from '@/utils/constants';

// 임시 데이터 (실제로는 API에서 가져옴)
const mockInvitation = {
  id: '1',
  uuid: 'sample-uuid',
  groomName: '김철수',
  brideName: '이영희',
  weddingDate: '2024-06-15',
  weddingTime: '14:00',
  venueName: '그랜드 호텔',
  venueAddress: '서울시 강남구 테헤란로 123',
  venueMapLink: 'https://maps.google.com/?q=서울시+강남구+테헤란로+123',
  contactInfo: '010-1234-5678',
  message: '저희 결혼식에 초대합니다. 여러분의 참석이 저희에게 큰 기쁨이 될 것입니다.',
  photos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
  ],
  theme: 'simple' as 'simple' | 'traditional' | 'modern',
  isActive: true,
  expiresAt: '2024-07-15',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

export default function InvitationPage() {
  const params = useParams();
  const [invitation, setInvitation] = useState(mockInvitation);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);

  useEffect(() => {
    // 실제로는 API에서 UUID로 청첩장 정보를 가져옴
    console.log('Loading invitation for UUID:', params.uuid);
    
    // 슬라이드쇼 자동 재생
    if (isPlaying && invitation.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => 
          prev === invitation.photos.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, invitation.photos.length, params.uuid]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${invitation.groomName} & ${invitation.brideName}의 결혼식`,
          text: invitation.message,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // 폴백: URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('청첩장 링크가 복사되었습니다!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const renderThemeStyles = () => {
    const theme = invitation.theme as 'simple' | 'traditional' | 'modern';
    
    switch (theme) {
      case 'traditional':
        return {
          background: 'bg-gradient-to-br from-amber-50 to-orange-100',
          textColor: 'text-amber-900',
          accentColor: 'text-amber-600',
          borderColor: 'border-amber-200',
        };
      case 'modern':
        return {
          background: 'bg-gradient-to-br from-purple-50 to-pink-100',
          textColor: 'text-purple-900',
          accentColor: 'text-purple-600',
          borderColor: 'border-purple-200',
        };
      default: // simple
        return {
          background: 'bg-gradient-to-br from-gray-50 to-white',
          textColor: 'text-gray-900',
          accentColor: 'text-primary-600',
          borderColor: 'border-gray-200',
        };
    }
  };

  const themeStyles = renderThemeStyles();

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">청첩장을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-700" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
        >
          <ShareIcon className="h-5 w-5 text-gray-700" />
        </button>

        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          {invitation.photos.length > 0 ? (
            <div className="relative h-full">
              <img
                src={invitation.photos[currentPhotoIndex]}
                alt="Wedding Photo"
                className="w-full h-full object-cover"
              />
              
              {/* Photo Navigation */}
              {invitation.photos.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {invitation.photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Play/Pause Button */}
              {invitation.photos.length > 1 && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <PlayIcon className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ) : (
            <div className="h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <HeartIcon className="h-24 w-24 text-primary-400" />
            </div>
          )}

          {/* Names Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold mb-2"
              >
                {invitation.groomName} & {invitation.brideName}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl opacity-90"
              >
                결혼식에 초대합니다
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mobile-container py-8 sm:tablet-container lg:desktop-container">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <CalendarIcon className="h-6 w-6 text-primary-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900">
                {formatDate(invitation.weddingDate)}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <ClockIcon className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-gray-700">
                {formatTime(invitation.weddingTime)}
              </span>
            </div>
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="card"
          >
            <div className="flex items-start mb-4">
              <MapPinIcon className="h-6 w-6 text-primary-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {invitation.venueName}
                </h3>
                <p className="text-gray-600 mb-3">
                  {invitation.venueAddress}
                </p>
                {invitation.venueMapLink && (
                  <a
                    href={invitation.venueMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    지도에서 보기 →
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="card text-center"
          >
            <HeartIcon className="h-8 w-8 text-primary-600 mx-auto mb-4" />
            <div className={`${showFullMessage ? '' : 'max-h-24 overflow-hidden'}`}>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {invitation.message}
              </p>
            </div>
            {invitation.message.length > 100 && (
              <button
                onClick={() => setShowFullMessage(!showFullMessage)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
              >
                {showFullMessage ? '접기' : '더 보기'}
              </button>
            )}
          </motion.div>

          {/* Contact Info */}
          {invitation.contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="card"
            >
              <div className="flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-gray-700">
                  {invitation.contactInfo}
                </span>
              </div>
            </motion.div>
          )}

          {/* Photo Gallery */}
          {invitation.photos.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                사진 갤러리
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {invitation.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <img
                      src={photo}
                      alt={`Wedding photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-center py-8"
          >
            <p className="text-gray-500 text-sm">
              여러분의 참석이 저희에게 큰 기쁨이 될 것입니다
            </p>
            <div className="flex items-center justify-center mt-4">
              <HeartIcon className="h-6 w-6 text-primary-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 