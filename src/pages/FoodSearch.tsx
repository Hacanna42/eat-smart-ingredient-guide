import React, { useState, useEffect } from "react";
import { Search, ChevronRight, AlertCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { searchFood, FoodItem, foodDatabase } from "../utils/foodDatabase";

const FoodSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderProduct, setPlaceholderProduct] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 로딩 애니메이션용 이미지
  const loadingImages = [
    "/lovable-uploads/5d816d90-6b07-47ac-8242-26ea55e6575a.png", // 새우깡
    "/lovable-uploads/4ac9b88b-38ad-4769-8b2a-1cabbc4dd4ac.png", // 아이스크림(가정)
  ];
  const [loadingImgIdx, setLoadingImgIdx] = useState(0);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  useEffect(() => {
    const names = foodDatabase.map((f) => f.name);
    setPlaceholderProduct(names[Math.floor(Math.random() * names.length)] || "제로콜라");
  }, []);

  const updateSearchHistory = (query: string) => {
    const newHistory = [query, ...searchHistory.filter((item) => item !== query)];
    const limitedHistory = newHistory.slice(0, 10);
    setSearchHistory(limitedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(limitedHistory));
  };

  const performSearch = (query: string) => {
    if (!query.trim()) return;

    updateSearchHistory(query.trim());
    setIsLoading(true);
    setTimeout(() => {
      const results = searchFood(query);
      setSearchResults(results);
      if (results.length === 1) {
        setSelectedFood(results[0]);
      } else {
        setSelectedFood(null);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    setLoadingImgIdx((idx) => (idx + 1) % loadingImages.length);
    performSearch(searchQuery);
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    performSearch(keyword);
  };

  const removeHistoryItem = (termToRemove: string) => {
    const newHistory = searchHistory.filter((item) => item !== termToRemove);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
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
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`제품명을 입력하세요 (예: ${placeholderProduct})`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 px-8 min-w-[120px]"
            >
              <span className="flex items-center justify-center gap-2 w-full min-w-[104px]">
                {isLoading ? (
                  <span className="relative w-10 h-10 inline-block align-middle">
                    <img
                      src={loadingImages[loadingImgIdx]}
                      alt="로딩 식품"
                      className="absolute left-0 top-0 w-10 h-10 object-cover rounded-full shadow-lg animate-bounce"
                      style={{ animationDuration: "0.7s" }}
                    />
                  </span>
                ) : (
                  <span>검색</span>
                )}
              </span>
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["제로콜라", "프로틴바", "스테비아", "말티톨", "닭가슴살", "그릭요거트", "롯데샌드", "롯데비엔나", "롯데제주감귤"].map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleQuickSearch(keyword)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-green-100 hover:text-green-600 transition-colors text-sm"
              >
                {keyword}
              </button>
            ))}
          </div>

          {searchHistory.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">최근 검색어</h4>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 rounded-full pl-3 pr-2 py-1 group"
                  >
                    <button
                      onClick={() => handleQuickSearch(term)}
                      className="text-sm text-gray-700 group-hover:text-gray-900"
                    >
                      {term}
                    </button>
                    <button
                      onClick={() => removeHistoryItem(term)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {searchResults.length > 0 && !selectedFood && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">검색 결과 ({searchResults.length}개)</h3>
            <div className="space-y-3">
              {searchResults.map((food) => (
                <div
                  key={food.id}
                  onClick={() => handleFoodSelect(food)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{food.name}</h4>
                      <p className="text-gray-600 text-sm">
                        {food.brand} · {food.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{food.nutrition.calories}kcal</p>
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 && searchQuery && !isLoading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">다른 검색어를 시도해보세요</p>
          </div>
        )}

        {selectedFood && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedFood.name}</h2>
                  <p className="text-gray-600">
                    {selectedFood.brand} · {selectedFood.category}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFood(null)}
                  className="text-sm"
                >
                  목록으로
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="nutrition"
              className="w-full"
            >
              <TabsList className="w-full justify-start px-6 bg-gray-50">
                <TabsTrigger value="nutrition">영양성분</TabsTrigger>
                <TabsTrigger value="ingredients">원재료</TabsTrigger>
                <TabsTrigger value="warnings">주의사항</TabsTrigger>
                <TabsTrigger value="recommendations">섭취 조언</TabsTrigger>
              </TabsList>

              <TabsContent
                value="nutrition"
                className="p-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(selectedFood.nutrition).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="text-sm text-gray-600 mb-1">
                        {key === "calories"
                          ? "칼로리"
                          : key === "carbs"
                          ? "탄수화물"
                          : key === "sugar"
                          ? "당류"
                          : key === "protein"
                          ? "단백질"
                          : key === "fat"
                          ? "지방"
                          : "나트륨"}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {value as number}
                        {key === "calories" ? "kcal" : key === "sodium" ? "mg" : "g"}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="ingredients"
                className="p-6"
              >
                <div className="space-y-4">
                  {selectedFood.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{ingredient.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="warnings"
                className="p-6"
              >
                <div className="space-y-3">
                  {selectedFood.warnings.map((warning, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-red-800">{warning}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="recommendations"
                className="p-6"
              >
                <div className="space-y-4">
                  {Object.entries(selectedFood.recommendations).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <ChevronRight className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800">{key === "diabetes" ? "당뇨 환자" : key === "diet" ? "다이어트" : "운동"}</h4>
                        <p className="text-green-700 text-sm mt-1">{String(value)}</p>
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
