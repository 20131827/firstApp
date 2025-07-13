'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  HeartIcon,
  ShareIcon,
  DocumentDuplicateIcon,
  ArrowRightIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

export default function SuccessPage() {
  const router = useRouter();
  const [invitationUrl, setInvitationUrl] = useState('https://easywedding.com/invite/sample-uuid');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 실제로는 결제 완료 후 생성된 청첩장 URL을 가져옴
    // setInvitationUrl(`https://easywedding.com/invite/${generatedUuid}`);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '우리 결혼식에 초대합니다',
          text: '아름다운 디지털 청첩장을 확인해보세요!',
          url: invitationUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="mobile-container py-8 sm:tablet-container lg:desktop-container">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              청첩장이 완성되었습니다! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              아름다운 디지털 청첩장이 성공적으로 생성되었습니다.
            </p>
          </motion.div>

          {/* Invitation URL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card mb-8"
          >
            <div className="text-center mb-6">
              <HeartIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                청첩장 링크
              </h2>
              <p className="text-gray-600">
                아래 링크를 복사하여 가족과 친구들에게 공유하세요
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={invitationUrl}
                  readOnly
                  className="flex-1 bg-transparent text-gray-700 text-sm mr-2"
                />
                <button
                  onClick={handleCopyLink}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    copied
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                  }`}
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-green-600 text-sm font-medium">
                  링크가 복사되었습니다!
                </p>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleShare}
                className="btn-primary flex-1 inline-flex items-center justify-center"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                공유하기
              </button>
              
              <a
                href={invitationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 inline-flex items-center justify-center"
              >
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                청첩장 보기
              </a>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              청첩장 특징
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">모바일 최적화</h4>
                  <p className="text-sm text-gray-600">모든 기기에서 완벽하게 표시</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">쉬운 공유</h4>
                  <p className="text-sm text-gray-600">링크 하나로 모든 사람과 공유</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">30일 유효</h4>
                  <p className="text-sm text-gray-600">30일간 접근 가능</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">아름다운 디자인</h4>
                  <p className="text-sm text-gray-600">세련되고 우아한 청첩장</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              다음 단계
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  1
                </div>
                <span className="text-gray-700">청첩장 링크를 복사하세요</span>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  2
                </div>
                <span className="text-gray-700">가족과 친구들에게 공유하세요</span>
              </div>
              
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  3
                </div>
                <span className="text-gray-700">결혼식 날짜를 기다리세요</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button
              onClick={() => router.push('/')}
              className="btn-secondary inline-flex items-center justify-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              홈으로 가기
            </button>
            
            <button
              onClick={() => router.push('/create')}
              className="btn-primary inline-flex items-center justify-center"
            >
              <HeartIcon className="h-5 w-5 mr-2" />
              또 다른 청첩장 만들기
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 