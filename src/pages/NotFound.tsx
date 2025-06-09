
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" dir="rtl">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-4">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">الصفحة غير موجودة</h2>
        <p className="text-lg text-gray-600 mb-6">عذراً، لا يمكن العثور على الصفحة المطلوبة</p>
        <div className="space-y-3">
          <a 
            href="/" 
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            العودة للصفحة الرئيسية
          </a>
          <a 
            href="/auth" 
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            صفحة تسجيل الدخول
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          المسار المطلوب: {location.pathname}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
