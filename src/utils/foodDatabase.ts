
export interface FoodItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  nutrition: {
    calories: number;
    carbs: number;
    sugar: number;
    protein: number;
    fat: number;
    sodium: number;
  };
  ingredients: Array<{
    name: string;
    description: string;
  }>;
  warnings: string[];
  recommendations: {
    diabetes: string;
    diet: string;
    exercise: string;
  };
}

export const foodDatabase: FoodItem[] = [
  {
    id: '1',
    name: '제로콜라',
    brand: '코카콜라',
    category: '음료',
    nutrition: {
      calories: 0,
      carbs: 0,
      sugar: 0,
      protein: 0,
      fat: 0,
      sodium: 40
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
  },
  {
    id: '2',
    name: '프로틴바',
    brand: '마이프로틴',
    category: '건강식품',
    nutrition: {
      calories: 200,
      carbs: 15,
      sugar: 8,
      protein: 20,
      fat: 6,
      sodium: 180
    },
    ingredients: [
      { name: '유청단백질', description: '고품질 완전단백질' },
      { name: '아몬드', description: '견과류, 건강한 지방 제공' },
      { name: '콜라겐펩타이드', description: '피부와 관절 건강' },
      { name: '스테비아', description: '천연 감미료' },
      { name: '코코아파우더', description: '초콜릿 맛과 항산화 성분' }
    ],
    warnings: [
      '견과류 알레르기 주의',
      '과다 섭취 시 소화불량 가능',
      '유당불내증 환자 주의'
    ],
    recommendations: {
      diabetes: '혈당 지수 낮음 - 적정량 섭취 가능',
      diet: '고단백 저탄수화물 - 다이어트에 도움',
      exercise: '운동 전후 단백질 보충에 적합'
    }
  },
  {
    id: '3',
    name: '스테비아',
    brand: '자연당',
    category: '감미료',
    nutrition: {
      calories: 0,
      carbs: 0,
      sugar: 0,
      protein: 0,
      fat: 0,
      sodium: 0
    },
    ingredients: [
      { name: '스테비아잎추출물', description: '천연 감미료, 설탕의 200-300배 단맛' },
      { name: '에리스리톨', description: '천연 당알코올, 충치 예방 효과' }
    ],
    warnings: [
      '과다 섭취 시 설사 가능',
      '임산부는 적정량 섭취 권장'
    ],
    recommendations: {
      diabetes: '혈당에 영향 없음 - 당뇨 환자에게 적합',
      diet: '칼로리 제로 - 다이어트에 최적',
      exercise: '운동 중 에너지 보충 효과 없음'
    }
  },
  {
    id: '4',
    name: '말티톨',
    brand: '대상',
    category: '감미료',
    nutrition: {
      calories: 2.4,
      carbs: 0.6,
      sugar: 0,
      protein: 0,
      fat: 0,
      sodium: 0
    },
    ingredients: [
      { name: '말티톨', description: '당알코올계 감미료, 설탕의 90% 단맛' },
      { name: '옥수수전분', description: '원료 전분' }
    ],
    warnings: [
      '과다 섭취 시 복통, 설사 가능',
      '하루 20g 이상 섭취 금지',
      '소화기 민감자 주의'
    ],
    recommendations: {
      diabetes: '혈당 상승 억제 - 당뇨 환자 적합',
      diet: '저칼로리 - 다이어트 도움',
      exercise: '운동 전 소량 에너지 보충 가능'
    }
  },
  {
    id: '5',
    name: '닭가슴살',
    brand: '하림',
    category: '육류',
    nutrition: {
      calories: 165,
      carbs: 0,
      sugar: 0,
      protein: 31,
      fat: 3.6,
      sodium: 74
    },
    ingredients: [
      { name: '닭가슴살', description: '고단백 저지방 육류' },
      { name: '정제염', description: '간을 맞추기 위한 소금' }
    ],
    warnings: [
      '충분히 가열하여 섭취',
      '냉장보관 필수',
      '유통기한 확인 후 섭취'
    ],
    recommendations: {
      diabetes: '탄수화물 없음 - 당뇨 환자에게 적합',
      diet: '고단백 저지방 - 다이어트 최적',
      exercise: '근육 생성에 필수적인 단백질 공급'
    }
  },
  {
    id: '6',
    name: '그릭요거트',
    brand: '덴마크',
    category: '유제품',
    nutrition: {
      calories: 100,
      carbs: 6,
      sugar: 6,
      protein: 18,
      fat: 0,
      sodium: 65
    },
    ingredients: [
      { name: '농축우유', description: '단백질이 농축된 우유' },
      { name: '유산균', description: '장 건강에 도움되는 프로바이오틱스' },
      { name: '젖산', description: '요거트의 신맛을 내는 성분' }
    ],
    warnings: [
      '유당불내증 환자 주의',
      '냉장보관 필수',
      '개봉 후 빠른 섭취 권장'
    ],
    recommendations: {
      diabetes: '단백질 풍부, 적정량 섭취 권장',
      diet: '고단백 저지방 - 다이어트에 도움',
      exercise: '운동 후 단백질 보충에 적합'
    }
  }
];

export const searchFood = (query: string): FoodItem[] => {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return foodDatabase.filter(food => 
    food.name.toLowerCase().includes(searchTerm) ||
    food.brand.toLowerCase().includes(searchTerm) ||
    food.category.toLowerCase().includes(searchTerm) ||
    food.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(searchTerm)
    )
  );
};
