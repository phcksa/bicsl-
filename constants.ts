
import { Mask, Question } from './types';

export const JOB_CATEGORIES = [
  'Physician',
  'Nurse',
  'Allied Health',
  'Admin',
  'Support Services',
  'Housekeeping'
];

export const GENDERS = ['Male', 'Female'];

export const MASKS: Mask[] = [
  { id: 'm1', name: '3M 1860 (Small)', imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=200' },
  { id: 'm2', name: '3M 1860 (Regular)', imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=200' },
  { id: 'm3', name: '3M 1870+', imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=200' },
  { id: 'm4', name: 'Halyard Fluidshield (Orange)', imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=200' },
  { id: 'm5', name: 'Gerson 1730', imageUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=200' }
];

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which of the following is the correct order for donning (putting on) PPE?",
    options: [
      "Gloves, Gown, Mask, Eye Protection",
      "Gown, Mask, Eye Protection, Gloves",
      "Mask, Gown, Gloves, Eye Protection",
      "Eye Protection, Mask, Gown, Gloves"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    text: "How long should you perform hand hygiene with an alcohol-based hand rub?",
    options: [
      "5-10 seconds",
      "At least 60 seconds",
      "20-30 seconds",
      "Until your hands are dry, regardless of time"
    ],
    correctIndex: 2
  },
  {
    id: 3,
    text: "N95 respirators must be fit-tested at least:",
    options: [
      "Once every 5 years",
      "Monthly",
      "Annually",
      "Only when hired"
    ],
    correctIndex: 2
  }
];
