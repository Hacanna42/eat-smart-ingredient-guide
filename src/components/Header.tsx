
import React from 'react';
import { Search, MessageCircle, BookOpen, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">FoodWise</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <Search className="w-4 h-4" />
              <span>식품 검색</span>
            </Link>
            <Link to="/dictionary" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>원재료 사전</span>
            </Link>
            <Link to="/ai-chat" className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>AI 상담</span>
            </Link>
            <Link to="/register" className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>제품 등록</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
