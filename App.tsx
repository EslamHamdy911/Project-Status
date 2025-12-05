import React, { useState, useEffect } from 'react';
import { Moon, Sun, Languages, Download, Smartphone } from 'lucide-react';
import { TRANSLATIONS } from './constants';
import { Language, Theme, ProjectData } from './types';
import { ProjectForm } from './components/ProjectForm';
import { StatusCard } from './components/StatusCard';
import { IntroModal } from './components/IntroModal';

const App: React.FC = () => {
  // State
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('light');
  const [showModal, setShowModal] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    hasReadme: false,
    hasLicense: false,
    hasScope: false
  });

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Effects
  useEffect(() => {
    // Check local storage for preferences
    const savedLang = localStorage.getItem('lang') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);

    // PWA Install Prompt Listener
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  useEffect(() => {
    // Apply theme to html element
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Handlers
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      
      {/* Intro Modal */}
      <IntroModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        t={t}
        isRtl={isRtl}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Smartphone className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 hidden sm:block">
              {t.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Install Button (Only if prompt available) */}
            {deferredPrompt && (
              <button 
                onClick={handleInstallClick}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">{t.installApp}</span>
              </button>
            )}

            <button 
              onClick={toggleLang}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.lang}
            >
              <Languages className="w-5 h-5" />
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.mode}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t.desc}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-8 border border-slate-100 dark:border-slate-700">
          <ProjectForm 
            data={projectData} 
            onChange={setProjectData} 
            t={t} 
          />
          
          <div className="border-t border-slate-100 dark:border-slate-700 pt-8">
            <StatusCard 
              data={projectData} 
              t={t} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
