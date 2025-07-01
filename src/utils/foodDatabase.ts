
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
  },
  // 롯데 제품 데이터 추가
  {
    id: '7',
    name: '롯데샌드',
    brand: '롯데제과',
    category: '과자류',
    nutrition: {
      calories: 529,
      carbs: 63.46,
      sugar: 25,
      protein: 3.85,
      fat: 28.85,
      sodium: 202
    },
    ingredients: [
      { name: '밀가루', description: '주원료, 탄수화물 공급' },
      { name: '설탕', description: '감미료' },
      { name: '팜오일', description: '식물성 유지' },
      { name: '코코아가루', description: '초콜릿 맛' }
    ],
    warnings: [
      '고칼로리 식품으로 과다 섭취 주의',
      '당뇨 환자 섭취 제한',
      '글루텐 함유로 민감자 주의'
    ],
    recommendations: {
      diabetes: '고당분 - 섭취 제한 권장',
      diet: '고칼로리 - 다이어트 시 제한',
      exercise: '운동 전 에너지 보충 가능하나 과량 금지'
    }
  },
  {
    id: '8',
    name: '롯데 빅팜',
    brand: '롯데웰푸드',
    category: '식육가공품',
    nutrition: {
      calories: 275,
      carbs: 5,
      sugar: 1.67,
      protein: 11.67,
      fat: 23.33,
      sodium: 700
    },
    ingredients: [
      { name: '돼지고기', description: '주원료 육류' },
      { name: '소금', description: '간을 맞추는 조미료' },
      { name: '아질산나트륨', description: '보존료, 발색제' },
      { name: '향신료', description: '맛과 향 개선' }
    ],
    warnings: [
      '고나트륨 식품으로 고혈압 환자 주의',
      '가공육으로 과다 섭취 금지',
      '충분히 가열하여 섭취'
    ],
    recommendations: {
      diabetes: '저탄수화물 - 적정량 섭취 가능',
      diet: '고지방, 고나트륨 - 다이어트 시 제한',
      exercise: '단백질 공급원이나 나트륨 과다 주의'
    }
  },
  {
    id: '9',
    name: '롯데비엔나',
    brand: '롯데푸드',
    category: '식육가공품',
    nutrition: {
      calories: 270,
      carbs: 4,
      sugar: 1,
      protein: 13,
      fat: 22,
      sodium: 780
    },
    ingredients: [
      { name: '돼지고기', description: '주원료 육류' },
      { name: '닭고기', description: '보조 단백질원' },
      { name: '전분', description: '결착제' },
      { name: '아질산나트륨', description: '보존료' }
    ],
    warnings: [
      '고나트륨 식품으로 혈압 관리 필요자 주의',
      '가공육 과다 섭취 금지',
      '어린이 섭취량 조절 필요'
    ],
    recommendations: {
      diabetes: '저탄수화물 - 적정량 섭취 가능',
      diet: '고지방 고나트륨 - 다이어트 시 제한',
      exercise: '단백질 공급원이나 나트륨 주의'
    }
  },
  {
    id: '10',
    name: '롯데뻥소리',
    brand: '우리식품',
    category: '과자류',
    nutrition: {
      calories: 432,
      carbs: 84,
      sugar: 28,
      protein: 6,
      fat: 8,
      sodium: 105
    },
    ingredients: [
      { name: '쌀', description: '주원료 곡물' },
      { name: '설탕', description: '감미료' },
      { name: '식용유', description: '바삭함을 위한 유지' },
      { name: '소금', description: '간맞춤용' }
    ],
    warnings: [
      '고탄수화물, 고당분 식품',
      '당뇨 환자 섭취 주의',
      '치아 건강에 주의'
    ],
    recommendations: {
      diabetes: '고당분 - 섭취 제한 권장',
      diet: '고칼로리 - 다이어트 시 소량만',
      exercise: '운동 전 간단한 에너지 보충 가능'
    }
  },
  {
    id: '11',
    name: '롯데키스틱',
    brand: '롯데푸드',
    category: '수산가공식품',
    nutrition: {
      calories: 180,
      carbs: 16,
      sugar: 8,
      protein: 8,
      fat: 9.6,
      sodium: 760
    },
    ingredients: [
      { name: '어육', description: '주원료 수산물' },
      { name: '전분', description: '결착제' },
      { name: '설탕', description: '감미료' },
      { name: '소금', description: '조미료' }
    ],
    warnings: [
      '고나트륨 식품으로 혈압 주의',
      '어류 알레르기 환자 주의',
      '냉장보관 필수'
    ],
    recommendations: {
      diabetes: '적정 탄수화물 - 소량 섭취 가능',
      diet: '중간 칼로리 - 적정량 섭취',
      exercise: '단백질 보충에 도움'
    }
  },
  {
    id: '12',
    name: '롯데제주감귤',
    brand: '롯데칠성음료',
    category: '음료류',
    nutrition: {
      calories: 35,
      carbs: 8.5,
      sugar: 6,
      protein: 0,
      fat: 0,
      sodium: 3
    },
    ingredients: [
      { name: '감귤농축액', description: '제주 감귤 착즙' },
      { name: '정제수', description: '기본 용매' },
      { name: '설탕', description: '감미료' },
      { name: '구연산', description: '산미료' }
    ],
    warnings: [
      '당분 함유로 당뇨 환자 주의',
      '과다 섭취 시 설사 가능',
      '치아 건강 주의'
    ],
    recommendations: {
      diabetes: '당분 함유 - 제한적 섭취',
      diet: '저칼로리 - 적정량 섭취 가능',
      exercise: '운동 중 수분 및 당분 보충에 적합'
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
