import React, { useState } from "react";
import { Search, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import { foodDatabase } from "../utils/foodDatabase";
import { searchIngredients, extractAllIngredients, Ingredient } from "../utils/ingredientDatabase";
import IngredientAIChat from "./IngredientAIChat";

const MOCK_OCR_TEXT = `• 식품유형:탄산음료 • 소비기한: 용기 상단 또는 뚜껑 표기일까지 • 원재료명: 정제수, 말티톨,\n알룰\n4, 잔탄검), 대두다당류, 수크랄로스(갈미료), 아시설팜\n수 전기분요, 유구류,추설향료, 제소:, 탕류사대도나 유형에 크로스테제공,아서식품\n: 경기도 안성시 미양면 제2공단 1길 17• 품목보고번호:F5:20000360372336• 메밀,\n땅콩, 밀, 복숭아, 토마토, 아황산류, 호두, 잣을 사용한 제품과 같은 시설에서 제조하고 있\n습니다. • 직사광선을 피해 서늘한 곳에 얼지 않게 보관하시고, 개봉 후\n냉장보관하여 빨리 드십시오.• 제품 고유의 침전물이 생길 수 있으나 품\n질에는 이상이 없습니다. • 개봉시 넘칠 수 있으니 주의하시고 용기 손\n상 및 내용물 변질 시 음용하지 마세요. • 소비자분쟁해결기준(공정위고\n시)에 의거 교환 또는 보상 받을 수 있습니다. • 교환:롯\n데칠성음료(주) 소비자상담팀(수신자부담 080-730\n무색페트\n1472)및 구입처 • 부정•불량식품 신고:국번 없이 1399
뚜껑:HDPE 리트:PP
∞`;

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ingredientInfo, setIngredientInfo] = useState<Ingredient[] | null>(null);
  const [allExtractedIngredients, setAllExtractedIngredients] = useState<string[] | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<any[] | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCameraClick = () => {
    setCameraOpen(true);
  };

  // CameraModal 컴포넌트 정의
  const CameraModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = React.useState<MediaStream | null>(null);
    const [photo, setPhoto] = React.useState<string | null>(null);

    React.useEffect(() => {
      if (open) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        });
      } else {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleTakePhoto = () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/png");
          setPhoto(dataUrl);
          handleAnalyze(dataUrl);
        }
      }
    };

    const handleAnalyze = async (imageDataUrl: string) => {
      setOcrLoading(true);
      const result = await Tesseract.recognize(imageDataUrl, "kor+eng", {
        logger: (m) => {},
      });
      const ocrText = result.data.text;
      setOcrLoading(false);
      setSearchQuery(ocrText.trim());
      onClose();

      const allIngredients = extractAllIngredients(ocrText);
      setAllExtractedIngredients(allIngredients);

      const foundIngredients = searchIngredients(ocrText);
      if (foundIngredients.length > 0) {
        setIngredientInfo(foundIngredients);
      }

      const ingredientNames = foundIngredients.map(ing => ing.name);
      const matchedFoods = foodDatabase.filter((food) => 
        food.ingredients.some((i) => ingredientNames.includes(i.name))
      );
      if (matchedFoods.length > 0) {
        setMatchedProducts(matchedFoods);
      }
    };

    const handleMockOcr = () => {
      setSearchQuery(MOCK_OCR_TEXT.replace(/\n/g, " "));
      
      const allIngredients = extractAllIngredients(MOCK_OCR_TEXT);
      setAllExtractedIngredients(allIngredients);

      const foundIngredients = searchIngredients(MOCK_OCR_TEXT);
      if (foundIngredients.length > 0) {
        setIngredientInfo(foundIngredients);
      }

      const ingredientNames = foundIngredients.map(ing => ing.name);
      const matchedFoods = foodDatabase.filter((food) => 
        food.ingredients.some((i) => ingredientNames.includes(i.name))
      );
      if (matchedFoods.length > 0) {
        setMatchedProducts(matchedFoods);
      }
      
      onClose();
    };

    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
          <h3 className="text-lg font-bold mb-4">카메라로 원재료명 촬영</h3>
          {!photo ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
              />
              <button
                onClick={handleTakePhoto}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                사진 찍기
              </button>
              <button
                onClick={handleMockOcr}
                className="mt-2 w-full bg-gray-200 hover:bg-yellow-300 text-gray-800 py-2 rounded-lg font-semibold"
              >
                모킹 데이터 촬영
              </button>
            </>
          ) : (
            <>
              <img
                src={photo}
                alt="촬영된 사진"
                className="w-full rounded-lg"
              />
              {ocrLoading && <div className="mt-4 text-blue-600 font-semibold">분석 중...</div>}
            </>
          )}
        </div>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
        />
      </div>
    );
  };

  const handleIngredientClick = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const closeIngredientDetail = () => {
    setSelectedIngredient(null);
  };

  const closeAllModals = () => {
    setAllExtractedIngredients(null);
    setIngredientInfo(null);
    setMatchedProducts(null);
    setSelectedIngredient(null);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 relative overflow-hidden">
      {/* Background snack images */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/lovable-uploads/4ac9b88b-38ad-4769-8b2a-1cabbc4dd4ac.png"
          alt=""
          className="absolute top-20 left-10 w-32 h-20 object-contain opacity-10 rotate-12 hidden md:block"
        />
        <img
          src="/lovable-uploads/5d816d90-6b07-47ac-8242-26ea55e6575a.png"
          alt=""
          className="absolute top-32 right-16 w-28 h-28 object-contain opacity-10 -rotate-12 hidden md:block"
        />
        <img
          src="/lovable-uploads/4ac9b88b-38ad-4769-8b2a-1cabbc4dd4ac.png"
          alt=""
          className="absolute bottom-32 left-20 w-36 h-24 object-contain opacity-8 -rotate-6 hidden md:block"
        />
        <img
          src="/lovable-uploads/5d816d90-6b07-47ac-8242-26ea55e6575a.png"
          alt=""
          className="absolute bottom-20 right-10 w-32 h-32 object-contain opacity-8 rotate-6 hidden md:block"
        />
        <img
          src="/lovable-uploads/4ac9b88b-38ad-4769-8b2a-1cabbc4dd4ac.png"
          alt=""
          className="absolute top-1/2 left-2 w-24 h-16 object-contain opacity-6 rotate-45 hidden lg:block"
        />
        <img
          src="/lovable-uploads/5d816d90-6b07-47ac-8242-26ea55e6575a.png"
          alt=""
          className="absolute top-1/3 right-4 w-20 h-20 object-contain opacity-6 -rotate-45 hidden lg:block"
        />
      </div>

      <div className="w-full max-w-2xl text-center relative z-10">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">FoodWise</h1>
          <p className="text-xl text-gray-600 mb-8">
            식품 정보를 쉽고 빠르게 확인하세요
          </p>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="제품명을 입력하세요"
            className="block w-full pl-12 pr-32 py-5 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg bg-white/80 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={handleCameraClick}
              className="mr-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl transition-colors font-medium border border-green-600 shadow-md"
              aria-label="카메라로 원재료명 촬영"
              type="button"
            >
              <Camera className="w-5 h-5" />
            </button>
            <button
              onClick={handleSearch}
              className="mr-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition-colors font-medium shadow-md"
            >
              검색
            </button>
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          카메라로 원재료 라벨을 촬영하거나 제품명을 직접 검색해보세요
        </div>
      </div>

      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
      />

      {/* 모든 인식된 원재료명 표시 */}
      {allExtractedIngredients && allExtractedIngredients.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl relative max-h-[90vh] overflow-y-auto mx-4">
            <button
              onClick={closeAllModals}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4">인식된 원재료명</h3>
            
            {/* 모든 추출된 원재료 */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">전체 인식된 원재료 ({allExtractedIngredients.length}개)</h4>
              <div className="flex flex-wrap gap-2">
                {allExtractedIngredients.map((ingredient, index) => {
                  const foundIngredient = ingredientInfo?.find(ing => ing.name === ingredient);
                  return (
                    <span
                      key={index}
                      onClick={() => foundIngredient && handleIngredientClick(foundIngredient)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        foundIngredient 
                          ? 'bg-green-100 text-green-800 cursor-pointer hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {ingredient}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* 상세 정보가 있는 원재료 */}
            {ingredientInfo && ingredientInfo.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-green-700 mb-3">상세 정보 ({ingredientInfo.length}개)</h4>
                <div className="space-y-3">
                  {ingredientInfo.map((ingredient, index) => (
                    <div
                      key={index}
                      className="p-4 bg-green-50 rounded-lg text-left border border-green-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-green-800">{ingredient.name}</div>
                        <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded">
                          {ingredient.category}
                        </span>
                      </div>
                      <div className="text-gray-700 text-sm mb-2">{ingredient.description}</div>
                      {ingredient.healthInfo && (
                        <div className="text-blue-700 text-xs bg-blue-50 p-2 rounded">
                          💡 {ingredient.healthInfo}
                        </div>
                      )}
                      {ingredient.allergyInfo && (
                        <div className="text-red-700 text-xs bg-red-50 p-2 rounded mt-1">
                          ⚠️ {ingredient.allergyInfo}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 총합 섭취 주의사항 및 조언 */}
            {matchedProducts && matchedProducts.length > 0 && (
              <div className="text-left mb-6">
                <h4 className="font-bold text-red-600 mb-2">섭취 주의사항</h4>
                <ul className="list-disc pl-5 text-sm text-red-700 mb-4">
                  {Array.from(new Set(matchedProducts.flatMap((p) => p.warnings))).map((w, idx) => (
                    <li key={idx}>{String(w)}</li>
                  ))}
                </ul>
                <h4 className="font-bold text-blue-700 mb-2">섭취 조언</h4>
                <ul className="list-disc pl-5 text-sm text-blue-800">
                  {Array.from(new Set(matchedProducts.flatMap((p) => Object.values(p.recommendations)))).map((r, idx) => (
                    <li key={idx}>{String(r)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI 상담 모듈 추가 */}
            {allExtractedIngredients && (
              <IngredientAIChat ingredients={allExtractedIngredients} />
            )}
          </div>
        </div>
      )}

      {/* 개별 원재료 상세 정보 모달 */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto mx-4">
            <button
              onClick={closeIngredientDetail}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            <div className="text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedIngredient.name}</h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {selectedIngredient.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedIngredient.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {selectedIngredient.healthInfo && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-green-800 mb-3">
                      💡 건강 정보
                    </h4>
                    <div className="text-green-700 bg-green-50 p-3 rounded-lg">
                      {selectedIngredient.healthInfo}
                    </div>
                  </div>
                )}
                
                {selectedIngredient.allergyInfo && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-red-800 mb-3">
                      ⚠️ 주의사항
                    </h4>
                    <div className="text-red-700 bg-red-50 p-3 rounded-lg">
                      {selectedIngredient.allergyInfo}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchSection;
