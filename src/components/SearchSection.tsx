import React, { useState } from "react";
import { Search, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import { foodDatabase } from "../utils/foodDatabase";

const MOCK_OCR_TEXT = `• 식품유형:탄산음료 • 소비기한: 용기 상단 또는 뚜껑 표기일까지 • 원재료명: 정제수, 말티톨,\n알룰\n4, 잔탄검), 대두다당류, 수크랄로스(갈미료), 아시설팜\n수 전기분요, 유구류,추설향료, 제소:, 탕류사대도나 유형에 크로스테제공,아서식품\n: 경기도 안성시 미양면 제2공단 1길 17• 품목보고번호:F5:20000360372336• 메밀,\n땅콩, 밀, 복숭아, 토마토, 아황산류, 호두, 잣을 사용한 제품과 같은 시설에서 제조하고 있\n습니다. • 직사광선을 피해 서늘한 곳에 얼지 않게 보관하시고, 개봉 후\n냉장보관하여 빨리 드십시오.• 제품 고유의 침전물이 생길 수 있으나 품\n질에는 이상이 없습니다. • 개봉시 넘칠 수 있으니 주의하시고 용기 손\n상 및 내용물 변질 시 음용하지 마세요. • 소비자분쟁해결기준(공정위고\n시)에 의거 교환 또는 보상 받을 수 있습니다. • 교환:롯\n데칠성음료(주) 소비자상담팀(수신자부담 080-730\n무색페트\n1472)및 구입처 • 부정•불량식품 신고:국번 없이 1399\n뚜껑:HDPE 리트:PP\n∞`;

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ingredientInfo, setIngredientInfo] = useState<{ name: string; description: string }[] | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<any[] | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQuickSearch = (keyword: string) => {
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
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
    const [ocrText, setOcrText] = React.useState<string>("");

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
          // 사진을 찍자마자 OCR 분석 시작
          handleAnalyze(dataUrl);
        }
      }
    };

    const handleAnalyze = async (imageDataUrl: string) => {
      setOcrLoading(true);
      setOcrText("");
      const result = await Tesseract.recognize(imageDataUrl, "kor+eng", {
        logger: (m) => {},
      });
      setOcrText(result.data.text);
      setOcrLoading(false);
      setSearchQuery(result.data.text.trim());
      onClose();

      // OCR 결과에서 데이터베이스에 있는 원재료명 찾기
      const ocrText = result.data.text.replace(/\s+/g, ""); // 공백제거
      // 모든 원재료명 리스트
      const allIngredients = foodDatabase.flatMap((food) => food.ingredients.map((i) => i.name));
      // OCR 결과에 포함된 원재료명만 추출
      const matched = allIngredients.filter((name) => ocrText.includes(name));
      // 중복 제거
      const uniqueMatched = Array.from(new Set(matched));
      // 설명 정보 매핑
      const info = uniqueMatched
        .map((name) => {
          const found = foodDatabase.flatMap((food) => food.ingredients).find((i) => i.name === name);
          return found ? { name: found.name, description: found.description } : null;
        })
        .filter(Boolean) as { name: string; description: string }[];
      if (info.length > 0) setIngredientInfo(info);

      // 매칭된 원재료가 포함된 모든 제품의 warnings/recommendations 모으기
      const matchedFoods = foodDatabase.filter((food) => food.ingredients.some((i) => uniqueMatched.includes(i.name)));
      if (matchedFoods.length > 0) setMatchedProducts(matchedFoods);
    };

    // 모킹 데이터 촬영 버튼 핸들러
    const handleMockOcr = () => {
      setSearchQuery(MOCK_OCR_TEXT.replace(/\n/g, " "));
      // OCR 결과에서 데이터베이스에 있는 원재료명 찾기
      const ocrText = MOCK_OCR_TEXT.replace(/\s+/g, ""); // 공백제거
      const allIngredients = foodDatabase.flatMap((food) => food.ingredients.map((i) => i.name));
      const matched = allIngredients.filter((name) => ocrText.includes(name));
      const uniqueMatched = Array.from(new Set(matched));
      const info = uniqueMatched
        .map((name) => {
          const found = foodDatabase.flatMap((food) => food.ingredients).find((i) => i.name === name);
          return found ? { name: found.name, description: found.description } : null;
        })
        .filter(Boolean) as { name: string; description: string }[];
      if (info.length > 0) setIngredientInfo(info);

      // 매칭된 원재료가 포함된 모든 제품의 warnings/recommendations 모으기
      const matchedFoods = foodDatabase.filter((food) => food.ingredients.some((i) => uniqueMatched.includes(i.name)));
      if (matchedFoods.length > 0) setMatchedProducts(matchedFoods);
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

  return (
    <section
      id="search"
      className="py-16 bg-gradient-to-br from-green-50 to-blue-50"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">식품 정보를 쉽고 빠르게</h2>
        <p className="text-lg text-gray-600 mb-8">영양성분, 원재료, 부작용까지 한눈에 확인하세요</p>

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
            className="block w-full pl-10 pr-24 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-lg"
          />
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <div className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">검색</div>
          </button>
          <button
            onClick={handleCameraClick}
            className="absolute inset-y-0 right-20 flex items-center px-2 text-gray-500 hover:text-green-600 transition-colors"
            aria-label="카메라로 원재료명 촬영"
            type="button"
          >
            <Camera className="w-7 h-7" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["제로콜라", "프로틴바", "스테비아", "말티톨"].map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleQuickSearch(keyword)}
              className="px-4 py-2 bg-white text-gray-600 rounded-full border border-gray-200 hover:border-green-300 hover:text-green-600 transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>

        <CameraModal
          open={cameraOpen}
          onClose={() => setCameraOpen(false)}
        />

        {/* 원재료 정보 모달 */}
        {ingredientInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => {
                  setIngredientInfo(null);
                  setMatchedProducts(null);
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
              <h3 className="text-lg font-bold mb-4">인식된 원재료 정보</h3>
              <ul className="space-y-3">
                {ingredientInfo.map((item) => (
                  <li
                    key={item.name}
                    className="p-3 bg-gray-50 rounded-lg text-left"
                  >
                    <div className="font-semibold text-green-700">{item.name}</div>
                    <div className="text-gray-700 text-sm mt-1">{item.description}</div>
                  </li>
                ))}
              </ul>
              {/* 총합 섭취 주의사항 및 조언 */}
              {matchedProducts && matchedProducts.length > 0 && (
                <div className="mt-6 text-left">
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
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
