
import React from 'react';
import { Heart, Dumbbell, Activity } from 'lucide-react';

const UseCaseSection = () => {
  const useCases = [
    {
      icon: Heart,
      title: '건강 관심족',
      scenario: '"말티톨이 들어있는데 안전한가요?"',
      solution: '성분별 부작용과 안전 섭취량을 명확히 안내받아 안심하고 섭취할 수 있습니다.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Dumbbell,
      title: '다이어터',
      scenario: '"이 간식 먹어도 살 안 찔까요?"',
      solution: 'AI가 칼로리, 당분, 지방 함량을 분석하여 다이어트 목표에 맞는 조언을 제공합니다.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Activity,
      title: '당뇨 환자',
      scenario: '"제로 음료, 혈당에 영향 없나요?"',
      solution: '당알콜 성분과 GI 지수 정보를 통해 혈당 관리에 도움이 되는 정보를 제공합니다.',
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            이런 분들에게 도움이 됩니다
          </h2>
          <p className="text-lg text-gray-600">
            개인의 건강 상태와 목적에 맞는 맞춤형 식품 정보 제공
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className={`w-12 h-12 ${useCase.color} rounded-lg flex items-center justify-center mb-4`}>
                <useCase.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 italic">"{useCase.scenario}"</p>
              </div>
              <p className="text-gray-600">{useCase.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
