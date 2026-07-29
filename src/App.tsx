import { useState, useEffect, useCallback } from 'react';
import type { RoleMode, ThemeMode, PlayerState, AnswerRecord, SyncPayload } from './types/game';
import { syncService } from './services/syncService';
import { Navbar } from './components/Navbar';
import { QrModal } from './components/QrModal';
import { ControllerView } from './components/Controller/ControllerView';
import { PlayerView } from './components/Player/PlayerView';
import { InstitutionFooter } from './components/InstitutionFooter';

export function App() {
  // Determine role based on URL path (/controller vs /player) or query parameter (?role=controller)
  const [role] = useState<RoleMode>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const queryRole = params.get('role')?.toUpperCase() || params.get('view')?.toUpperCase();

      if (pathname.includes('/controller') || queryRole === 'CONTROLLER') {
        return 'CONTROLLER';
      }
    }
    return 'PLAYER'; // Default to Player Client
  });

  // Room Code: Auto-extracted from URL query ?room=... or default generated for controller
  const [roomCode, setRoomCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryRoom = params.get('room')?.toUpperCase() || params.get('code')?.toUpperCase();
      if (queryRoom) {
        return queryRoom;
      }
    }
    // Generate clean 4-digit room code for controller booth
    const randNum = Math.floor(1000 + Math.random() * 9000);
    return `SDG-${randNum}`;
  });

  const [theme, setTheme] = useState<ThemeMode>('DARK');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const [selectedSdgNum, setSelectedSdgNum] = useState<number | null>(13); // Default SDG 13

  const [playerState, setPlayerState] = useState<PlayerState>({
    playerName: 'Eco Player',
    phase: 'NAME_INPUT',
    currentSdgNumber: 13,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isPaused: false,
    quizStartTime: null,
    completedTimeSeconds: 0
  });

  // Sync theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'LIGHT') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  // Initialize Room & Cross-Device P2P WebRTC Connection
  useEffect(() => {
    syncService.initRoom(roomCode, role === 'CONTROLLER');
    setIsConnected(syncService.isConnected);
  }, [roomCode, role]);

  // Sync state broadcast listener across devices and rooms
  useEffect(() => {
    const unsubscribe = syncService.subscribe((payload: SyncPayload) => {
      switch (payload.event) {
        case 'SELECT_SDG':
          if (payload.sdgNumber) {
            setSelectedSdgNum(payload.sdgNumber);
            setPlayerState(prev => ({
              ...prev,
              currentSdgNumber: payload.sdgNumber ?? null
            }));
          }
          break;

        case 'START_QUIZ':
          if (payload.sdgNumber) {
            setSelectedSdgNum(payload.sdgNumber);
          }
          setPlayerState(prev => ({
            ...prev,
            phase: 'SPLASH',
            currentSdgNumber: payload.sdgNumber || prev.currentSdgNumber || 13,
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            isPaused: false,
            quizStartTime: Date.now()
          }));
          break;

        case 'PAUSE_GAME':
          setPlayerState(prev => ({ ...prev, isPaused: true }));
          break;

        case 'RESUME_GAME':
          setPlayerState(prev => ({ ...prev, isPaused: false }));
          break;

        case 'NEXT_QUESTION':
          setPlayerState(prev => ({
            ...prev,
            currentQuestionIndex: Math.min(4, prev.currentQuestionIndex + 1)
          }));
          break;

        case 'RESET_QUIZ':
          setPlayerState(prev => ({
            ...prev,
            phase: 'NAME_INPUT',
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            isPaused: false
          }));
          break;

        case 'RESET_SESSION':
          setSelectedSdgNum(null);
          setPlayerState({
            playerName: 'Eco Player',
            phase: 'NAME_INPUT',
            currentSdgNumber: null,
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            isPaused: false,
            quizStartTime: null,
            completedTimeSeconds: 0
          });
          break;

        case 'UPDATE_PLAYER_STATE':
          if (payload.playerState) {
            setPlayerState(prev => ({ ...prev, ...payload.playerState }));
          }
          break;

        case 'PLAYER_READY':
          setPlayerState(prev => ({
            ...prev,
            phase: 'NAME_INPUT',
            currentQuestionIndex: 0,
            answers: [],
            score: 0
          }));
          break;

        default:
          break;
      }
      setIsConnected(true);
    });

    return () => unsubscribe();
  }, []);

  // Host Actions (Controller)
  const handleSelectSdg = (sdgNum: number) => {
    setSelectedSdgNum(sdgNum);
    setPlayerState(prev => ({ ...prev, currentSdgNumber: sdgNum }));
    syncService.publish({ event: 'SELECT_SDG', sdgNumber: sdgNum });
  };

  const handleTriggerStart = () => {
    const targetSdg = selectedSdgNum || 13;
    setPlayerState(prev => ({
      ...prev,
      phase: 'SPLASH',
      currentSdgNumber: targetSdg,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isPaused: false
    }));
    syncService.publish({ event: 'START_QUIZ', sdgNumber: targetSdg });
  };

  const handleTogglePause = () => {
    const nextPaused = !playerState.isPaused;
    setPlayerState(prev => ({ ...prev, isPaused: nextPaused }));
    syncService.publish({ event: nextPaused ? 'PAUSE_GAME' : 'RESUME_GAME' });
  };

  const handleNextQuestion = useCallback(() => {
    setPlayerState(prev => {
      const nextIdx = Math.min(4, prev.currentQuestionIndex + 1);
      syncService.publish({ event: 'NEXT_QUESTION' });
      return { ...prev, currentQuestionIndex: nextIdx };
    });
  }, []);

  const handleResetQuiz = () => {
    setPlayerState(prev => ({
      ...prev,
      phase: 'NAME_INPUT',
      currentQuestionIndex: 0,
      score: 0,
      answers: []
    }));
    syncService.publish({ event: 'RESET_QUIZ' });
  };

  const handleResetSession = () => {
    setSelectedSdgNum(null);
    setPlayerState({
      playerName: 'Eco Player',
      phase: 'NAME_INPUT',
      currentSdgNumber: null,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isPaused: false,
      quizStartTime: null,
      completedTimeSeconds: 0
    });
    syncService.publish({ event: 'RESET_SESSION' });
  };

  // Player Actions
  const handleNameSubmitted = (name: string, inputRoom?: string) => {
    const activeRoom = inputRoom || roomCode;
    if (activeRoom !== roomCode) {
      setRoomCode(activeRoom);
      syncService.initRoom(activeRoom, role === 'CONTROLLER');
    }

    setPlayerState(prev => ({
      ...prev,
      playerName: name,
      phase: 'SPIN_PROMPT'
    }));
    syncService.publish({
      event: 'UPDATE_PLAYER_STATE',
      playerState: { playerName: name, phase: 'SPIN_PROMPT' }
    });
  };

  const handleFinishSplash = useCallback(() => {
    setPlayerState(prev => ({ ...prev, phase: 'QUIZ' }));
    syncService.publish({
      event: 'UPDATE_PLAYER_STATE',
      playerState: { phase: 'QUIZ' }
    });
  }, []);

  const handleAnswerSubmitted = useCallback((record: AnswerRecord) => {
    setPlayerState(prev => {
      const updatedAnswers = [...prev.answers, record];
      const updatedScore = prev.score + record.pointsEarned;
      const newState: PlayerState = {
        ...prev,
        score: updatedScore,
        answers: updatedAnswers
      };
      syncService.publish({
        event: 'UPDATE_PLAYER_STATE',
        playerState: { score: updatedScore, answers: updatedAnswers }
      });
      return newState;
    });
  }, []);

  const handleQuizCompleted = useCallback(() => {
    setPlayerState(prev => {
      const newState: PlayerState = {
        ...prev,
        phase: 'SUMMARY',
        completedTimeSeconds: prev.quizStartTime ? Math.round((Date.now() - prev.quizStartTime) / 1000) : 30
      };
      syncService.publish({
        event: 'UPDATE_PLAYER_STATE',
        playerState: { phase: 'SUMMARY' }
      });
      return newState;
    });
  }, []);

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${theme === 'DARK' ? 'bg-arcadeDark text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <div>
        {/* Top Navbar */}
        <Navbar
          role={role}
          theme={theme}
          setTheme={setTheme}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onOpenQrModal={() => setIsQrModalOpen(true)}
          isConnected={isConnected}
          roomCode={roomCode}
        />

        {/* Main Container */}
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          {role === 'CONTROLLER' ? (
            <ControllerView
              selectedSdgNum={selectedSdgNum}
              onSelectSdg={handleSelectSdg}
              playerState={playerState}
              onTriggerStart={handleTriggerStart}
              onTogglePause={handleTogglePause}
              onResetQuiz={handleResetQuiz}
              onResetSession={handleResetSession}
            />
          ) : (
            <PlayerView
              playerState={playerState}
              roomCode={roomCode}
              onNameSubmitted={handleNameSubmitted}
              onFinishSplash={handleFinishSplash}
              onAnswerSubmitted={handleAnswerSubmitted}
              onNextQuestion={handleNextQuestion}
              onQuizCompleted={handleQuizCompleted}
            />
          )}
        </main>
      </div>

      {/* Subtle Non-Disruptive Institution Footer */}
      <InstitutionFooter />

      {/* QR Code Join Modal (Controller view only) */}
      {role === 'CONTROLLER' && (
        <QrModal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          roomCode={roomCode}
        />
      )}
    </div>
  );
}

export default App;
