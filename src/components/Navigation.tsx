
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const { signOut, user } = useAuth();
  const { t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'income', label: t('income'), icon: '💰' },
    { id: 'expenses', label: t('expenses'), icon: '💳' },
    { id: 'analysis', label: t('analysis'), icon: '📊' },
    { id: 'planning', label: t('planning'), icon: '🎯' }
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId !== activeTab) {
      onTabChange(tabId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center h-16">
          <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            {t('appTitle')}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100/80 rounded-xl p-2 backdrop-blur-sm">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "relative px-4 lg:px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm lg:text-base overflow-hidden group",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:bg-white/80 hover:text-gray-800 hover:shadow-md hover:scale-102"
                  )}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <span className={cn(
                    "transition-transform duration-300",
                    activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
                  )}>
                    {tab.icon}
                  </span>
                  <span className="relative z-10">{tab.label}</span>
                  
                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg animate-pulse" />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <LanguageToggle />
              
              <Button 
                onClick={signOut} 
                variant="outline" 
                size="sm" 
                className="text-red-600 border-red-200 bg-red-50/80 hover:bg-red-100 hover:border-red-300 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <LogOut className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex justify-between items-center h-14">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('appTitleShort')}
            </h1>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-110",
                isMobileMenuOpen && "bg-gray-100 rotate-180"
              )}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu with improved animations */}
          <div className={cn(
            "absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl transition-all duration-500 ease-out",
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0 max-h-96" 
              : "opacity-0 -translate-y-4 max-h-0 pointer-events-none"
          )}>
            <div className="p-4 space-y-3">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 group relative overflow-hidden",
                    isRTL ? "text-right" : "text-left",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                      : "text-gray-600 hover:bg-gray-50 hover:scale-102 hover:shadow-md"
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                  }}
                >
                  <span className={cn(
                    "text-xl transition-transform duration-300",
                    activeTab === tab.id ? "scale-110" : "group-hover:scale-110"
                  )}>
                    {tab.icon}
                  </span>
                  <span className="flex-1">{tab.label}</span>
                  
                  {/* Active indicator for mobile */}
                  {activeTab === tab.id && (
                    <div className={cn(
                      "absolute w-2 h-2 bg-white rounded-full animate-pulse",
                      isRTL ? "right-3" : "left-3"
                    )} />
                  )}
                </button>
              ))}
              
              <hr className="my-3 border-gray-200" />
              
              <div className="flex gap-3">
                <LanguageToggle />
                
                <Button
                  onClick={signOut}
                  variant="outline"
                  className="flex-1 text-red-600 border-red-200 bg-red-50/80 hover:bg-red-100 hover:border-red-300 transition-all duration-300 hover:scale-102"
                >
                  <LogOut className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                  {t('logoutFull')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
