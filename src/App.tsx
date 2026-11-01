import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Flame,
  Sparkles,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  Gamepad2,
  HelpCircle,
  Search
} from 'lucide-react';
import {
  POKEMON_LIST,
  GENERATION_INFO,
  TYPE_LABELS,
  PokemonEntry,
  getPokemonImageUrl,
  getPokemonCryUrl
} from './data/pokemon';

type GenId = 1 | 2 | 3;
type GameMode = 'quiz' | 'pokedex';
type SessionLength = 10 | 20 | 0; // 0 = infini

interface QuestionState {
  target: PokemonEntry;
  options: PokemonEntry[];
  selectedId: number | null;
  isCorrect: boolean | null;
  hintUsed: boolean;
}

const STORAGE_KEY_DISCOVERED = 'pokequiz_discovered_ids_v1';
const STORAGE_KEY_BEST_STREAK = 'pokequiz_best_streak_v1';

export default function App() {
  // Navigation & Settings
  const [activeTab, setActiveTab] = useState<GameMode>('quiz');
  const [selectedGens, setSelectedGens] = useState<GenId[]>([1, 2, 3]);
  const [silhouetteMode, setSilhouetteMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [sessionLength, setSessionLength] = useState<SessionLength>(10);

  // Quiz State
  const [question, setQuestion] = useState<QuestionState | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BEST_STREAK);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [sessionFinished, setSessionFinished] = useState<boolean>(false);
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{ pokemon: PokemonEntry; correct: boolean }>>([]);

  // Pokédex State
  const [discoveredIds, setDiscoveredIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DISCOVERED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [pokedexFilterGen, setPokedexFilterGen] = useState<GenId | 'all'>('all');
  const [pokedexSearch, setPokedexSearch] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filtered pool of Pokémon based on selected generations
  const availablePokemon = useMemo(() => {
    return POKEMON_LIST.filter((p) => selectedGens.includes(p.gen));
  }, [selectedGens]);

  // Save discovered IDs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DISCOVERED, JSON.stringify(discoveredIds));
    } catch {
      // ignore storage errors
    }
  }, [discoveredIds]);

  // Save best streak
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BEST_STREAK, String(bestStreak));
    } catch {
      // ignore
    }
  }, [bestStreak]);

  const playCry = useCallback((id: number) => {
    if (!soundEnabled) return;
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(getPokemonCryUrl(id));
      audio.volume = 0.35;
      audioRef.current = audio;
      audio.play().catch(() => {});
    } catch {
      // ignore audio error
    }
  }, [soundEnabled]);

  const generateQuestion = useCallback((pool: PokemonEntry[], recent: number[]) => {
    if (pool.length < 4) return;

    // Filter out recently asked Pokémon so we don't repeat immediately
    const maxRecent = Math.min(25, Math.floor(pool.length / 2));
    const candidates = pool.filter((p) => !recent.slice(-maxRecent).includes(p.id));
    const targetPool = candidates.length > 0 ? candidates : pool;
    const target = targetPool[Math.floor(Math.random() * targetPool.length)];

    // Pick 3 distractors from the pool
    const others = pool.filter((p) => p.id !== target.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3);

    const options = [target, ...distractors].sort(() => Math.random() - 0.5);

    setImageLoaded(false);
    setQuestion({
      target,
      options,
      selectedId: null,
      isCorrect: null,
      hintUsed: false,
    });

    // Preload image
    const img = new Image();
    img.src = getPokemonImageUrl(target.id);
  }, []);

  // Initialize first question or reset when generations change
  useEffect(() => {
    generateQuestion(availablePokemon, []);
    setQuestionNumber(1);
    setScore(0);
    setSessionFinished(false);
    setHistory([]);
  }, [availablePokemon, generateQuestion]);

  const toggleGeneration = (gen: GenId) => {
    setSelectedGens((prev) => {
      if (prev.includes(gen)) {
        if (prev.length === 1) return prev; // Keep at least 1 generation active
        return prev.filter((g) => g !== gen).sort() as GenId[];
      }
      return [...prev, gen].sort() as GenId[];
    });
  };

  const handleAnswer = useCallback(
    (option: PokemonEntry) => {
      if (!question || question.selectedId !== null) return;

      const isCorrect = option.id === question.target.id;
      setQuestion((prev) =>
        prev ? { ...prev, selectedId: option.id, isCorrect } : null
      );

      setRecentIds((prev) => [...prev.slice(-30), question.target.id]);
      setHistory((prev) => [...prev, { pokemon: question.target, correct: isCorrect }]);

      if (isCorrect) {
        setScore((s) => s + 1);
        setStreak((st) => {
          const next = st + 1;
          if (next > bestStreak) setBestStreak(next);
          if (next % 5 === 0) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
            });
          }
          return next;
        });

        setDiscoveredIds((prev) =>
          prev.includes(question.target.id) ? prev : [...prev, question.target.id]
        );
      } else {
        setStreak(0);
      }

      playCry(question.target.id);
    },
    [question, bestStreak, playCry]
  );

  const handleNext = useCallback(() => {
    if (!question) return;

    if (sessionLength > 0 && questionNumber >= sessionLength) {
      setSessionFinished(true);
      if (score >= Math.ceil(sessionLength * 0.7)) {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 },
        });
      }
      return;
    }

    setQuestionNumber((n) => n + 1);
    generateQuestion(availablePokemon, recentIds);
  }, [question, sessionLength, questionNumber, score, generateQuestion, availablePokemon, recentIds]);

  const restartSession = () => {
    setQuestionNumber(1);
    setScore(0);
    setSessionFinished(false);
    setHistory([]);
    generateQuestion(availablePokemon, recentIds);
  };

  // Keyboard shortcuts (1, 2, 3, 4 to answer, Enter/Space for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'quiz' || sessionFinished || !question) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (question.selectedId === null) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (question.options[idx]) {
            handleAnswer(question.options[idx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, sessionFinished, question, handleAnswer, handleNext]);

  const getPokemonName = (p: PokemonEntry) => (language === 'fr' ? p.fr : p.en);

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col pokeball-bg app-safe-area">
      {/* Compact Top App Header */}
      <header className="shrink-0 max-w-4xl w-full mx-auto px-1 py-1.5 flex items-center justify-between gap-2 border-b border-slate-800/70">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src="./logo.png"
            alt="PokéQuiz Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl shadow-md shadow-rose-500/20 border border-slate-700/70 shrink-0 object-cover"
          />
          <div className="leading-tight truncate">
            <h1 className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-cyan-100 to-rose-300 bg-clip-text text-transparent truncate">
              PokéQuiz
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Générations 1 à 3 ({availablePokemon.length} Pokémon)
            </p>
          </div>
        </div>

        {/* Mode Switcher & Quick Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="bg-slate-900/90 p-0.5 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-rose-500 text-white shadow shadow-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab('pokedex')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'pokedex'
                  ? 'bg-rose-500 text-white shadow shadow-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pokédex</span>
              <span className="text-[10px] px-1 py-0.2 rounded-full bg-slate-950/70 text-slate-200 font-extrabold">
                {discoveredIds.length}
              </span>
            </button>
          </div>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage((l) => (l === 'fr' ? 'en' : 'fr'))}
            title="Changer la langue des noms (FR / EN)"
            className="px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold uppercase text-slate-200 active:scale-95 transition"
          >
            {language === 'fr' ? '🇫🇷' : '🇬🇧'}
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled((s) => !s)}
            title={soundEnabled ? 'Désactiver le cri' : 'Activer le cri'}
            className={`p-1.5 rounded-xl border active:scale-95 transition ${
              soundEnabled
                ? 'bg-slate-900 border-slate-800 text-emerald-400'
                : 'bg-slate-950 border-slate-900 text-slate-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Content Area: Fits 100% of remaining viewport height without page scroll */}
      <main className="flex-1 min-h-0 max-w-4xl w-full mx-auto px-1 pt-1.5 pb-1 flex flex-col">
        {activeTab === 'quiz' ? (
          <div className="flex-1 min-h-0 flex flex-col gap-1.5 sm:gap-2.5">
            {/* Compact Top Control Bar: Generations + Mode + Score Stats */}
            <div className="shrink-0 bg-slate-900/75 border border-slate-800/90 rounded-2xl p-2 flex flex-col gap-1.5 shadow-lg">
              {/* Row 1: Generations 1, 2, 3 + Silhouette + Session Length */}
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  {([1, 2, 3] as GenId[]).map((genId) => {
                    const info = GENERATION_INFO[genId];
                    const isSelected = selectedGens.includes(genId);
                    return (
                      <button
                        key={genId}
                        onClick={() => toggleGeneration(genId)}
                        className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2 py-1 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-rose-500/20 border-rose-500/80 text-white shadow-sm shadow-rose-500/10'
                            : 'bg-slate-950/70 border-slate-800 text-slate-500'
                        }`}
                      >
                        <img
                          src={getPokemonImageUrl(info.starters[0])}
                          alt=""
                          className={`w-4 h-4 object-contain shrink-0 ${
                            !isSelected ? 'grayscale opacity-50' : ''
                          }`}
                        />
                        <span className="truncate">G{genId}</span>
                        <span className="hidden md:inline text-[10px] text-slate-400 font-normal">
                          ({info.region})
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Silhouette Toggle */}
                <button
                  onClick={() => setSilhouetteMode((s) => !s)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[11px] font-bold shrink-0 active:scale-95 transition ${
                    silhouetteMode
                      ? 'bg-indigo-500/25 border-indigo-500/70 text-indigo-300'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300'
                  }`}
                >
                  {silhouetteMode ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Ombre</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Image</span>
                    </>
                  )}
                </button>

                {/* Session Length */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 shrink-0">
                  {([10, 20, 0] as SessionLength[]).map((len) => (
                    <button
                      key={len}
                      onClick={() => {
                        setSessionLength(len);
                        setQuestionNumber(1);
                        setScore(0);
                        setSessionFinished(false);
                        setHistory([]);
                      }}
                      className={`px-1.5 py-0.5 rounded-lg text-[11px] font-bold transition ${
                        sessionLength === len
                          ? 'bg-slate-800 text-white'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {len === 0 ? '∞' : len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: Compact Stats Strip + Question Progress & Hint */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/70 text-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-slate-400">Score:</span>
                    <span className="font-extrabold text-white">
                      {score}
                      <span className="text-slate-500 font-normal">
                        /{sessionLength === 0 ? questionNumber : sessionLength}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-extrabold text-amber-400">{streak}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[11px] text-slate-400 hidden xs:inline">Record:</span>
                    <span className="font-extrabold text-rose-400">{bestStreak}</span>
                  </div>
                </div>

                {/* Question Badge or Type Hint */}
                {question && !sessionFinished && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {question.selectedId === null && !question.hintUsed ? (
                      <button
                        onClick={() =>
                          setQuestion((prev) => (prev ? { ...prev, hintUsed: true } : null))
                        }
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-lg active:scale-95 transition"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Indice</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">
                        {question.target.types.map((t) => {
                          const tInfo = TYPE_LABELS[t] || {
                            fr: t,
                            color: 'bg-slate-700 text-white',
                          };
                          return (
                            <span
                              key={t}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${tInfo.color}`}
                            >
                              {tInfo.fr}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-bold">
                      Q{questionNumber}
                      {sessionLength > 0 ? `/${sessionLength}` : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Active Quiz Stage OR Session Finished Summary */}
            {sessionFinished ? (
              <div className="flex-1 min-h-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between text-center shadow-2xl overflow-hidden">
                <div className="shrink-0 space-y-1">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 mx-auto flex items-center justify-center shadow-md shadow-rose-500/20">
                    <Trophy className="w-6 h-6 text-slate-950" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Manche terminée !
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Score final :{' '}
                    <span className="font-extrabold text-emerald-400">
                      {score} / {sessionLength}
                    </span>{' '}
                    ({Math.round((score / sessionLength) * 100)}%)
                  </p>
                </div>

                {/* Compact scrollable recap inside fixed card */}
                {history.length > 0 && (
                  <div className="flex-1 min-h-0 my-2 overflow-y-auto grid grid-cols-5 sm:grid-cols-5 gap-1.5 p-1 content-start">
                    {history.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-1.5 rounded-xl border flex flex-col items-center text-center ${
                          item.correct
                            ? 'bg-emerald-950/35 border-emerald-500/40'
                            : 'bg-rose-950/35 border-rose-500/40'
                        }`}
                      >
                        <img
                          src={getPokemonImageUrl(item.pokemon.id)}
                          alt={item.pokemon.fr}
                          className="w-9 h-9 sm:w-12 sm:h-12 object-contain"
                        />
                        <div className="text-[10px] font-bold text-white truncate w-full">
                          {getPokemonName(item.pokemon)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="shrink-0 pt-1">
                  <button
                    onClick={restartSession}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-sm shadow-lg shadow-rose-500/25 active:scale-95 transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Rejouer une manche</span>
                  </button>
                </div>
              </div>
            ) : (
              question && (
                <div className="flex-1 min-h-0 bg-slate-900/75 border border-slate-800/90 rounded-2xl p-2.5 sm:p-4 shadow-xl flex flex-col lg:flex-row gap-2.5 sm:gap-4 justify-between overflow-hidden">
                  {/* Top / Left: Flexible Pokémon Display Stage */}
                  <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-950/85 border border-slate-800/90 p-2 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15),transparent_70%)] pointer-events-none" />

                    {/* Region pill top-left */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-bold text-slate-300 z-10">
                      {question.selectedId !== null
                        ? `#${String(question.target.id).padStart(3, '0')} • ${GENERATION_INFO[question.target.gen].region}`
                        : GENERATION_INFO[question.target.gen].region}
                    </div>

                    {/* Replay Cry button top-right */}
                    {question.selectedId !== null && (
                      <button
                        onClick={() => playCry(question.target.id)}
                        title="Écouter le cri"
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-emerald-400 z-10 active:scale-95 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {!imageLoaded && (
                      <div className="w-9 h-9 rounded-full border-3 border-rose-500 border-t-transparent animate-spin absolute" />
                    )}

                    {/* Dynamic height image that scales down on iPhone SE and up on Pro Max */}
                    <div className="flex-1 min-h-0 w-full flex items-center justify-center py-1">
                      <img
                        key={question.target.id}
                        src={getPokemonImageUrl(question.target.id)}
                        alt="Quel est ce Pokémon ?"
                        onLoad={() => setImageLoaded(true)}
                        className={`max-h-full max-w-full h-36 sm:h-48 md:h-56 w-auto object-contain z-10 select-none transition-all duration-300 ${
                          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                        } ${
                          silhouetteMode && question.selectedId === null
                            ? 'brightness-0 contrast-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.22)]'
                            : 'drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)]'
                        }`}
                        draggable={false}
                      />
                    </div>

                    {/* Prompt or Answer Name inside stage bottom */}
                    <div className="shrink-0 text-center z-10">
                      {question.selectedId !== null ? (
                        <p className="text-sm sm:text-base font-extrabold text-white leading-tight">
                          {question.target.fr}{' '}
                          <span className="text-[11px] font-medium text-slate-400">
                            ({question.target.en})
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs font-semibold text-slate-400">
                          Quel est le nom de ce Pokémon ?
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom / Right: 2x2 Grid of 4 Choices + Fixed Action Bar */}
                  <div className="shrink-0 lg:w-7/12 flex flex-col justify-end gap-2">
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                      {question.options.map((opt, index) => {
                        const isAnswered = question.selectedId !== null;
                        const isSelected = question.selectedId === opt.id;
                        const isCorrectOption = opt.id === question.target.id;

                        let btnStyle =
                          'bg-slate-800/85 hover:bg-slate-800 border-slate-700/80 text-slate-100 active:scale-[0.98]';

                        if (isAnswered) {
                          if (isCorrectOption) {
                            btnStyle =
                              'bg-emerald-500/25 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
                          } else if (isSelected && !isCorrectOption) {
                            btnStyle = 'bg-rose-500/25 border-rose-500 text-rose-200';
                          } else {
                            btnStyle =
                              'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-55';
                          }
                        }

                        return (
                          <button
                            key={opt.id}
                            disabled={isAnswered}
                            onClick={() => handleAnswer(opt)}
                            className={`group relative flex items-center justify-between px-3 py-2.5 sm:p-3.5 rounded-xl border-2 font-bold text-left transition-all duration-150 ${btnStyle}`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                                  isAnswered && isCorrectOption
                                    ? 'bg-emerald-500 text-slate-950'
                                    : isAnswered && isSelected
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-slate-900 text-slate-400'
                                }`}
                              >
                                {index + 1}
                              </span>
                              <div className="truncate">
                                <div className="text-sm sm:text-base leading-tight truncate">
                                  {getPokemonName(opt)}
                                </div>
                                <div className="text-[10px] font-medium opacity-75 truncate">
                                  {isAnswered
                                    ? `${language === 'fr' ? opt.en : opt.fr} • #${String(opt.id).padStart(3, '0')}`
                                    : `Choix ${index + 1}`}
                                </div>
                              </div>
                            </div>

                            {isAnswered && isCorrectOption && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
                            )}
                            {isAnswered && isSelected && !isCorrectOption && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Constant-height Action Bar (no layout jump, no scroll) */}
                    <div className="h-11 shrink-0 flex items-center">
                      {question.selectedId !== null ? (
                        <button
                          onClick={handleNext}
                          className={`w-full h-full flex items-center justify-between px-4 rounded-xl font-extrabold text-sm shadow-lg active:scale-[0.99] transition ${
                            question.isCorrect
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20'
                              : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25'
                          }`}
                        >
                          <span className="truncate">
                            {question.isCorrect
                              ? `Bravo ! C’est ${question.target.fr}`
                              : `Dommage ! C’était ${question.target.fr}`}
                          </span>
                          <span className="flex items-center gap-1 shrink-0 ml-2">
                            <span>
                              {sessionLength > 0 && questionNumber >= sessionLength
                                ? 'Résultat'
                                : 'Suivant'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </button>
                      ) : (
                        <div className="w-full h-full rounded-xl bg-slate-950/60 border border-slate-800/80 px-3 flex items-center justify-center text-xs text-slate-400">
                          Touchez l’une des 4 propositions pour répondre
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* Pokédex View: Fixed Header + Internal Grid Scroll (Page itself never scrolls) */
          <div className="flex-1 min-h-0 flex flex-col gap-2">
            <div className="shrink-0 bg-slate-900/75 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="relative flex-1 min-w-[140px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pokedexSearch}
                  onChange={(e) => setPokedexSearch(e.target.value)}
                  placeholder="Chercher un Pokémon..."
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
                {(['all', 1, 2, 3] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setPokedexFilterGen(g)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                      pokedexFilterGen === g
                        ? 'bg-rose-500 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {g === 'all' ? 'Tous' : `G${g}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pr-0.5 content-start">
              {POKEMON_LIST.filter((p) => {
                if (pokedexFilterGen !== 'all' && p.gen !== pokedexFilterGen) return false;
                if (pokedexSearch.trim() !== '') {
                  const q = pokedexSearch.toLowerCase();
                  return (
                    p.fr.toLowerCase().includes(q) ||
                    p.en.toLowerCase().includes(q) ||
                    String(p.id).includes(q)
                  );
                }
                return true;
              }).map((p) => {
                const unlocked = discoveredIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => playCry(p.id)}
                    className={`group rounded-xl border p-2 flex flex-col items-center text-center transition cursor-pointer active:scale-95 ${
                      unlocked
                        ? 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50'
                        : 'bg-slate-900/30 border-slate-900 opacity-70'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span>#{String(p.id).padStart(3, '0')}</span>
                      {unlocked && <span className="text-emerald-400 font-bold">✓</span>}
                    </div>
                    <img
                      src={getPokemonImageUrl(p.id)}
                      alt={p.fr}
                      loading="lazy"
                      className="w-14 h-14 object-contain"
                    />
                    <div className="mt-1 font-bold text-[11px] text-white truncate w-full">
                      {p.fr}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
