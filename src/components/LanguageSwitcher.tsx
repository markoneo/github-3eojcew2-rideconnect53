import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-3 py-2.5 text-neutral-600 hover:text-primary-600 transition-all duration-300 rounded-xl hover:bg-primary-50/50 relative overflow-hidden"
        aria-label="Change language"
      >
        {/* Background hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-primary-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
        
        <div className="relative z-10 flex items-center gap-2">
          <Globe size={18} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden lg:inline font-medium tracking-wide">{currentLanguage.name}</span>
          <span className="lg:hidden text-lg">{currentLanguage.flag}</span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Enhanced dropdown */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-neutral-200/50 py-2 z-50 overflow-hidden">
            {/* Dropdown background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20" />
            
            <div className="relative z-10">
              {languages.map((language, index) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={`w-full text-left px-4 py-3 hover:bg-primary-50/50 flex items-center gap-3 transition-all duration-200 relative overflow-hidden group ${
                    i18n.language === language.code ? 'text-primary-600 bg-primary-50/30 font-semibold' : 'text-neutral-700 hover:text-primary-600'
                  }`}
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-primary-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  
                  <div className="relative z-10 flex items-center gap-3 w-full">
                    <span className="text-xl">{language.flag}</span>
                    <span className="font-medium tracking-wide">{language.name}</span>
                    {i18n.language === language.code && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}