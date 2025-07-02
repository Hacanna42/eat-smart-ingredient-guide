
import React, { useState } from 'react';
import { Search, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import { ingredientDatabase, Ingredient } from '../utils/ingredientDatabase';

const IngredientDictionary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredIngredients = ingredientDatabase.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ingredient.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">원재료 사전</h1>
          <p className="text-gray-600">식품에 들어가는 다양한 원재료와 성분에 대해 알아보세요 ({ingredientDatabase.length}개 등록)</p>
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
                  {ingredient.healthInfo && (
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
                        <CheckCircle className="w-5 h-5" />
                        건강 정보
                      </h4>
                      <div className="text-green-700 bg-green-50 p-3 rounded-lg">
                        {ingredient.healthInfo}
                      </div>
                    </div>
                  )}
                  
                  {ingredient.allergyInfo && (
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-red-800 mb-3">
                        <AlertTriangle className="w-5 h-5" />
                        주의사항
                      </h4>
                      <div className="text-red-700 bg-red-50 p-3 rounded-lg">
                        {ingredient.allergyInfo}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredIngredients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
              <p className="text-gray-400 mt-2">다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientDictionary;
