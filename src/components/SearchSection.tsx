
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQuickSearch = (keyword: string) => {
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="search" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          식품 정보를 쉽고 빠르게
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          영양성분, 원재료, 부작용까지 한눈에 확인하세요
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="제품명을 입력하세요 (예: 제로콜라, 단백질바)"
            className="block w-full pl-10 pr-12 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg"
          />
          <button 
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
              검색
            </div>
          </button>
        </div>
        
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {['제로콜라', '프로틴바', '스테비아', '말티톨'].map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleQuickSearch(keyword)}
              className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 hover:border-green-300 hover:text-green-600 transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
