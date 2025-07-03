import React, { useState } from "react";
import { Send, MessageCircle, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIConsultation = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 저는 FoodWise AI 상담사입니다. 식품 관련 궁금한 점이 있으시면 언제든 물어보세요.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    "다이어트 중인데 이 음식 먹어도 될까요?",
    "당뇨가 있는데 섭취해도 안전한가요?",
    "임신 중인데 이 성분이 괜찮을까요?",
    "운동 전후에 먹기 좋은 음식 추천해주세요",
    "고혈압 환자가 피해야 할 음식은?",
    "아이가 먹어도 안전한 식품인가요?",
    "알레르기가 있는데 주의할 성분은?",
    "감량 중 간식으로 좋은 것은?",
    "근육 증량에 도움되는 식품은?",
    "소화가 잘 안되는데 추천 음식은?",
    "혈당 관리에 좋은 식품은?",
    "콜레스테롤 낮추는 음식 추천해주세요",
  ];

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // 다이어트 관련
    if (lowerQuestion.includes("다이어트") || lowerQuestion.includes("감량")) {
      return "다이어트 중이시군요! 해당 식품의 칼로리와 영양 성분을 확인해보겠습니다. 일반적으로 저칼로리, 고단백 식품을 권장하며, 가공식품보다는 자연식품을 선택하시는 것이 좋습니다. 구체적인 제품명을 알려주시면 더 정확한 조언을 드릴 수 있어요. 또한 하루 권장 칼로리 내에서 균형 잡힌 식단을 유지하는 것이 중요합니다.";
    }

    // 당뇨 관련
    else if (lowerQuestion.includes("당뇨") || lowerQuestion.includes("혈당")) {
      return "당뇨 관리에 도움이 되는 정보를 제공해드리겠습니다. 혈당 지수가 낮은 식품을 선택하시고, 인공감미료가 포함된 제품의 경우 적정량을 지켜서 섭취하시기 바랍니다. 특히 당알콜류는 과다 섭취 시 소화불량을 일으킬 수 있으니 주의해주세요. 식이섬유가 풍부한 식품과 단백질 위주의 식단이 혈당 관리에 도움됩니다.";
    }

    // 임신 관련
    else if (lowerQuestion.includes("임신") || lowerQuestion.includes("임산부")) {
      return "임신 중에는 특히 주의해야 할 성분들이 있습니다. 카페인, 알코올, 일부 인공첨가물은 제한하시는 것이 좋습니다. 구체적인 제품이나 성분을 알려주시면 임신 중 섭취 안전성에 대해 더 자세히 설명해드리겠습니다. 또한 엽산, 철분, 칼슘이 풍부한 식품을 적극 섭취하시기 바랍니다.";
    }

    // 운동 관련
    else if (lowerQuestion.includes("운동") || lowerQuestion.includes("근육") || lowerQuestion.includes("증량")) {
      return "운동 전후 영양 섭취는 매우 중요합니다. 운동 전에는 탄수화물 중심의 가벼운 식사를, 운동 후에는 단백질과 탄수화물을 함께 섭취하시는 것이 좋습니다. 프로틴바, 바나나, 닭가슴살, 그릭요거트 같은 식품을 추천드립니다. 근육 증량이 목표시라면 체중 1kg당 1.6-2.2g의 단백질 섭취를 권장합니다.";
    }

    // 고혈압 관련
    else if (lowerQuestion.includes("고혈압") || lowerQuestion.includes("혈압")) {
      return "고혈압 관리를 위해서는 나트륨 섭취를 제한하는 것이 가장 중요합니다. 가공식품, 인스턴트 식품, 짠 음식은 피하시고, 신선한 채소와 과일을 충분히 섭취하세요. 칼륨이 풍부한 바나나, 시금치, 아보카도 등이 혈압 관리에 도움됩니다. 제품의 나트륨 함량을 확인하여 하루 2,300mg 이하로 섭취하시기 바랍니다.";
    }

    // 아이/어린이 관련
    else if (lowerQuestion.includes("아이") || lowerQuestion.includes("어린이") || lowerQuestion.includes("아기")) {
      return "어린이의 경우 성인보다 더 주의깊게 식품을 선택해야 합니다. 인공색소, 과도한 당분, 카페인이 포함된 제품은 피하시고, 자연 그대로의 식품을 우선적으로 선택하세요. 견과류는 3세 이하 영유아에게는 질식 위험이 있으니 주의하시고, 꿀은 1세 미만 영아에게는 절대 주지 마세요. 구체적인 연령대와 제품을 알려주시면 더 정확한 조언을 드릴게요.";
    }

    // 알레르기 관련
    else if (lowerQuestion.includes("알레르기") || lowerQuestion.includes("알러지")) {
      return '알레르기가 있으시다면 식품 라벨을 꼼꼼히 확인하는 것이 중요합니다. 주요 알레르기 유발 식품으로는 우유, 달걀, 견과류, 갑각류, 생선, 대두, 밀 등이 있습니다. 가공식품의 경우 "동일한 시설에서 생산" 표기도 주의깊게 봐주세요. 어떤 알레르기가 있으신지 구체적으로 알려주시면 해당 성분이 포함된 제품들을 피할 수 있도록 도와드리겠습니다.';
    }

    // 간식 관련
    else if (lowerQuestion.includes("간식")) {
      return "건강한 간식 선택이 중요하네요! 다이어트 중이시라면 견과류 한 줌, 그릭요거트, 과일, 당근스틱 등을 추천합니다. 가공된 과자보다는 자연 식품을 선택하시고, 칼로리와 당분 함량을 확인해보세요. 운동 후 간식으로는 단백질이 풍부한 프로틴바나 우유가 좋습니다. 구체적인 목적을 알려주시면 더 맞춤형 추천을 드릴 수 있어요.";
    }

    // 소화 관련
    else if (lowerQuestion.includes("소화")) {
      return "소화가 잘 안되신다면 기름기가 적고 자극적이지 않은 음식을 선택하세요. 죽, 바나나, 토스트, 삶은 계란 등이 소화에 부담을 주지 않습니다. 유산균이 풍부한 요거트나 발효식품도 도움이 됩니다. 매운 음식, 기름진 음식, 탄산음료는 피하시고, 천천히 꼭꼭 씹어서 드세요. 지속적인 소화불량이 있으시다면 의사와 상담하시는 것을 권합니다.";
    }

    // 콜레스테롤 관련
    else if (lowerQuestion.includes("콜레스테롤")) {
      return "콜레스테롤 관리를 위해서는 포화지방과 트랜스지방 섭취를 줄이는 것이 중요합니다. 오메가-3가 풍부한 생선, 견과류, 아보카도 등이 좋은 콜레스테롤 수치 개선에 도움됩니다. 귀리, 보리 등 수용성 식이섬유가 풍부한 식품도 추천합니다. 계란의 경우 적정량 섭취는 문제없지만, 가공육류나 고지방 유제품은 제한하시는 것이 좋습니다.";
    }

    // 일반적인 응답
    else {
      return "궁금한 점에 대해 답변해드리겠습니다. 더 구체적인 정보를 알려주시면 더 정확한 조언을 드릴 수 있어요. 식품명, 건강 상태, 목적 등을 함께 말씀해주세요. 또한 개인의 건강 상태에 따라 권장사항이 달라질 수 있으니, 심각한 건강 문제가 있으시다면 전문의와 상담하시는 것을 권합니다.";
    }
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
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? "" : "justify-end"}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isBot ? "bg-gray-100 text-gray-900" : "bg-green-500 text-white"}`}>
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-green-100"}`}>{message.timestamp.toLocaleTimeString()}</p>
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
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
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
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
