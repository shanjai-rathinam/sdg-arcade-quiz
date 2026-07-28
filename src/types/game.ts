export type PhaseState = 'NAME_INPUT' | 'SPIN_PROMPT' | 'SPLASH' | 'QUIZ' | 'SUMMARY';

export interface SDGQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  answerIndex: number;
  explanation: string; // Fast Fact / Did You Know
}

export interface SDGGoal {
  sdgNumber: number;
  title: string;
  color: string;
  iconSvg: string;
  shortDesc: string;
  questions: SDGQuestion[];
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeRemaining: number;
  pointsEarned: number;
}

export interface PlayerState {
  playerName: string;
  phase: PhaseState;
  currentSdgNumber: number | null;
  currentQuestionIndex: number;
  score: number;
  answers: AnswerRecord[];
  isPaused: boolean;
  quizStartTime: number | null;
  completedTimeSeconds: number;
}

export type SyncEventType = 
  | 'SUBMIT_NAME'
  | 'SELECT_SDG'
  | 'START_QUIZ'
  | 'PAUSE_GAME'
  | 'RESUME_GAME'
  | 'NEXT_QUESTION'
  | 'RESET_QUIZ'
  | 'RESET_SESSION'
  | 'UPDATE_PLAYER_STATE'
  | 'PLAYER_JOINED'
  | 'PLAYER_READY'
  | 'PING'
  | 'PONG';

export interface SyncPayload {
  event: SyncEventType;
  sdgNumber?: number;
  playerState?: Partial<PlayerState>;
  timestamp: number;
  senderId?: string;
}

export type RoleMode = 'PLAYER' | 'CONTROLLER';
export type ThemeMode = 'DARK' | 'LIGHT';
