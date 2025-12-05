import React, { useMemo } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { ProjectStatus, Translation, ProjectData } from '../types';

interface StatusCardProps {
  data: ProjectData;
  t: Translation;
}

export const StatusCard: React.FC<StatusCardProps> = ({ data, t }) => {
  const status = useMemo(() => {
    if (data.hasReadme && data.hasLicense && data.hasScope) {
      return ProjectStatus.OFFICIAL;
    }
    if (data.hasReadme) {
      return ProjectStatus.EXPERIMENTAL;
    }
    return ProjectStatus.UNDOCUMENTED;
  }, [data]);

  const config = useMemo(() => {
    switch (status) {
      case ProjectStatus.OFFICIAL:
        return {
          color: 'bg-emerald-500',
          lightColor: 'bg-emerald-50 dark:bg-emerald-900/20',
          borderColor: 'border-emerald-200 dark:border-emerald-800',
          textColor: 'text-emerald-700 dark:text-emerald-400',
          icon: <ShieldCheck className="w-16 h-16 text-emerald-500" />,
          label: t.statusOfficial
        };
      case ProjectStatus.EXPERIMENTAL:
        return {
          color: 'bg-amber-500',
          lightColor: 'bg-amber-50 dark:bg-amber-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
          textColor: 'text-amber-700 dark:text-amber-400',
          icon: <ShieldAlert className="w-16 h-16 text-amber-500" />,
          label: t.statusExperimental
        };
      case ProjectStatus.UNDOCUMENTED:
      default:
        return {
          color: 'bg-rose-500',
          lightColor: 'bg-rose-50 dark:bg-rose-900/20',
          borderColor: 'border-rose-200 dark:border-rose-800',
          textColor: 'text-rose-700 dark:text-rose-400',
          icon: <ShieldX className="w-16 h-16 text-rose-500" />,
          label: t.statusUndocumented
        };
    }
  }, [status, t]);

  return (
    <div className={`w-full p-8 rounded-3xl border-2 ${config.lightColor} ${config.borderColor} transition-all duration-500 shadow-sm`}>
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className={`p-4 rounded-full bg-white dark:bg-slate-800 shadow-md transform transition-transform duration-500 hover:scale-110`}>
          {config.icon}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t.statusTitle}
          </h3>
          <p className={`text-2xl md:text-3xl font-bold ${config.textColor}`}>
            {config.label}
          </p>
        </div>

        {data.name && (
          <div className="mt-4 px-4 py-2 bg-white/50 dark:bg-black/20 rounded-lg">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              {data.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
