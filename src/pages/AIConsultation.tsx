import React, { useState } from 'react';
import { Send, MessageCircle, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIConsultation = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '안녕하세요! 저는 FoodWise AI 상담사입니다. 식품 관련 궁금한 점이 있으시면 언제든 물어보세요.',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    '다이어트 중인데 이 음식 먹어도 될까요?',
    '당뇨가 있는데 섭취해도 안전한가요?',
    '임신 중인데 이 성분이 괜찮을까요?',
    '운동 전후에 먹기 좋은 음식 추천해주세요'
  ];

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    if (question.includes('다이어트')) {
      return '다이어트 중이시군요! 해당 식품의 칼로리와 영양 성분을 확인해보겠습니다. 일반적으로 저칼로리, 고단백 식품을 권장하며, 가공식품보다는 자연식품을 선택하시는 것이 좋습니다. 구체적인 제품명을 알려주시면 더 정확한 조언을 드릴 수 있어요.';
    } else if (question.includes('당뇨')) {
      return '당뇨 관리에 도움이 되는 정보를 제공해드리겠습니다. 혈당 지수가 낮은 식품을 선택하시고, 인공감미료가 포함된 제품의 경우 적정량을 지켜서 섭취하시기 바랍니다. 특히 당알콜류는 과다 섭취 시 소화불량을 일으킬 수 있으니 주의해주세요.';
    } else if (question.includes('임신')) {
      return '임신 중에는 특히 주의해야 할 성분들이 있습니다. 카페인, 알코올, 일부 인공첨가물은 제한하시는 것이 좋습니다. 구체적인 제품이나 성분을 알려주시면 임신 중 섭취 안전성에 대해 더 자세히 설명해드리겠습니다.';
    } else if (question.includes('운동')) {
      return '운동 전후 영양 섭취는 매우 중요합니다. 운동 전에는 탄수화물 중심의 가벼운 식사를, 운동 후에는 단백질과 탄수화물을 함께 섭취하시는 것이 좋습니다. 프로틴바나 바나나 같은 식품을 추천드립니다.';
    }
    return '궁금한 점에 대해 답변해드리겠습니다. 더 구체적인 정보를 알려주시면 더 정확한 조언을 드릴 수 있어요. 식품명, 건강 상태, 목적 등을 함께 말씀해주세요.';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 식품 상담</h1>
          <p className="text-gray-600">건강 상태와 목적에 맞는 맞춤형 식품 조언을 받아보세요</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isBot ? '' : 'justify-end'}`}>
                {message.isBot && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'bg-green-500 text-white'
                }`}>
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500' : 'text-green-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 p-4">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">자주 묻는 질문:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="궁금한 점을 입력하세요..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <Button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputText.trim()}
                className="bg-green-500 hover:bg-green-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultation;
