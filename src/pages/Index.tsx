import React from "react";
import SearchSection from "../components/SearchSection";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <SearchSection />
      {/* 좌측 하단 플로팅 제품 등록 버튼 */}
      <div className="fixed left-4 bottom-4 z-50">
        <Button
          size="sm"
          className="bg-green-500 hover:bg-green-600 text-white shadow-md px-3 py-2 rounded-full flex items-center gap-1 text-xs"
          onClick={() => navigate("/register")}
        >
          <Plus className="w-4 h-4" /> 제품 등록
        </Button>
      </div>
    </div>
  );
};

export default Index;
