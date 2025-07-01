
import React from 'react';
import { Search, BookOpen, MessageCircle, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: '식품 검색',
      description: '제품명만 입력하면 영양성분, 원재료, 섭취 주의사항을 한번에 확인할 수 있습니다.',
      color: 'bg-green-500'
    },
    {
      icon: BookOpen,
      title: '원재료 사전',
      description: '생소한 성분들의 역할과 부작용을 쉽게 이해할 수 있도록 설명해드립니다.',
      color: 'bg-blue-500'
    },
    {
      icon: MessageCircle,
      title: 'AI 식품 상담',
      description: '개인의 건강 상태와 목적에 맞는 맞춤형 섭취 조언을 AI가 제공합니다.',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: '정보 공유',
      description: '등록되지 않은 제품 정보를 직접 추가하여 모두와 정보를 공유할 수 있습니다.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            건강한 식품 선택을 위한 모든 기능
          </h2>
          <p className="text-lg text-gray-600">
            AI 기술과 사용자 참여로 만드는 신뢰할 수 있는 식품 정보 플랫폼
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
