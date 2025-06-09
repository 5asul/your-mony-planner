
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
        isRTL ? "ml-2" : "mr-2"
      )}
    >
      <Globe className="w-4 h-4" />
      <span className="font-semibold">
        {language === 'ar' ? 'EN' : 'العربية'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
