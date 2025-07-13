'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  CheckIcon,
  ArrowRightIcon,
  EyeIcon 
} from '@heroicons/react/24/outline';
import { THEMES, MESSAGE_TEMPLATES } from '@/utils/constants';

export default function TemplatesPage() {
  const [selectedTheme, setSelectedTheme] = useState<'simple' | 'traditional' | 'modern'>('simple');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      // 선택된 템플릿 정보를 URL 파라미터로 전달
      const template = MESSAGE_TEMPLATES.find(t => t.id === selectedTemplate);
      const theme = THEMES[selectedTheme];
      
      const params = new URLSearchParams({
        template: selectedTemplate,
        theme: selectedTheme,
        message: template?.message || '',
        themeName: theme.name
      });
      
      window.location.href = `/create?${params.toString()}`;
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
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            템플릿 선택
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            원하는 스타일의 청첩장 템플릿을 선택하고 메시지를 골라보세요
          </p>
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            디자인 테마 선택
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(THEMES).map(([key, theme]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`card-hover cursor-pointer transition-all duration-300 ${
                  selectedTheme === key ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedTheme(key as any)}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <p className="text-sm text-gray-500">미리보기</p>
                  </div>
                  {selectedTheme === key && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {theme.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {theme.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Message Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            메시지 템플릿 선택
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MESSAGE_TEMPLATES.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`card-hover cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  {selectedTemplate === template.id && (
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {template.message}
                </p>
                <div className="flex items-center text-primary-600 text-sm font-medium">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  미리보기
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link 
            href="/"
            className="btn-secondary inline-flex items-center"
          >
            뒤로 가기
          </Link>
          
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`inline-flex items-center px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${
              selectedTemplate
                ? 'bg-primary-500 hover:bg-primary-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            계속하기
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </button>
        </motion.div>

        {/* Preview Section */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              선택된 템플릿 미리보기
            </h3>
            <div className="max-w-md mx-auto">
              <div className="card bg-white">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {THEMES[selectedTheme].name} 테마
                  </h4>
                  <p className="text-sm text-gray-600">
                    {THEMES[selectedTheme].description}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h5 className="font-medium text-gray-900 mb-3">
                    {MESSAGE_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {MESSAGE_TEMPLATES.find(t => t.id === selectedTemplate)?.message}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 