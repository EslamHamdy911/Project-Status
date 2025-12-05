export type Language = 'ar' | 'en';

export type Theme = 'light' | 'dark';

export enum ProjectStatus {
  OFFICIAL = 'OFFICIAL',
  EXPERIMENTAL = 'EXPERIMENTAL',
  UNDOCUMENTED = 'UNDOCUMENTED',
}

export interface ProjectData {
  name: string;
  hasReadme: boolean;
  hasLicense: boolean;
  hasScope: boolean;
}

export interface Translation {
  title: string;
  desc: string;
  projectName: string;
  selectFiles: string;
  fileReadme: string;
  fileLicense: string;
  fileScope: string;
  statusTitle: string;
  statusOfficial: string;
  statusExperimental: string;
  statusUndocumented: string;
  installApp: string;
  installed: string;
  welcomeTitle: string;
  welcomeDesc: string;
  welcomeStep1: string;
  welcomeStep2: string;
  welcomeStep3: string;
  close: string;
  mode: string;
  lang: string;
}
