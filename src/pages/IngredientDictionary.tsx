
import React, { useState } from 'react';
import { Search, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';

const IngredientDictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const ingredients = [
    {
      name: '아스파탄',
      category: '인공감미료',
      description: '설탕보다 200배 단맛이 나는 인공감미료로, 칼로리가 거의 없어 다이어트 식품에 널리 사용됩니다.',
      benefits: ['칼로리 제로', '혈당에 영향 없음', '충치 예방'],
      risks: ['페닐케톤뇨증 환자 금지', '과다 섭취 시 두통 가능', '일부 알레르기 반응'],
      safeAmount: '일일 체중 1kg당 40mg',
      commonProducts: ['제로콜라', '다이어트 음료', '무설탕 껌']
    },
    {
      name: '말티톨',
      category: '당알콜',
      description: '설탕의 90% 단맛을 내는 당알콜로, 칼로리가 낮고 혈당 상승을 억제합니다.',
      benefits: ['혈당 지수 낮음', '충치 예방', '칼로리 절약'],
      risks: ['과다 섭취 시 설사', '복통 유발 가능', '가스 생성'],
      safeAmount: '일일 20-30g',
      commonProducts: ['무설탕 초콜릿', '다이어트 사탕', '프로틴바']
    },
    {
      name: '스테비아',
      category: '천연감미료',
      description: '스테비아 잎에서 추출한 천연 감미료로, 설탕보다 300배 단맛이 납니다.',
      benefits: ['천연 원료', '칼로리 제로', '혈당에 영향 없음'],
      risks: ['쓴맛 후미', '일부 알레르기 반응'],
      safeAmount: '일일 체중 1kg당 4mg',
      commonProducts: ['천연 감미료', '건강 음료', '저칼로리 식품']
    }
  ];

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">원재료 사전</h1>
          <p className="text-gray-600">식품에 들어가는 다양한 원재료와 성분에 대해 알아보세요</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="원재료명이나 카테고리를 검색하세요"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredIngredients.map((ingredient, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{ingredient.name}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mt-2">
                      {ingredient.category}
                    </span>
                  </div>
                  <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                
                <p className="text-gray-600 mb-6">{ingredient.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
                      <CheckCircle className="w-5 h-5" />
                      장점
                    </h4>
                    <ul className="space-y-2">
                      {ingredient.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-green-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-red-800 mb-3">
                      <AlertTriangle className="w-5 h-5" />
                      주의사항
                    </h4>
                    <ul className="space-y-2">
                      {ingredient.risks.map((risk, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-red-700">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">권장 섭취량</h5>
                      <p className="text-gray-700">{ingredient.safeAmount}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">주요 함유 제품</h5>
                      <div className="flex flex-wrap gap-2">
                        {ingredient.commonProducts.map((product, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientDictionary;
