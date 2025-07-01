
import React, { useState } from 'react';
import { Search, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/Header';

const FoodSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // 실제 API 호출을 시뮬레이션
    setTimeout(() => {
      setSearchResult({
        name: searchQuery,
        brand: '롯데',
        category: '음료',
        nutrition: {
          calories: 0,
          carbs: 0,
          sugar: 0,
          protein: 0,
          fat: 0,
          sodium: 35
        },
        ingredients: [
          { name: '정제수', description: '기본 용매' },
          { name: '이산화탄소', description: '탄산감을 위한 첨가물' },
          { name: '아스파탄', description: '인공감미료, 페닐케톤뇨증 환자 주의' },
          { name: '아세설팜칼륨', description: '인공감미료' },
          { name: '구연산', description: '산미료' },
          { name: '향료', description: '콜라 맛을 위한 향료' }
        ],
        warnings: [
          '페닐케톤뇨증 환자는 섭취 금지',
          '과다 섭취 시 복통, 설사 가능',
          '임산부는 제한적 섭취 권장'
        ],
        recommendations: {
          diabetes: '혈당에 영향 없음 - 섭취 가능',
          diet: '칼로리 제로 - 다이어트에 도움',
          exercise: '운동 중 수분 보충에 적합'
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">식품 검색</h1>
          <p className="text-gray-600">제품명을 입력하여 영양성분과 원재료 정보를 확인하세요</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="제품명을 입력하세요 (예: 제로콜라, 프로틴바)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 px-8"
            >
              {isLoading ? '검색 중...' : '검색'}
            </Button>
          </div>
        </div>

        {searchResult && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{searchResult.name}</h2>
              <p className="text-gray-600">{searchResult.brand} · {searchResult.category}</p>
            </div>

            <Tabs defaultValue="nutrition" className="w-full">
              <TabsList className="w-full justify-start px-6 bg-gray-50">
                <TabsTrigger value="nutrition">영양성분</TabsTrigger>
                <TabsTrigger value="ingredients">원재료</TabsTrigger>
                <TabsTrigger value="warnings">주의사항</TabsTrigger>
                <TabsTrigger value="recommendations">섭취 조언</TabsTrigger>
              </TabsList>

              <TabsContent value="nutrition" className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(searchResult.nutrition).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">
                        {key === 'calories' ? '칼로리' : 
                         key === 'carbs' ? '탄수화물' :
                         key === 'sugar' ? '당류' :
                         key === 'protein' ? '단백질' :
                         key === 'fat' ? '지방' : '나트륨'}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {value}{key === 'calories' ? 'kcal' : key === 'sodium' ? 'mg' : 'g'}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="ingredients" className="p-6">
                <div className="space-y-4">
                  {searchResult.ingredients.map((ingredient: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{ingredient.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="warnings" className="p-6">
                <div className="space-y-3">
                  {searchResult.warnings.map((warning: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-red-800">{warning}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="p-6">
                <div className="space-y-4">
                  {Object.entries(searchResult.recommendations).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <ChevronRight className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800">
                          {key === 'diabetes' ? '당뇨 환자' : 
                           key === 'diet' ? '다이어트' : '운동'}
                        </h4>
                        <p className="text-green-700 text-sm mt-1">{value as string}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
