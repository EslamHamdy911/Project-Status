import React from 'react';
import { X, Info, CheckCircle } from 'lucide-react';
import { Translation } from '../types';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translation;
  isRtl: boolean;
}

export const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose, t, isRtl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Info className="w-6 h-6" />
            {t.welcomeTitle}
          </h2>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.welcomeDesc}
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400 mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-slate-700 dark:text-slate-200">{t.welcomeStep1}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400 mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-slate-700 dark:text-slate-200">{t.welcomeStep2}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400 mt-1">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-slate-700 dark:text-slate-200">{t.welcomeStep3}</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition-all active:scale-95"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
