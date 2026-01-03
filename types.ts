
export type AppStage = 'landing' | 'login' | 'register' | 'dashboard' | 'video' | 'quiz' | 'pending-fit' | 'admin-dashboard';

export type UserStatus = 'REGISTERED' | 'VIDEO_WATCHED' | 'QUIZ_PASSED' | 'FIT_TESTED';

export interface User {
  id: string; // Internal UUID
  kamcId: string;
  password?: string;
  nationalId: string;
  fullName: string;
  dob: string;
  nationality: string;
  department: string;
  jobCategory: string;
  subCategory: string;
  gender: 'Male' | 'Female' | '';
  email: string;
  mobile: string;
  maskType: string;
  status: UserStatus;
}

export interface Mask {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}
