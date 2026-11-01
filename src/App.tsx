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
  Filter,
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

    // Pick 3 distractors from the pool (preferring same generation or similar types occasionally)
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

    // Preload next image
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

  const selectAllGens = () => {
    setSelectedGens([1, 2, 3]);
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
              particleCount: 55,
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
          particleCount: 90,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pokeball-bg">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/75 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 p-0.5 shadow-lg shadow-rose-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950/20 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-1 bg-slate-950 absolute top-1/2 -translate-y-1/2" />
                <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-950 z-10" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-300 bg-clip-text text-transparent">
                PokéQuiz
              </h1>
              <p className="text-xs text-slate-400">Apprends le nom des Pokémon</p>
            </div>
          </div>

          {/* Mode Switcher & Quick Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Quiz</span>
              </button>
              <button
                onClick={() => setActiveTab('pokedex')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'pokedex'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Pokédex</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                  {discoveredIds.length}/{POKEMON_LIST.length}
                </span>
              </button>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage((l) => (l === 'fr' ? 'en' : 'fr'))}
              title="Changer la langue des noms (FR / EN)"
              className="px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/70 text-xs font-bold uppercase tracking-wider text-slate-200 transition"
            >
              {language === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
            </button>

            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled((s) => !s)}
              title={soundEnabled ? 'Désactiver le cri des Pokémon' : 'Activer le cri des Pokémon'}
              className={`p-2 rounded-xl border transition ${
                soundEnabled
                  ? 'bg-slate-800/80 border-slate-700/70 text-emerald-400 hover:bg-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {activeTab === 'quiz' ? (
          <div className="space-y-6">
            {/* Generation Selector & Options Bar */}
            <section className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Generations */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Choisir les générations ({availablePokemon.length} Pokémon)
                    </span>
                    {selectedGens.length < 3 && (
                      <button
                        onClick={selectAllGens}
                        className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline cursor-pointer"
                      >
                        Tout sélectionner
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {([1, 2, 3] as GenId[]).map((genId) => {
                      const info = GENERATION_INFO[genId];
                      const isSelected = selectedGens.includes(genId);
                      return (
                        <button
                          key={genId}
                          onClick={() => toggleGeneration(genId)}
                          className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-slate-800/95 border-rose-500/70 text-white shadow-md shadow-rose-500/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex -space-x-2">
                            {info.starters.map((sId) => (
                              <img
                                key={sId}
                                src={getPokemonImageUrl(sId)}
                                alt=""
                                className={`w-6 h-6 object-contain drop-shadow transition-transform group-hover:scale-110 ${
                                  !isSelected ? 'grayscale opacity-50' : ''
                                }`}
                              />
                            ))}
                          </div>
                          <div>
                            <div className="text-xs font-bold flex items-center gap-1.5">
                              <span>Gén. {genId}</span>
                              <span className="text-[11px] font-medium text-slate-400">
                                ({info.region})
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400">{info.count} Pokémon</div>
                          </div>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? 'bg-rose-500' : 'bg-slate-700'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Game Mode Options (Silhouette & Length) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {/* Vraie image vs Ombre */}
                  <button
                    onClick={() => setSilhouetteMode((s) => !s)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      silhouetteMode
                        ? 'bg-indigo-500/20 border-indigo-500/60 text-indigo-300'
                        : 'bg-slate-800/70 border-slate-700/70 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {silhouetteMode ? (
                      <>
                        <EyeOff className="w-4 h-4 text-indigo-400" />
                        <span>Mode Ombre</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <span>Vraie Image</span>
                      </>
                    )}
                  </button>

                  {/* Session Length Selector */}
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
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
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          sessionLength === len
                            ? 'bg-slate-800 text-white shadow'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {len === 0 ? '∞ Infini' : `${len} Q`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Score & Progress Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Score actuel
                  </p>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">
                    {score}
                    <span className="text-sm font-normal text-slate-400">
                      {' '}
                      / {sessionLength === 0 ? questionNumber - (question?.selectedId === null ? 1 : 0) : sessionLength}
                    </span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Série en cours
                  </p>
                  <p className="text-xl sm:text-2xl font-extrabold text-amber-400">{streak} 🔥</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Record série
                  </p>
                  <p className="text-xl sm:text-2xl font-extrabold text-rose-400">{bestStreak}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Session Summary Modal/View or Active Question */}
            {sessionFinished ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <Trophy className="w-8 h-8 text-slate-950" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Série terminée !
                  </h2>
                  <p className="text-slate-300 text-base">
                    Tu as obtenu un score de{' '}
                    <span className="font-bold text-emerald-400">
                      {score} / {sessionLength}
                    </span>{' '}
                    ({Math.round((score / sessionLength) * 100)}%)
                  </p>
                </div>

                {/* Recap of Pokémon seen in this session */}
                {history.length > 0 && (
                  <div className="space-y-3 text-left">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                      Récapitulatif des Pokémon de la manche
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-h-72 overflow-y-auto p-1">
                      {history.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1 ${
                            item.correct
                              ? 'bg-emerald-950/30 border-emerald-500/40'
                              : 'bg-rose-950/30 border-rose-500/40'
                          }`}
                        >
                          <img
                            src={getPokemonImageUrl(item.pokemon.id)}
                            alt={item.pokemon.fr}
                            className="w-14 h-14 object-contain"
                          />
                          <div className="text-xs font-bold text-white truncate w-full">
                            {getPokemonName(item.pokemon)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            #{String(item.pokemon.id).padStart(3, '0')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={restartSession}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold shadow-lg shadow-rose-500/25 transition transform hover:scale-105"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Rejouer une manche</span>
                  </button>
                </div>
              </div>
            ) : (
              question && (
                <div className="bg-slate-900/80 border border-slate-800/90 rounded-3xl p-5 sm:p-8 shadow-2xl">
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
                        Question {questionNumber}
                        {sessionLength > 0 ? ` / ${sessionLength}` : ''}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-slate-800/70 text-slate-400 text-xs font-medium">
                        {GENERATION_INFO[question.target.gen].name} (
                        {GENERATION_INFO[question.target.gen].region})
                      </span>
                    </div>

                    {/* Hint Button */}
                    {question.selectedId === null && !question.hintUsed && (
                      <button
                        onClick={() =>
                          setQuestion((prev) => (prev ? { ...prev, hintUsed: true } : null))
                        }
                        className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 rounded-xl transition"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Indice (Type)</span>
                      </button>
                    )}

                    {/* Show Types if hint used or after answering */}
                    {(question.hintUsed || question.selectedId !== null) && (
                      <div className="flex items-center gap-1.5">
                        {question.target.types.map((t) => {
                          const tInfo = TYPE_LABELS[t] || {
                            fr: t,
                            color: 'bg-slate-700 text-white',
                          };
                          return (
                            <span
                              key={t}
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm ${tInfo.color}`}
                            >
                              {tInfo.fr}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Main Quiz Grid: Pokemon Artwork on Left, 4 Choices on Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Pokémon Display Card */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                      <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-b from-slate-800/60 to-slate-950/90 border border-slate-800 flex items-center justify-center p-6 shadow-inner overflow-hidden group">
                        {/* Subtle radial glow behind Pokemon */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.14),transparent_70%)]" />

                        {/* Pokédex Number Badge (shown after answer) */}
                        {question.selectedId !== null && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold text-slate-300 z-10">
                            #{String(question.target.id).padStart(3, '0')}
                          </div>
                        )}

                        {/* Replay Cry button after answer */}
                        {question.selectedId !== null && (
                          <button
                            onClick={() => playCry(question.target.id)}
                            title="Écouter le cri"
                            className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 z-10 transition"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        )}

                        {!imageLoaded && (
                          <div className="w-12 h-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin absolute" />
                        )}

                        <img
                          key={question.target.id}
                          src={getPokemonImageUrl(question.target.id)}
                          alt="Quel est ce Pokémon ?"
                          onLoad={() => setImageLoaded(true)}
                          className={`w-44 h-44 sm:w-52 sm:h-52 object-contain z-10 select-none transition-all duration-500 ${
                            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                          } ${
                            silhouetteMode && question.selectedId === null
                              ? 'brightness-0 contrast-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                              : 'drop-shadow-[0_14px_24px_rgba(0,0,0,0.5)]'
                          }`}
                          draggable={false}
                        />
                      </div>

                      {/* Reveal subtitle when answered */}
                      <div className="min-h-[3.25rem] mt-3 flex flex-col items-center justify-center text-center">
                        {question.selectedId !== null ? (
                          <div className="animate-fade-in">
                            <p className="text-lg font-extrabold text-white">
                              {question.target.fr}{' '}
                              <span className="text-xs font-medium text-slate-400">
                                ({question.target.en})
                              </span>
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm font-medium text-slate-400">
                            Quel est le nom de ce Pokémon ?
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 4 Choices + Next Button */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {question.options.map((opt, index) => {
                          const isAnswered = question.selectedId !== null;
                          const isSelected = question.selectedId === opt.id;
                          const isCorrectOption = opt.id === question.target.id;

                          let btnStyle =
                            'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-rose-500/60 text-slate-100';

                          if (isAnswered) {
                            if (isCorrectOption) {
                              btnStyle =
                                'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10 scale-[1.02]';
                            } else if (isSelected && !isCorrectOption) {
                              btnStyle =
                                'bg-rose-500/20 border-rose-500 text-rose-200 animate-shake';
                            } else {
                              btnStyle =
                                'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={opt.id}
                              disabled={isAnswered}
                              onClick={() => handleAnswer(opt)}
                              className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 font-bold text-left transition-all duration-200 ${btnStyle}`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 transition ${
                                    isAnswered && isCorrectOption
                                      ? 'bg-emerald-500 text-slate-950'
                                      : isAnswered && isSelected
                                      ? 'bg-rose-500 text-white'
                                      : 'bg-slate-900 text-slate-400 group-hover:bg-rose-500 group-hover:text-white'
                                  }`}
                                >
                                  {index + 1}
                                </span>
                                <div className="truncate">
                                  <div className="text-base sm:text-lg leading-tight truncate">
                                    {getPokemonName(opt)}
                                  </div>
                                  {isAnswered && (
                                    <div className="text-[11px] font-medium opacity-75">
                                      {language === 'fr' ? opt.en : opt.fr} • #
                                      {String(opt.id).padStart(3, '0')}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {isAnswered && isCorrectOption && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              )}
                              {isAnswered && isSelected && !isCorrectOption && (
                                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback Banner & Next Button */}
                      <div className="min-h-[3.75rem] flex items-center justify-between pt-2">
                        {question.selectedId !== null ? (
                          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/80 border border-slate-800 p-3.5 rounded-2xl">
                            <div className="flex items-center gap-2.5">
                              {question.isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                  <span className="text-sm font-bold text-emerald-300">
                                    Bravo ! C’est bien {question.target.fr} !
                                  </span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                                  <span className="text-sm font-bold text-rose-300">
                                    Dommage ! C’était {question.target.fr}.
                                  </span>
                                </>
                              )}
                            </div>

                            <button
                              onClick={handleNext}
                              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition"
                            >
                              <span>
                                {sessionLength > 0 && questionNumber >= sessionLength
                                  ? 'Voir le résultat'
                                  : 'Pokémon suivant'}
                              </span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500">
                            Astuce : Tu peux aussi utiliser les touches <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">1</kbd> à <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">4</kbd> du clavier.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          /* Pokédex Collection View */
          <div className="space-y-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-white">
                  Ton Pokédex d’Apprentissage
                </h2>
                <p className="text-xs text-slate-400">
                  Les Pokémon que tu trouves dans le quiz sont débloqués ici ({discoveredIds.length}{' '}
                  sur {POKEMON_LIST.length} découverts).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={pokedexSearch}
                    onChange={(e) => setPokedexSearch(e.target.value)}
                    placeholder="Chercher un Pokémon..."
                    className="w-full sm:w-48 pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Gen filter */}
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1">
                  {(['all', 1, 2, 3] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setPokedexFilterGen(g)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                        pokedexFilterGen === g
                          ? 'bg-rose-500 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {g === 'all' ? 'Tous' : `Gén. ${g}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid of Pokémon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
                    className={`group rounded-2xl border p-3 flex flex-col items-center text-center transition cursor-pointer ${
                      unlocked
                        ? 'bg-slate-900/80 border-slate-800 hover:border-rose-500/50'
                        : 'bg-slate-900/30 border-slate-900 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>#{String(p.id).padStart(3, '0')}</span>
                      {unlocked && (
                        <span className="text-emerald-400 font-sans font-bold">✓ Appris</span>
                      )}
                    </div>
                    <img
                      src={getPokemonImageUrl(p.id)}
                      alt={p.fr}
                      loading="lazy"
                      className="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                    />
                    <div className="mt-2 font-bold text-xs text-white truncate w-full">
                      {p.fr}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate w-full">{p.en}</div>
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
