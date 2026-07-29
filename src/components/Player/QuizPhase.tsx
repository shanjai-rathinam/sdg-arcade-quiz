import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { SDGGoal, SDGQuestion, AnswerRecord } from '../../types/game';
import { TimerBar } from '../TimerBar';
import { Trophy, Pause, CheckCircle, XCircle, Lightbulb, Clock } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface QuizPhaseProps {
  sdg: SDGGoal;
  currentQuestionIndex: number;
  score: number;
  isPaused: boolean;
  onAnswerSubmitted: (record: AnswerRecord) => void;
  onNextQuestion: () => void;
  onQuizCompleted: () => void;
}

export const QuizPhase: React.FC<QuizPhaseProps> = ({
  sdg,
  currentQuestionIndex,
  score,
  isPaused,
  onAnswerSubmitted,
  onNextQuestion,
  onQuizCompleted
}) => {
  const currentQuestion: SDGQuestion = sdg.questions[currentQuestionIndex] || sdg.questions[0];
  const isFinalQuestion = currentQuestionIndex >= (sdg.questions.length - 1);

  // 30-Second Question Duration for deep reading
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [pointsEarned, setPointsEarned] = useState<number | null>(null);
  const [transitionCountdown, setTransitionCountdown] = useState<number | null>(null);

  const timeRemainingRef = useRef(30);
  const isAnsweredRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep timeRemainingRef updated
  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  // Handle option select or timeout
  const handleSelectOption = useCallback((optionIdx: number | null) => {
    if (isAnsweredRef.current || isPaused) return;

    isAnsweredRef.current = true;
    setIsAnswered(true);
    setSelectedOption(optionIdx);

    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = optionIdx === currentQuestion.answerIndex;
    const remTime = timeRemainingRef.current;
    const earned = isCorrect ? 100 + (remTime * 5) : 0;
    setPointsEarned(earned);

    if (isCorrect) {
      audioService.playCorrect();
    } else {
      audioService.playWrong();
    }

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      selectedIndex: optionIdx !== null ? optionIdx : -1,
      isCorrect,
      timeRemaining: remTime,
      pointsEarned: earned
    };

    onAnswerSubmitted(record);

    // Start 5-Second Window Timer before progressing
    setTransitionCountdown(5);

    if (transitionRef.current) clearInterval(transitionRef.current);
    let remTransition = 5;

    transitionRef.current = setInterval(() => {
      remTransition -= 1;
      setTransitionCountdown(remTransition);

      if (remTransition <= 0) {
        if (transitionRef.current) clearInterval(transitionRef.current);
        if (currentQuestionIndex + 1 >= sdg.questions.length) {
          onQuizCompleted();
        } else {
          onNextQuestion();
        }
      } else {
        audioService.playTimerTick();
      }
    }, 1000);
  }, [isPaused, currentQuestion, onAnswerSubmitted, currentQuestionIndex, sdg.questions.length, onQuizCompleted, onNextQuestion]);

  // 30-second Question Countdown Timer
  useEffect(() => {
    isAnsweredRef.current = false;
    setIsAnswered(false);
    setSelectedOption(null);
    setPointsEarned(null);
    setTransitionCountdown(null);
    setTimeRemaining(30);
    timeRemainingRef.current = 30;

    if (timerRef.current) clearInterval(timerRef.current);
    if (transitionRef.current) clearInterval(transitionRef.current);

    timerRef.current = setInterval(() => {
      if (isPaused) return;

      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSelectOption(null); // Time out
          return 0;
        }
        if (prev <= 5) {
          audioService.playTimerTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (transitionRef.current) clearInterval(transitionRef.current);
    };
  }, [currentQuestionIndex, isPaused, handleSelectOption]);

  return (
    <div className="max-w-4xl sm:max-w-5xl mx-auto space-y-6 animate-slide-up relative pb-10">
      {/* Paused Overlay */}
      {isPaused && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 bg-slate-950/95 backdrop-blur-md rounded-3xl text-center text-white animate-scale-in">
          <Pause className="w-20 h-20 text-amber-400 animate-pulse mb-4" />
          <h3 className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-heading">GAME PAUSED BY OPERATOR</h3>
          <p className="text-lg text-slate-300 mt-3 font-semibold">Please wait for the host to resume...</p>
        </div>
      )}

      {/* Header Bar */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border-2 border-slate-700/60 light:border-slate-300 flex items-center justify-between shadow-xl">
        {/* Goal Badge */}
        <div className="flex items-center space-x-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0"
            style={{ backgroundColor: sdg.color }}
          >
            #{sdg.sdgNumber}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-400 light:text-slate-500">
              QUESTION {currentQuestionIndex + 1} OF 5
            </div>
            <div className="text-lg sm:text-2xl font-black text-white light:text-slate-900 font-heading line-clamp-1">
              {sdg.title}
            </div>
          </div>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-400 font-black text-lg sm:text-2xl shadow-md">
          <Trophy className="w-6 h-6" />
          <span>{score} pts</span>
        </div>
      </div>

      {/* 30-Second Timer Bar */}
      <div className="glass-panel p-4 rounded-2xl border-2 border-slate-700/60 light:border-slate-300 shadow-md">
        <TimerBar timeRemaining={timeRemaining} totalTime={30} color={sdg.color} />
      </div>

      {/* Main Question Card */}
      <div 
        className="glass-panel p-8 sm:p-12 rounded-3xl border-3 shadow-2xl space-y-8 relative overflow-hidden transition-all"
        style={{ borderColor: `${sdg.color}66` }}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl sm:text-4xl font-black text-white light:text-slate-900 leading-snug tracking-tight font-heading">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Option Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQuestion.answerIndex;

            let buttonStyle = 'bg-slate-950/70 light:bg-white border-slate-800 light:border-slate-300 text-slate-100 light:text-slate-900 hover:border-unblue';
            
            if (isAnswered) {
              if (isCorrectOption) {
                buttonStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-xl shadow-emerald-500/20 ring-4 ring-emerald-500';
              } else if (isSelected && !isCorrectOption) {
                buttonStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 animate-shake';
              } else {
                buttonStyle = 'opacity-40 bg-slate-950/40 border-transparent text-slate-500';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered || isPaused}
                className={`w-full text-left p-6 sm:p-7 rounded-2xl border-3 font-extrabold text-base sm:text-xl transition-all duration-200 flex items-center justify-between space-x-4 shadow-lg transform active:scale-98 ${buttonStyle}`}
              >
                <div className="flex items-start space-x-4">
                  <span className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-200 light:text-slate-800 text-base sm:text-lg font-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug pt-1">{opt}</span>
                </div>

                {isAnswered && isCorrectOption && (
                  <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrectOption && (
                  <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* 5-Second Window Fast Fact & Countdown Card */}
        {isAnswered && (
          <div className="pt-6 border-t-2 border-slate-700/60 light:border-slate-200 animate-scale-in space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`text-sm sm:text-base font-black uppercase tracking-wider flex items-center space-x-2 ${pointsEarned && pointsEarned > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                <span>{pointsEarned && pointsEarned > 0 ? `+${pointsEarned} POINTS EARNED!` : '0 POINTS'}</span>
              </span>
              
              {/* 5s Window Timer Indicator */}
              <span className="text-sm sm:text-lg font-black text-amber-400 flex items-center space-x-2 animate-pulse">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>
                  {isFinalQuestion
                    ? `Exiting to Results Lobby in ${transitionCountdown ?? 5}s...`
                    : `Next question in ${transitionCountdown ?? 5}s...`}
                </span>
              </span>
            </div>

            {/* Fact Box */}
            <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-200 text-base sm:text-xl font-medium space-y-2 shadow-lg">
              <div className="font-black uppercase text-amber-400 text-sm sm:text-base tracking-wider flex items-center space-x-2 font-heading">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>DID YOU KNOW?</span>
              </div>
              <p className="leading-relaxed text-slate-100 light:text-slate-900 font-bold">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
