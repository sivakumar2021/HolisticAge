import { ComponentType, QuestionType } from "../src/generated/prisma/enums";

export interface QuestionSeed {
  component: ComponentType;
  type: QuestionType;
  text: string;
  order: number;
}

// 10 questions per component (5 graded 0-5, 5 yes/no) x 9 components = 90 total.
// All yes/no questions are phrased so "Yes" is the better outcome, matching
// normalizeYesNo (Yes=100/No=0) — keep this polarity for any future additions.
export const QUESTION_BANK: QuestionSeed[] = [
  // ---------- MENTAL ----------
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
    component: ComponentType.MENTAL,
    type: QuestionType.GRADED,
    order: 2,
    text: "How well are you able to manage stress and stay calm under pressure?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you regularly practice any form of relaxation or mindfulness (meditation, deep breathing, journaling)?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.GRADED,
    order: 4,
    text: "How would you rate your ability to concentrate on a task without getting distracted?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Do you feel you have effective ways to manage stress when it comes up?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.GRADED,
    order: 6,
    text: "How often do you feel mentally sharp and quick to process new information?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you take deliberate breaks to rest your mind during a busy day?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.GRADED,
    order: 8,
    text: "How well-rested and mentally clear do you feel most mornings?",
  },
  {
    component: ComponentType.MENTAL,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you feel in control of your thoughts and emotions most days?",
  },

  // ---------- PHYSICAL ----------
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
    component: ComponentType.PHYSICAL,
    type: QuestionType.GRADED,
    order: 2,
    text: "How would you rate your overall physical strength for everyday tasks (lifting, carrying, climbing stairs)?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you get up and move around at least once every hour during a typical day?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.GRADED,
    order: 4,
    text: "How flexible and mobile does your body feel (bending, reaching, twisting without stiffness)?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Do you eat a balanced diet with regular meals most days?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.GRADED,
    order: 6,
    text: "How well do you recover physically after a demanding day or workout?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you get a routine physical check-up or health screening at least once a year?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.GRADED,
    order: 8,
    text: "How would you rate the quality of your posture and physical comfort during the day?",
  },
  {
    component: ComponentType.PHYSICAL,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Are you able to comfortably climb a few flights of stairs without becoming overly winded?",
  },

  // ---------- FINANCIAL ----------
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
    component: ComponentType.FINANCIAL,
    type: QuestionType.GRADED,
    order: 2,
    text: "How confident are you in your ability to pay all your bills on time each month?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you regularly set aside money in savings or investments?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.GRADED,
    order: 4,
    text: "How well are you progressing toward your longer-term financial goals (retirement, home, education, etc.)?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Do you know roughly how much debt you currently owe, if any?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.GRADED,
    order: 6,
    text: "How much control do you feel you have over your day-to-day spending decisions?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you review your finances (spending, saving, bills) at least once a month?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.GRADED,
    order: 8,
    text: "How would you rate your understanding of your own financial situation (income, debts, savings)?",
  },
  {
    component: ComponentType.FINANCIAL,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you feel your income is enough to cover your needs without ongoing financial strain?",
  },

  // ---------- CAREER ----------
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
    component: ComponentType.CAREER,
    type: QuestionType.GRADED,
    order: 2,
    text: "How would you rate the sense of purpose you get from your day-to-day work?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you feel you have opportunities to grow or advance in your current path?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.GRADED,
    order: 4,
    text: "How satisfied are you with the recognition you receive for your work?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Do you feel comfortable voicing your ideas or opinions in your work environment?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.GRADED,
    order: 6,
    text: "How well do your daily tasks match your skills and strengths?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you have a clear sense of what you want to achieve in your work over the next few years?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.GRADED,
    order: 8,
    text: "How would you rate your work-life balance right now?",
  },
  {
    component: ComponentType.CAREER,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you feel your work is respected and valued by those around you?",
  },

  // ---------- RELATIONSHIPS ----------
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
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.GRADED,
    order: 2,
    text: "How satisfied are you with the quality of communication in your closest relationships?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you make an effort to regularly check in with the people who matter most to you?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.GRADED,
    order: 4,
    text: "How often do you feel truly listened to and understood by those close to you?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Do you feel comfortable being open and vulnerable with at least one person in your life?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.GRADED,
    order: 6,
    text: "How well do you resolve conflicts or disagreements in your important relationships?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Have you expressed appreciation or gratitude to someone close to you in the past week?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.GRADED,
    order: 8,
    text: "How satisfied are you with the amount of quality time you spend with people you care about?",
  },
  {
    component: ComponentType.RELATIONSHIPS,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you feel your closest relationships are mutually supportive (both giving and receiving support)?",
  },

  // ---------- SOCIAL ----------
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
    component: ComponentType.SOCIAL,
    type: QuestionType.GRADED,
    order: 2,
    text: "How connected do you feel to the people in your neighborhood or local area?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Are you an active member of any club, group, team, or organization?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.GRADED,
    order: 4,
    text: "How comfortable do you feel meeting new people or making new friends?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Have you reached out to a friend or acquaintance just to catch up in the past month?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.GRADED,
    order: 6,
    text: "How would you rate the size and strength of your social support network?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you have people in your life you can be social with spontaneously (not just planned events)?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.GRADED,
    order: 8,
    text: "How included do you feel in group activities or gatherings you take part in?",
  },
  {
    component: ComponentType.SOCIAL,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you feel you contribute positively to your community in some way?",
  },

  // ---------- HABITS ----------
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
    component: ComponentType.HABITS,
    type: QuestionType.GRADED,
    order: 2,
    text: "How would you rate the quality of your diet and nutrition overall?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you limit alcohol consumption to moderate levels (or not drink at all)?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.GRADED,
    order: 4,
    text: "How well do you manage screen time and avoid overuse of phones or devices?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Do you avoid smoking or using tobacco/nicotine products?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.GRADED,
    order: 6,
    text: "How disciplined are you about maintaining habits you know are good for you?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you have a consistent wind-down routine before bed?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.GRADED,
    order: 8,
    text: "How well do you keep your living and work space organized and manageable?",
  },
  {
    component: ComponentType.HABITS,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you drink enough water and stay properly hydrated most days?",
  },

  // ---------- LEARNING ----------
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
    component: ComponentType.LEARNING,
    type: QuestionType.GRADED,
    order: 2,
    text: "How open are you to changing your opinion when presented with new information?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you regularly read books, articles, or other material to expand your knowledge?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.GRADED,
    order: 4,
    text: "How would you rate your comfort level with new technology or unfamiliar tools?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Have you asked someone to teach you something or mentor you in the past year?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.GRADED,
    order: 6,
    text: "How often do you seek out feedback to improve at something?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you enjoy exploring topics outside your usual area of expertise?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.GRADED,
    order: 8,
    text: "How would you rate your ability to adapt when plans or circumstances change unexpectedly?",
  },
  {
    component: ComponentType.LEARNING,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Do you set specific goals for things you want to learn or improve at?",
  },

  // ---------- PURPOSE ----------
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
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.GRADED,
    order: 2,
    text: "How clear are you on what your core personal values are?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.YES_NO,
    order: 3,
    text: "Do you regularly set personal goals for yourself, big or small?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.GRADED,
    order: 4,
    text: "How meaningful do you find your daily activities, overall?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.YES_NO,
    order: 5,
    text: "Have you helped or contributed to someone else's wellbeing in the past month?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.GRADED,
    order: 6,
    text: "How optimistic do you feel about your future direction in life?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.YES_NO,
    order: 7,
    text: "Do you feel like you're actively growing as a person, rather than standing still?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.GRADED,
    order: 8,
    text: "How aligned do your daily choices feel with what matters most to you?",
  },
  {
    component: ComponentType.PURPOSE,
    type: QuestionType.YES_NO,
    order: 9,
    text: "Would you say you have a reason to look forward to most days?",
  },
];
