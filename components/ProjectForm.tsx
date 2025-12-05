import React from 'react';
import { FileText, FileBadge, FileCode, FolderGit2 } from 'lucide-react';
import { ProjectData, Translation } from '../types';

interface ProjectFormProps {
  data: ProjectData;
  onChange: (data: ProjectData) => void;
  t: Translation;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ data, onChange, t }) => {
  
  const toggle = (field: keyof ProjectData) => {
    onChange({ ...data, [field]: !data[field] });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, name: e.target.value });
  };

  return (
    <div className="space-y-8">
      {/* Project Name Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t.projectName}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={data.name}
            onChange={handleChangeName}
            className="block w-full ps-10 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white transition-all outline-none"
            placeholder="..."
          />
        </div>
      </div>

      {/* File Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t.selectFiles}
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          {/* README Checkbox */}
          <button
            onClick={() => toggle('hasReadme')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${
              data.hasReadme 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            <FileText className={`w-8 h-8 mb-3 ${data.hasReadme ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
            <span className="font-semibold text-sm">{t.fileReadme}</span>
            {data.hasReadme && (
              <div className="absolute top-3 end-3 w-3 h-3 bg-indigo-500 rounded-full" />
            )}
          </button>

          {/* LICENSE Checkbox */}
          <button
            onClick={() => toggle('hasLicense')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${
              data.hasLicense
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            <FileBadge className={`w-8 h-8 mb-3 ${data.hasLicense ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
            <span className="font-semibold text-sm">{t.fileLicense}</span>
            {data.hasLicense && (
              <div className="absolute top-3 end-3 w-3 h-3 bg-indigo-500 rounded-full" />
            )}
          </button>

          {/* SCOPE Checkbox */}
          <button
            onClick={() => toggle('hasScope')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 ${
              data.hasScope
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' 
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            <FileCode className={`w-8 h-8 mb-3 ${data.hasScope ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
            <span className="font-semibold text-sm">{t.fileScope}</span>
            {data.hasScope && (
              <div className="absolute top-3 end-3 w-3 h-3 bg-indigo-500 rounded-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
