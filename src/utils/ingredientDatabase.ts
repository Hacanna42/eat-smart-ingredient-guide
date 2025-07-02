
export interface Ingredient {
  name: string;
  description: string;
  category: string;
  healthInfo?: string;
  allergyInfo?: string;
}

export const ingredientDatabase: Ingredient[] = [
  // 기본 재료
  { name: '밀가루', description: '밀을 갈아서 만든 가루로 빵, 과자, 면류의 주재료', category: '곡물', allergyInfo: '글루텐 함유 - 셀리악병 환자 주의' },
  { name: '정제소금', description: '불순물을 제거한 순수한 염화나트륨', category: '조미료', healthInfo: '과다 섭취 시 고혈압 위험' },
  { name: '설탕', description: '사탕수수나 사탕무에서 추출한 당분', category: '감미료', healthInfo: '혈당 상승, 충치 유발 가능' },
  { name: '백설탕', description: '정제된 흰색 설탕', category: '감미료', healthInfo: '혈당 상승, 충치 유발 가능' },
  { name: '물엿', description: '전분을 가수분해하여 만든 점성이 있는 감미료', category: '감미료', healthInfo: '혈당 상승 효과' },
  { name: '포도당', description: '단순당으로 빠른 에너지 공급원', category: '감미료', healthInfo: '혈당 급상승 유발' },
  { name: '액상과당', description: '옥수수 전분에서 추출한 액체 감미료', category: '감미료', healthInfo: '과다 섭취 시 비만, 당뇨 위험' },
  { name: '올리고당', description: '소화되지 않는 저분자 당류', category: '감미료', healthInfo: '장 건강에 도움, 혈당 상승 억제' },
  
  // 유지류
  { name: '쇼트닝', description: '베이킹용 고체 식물성 유지', category: '유지', healthInfo: '트랜스지방 함유 가능성' },
  { name: '팜유', description: '팜나무 열매에서 추출한 식물성 기름', category: '유지', healthInfo: '포화지방 함량 높음' },
  { name: '식물성유지', description: '식물에서 추출한 기름의 총칭', category: '유지' },
  { name: '해바라기유', description: '해바라기씨에서 추출한 기름', category: '유지', healthInfo: '비타민E 풍부' },
  { name: '카놀라유', description: '카놀라 종자에서추출한 기름', category: '유지', healthInfo: '불포화지방산 풍부' },
  { name: '옥수수유', description: '옥수수 배아에서 추출한 기름', category: '유지', healthInfo: '리놀렌산 풍부' },
  { name: '버터', description: '우유의 유지방을 분리해 만든 유제품', category: '유지', allergyInfo: '유제품 알레르기 주의' },
  { name: '마가린', description: '식물성 기름을 고체화한 유지', category: '유지', healthInfo: '트랜스지방 함유 가능성' },
  
  // 유제품
  { name: '우유', description: '소에서 얻은 액체 유제품', category: '유제품', allergyInfo: '유당불내증, 우유 알레르기 주의' },
  { name: '탈지분유', description: '우유에서 지방을 제거하고 건조한 분말', category: '유제품', allergyInfo: '유제품 알레르기 주의' },
  { name: '전지분유', description: '전체 우유를 건조한 분말', category: '유제품', allergyInfo: '유제품 알레르기 주의' },
  { name: '유청분말', description: '치즈 제조 과정에서 나오는 유청을 건조한 분말', category: '유제품', allergyInfo: '유제품 알레르기 주의' },
  { name: '치즈분말', description: '치즈를 건조하여 분말화한 제품', category: '유제품', allergyInfo: '유제품 알레르기 주의' },
  { name: '유크림', description: '우유의 지방 성분을 농축한 크림', category: '유제품', allergyInfo: '유제품 알레르기 주의' },
  
  // 난류
  { name: '계란', description: '닭의 알 전체', category: '난류', allergyInfo: '난류 알레르기 주의' },
  { name: '계란노른자', description: '계란의 노른자 부분', category: '난류', allergyInfo: '난류 알레르기 주의' },
  { name: '계란흰자', description: '계란의 흰자 부분', category: '난류', allergyInfo: '난류 알레르기 주의' },
  
  // 대두류
  { name: '대두단백', description: '대두에서 추출한 단백질', category: '단백질', allergyInfo: '대두 알레르기 주의' },
  { name: '대두유', description: '대두에서 추출한 기름', category: '유지', allergyInfo: '대두 알레르기 주의' },
  { name: '대두분말', description: '대두를 분말화한 제품', category: '곡물', allergyInfo: '대두 알레르기 주의' },
  { name: '콩가루', description: '콩을 갈아서 만든 가루', category: '곡물', allergyInfo: '대두 알레르기 주의' },
  
  // 전분류
  { name: '쌀가루', description: '쌀을 갈아서 만든 가루', category: '곡물' },
  { name: '감자전분', description: '감자에서 추출한 전분', category: '전분' },
  { name: '옥수수전분', description: '옥수수에서 추출한 전분', category: '전분' },
  { name: '타피오카전분', description: '카사바에서 추출한 전분', category: '전분' },
  { name: '변성전분', description: '물리적·화학적 처리로 성질을 변화시킨 전분', category: '전분' },
  
  // 첨가물
  { name: '글루텐', description: '밀에 포함된 단백질', category: '단백질', allergyInfo: '글루텐 민감증 환자 주의' },
  { name: '이스트', description: '발효를 위한 효모', category: '발효제' },
  { name: '효모추출물', description: '효모에서 추출한 천연 조미료', category: '조미료' },
  { name: '베이킹파우더', description: '빵이나 과자를 부풀리는 팽창제', category: '팽창제' },
  { name: '중탄산나트륨', description: '베이킹소다, 팽창제로 사용', category: '팽창제' },
  { name: '탄산수소나트륨', description: '베이킹소다의 화학명', category: '팽창제' },
  { name: '구연산', description: '산미료로 사용되는 천연 유기산', category: '산미료' },
  
  // 겔화제
  { name: '젤라틴', description: '동물의 콜라겐에서 추출한 겔화제', category: '겔화제', allergyInfo: '돼지, 소 유래 성분' },
  { name: '펙틴', description: '과일에서 추출한 천연 겔화제', category: '겔화제' },
  { name: '아가', description: '해조류에서 추출한 겔화제', category: '겔화제' },
  { name: '한천', description: '해조류에서 추출한 겔화제', category: '겔화제' },
  
  // 기타 첨가물
  { name: '글리세린', description: '습윤제, 감미료로 사용', category: '첨가물' },
  { name: '레시틴 (대두유래)', description: '대두에서 추출한 유화제', category: '유화제', allergyInfo: '대두 알레르기 주의' },
  { name: '유화제', description: '물과 기름을 섞이게 하는 첨가물', category: '유화제' },
  { name: '산도조절제', description: 'pH를 조절하는 첨가물', category: '첨가물' },
  
  // 향료
  { name: '향료 (합성향료)', description: '인공적으로 합성한 향료', category: '향료' },
  { name: '바닐린', description: '바닐라 향을 내는 합성 향료', category: '향료' },
  { name: '천연향료', description: '천연 원료에서 추출한 향료', category: '향료' },
  { name: '합성착향료', description: '인공적으로 합성한 착향료', category: '향료' },
  
  // 착색료
  { name: '착색료 (카라멜색소)', description: '갈색을 내는 천연 착색료', category: '착색료' },
  { name: '식용색소 적색 40호', description: '빨간색을 내는 합성 착색료', category: '착색료' },
  { name: '식용색소 황색 5호', description: '노란색을 내는 합성 착색료', category: '착색료' },
  { name: '이산화티타늄', description: '흰색을 내는 착색료', category: '착색료' },
  
  // 초콜릿류
  { name: '초콜릿', description: '카카오 원료로 만든 과자류', category: '초콜릿' },
  { name: '코코아분말', description: '카카오 콩을 갈아 만든 분말', category: '초콜릿' },
  { name: '코코아매스', description: '카카오 콩을 갈아 만든 페이스트', category: '초콜릿' },
  { name: '코코아버터', description: '카카오 콩에서 추출한 지방', category: '초콜릿' },
  
  // 잼류
  { name: '설탕시럽', description: '설탕을 물에 녹인 시럽', category: '감미료' },
  { name: '커스터드크림', description: '달걀과 우유로 만든 크림', category: '크림', allergyInfo: '난류, 유제품 알레르기 주의' },
  { name: '잼', description: '과일을 설탕과 함께 끓인 보존식품', category: '잼' },
  { name: '딸기잼', description: '딸기로 만든 잼', category: '잼' },
  { name: '블루베리잼', description: '블루베리로 만든 잼', category: '잼' },
  { name: '오렌지잼', description: '오렌지로 만든 잼', category: '잼' },
  
  // 견과류
  { name: '땅콩버터', description: '땅콩을 갈아 만든 페이스트', category: '견과류', allergyInfo: '땅콩 알레르기 주의' },
  { name: '아몬드분말', description: '아몬드를 갈아 만든 분말', category: '견과류', allergyInfo: '견과류 알레르기 주의' },
  { name: '호두', description: '호두 열매', category: '견과류', allergyInfo: '견과류 알레르기 주의' },
  { name: '땅콩', description: '땅콩 열매', category: '견과류', allergyInfo: '땅콩 알레르기 주의' },
  { name: '피스타치오', description: '피스타치오 열매', category: '견과류', allergyInfo: '견과류 알레르기 주의' },
  { name: '캐슈넛', description: '캐슈 열매', category: '견과류', allergyInfo: '견과류 알레르기 주의' },
  { name: '해바라기씨', description: '해바라기의 씨앗', category: '견과류' },
  { name: '참깨', description: '참깨 씨앗', category: '견과류', allergyInfo: '참깨 알레르기 주의' },
  { name: '흑임자', description: '검은 참깨', category: '견과류', allergyInfo: '참깨 알레르기 주의' },
  
  // 해조류
  { name: '김', description: '바다에서 자라는 해조류', category: '해조류' },
  { name: '다시마', description: '바다에서 자라는 대형 해조류', category: '해조류' },
  
  // 추출물
  { name: '멸치추출물', description: '멸치에서 우린 감칠맛 성분', category: '조미료' },
  { name: '가다랑어추출물', description: '가다랑어에서 우린 감칠맛 성분', category: '조미료' },
  { name: '치킨추출물', description: '닭에서 추출한 맛 성분', category: '조미료' },
  { name: '쇠고기추출물', description: '쇠고기에서 추출한 맛 성분', category: '조미료' },
  
  // 향신료
  { name: '마늘분말', description: '마늘을 건조하여 분말화한 조미료', category: '향신료' },
  { name: '양파분말', description: '양파를 건조하여 분말화한 조미료', category: '향신료' },
  { name: '고춧가루', description: '고추를 건조하여 분말화한 조미료', category: '향신료' },
  { name: '후추', description: '후추 열매를 건조한 향신료', category: '향신료' },
  { name: '생강', description: '생강 뿌리', category: '향신료' },
  { name: '시나몬', description: '계피 껍질을 건조한 향신료', category: '향신료' },
  
  // 건강기능성
  { name: '카카오닙스', description: '카카오 콩을 볶아 부순 조각', category: '건강식품', healthInfo: '항산화 성분 풍부' },
  { name: '녹차분말', description: '녹차잎을 분말화한 제품', category: '차류', healthInfo: '카테킨, 카페인 함유' },
  { name: '말차', description: '녹차잎을 곱게 갈아 만든 분말', category: '차류', healthInfo: '카테킨, 카페인 함유' },
  { name: '인삼추출물', description: '인삼에서 추출한 성분', category: '건강식품', healthInfo: '면역력 증진 효과' },
  { name: '홍삼농축액', description: '홍삼을 농축한 액상 제품', category: '건강식품', healthInfo: '면역력 증진 효과' },
  
  // 기능성 성분
  { name: '식이섬유', description: '소화되지 않는 탄수화물', category: '기능성', healthInfo: '장 건강, 혈당 조절에 도움' },
  { name: '알긴산나트륨', description: '해조류에서 추출한 증점제', category: '증점제' },
  
  // 보존료
  { name: '소르빈산칼륨', description: '식품 보존료', category: '보존료' },
  { name: '안식향산나트륨', description: '식품 보존료', category: '보존료' },
  
  // 인공감미료
  { name: '아스파탄', description: '인공감미료', category: '감미료', allergyInfo: '페닐케톤뇨증 환자 주의' },
  { name: '수크랄로스', description: '인공감미료', category: '감미료', healthInfo: '칼로리 제로' },
  { name: '아세설팜칼륨', description: '인공감미료', category: '감미료', healthInfo: '칼로리 제로' },
  { name: '에리스리톨', description: '천연 당알코올 감미료', category: '감미료', healthInfo: '혈당에 영향 없음' },
  { name: '스테비올배당체 (스테비아)', description: '스테비아 잎에서 추출한 천연 감미료', category: '감미료', healthInfo: '혈당에 영향 없음' },
  { name: '알룰로스', description: '저칼로리 천연 당', category: '감미료', healthInfo: '혈당 상승 억제' },
  { name: '말티톨', description: '당알코올계 감미료', category: '감미료', healthInfo: '과다 섭취 시 설사 가능' },
  { name: '소르비톨', description: '당알코올계 감미료', category: '감미료', healthInfo: '과다 섭취 시 설사 가능' },
  { name: '자일리톨', description: '당알코올계 감미료', category: '감미료', healthInfo: '충치 예방 효과' },
  { name: '락티톨', description: '당알코올계 감미료', category: '감미료', healthInfo: '장 건강에 도움' },
  
  // 식이섬유류
  { name: '이눌린', description: '식물성 식이섬유', category: '식이섬유', healthInfo: '장 건강, 혈당 조절에 도움' },
  { name: '난소화성말토덱스트린', description: '소화되지 않는 식이섬유', category: '식이섬유', healthInfo: '장 건강에 도움' },
  { name: '프락토올리고당', description: '프리바이오틱 올리고당', category: '식이섬유', healthInfo: '장내 유익균 증식' },
  { name: '아라비아검', description: '아카시아 나무에서 추출한 천연 검질', category: '증점제' },
  { name: '치커리추출물', description: '치커리 뿌리에서 추출한 성분', category: '식이섬유', healthInfo: '이눌린 함유' },
  { name: '폴리덱스트로스', description: '합성 식이섬유', category: '식이섬유', healthInfo: '장 건강에 도움' },
  { name: '셀룰로스', description: '식물 세포벽 성분', category: '식이섬유' },
  { name: '귀리식이섬유', description: '귀리에서 추출한 식이섬유', category: '식이섬유', healthInfo: '콜레스테롤 감소 효과' },
  
  // 음료 성분
  { name: '정제수', description: '불순물을 제거한 깨끗한 물', category: '용매' },
  { name: '탄산수', description: '이산화탄소를 용해시킨 물', category: '용매' },
  { name: '커피추출액', description: '커피에서 추출한 액체', category: '추출물', healthInfo: '카페인 함유' },
  { name: '녹차추출물', description: '녹차에서 추출한 성분', category: '추출물', healthInfo: '카테킨, 카페인 함유' },
  { name: '우롱차추출물', description: '우롱차에서 추출한 성분', category: '추출물', healthInfo: '카페인 함유' },
  { name: '보리차추출물', description: '보리차에서 추출한 성분', category: '추출물' },
  { name: '과일농축액 (레몬, 자몽, 복숭아 등)', description: '과일에서 추출한 농축액', category: '추출물' },
  
  // 기타 첨가물
  { name: '구연산나트륨', description: '산도조절제', category: '산미료' },
  { name: '비타민C (아스코르빈산)', description: '비타민C, 산화방지제', category: '비타민', healthInfo: '면역력 강화' },
  { name: '효소처리스테비아', description: '효소로 처리한 스테비아 감미료', category: '감미료', healthInfo: '천연 감미료' },
  { name: '식물성크림', description: '식물성 원료로 만든 크림', category: '크림' },
  { name: '계피분말', description: '계피를 분말화한 향신료', category: '향신료' },
  { name: '말차분말', description: '말차를 분말화한 제품', category: '차류' },
  { name: '과일퓨레 (딸기, 망고 등)', description: '과일을 으깬 페이스트', category: '과일' },
  { name: '카라기난', description: '해조류에서 추출한 증점제', category: '증점제' },
  { name: '프로필렌글리콜', description: '습윤제, 용매', category: '첨가물' },
  { name: '트레할로스', description: '천연 이당류', category: '감미료' },
  { name: '향미증진제', description: '맛을 향상시키는 첨가물', category: '조미료' },
  
  // 기존 데이터베이스에서 가져온 성분들
  { name: '정제수', description: '기본 용매', category: '용매' },
  { name: '이산화탄소', description: '탄산감을 위한 첨가물', category: '탄산화제' },
  { name: '스테비아', description: '천연 감미료, 설탕의 200-300배 단맛', category: '감미료', healthInfo: '혈당에 영향 없음' },
  { name: '유청단백질', description: '고품질 완전단백질', category: '단백질' },
  { name: '아몬드', description: '견과류, 건강한 지방 제공', category: '견과류', allergyInfo: '견과류 알레르기 주의' },
  { name: '콜라겐펩타이드', description: '피부와 관절 건강', category: '단백질', healthInfo: '피부 탄력, 관절 건강' },
  { name: '닭가슴살', description: '고단백 저지방 육류', category: '육류' },
  { name: '농축우유', description: '단백질이 농축된 우유', category: '유제품', allergyInfo: '유제품 알레르기 주의' },
  { name: '유산균', description: '장 건강에 도움되는 프로바이오틱스', category: '유산균', healthInfo: '장내 환경 개선' },
  { name: '젖산', description: '요거트의 신맛을 내는 성분', category: '산미료' },
  { name: '돼지고기', description: '주원료 육류', category: '육류' },
  { name: '아질산나트륨', description: '보존료, 발색제', category: '보존료' },
  { name: '향신료', description: '맛과 향 개선', category: '향신료' },
  { name: '닭고기', description: '보조 단백질원', category: '육류' },
  { name: '전분', description: '결착제', category: '전분' },
  { name: '쌀', description: '주원료 곡물', category: '곡물' },
  { name: '식용유', description: '바삭함을 위한 유지', category: '유지' },
  { name: '어육', description: '주원료 수산물', category: '수산물' },
  { name: '감귤농축액', description: '제주 감귤 착즙', category: '과일' }
];

// 원재료 검색 함수
export const searchIngredients = (text: string): Ingredient[] => {
  if (!text) return [];
  
  const cleanText = text.replace(/\s+/g, '');
  const foundIngredients: Ingredient[] = [];
  
  ingredientDatabase.forEach(ingredient => {
    if (cleanText.includes(ingredient.name)) {
      foundIngredients.push(ingredient);
    }
  });
  
  // 중복 제거
  const uniqueIngredients = foundIngredients.filter((ingredient, index, self) => 
    index === self.findIndex(i => i.name === ingredient.name)
  );
  
  return uniqueIngredients;
};

// 전체 원재료명 추출 함수
export const extractAllIngredients = (text: string): string[] => {
  if (!text) return [];
  
  // 일반적인 원재료명 구분자들
  const separators = [',', '·', '/', '(', ')', '[', ']', '{', '}', ':', ';', '｜', '|'];
  let cleanText = text;
  
  // 구분자를 기준으로 텍스트 분리
  separators.forEach(sep => {
    cleanText = cleanText.replace(new RegExp(`\\${sep}`, 'g'), '|');
  });
  
  const parts = cleanText.split('|').map(part => part.trim()).filter(part => part.length > 0);
  
  // 한글이 포함된 것만 필터링 (원재료명은 대부분 한글)
  const koreanRegex = /[가-힣]/;
  const ingredients = parts.filter(part => {
    return koreanRegex.test(part) && part.length >= 2 && part.length <= 20;
  });
  
  // 중복 제거 및 정렬
  return Array.from(new Set(ingredients)).sort();
};
