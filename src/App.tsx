import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  POKEMON_LIST,
  GENERATION_INFO,
  TYPE_LABELS,
  PokemonEntry,
  getPokemonImageUrl,
  getPokemonCryUrl,
} from './data/pokemon';

type GenId = 1 | 2 | 3;

export default function App() {
  // Simple settings
  const [selectedGens, setSelectedGens] = useState<GenId[]>([1, 2, 3]);
  const [silhouetteMode, setSilhouetteMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Card state
  const [currentPokemon, setCurrentPokemon] = useState<PokemonEntry | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Swipe gesture state
  const [dragX, setDragX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [swipeExitDirection, setSwipeExitDirection] = useState<'left' | 'right' | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const nextCandidateRef = useRef<PokemonEntry | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pool of Pokémon based on selected generations
  const availablePokemon = useMemo(() => {
    return POKEMON_LIST.filter((p) => selectedGens.includes(p.gen));
  }, [selectedGens]);

  const playCry = useCallback(
    (id: number) => {
      if (!soundEnabled) return;
      try {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const audio = new Audio(getPokemonCryUrl(id));
        audio.volume = 0.45;
        audioRef.current = audio;
        audio.play().catch(() => {});
      } catch {
        // ignore audio errors
      }
    },
    [soundEnabled]
  );

  const chooseRandomPokemon = useCallback((pool: PokemonEntry[], excludeIds: number[]) => {
    const maxRecent = Math.min(25, Math.floor(pool.length / 2));
    const candidates = pool.filter((p) => !excludeIds.slice(-maxRecent).includes(p.id));
    const targetPool = candidates.length > 0 ? candidates : pool;
    return targetPool[Math.floor(Math.random() * targetPool.length)];
  }, []);

  const preloadCandidate = useCallback(
    (pool: PokemonEntry[], excludeIds: number[]) => {
      if (pool.length === 0) return;
      const upcoming = chooseRandomPokemon(pool, excludeIds);
      nextCandidateRef.current = upcoming;
      const img = new Image();
      img.src = getPokemonImageUrl(upcoming.id);
    },
    [chooseRandomPokemon]
  );

  const pickNextPokemon = useCallback(
    (pool: PokemonEntry[], recent: number[]) => {
      if (pool.length === 0) return;

      const next =
        nextCandidateRef.current && pool.some((p) => p.id === nextCandidateRef.current?.id)
          ? nextCandidateRef.current
          : chooseRandomPokemon(pool, recent);

      const updatedRecent = [...recent.slice(-30), next.id];
      setImageLoaded(false);
      setIsRevealed(false);
      setCurrentPokemon(next);
      setRecentIds(updatedRecent);
      preloadCandidate(pool, updatedRecent);
    },
    [chooseRandomPokemon, preloadCandidate]
  );

  // Initialize or reset when generations change
  useEffect(() => {
    nextCandidateRef.current = null;
    pickNextPokemon(availablePokemon, []);
  }, [availablePokemon, pickNextPokemon]);

  const toggleGeneration = (gen: GenId) => {
    setSelectedGens((prev) => {
      if (prev.includes(gen)) {
        if (prev.length === 1) return prev;
        return prev.filter((g) => g !== gen).sort() as GenId[];
      }
      return [...prev, gen].sort() as GenId[];
    });
  };

  // Reveal the Pokémon name OR advance to the next Pokémon
  const triggerStep = useCallback(
    (direction: 'left' | 'right' = 'left') => {
      if (!currentPokemon || swipeExitDirection) return;

      if (!isRevealed) {
        // Step 1 -> Reveal the answer with sound & confetti
        setIsRevealed(true);
        playCry(currentPokemon.id);
        confetti({
          particleCount: 35,
          spread: 65,
          origin: { y: 0.65 },
        });
      } else {
        // Step 2 -> Slide card out and show next Pokémon
        setSwipeExitDirection(direction);
        setTimeout(() => {
          pickNextPokemon(availablePokemon, recentIds);
          setSwipeExitDirection(null);
          setDragX(0);
        }, 170);
      }
    },
    [
      currentPokemon,
      swipeExitDirection,
      isRevealed,
      playCry,
      pickNextPokemon,
      availablePokemon,
      recentIds,
    ]
  );

  // Pointer / Touch handlers for smooth swiping on iOS, Android, and Desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (swipeExitDirection) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    pointerStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;
    const deltaX = e.clientX - pointerStartX.current;
    setDragX(deltaX);
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 40;
    if (Math.abs(dragX) >= threshold) {
      const dir = dragX < 0 ? 'left' : 'right';
      setDragX(0);
      triggerStep(dir);
    } else {
      setDragX(0);
    }
    pointerStartX.current = null;
  };

  // Keyboard support (Left, Right, Space, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        triggerStep('left');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        triggerStep('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerStep]);

  // Compute card transform during swipe or exit
  const getCardStyle = (): React.CSSProperties => {
    if (swipeExitDirection === 'left') {
      return {
        transform: 'translate3d(-115%, 0, 0) rotate(-8deg)',
        opacity: 0,
        transition: 'transform 170ms ease-in, opacity 170ms ease-in',
      };
    }
    if (swipeExitDirection === 'right') {
      return {
        transform: 'translate3d(115%, 0, 0) rotate(8deg)',
        opacity: 0,
        transition: 'transform 170ms ease-in, opacity 170ms ease-in',
      };
    }
    if (isDragging) {
      const rotate = Math.max(-12, Math.min(12, dragX * 0.04));
      return {
        transform: `translate3d(${dragX}px, 0, 0) rotate(${rotate}deg)`,
        transition: 'none',
      };
    }
    return {
      transform: 'translate3d(0, 0, 0) rotate(0deg)',
      transition: 'transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1)',
    };
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col pokeball-bg app-safe-area select-none">
      {/* Minimal Top Bar */}
      <header className="shrink-0 max-w-2xl w-full mx-auto px-2 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img
            src="./logo.png"
            alt="PokéQuiz"
            className="w-9 h-9 rounded-xl shadow-md border border-slate-700/70 object-cover"
          />
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-cyan-100 to-rose-300 bg-clip-text text-transparent hidden xs:inline">
            PokéQuiz
          </span>
        </div>

        {/* Simple Generation Filter + Controls */}
        <div className="flex items-center gap-1.5">
          {([1, 2, 3] as GenId[]).map((genId) => {
            const info = GENERATION_INFO[genId];
            const isSelected = selectedGens.includes(genId);
            return (
              <button
                key={genId}
                onClick={() => toggleGeneration(genId)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition active:scale-95 ${
                  isSelected
                    ? 'bg-rose-500/25 border-rose-500 text-white'
                    : 'bg-slate-900/70 border-slate-800 text-slate-500'
                }`}
              >
                <img
                  src={getPokemonImageUrl(info.starters[0])}
                  alt=""
                  className={`w-4 h-4 object-contain ${!isSelected ? 'grayscale opacity-50' : ''}`}
                />
                <span>G{genId}</span>
              </button>
            );
          })}

          {/* Silhouette Toggle */}
          <button
            onClick={() => setSilhouetteMode((s) => !s)}
            title={silhouetteMode ? 'Mode Ombre' : 'Mode Image'}
            className={`p-2 rounded-xl border active:scale-95 transition ${
              silhouetteMode
                ? 'bg-indigo-500/25 border-indigo-500 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}
          >
            {silhouetteMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled((s) => !s)}
            title={soundEnabled ? 'Couper le son' : 'Activer le son'}
            className={`p-2 rounded-xl border active:scale-95 transition ${
              soundEnabled
                ? 'bg-slate-900 border-slate-800 text-emerald-400'
                : 'bg-slate-950 border-slate-900 text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Giant Swipeable Card */}
      <main className="flex-1 min-h-0 max-w-2xl w-full mx-auto px-3 pt-1 pb-3 flex flex-col">
        {currentPokemon && (
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            style={getCardStyle()}
            className="flex-1 min-h-0 w-full rounded-3xl bg-gradient-to-b from-slate-800/70 via-slate-900/90 to-slate-950 border-2 border-slate-800/90 shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-between relative overflow-hidden cursor-grab active:cursor-grabbing touch-none"
          >
            {/* Background glow */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isRevealed
                  ? 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.22),transparent_70%)]'
                  : 'bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.16),transparent_70%)]'
              }`}
            />

            {/* Top Row on Card: Replay Cry Button when revealed */}
            <div className="w-full flex items-center justify-end z-10 min-h-[48px]">
              {isRevealed && (
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => playCry(currentPokemon.id)}
                  aria-label="Écouter le cri du Pokémon"
                  className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 shadow-lg active:scale-90 transition"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Center: Giant Pokémon Artwork */}
            <div className="flex-1 min-h-0 w-full flex items-center justify-center relative my-2">
              {!imageLoaded && (
                <div className="w-12 h-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin absolute" />
              )}

              <img
                key={currentPokemon.id}
                src={getPokemonImageUrl(currentPokemon.id)}
                alt="Pokémon"
                onLoad={() => setImageLoaded(true)}
                onClick={(e) => {
                  if (isRevealed) {
                    e.stopPropagation();
                    playCry(currentPokemon.id);
                  }
                }}
                draggable={false}
                className={`max-h-full max-w-full h-64 sm:h-80 md:h-96 w-auto object-contain z-10 select-none transition-all duration-300 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                } ${
                  isRevealed ? 'scale-105' : ''
                } ${
                  silhouetteMode && !isRevealed
                    ? 'brightness-0 contrast-200 drop-shadow-[0_0_18px_rgba(255,255,255,0.28)]'
                    : 'drop-shadow-[0_16px_28px_rgba(0,0,0,0.65)]'
                }`}
              />
            </div>

            {/* Bottom Area: Mystery '?' OR Huge Revealed Name + Swipe Hint */}
            <div className="shrink-0 w-full flex flex-col items-center gap-4 z-10 pb-1">
              {isRevealed ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                      {currentPokemon.fr}
                    </h2>
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
                  </div>

                  {/* Colorful Type Badges */}
                  <div className="flex items-center justify-center gap-2 mt-0.5">
                    {currentPokemon.types.map((t) => {
                      const tInfo = TYPE_LABELS[t] || {
                        fr: t,
                        color: 'bg-slate-700 text-white',
                      };
                      return (
                        <span
                          key={t}
                          className={`px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold shadow ${tInfo.color}`}
                        >
                          {tInfo.fr}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-500/20 border-2 border-rose-500/60 flex items-center justify-center shadow-lg shadow-rose-500/20">
                    <span className="text-4xl sm:text-5xl font-black text-rose-400">?</span>
                  </div>
                </div>
              )}

              {/* Simple Visual Swipe Hint Bar (also tappable) */}
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => triggerStep('left')}
                className="w-full max-w-xs py-3 px-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-300 flex items-center justify-between gap-3 active:scale-95 transition shadow-md"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-wide text-slate-200">
                  {isRevealed ? 'Glisse pour le suivant' : 'Glisse pour voir la réponse'}
                </span>
                <ChevronRight className="w-5 h-5 text-slate-400 animate-pulse" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
