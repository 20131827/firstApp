'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CreditCardIcon,
  LockClosedIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { PRICING } from '@/utils/constants';

export default function PaymentPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // 실제 결제 처리 로직 (Stripe 연동)
    try {
      // 여기에 Stripe 결제 로직 구현
      console.log('Processing payment...', formData);
      
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 결제 성공 후 청첩장 URL 생성 페이지로 이동
      router.push('/success');
    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
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
            결제하기
          </h1>
          <p className="text-lg text-gray-600">
            안전하고 빠른 결제로 청첩장을 완성하세요
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="card">
                <div className="flex items-center mb-6">
                  <CreditCardIcon className="h-6 w-6 text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    결제 정보
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <label className="form-label">결제 방법</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                          paymentMethod === 'card'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CreditCardIcon className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                        <span className="text-sm font-medium">신용카드</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                          paymentMethod === 'bank'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <ShieldCheckIcon className="h-6 w-6 mx-auto mb-2 text-primary-600" />
                        <span className="text-sm font-medium">계좌이체</span>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <label className="form-label">카드 번호</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            cardNumber: formatCardNumber(e.target.value)
                          }))}
                          className="form-input"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">만료일</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              expiryDate: formatExpiryDate(e.target.value)
                            }))}
                            className="form-input"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="form-label">CVC</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label">카드 소유자명</label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="카드에 표시된 이름"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="form-label">이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="receipt@email.com"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      청첩장 URL이 이 이메일로 전송됩니다
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                      isProcessing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-500 hover:bg-primary-600 text-white'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        결제 처리 중...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <LockClosedIcon className="h-5 w-5 mr-2" />
                        ${PRICING.BASIC.price} 결제하기
                      </div>
                    )}
                  </button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">안전한 결제</p>
                      <p className="text-sm text-gray-600">
                        모든 결제 정보는 SSL 암호화로 보호되며, 안전하게 처리됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card">
                <div className="flex items-center mb-6">
                  <HeartIcon className="h-6 w-6 text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    주문 요약
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-600">패키지</span>
                    <span className="font-medium">{PRICING.BASIC.name}</span>
                  </div>

                  <div className="space-y-3">
                    {PRICING.BASIC.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>총 금액</span>
                      <span className="text-primary-600">${PRICING.BASIC.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      부가세 포함, 일회성 결제
                    </p>
                  </div>
                </div>

                {/* Test Card Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">테스트 카드 정보</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>카드 번호: 4242 4242 4242 4242</p>
                    <p>만료일: 미래 날짜</p>
                    <p>CVC: 임의의 3자리 숫자</p>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-6">
                <button
                  onClick={() => router.back()}
                  className="w-full btn-secondary inline-flex items-center justify-center"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  뒤로 가기
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 