
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageToggle = () => {
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className={cn(
        "transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center gap-2",
        "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300",
        "text-blue-700 hover:text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100",
        "shadow-sm hover:shadow-md",
        isRTL ? "ml-2" : "mr-2"
      )}
    >
      <Globe className="w-4 h-4" />
      <span className="font-semibold text-sm">
        {language === 'ar' ? 'EN' : 'العربية'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
