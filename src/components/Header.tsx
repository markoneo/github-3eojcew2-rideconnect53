import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from './ui/Button';
import PartnerApplicationForm from './partner/PartnerApplicationForm';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import AnimatedContainer from './ui/AnimatedContainer';

export default function Header() {
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Book Now', href: '#booking' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Partners', href: '#partners' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-neutral-200/50' 
            : 'bg-white/95 backdrop-blur-md shadow-md'
        }`}
      >
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-blue-600/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="section-container py-4 lg:py-5 relative">
          <div className="flex items-center justify-between">
            <AnimatedContainer animation="slideLeft" delay={100}>
              <div className="flex items-center">
                <Logo className="transform hover:scale-105 transition-transform duration-300" />
                {/* Subtle glow effect behind logo */}
                <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </AnimatedContainer>

            {/* Mobile menu button with enhanced styling */}
            <button
              className={`md:hidden relative overflow-hidden group p-3 rounded-xl transition-all duration-300 focus-ring ${
                isMenuOpen 
                  ? 'bg-primary-600 text-white shadow-lg' 
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
              
              <div className="relative z-10 transition-transform duration-300">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
            
            {/* Desktop Navigation with enhanced styling */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link, index) => (
                <AnimatedContainer key={link.name} animation="slideUp" delay={200 + index * 50}>
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="relative group px-4 py-2.5 text-neutral-700 font-medium transition-all duration-300 hover:text-primary-600 rounded-xl overflow-hidden"
                  >
                    {/* Hover background with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-xl" />
                    
                    {/* Text with enhanced typography */}
                    <span className="relative z-10 font-semibold tracking-wide">{link.name}</span>
                    
                    {/* Modern underline effect */}
                    <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full" />
                    
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-primary-400/10 blur-sm transition-opacity duration-500" />
                  </button>
                </AnimatedContainer>
              ))}
              
              <div className="h-6 w-px bg-neutral-200 mx-3" />
              
              <AnimatedContainer animation="slideRight" delay={400}>
                <LanguageSwitcher />
              </AnimatedContainer>
              
              <AnimatedContainer animation="scaleIn" delay={500}>
                <Button 
                  variant="secondary"
                  onClick={() => setShowForm(true)}
                  className="relative overflow-hidden group ml-3 px-6 py-2.5 font-semibold tracking-wide border-2 border-primary-600 hover:border-primary-700 transition-all duration-300"
                  size="small"
                >
                  {/* Premium button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  
                  {/* Button text */}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Become Partner
                  </span>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </AnimatedContainer>
            </nav>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <nav className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-neutral-200/50 shadow-xl overflow-hidden">
              {/* Mobile nav background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30" />
              
              <div className="relative z-10 p-6">
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link, index) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href.replace('#', ''))}
                      className="group text-left px-4 py-3 text-neutral-600 hover:text-primary-600 font-semibold transition-all duration-300 rounded-xl hover:bg-primary-50/50 relative overflow-hidden"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {/* Mobile nav item hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-primary-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                      
                      <span className="relative z-10 tracking-wide">{link.name}</span>
                    </button>
                  ))}
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent my-3" />
                  
                  <div className="px-4 py-2">
                    <LanguageSwitcher />
                  </div>
                  
                  <div className="px-4 pt-3">
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        setShowForm(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-center relative overflow-hidden group border-2 border-primary-600 font-semibold tracking-wide"
                      size="small"
                    >
                      {/* Mobile button animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Become Partner
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced spacer with dynamic height */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}></div>

      {showForm && <PartnerApplicationForm onClose={() => setShowForm(false)} />}
    </>
  );
}