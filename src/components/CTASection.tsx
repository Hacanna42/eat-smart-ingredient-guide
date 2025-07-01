
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          건강한 식품 선택, 지금 시작하세요
        </h2>
        <p className="text-xl text-white opacity-90 mb-8">
          AI와 함께하는 스마트한 식품 정보 큐레이션 서비스
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <span>무료로 시작하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
            더 알아보기
          </button>
        </div>
        
        <div className="mt-8 flex items-center justify-center space-x-8 text-white opacity-75">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>무료 서비스</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>AI 상담 무제한</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>실시간 정보 업데이트</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
