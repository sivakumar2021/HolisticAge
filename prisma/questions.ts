import { ComponentType, QuestionType } from "../src/generated/prisma/enums";

export interface QuestionSeed {
  component: ComponentType;
  type: QuestionType;
  text: string;
  order: number;
}

// 2 questions per component (1 graded 0-5, 1 yes/no) x 9 components = 18 total.
export const QUESTION_BANK: QuestionSeed[] = [
  {
    component: ComponentType.MENTAL,
    type: QuestionType.GRADED,
    order: 0,
    text: "Over the past month, how would you rate your mental clarity and ability to focus on tasks?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Do you regularly engage in activities that challenge your memory or learning (e.g., puzzles, reading, learning new skills)?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.GRADED,
    order: 0,
    text: "How would you rate your current physical energy and stamina throughout a typical day?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Do you engage in moderate-to-vigorous exercise at least 3 times per week?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.GRADED,
    order: 0,
    text: "How confident do you feel handling a significant unexpected expense (e.g., $1,000) without financial stress?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Do you have a clear budget or plan you follow for savings, spending, and long-term goals?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.GRADED,
    order: 0,
    text: "How fulfilled do you feel by the purpose, growth, and impact of your current work?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Have you developed a new skill or taken a growth opportunity at work in the past 6 months?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.GRADED,
    order: 0,
    text: "How would you rate the depth of trust and emotional connection in your closest relationships?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Do you have at least one person you could call for support during a difficult time, day or night?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.GRADED,
    order: 0,
    text: "How connected do you feel to a community or social group (friends, neighborhood, hobby/faith group)?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Have you participated in a social or community activity/event in the past month?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.GRADED,
    order: 0,
    text: "How would you rate the consistency of your daily routines around sleep, nutrition, and self-care?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Do you typically get 7+ hours of sleep on most nights?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.GRADED,
    order: 0,
    text: "How curious and open do you feel about learning new ideas, skills, or perspectives?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Have you learned something substantially new (a skill, subject, or hobby) in the past 3 months?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.GRADED,
    order: 0,
    text: "How strong is your sense of purpose and direction in life right now?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.YES_NO,
    order: 1,
    text: "Do you feel your daily actions are meaningfully connected to something larger than yourself (your values, goals, or contribution to others)?",
  },
];
