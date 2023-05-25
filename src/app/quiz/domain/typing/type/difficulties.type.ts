export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type Difficulties = typeof DIFFICULTIES[number];
