import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

type SabatinaPhase = 'apresentacao' | 'perguntas';

const TEN_MINUTES_SEC = 10 * 60;

export const SabatinaTimer: React.FC = () => {
  const [phase, setPhase] = useState<SabatinaPhase>('apresentacao');
  const [secondsLeft, setSecondsLeft] = useState<number>(TEN_MINUTES_SEC);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const switchPhase = (nextPhase: SabatinaPhase) => {
    setRunning(false);
    setPhase(nextPhase);
    setSecondsLeft(TEN_MINUTES_SEC);
  };

  const resetTimer = () => {
    setRunning(false);
    setSecondsLeft(TEN_MINUTES_SEC);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isWarning = secondsLeft > 0 && secondsLeft <= 60;
  const isFinished = secondsLeft === 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-md bg-slate-200/70 p-0.5">
          <button
            type="button"
            onClick={() => switchPhase('apresentacao')}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              phase === 'apresentacao'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Apresentação (10m)
          </button>
          <button
            type="button"
            onClick={() => switchPhase('perguntas')}
            className={`rounded px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              phase === 'perguntas'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Arguição (10m)
          </button>
        </div>
        <span className="hidden sm:inline text-xs text-slate-500">Edital Item 5.4.2</span>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`font-mono text-lg font-semibold tabular-nums ${
            isFinished
              ? 'text-red-700'
              : isWarning
                ? 'text-amber-700'
                : 'text-slate-900'
          }`}
        >
          {formatted}
        </span>

        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          disabled={isFinished}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100 disabled:opacity-50 whitespace-nowrap shrink-0"
        >
          {running ? (
            <>
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              Pausar
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              Iniciar
            </>
          )}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          aria-label="Zerar cronômetro"
          className="rounded-md border border-slate-300 bg-white p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
