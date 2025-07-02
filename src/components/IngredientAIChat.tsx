
import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface IngredientAIChatProps {
  ingredients: string[];
}

const IngredientAIChat: React.FC<IngredientAIChatProps> = ({ ingredients }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `안녕하세요! 인식된 원재료들에 대해 궁금한 점이 있으시면 언제든 물어보세요. 현재 ${ingredients.length}개의 원재료가 인식되었습니다.`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    '이 원재료들이 건강에 어떤 영향을 주나요?',
    '알레르기가 있는데 주의할 성분이 있나요?',
    '다이어트 중인데 섭취해도 될까요?',
    '아이가 먹어도 안전한가요?',
    '이 제품의 영양적 특징은 무엇인가요?'
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

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateIngredientResponse(text, ingredients),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateIngredientResponse = (question: string, ingredients: string[]): string => {
    const lowerQuestion = question.toLowerCase();
    const ingredientList = ingredients.join(', ');
    
    if (lowerQuestion.includes('건강') || lowerQuestion.includes('영향')) {
      return `인식된 원재료들(${ingredientList})을 분석해보겠습니다. 이 제품은 다양한 원재료가 포함되어 있어 영양적 균형을 확인하는 것이 중요합니다. 특히 인공감미료나 보존료가 포함되어 있다면 적정량 섭취를 권장합니다. 구체적인 건강 상태나 목적을 알려주시면 더 맞춤형 조언을 드릴 수 있어요.`;
    }
    
    if (lowerQuestion.includes('알레르기') || lowerQuestion.includes('주의')) {
      return `알레르기 관련하여 주의할 원재료들을 확인해보겠습니다. 현재 인식된 원재료 중 일반적인 알레르기 유발 성분(우유, 달걀, 견과류, 대두, 밀 등)이 포함되어 있는지 확인이 필요합니다. 특정 알레르기가 있으시다면 해당 성분명을 알려주시면 더 정확한 조언을 드릴 수 있습니다.`;
    }
    
    if (lowerQuestion.includes('다이어트') || lowerQuestion.includes('감량')) {
      return `다이어트 관점에서 분석해보겠습니다. 인식된 원재료들 중 칼로리가 높은 성분(설탕, 기름류 등)과 낮은 성분을 구분하여 섭취량을 조절하시는 것이 좋습니다. 인공감미료가 포함되어 있다면 칼로리 절약에 도움이 될 수 있어요. 일일 목표 칼로리와 함께 고려하여 섭취하시기 바랍니다.`;
    }
    
    if (lowerQuestion.includes('아이') || lowerQuestion.includes('어린이')) {
      return `어린이 섭취 관점에서 검토해보겠습니다. 인식된 원재료들 중 인공첨가물, 카페인, 과도한 당분이 포함되어 있는지 확인이 필요합니다. 자연 원료 위주의 성분이라면 비교적 안전하지만, 연령대에 따라 권장량이 다를 수 있어요. 아이의 나이를 알려주시면 더 구체적인 조언을 드릴 수 있습니다.`;
    }
    
    if (lowerQuestion.includes('영양') || lowerQuestion.includes('특징')) {
      return `이 제품의 영양적 특징을 분석해보겠습니다. 인식된 원재료들(${ingredientList})을 바탕으로 주요 영양소 구성을 예측할 수 있습니다. 탄수화물, 단백질, 지방의 비율과 함께 비타민, 미네랄 함량도 고려해야 합니다. 특정 영양소에 대한 궁금증이 있으시면 더 자세히 설명해드릴게요.`;
    }
    
    return `인식된 원재료들에 대해 궁금한 점을 더 구체적으로 알려주세요. 건강 상태, 섭취 목적, 특별한 주의사항 등을 함께 말씀해주시면 더 정확하고 개인화된 조언을 드릴 수 있습니다. 현재 ${ingredients.length}개의 원재료가 인식되었으니 이를 바탕으로 상세한 분석이 가능합니다.`;
  };

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <h4 className="font-bold text-gray-800 mb-4">🤖 AI 영양 상담</h4>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="h-48 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 ${message.isBot ? '' : 'justify-end'}`}>
              {message.isBot && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
              )}
              <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.isBot 
                  ? 'bg-white text-gray-900 border' 
                  : 'bg-green-500 text-white'
              }`}>
                <p>{message.text}</p>
              </div>
              {!message.isBot && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <div className="bg-white border px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2">자주 묻는 질문:</p>
          <div className="flex flex-wrap gap-1">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
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
            placeholder="원재료에 대해 궁금한 점을 물어보세요..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button 
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
            size="sm"
            className="bg-green-500 hover:bg-green-600"
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IngredientAIChat;
