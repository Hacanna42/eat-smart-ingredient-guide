
import React, { useState } from 'react';
import { Plus, Upload, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';

const ProductRegistration = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    barcode: '',
    description: '',
    nutrition: {
      calories: '',
      carbs: '',
      sugar: '',
      protein: '',
      fat: '',
      sodium: ''
    },
    ingredients: [''],
    warnings: [''],
    servingSize: '',
    image: null as File | null
  });

  const categories = [
    '음료', '과자/스낵', '유제품', '육류/어류', '곡물/시리얼', 
    '과일/채소', '냉동식품', '건강식품', '조미료/소스', '기타'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNutritionChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [field]: value
      }
    }));
  };

  const handleArrayChange = (field: 'ingredients' | 'warnings', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'warnings') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'ingredients' | 'warnings', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    if (!formData.name || !formData.brand || !formData.category) {
      toast({
        title: "입력 오류",
        description: "필수 항목을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 제품 등록 시뮬레이션
    toast({
      title: "등록 완료",
      description: "제품 정보가 성공적으로 등록되었습니다. 검토 후 승인됩니다.",
    });

    // 폼 초기화
    setFormData({
      name: '',
      brand: '',
      category: '',
      barcode: '',
      description: '',
      nutrition: {
        calories: '',
        carbs: '',
        sugar: '',
        protein: '',
        fat: '',
        sodium: ''
      },
      ingredients: [''],
      warnings: [''],
      servingSize: '',
      image: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">제품 등록</h1>
          <p className="text-gray-600">새로운 식품 정보를 등록하여 다른 사용자들과 공유하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 기본 정보 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제품명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="제품명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  브랜드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="브랜드명을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">바코드</label>
                <input
                  type="text"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="바코드 번호"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">제품 설명</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="제품에 대한 간단한 설명을 입력하세요"
              />
            </div>
          </div>

          {/* 영양성분 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">영양성분 (100g/ml 당)</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">칼로리 (kcal)</label>
                <input
                  type="number"
                  value={formData.nutrition.calories}
                  onChange={(e) => handleNutritionChange('calories', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">탄수화물 (g)</label>
                <input
                  type="number"
                  value={formData.nutrition.carbs}
                  onChange={(e) => handleNutritionChange('carbs', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">당류 (g)</label>
                <input
                  type="number"
                  value={formData.nutrition.sugar}
                  onChange={(e) => handleNutritionChange('sugar', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">단백질 (g)</label>
                <input
                  type="number"
                  value={formData.nutrition.protein}
                  onChange={(e) => handleNutritionChange('protein', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">지방 (g)</label>
                <input
                  type="number"
                  value={formData.nutrition.fat}
                  onChange={(e) => handleNutritionChange('fat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">나트륨 (mg)</label>
                <input
                  type="number"
                  value={formData.nutrition.sodium}
                  onChange={(e) => handleNutritionChange('sodium', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 원재료 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">원재료</h2>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="원재료명을 입력하세요"
                />
                {formData.ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeArrayItem('ingredients', index)}
                    className="px-3"
                  >
                    삭제
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('ingredients')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              원재료 추가
            </Button>
          </div>

          {/* 주의사항 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">주의사항</h2>
            {formData.warnings.map((warning, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={warning}
                  onChange={(e) => handleArrayChange('warnings', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="주의사항을 입력하세요"
                />
                {formData.warnings.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeArrayItem('warnings', index)}
                    className="px-3"
                  >
                    삭제
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addArrayItem('warnings')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              주의사항 추가
            </Button>
          </div>

          {/* 제품 이미지 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">제품 이미지</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">제품 이미지를 업로드하세요</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                파일 선택
              </label>
              {formData.image && (
                <p className="text-sm text-green-600 mt-2">
                  선택된 파일: {formData.image.name}
                </p>
              )}
            </div>
          </div>

          {/* 주의사항 안내 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">등록 안내</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>등록된 정보는 관리자 검토 후 승인됩니다.</li>
                  <li>허위 정보 등록 시 계정 제재를 받을 수 있습니다.</li>
                  <li>정확한 정보 제공을 위해 제품 포장지를 참고해 주세요.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              제품 등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistration;
