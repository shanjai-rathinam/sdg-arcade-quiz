import React from 'react';
import type { PlayerState, AnswerRecord } from '../../types/game';
import { getSdgByNumber } from '../../data/sdgData';
import { NameInputPhase } from './NameInputPhase';
import { SpinPromptPhase } from './SpinPromptPhase';
import { SplashPhase } from './SplashPhase';
import { QuizPhase } from './QuizPhase';
import { SummaryPhase } from './SummaryPhase';

interface PlayerViewProps {
  playerState: PlayerState;
  onNameSubmitted: (name: string) => void;
  onFinishSplash: () => void;
  onAnswerSubmitted: (record: AnswerRecord) => void;
  onNextQuestion: () => void;
  onQuizCompleted: () => void;
}

export const PlayerView: React.FC<PlayerViewProps> = ({
  playerState,
  onNameSubmitted,
  onFinishSplash,
  onAnswerSubmitted,
  onNextQuestion,
  onQuizCompleted
}) => {
  const currentSdg = (playerState.currentSdgNumber ? getSdgByNumber(playerState.currentSdgNumber) : null) || null;

  return (
    <div className="w-full">
      {/* Step 1: Name Input */}
      {playerState.phase === 'NAME_INPUT' && (
        <NameInputPhase
          playerName={playerState.playerName}
          onNameSubmitted={onNameSubmitted}
        />
      )}

      {/* Step 2: Spin Physical Wheel Prompt */}
      {playerState.phase === 'SPIN_PROMPT' && (
        <SpinPromptPhase
          playerName={playerState.playerName}
        />
      )}

      {/* Step 3: Splash Goal Reveal & Countdown */}
      {playerState.phase === 'SPLASH' && currentSdg && (
        <SplashPhase
          sdg={currentSdg}
          onFinishSplash={onFinishSplash}
        />
      )}

      {/* Step 4: 5-Question Quiz Engine with Fast Facts & 5s Window */}
      {playerState.phase === 'QUIZ' && currentSdg && (
        <QuizPhase
          sdg={currentSdg}
          currentQuestionIndex={playerState.currentQuestionIndex}
          score={playerState.score}
          isPaused={playerState.isPaused}
          onAnswerSubmitted={onAnswerSubmitted}
          onNextQuestion={onNextQuestion}
          onQuizCompleted={onQuizCompleted}
        />
      )}

      {/* Step 5: Victory Summary (No player triggers) */}
      {playerState.phase === 'SUMMARY' && (
        <SummaryPhase
          playerState={playerState}
          sdg={currentSdg}
        />
      )}
    </div>
  );
};
