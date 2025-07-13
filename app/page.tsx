'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HeartIcon, 
  DevicePhoneMobileIcon, 
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { THEMES, MESSAGE_TEMPLATES, PRICING } from '@/utils/constants';

export default function HomePage() {
  const [activeTheme, setActiveTheme] = useState<'simple' | 'traditional' | 'modern'>('simple');

  const features = [
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile-First Design',
      description: 'Optimized for mobile devices with beautiful, responsive layouts',
    },
    {
      icon: SparklesIcon,
      title: 'Beautiful Templates',
      description: 'Choose from elegant, traditional, and modern design themes',
    },
    {
      icon: HeartIcon,
      title: 'Easy Sharing',
      description: 'Share your invitation instantly via link, social media, or QR code',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative mobile-container py-20 sm:tablet-container lg:desktop-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Beautiful Digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                Wedding Invitations
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create stunning digital wedding invitations for Southeast Asia. 
              Mobile-optimized, customizable, and easy to share with your loved ones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/create"
                className="btn-primary inline-flex items-center justify-center"
              >
                Create Your Invitation
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              
              <Link 
                href="/templates"
                className="btn-outline inline-flex items-center justify-center"
              >
                View Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mobile-container sm:tablet-container lg:desktop-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EasyWedding?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create and share beautiful wedding invitations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-hover text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 bg-gray-50">
        <div className="mobile-container sm:tablet-container lg:desktop-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Style
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three beautiful themes to match your wedding style
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(THEMES).map(([key, theme]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`card-hover cursor-pointer transition-all duration-300 ${
                  activeTheme === key ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setActiveTheme(key as any)}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HeartIcon className="h-8 w-8 text-primary-600" />
                    </div>
                    <p className="text-sm text-gray-500">Preview</p>
                  </div>
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
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="mobile-container sm:tablet-container lg:desktop-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create beautiful wedding invitations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="card-hover relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {PRICING.BASIC.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${PRICING.BASIC.price}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              <ul className="space-y-4 mb-8">
                {PRICING.BASIC.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/create"
                className="btn-primary w-full text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="mobile-container sm:tablet-container lg:desktop-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Create Your Wedding Invitation?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of couples who have created beautiful digital invitations with EasyWedding
            </p>
            <Link 
              href="/create"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              Start Creating Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 