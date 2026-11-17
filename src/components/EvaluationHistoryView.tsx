import React, { useMemo, useState } from 'react';
import { Trash2, Eye, Copy, Check, Search } from 'lucide-react';
import type { EvaluationResult, StatusConformidade } from '../types/evaluation';

interface EvaluationHistoryViewProps {
  history: EvaluationResult[];
  onOpenEvaluation: (evaluation: EvaluationResult) => void;
  onDeleteEvaluation: (id: string) => void;
  onGoToEvaluator: () => void;
}

export const EvaluationHistoryView: React.FC<EvaluationHistoryViewProps> = ({
  history,
  onOpenEvaluation,
  onDeleteEvaluation,
  onGoToEvaluator,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | StatusConformidade>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return history.filter((item) => {
      const matchesStatus = statusFilter === 'Todos' || item.statusConformidade === statusFilter;
      const matchesQuery =
        !q ||
        item.candidato.toLowerCase().includes(q) ||
        item.cargoPleiteado.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [history, search, statusFilter]);

  const handleCopy = async (item: EvaluationResult) => {
    try {
      await navigator.clipboard.writeText(item.markdownCompleto);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  const statusColor = (status: StatusConformidade) => {
    if (status === 'Aprovado') return 'text-emerald-700';
    if (status === 'Requer Ajustes') return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Registro local de pareceres emitidos neste navegador
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900">
            Histórico de Avaliações
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar candidato ou cargo..."
              className="w-60 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F2D52] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
            {(['Todos', 'Aprovado', 'Requer Ajustes', 'Crítico'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === status
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Nenhum parecer registrado ainda
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Ao avaliar uma proposta de candidatura, o parecer completo, o e-mail de devolutiva e as
            perguntas da sabatina ficam salvos automaticamente aqui.
          </p>
          <button
            type="button"
            onClick={onGoToEvaluator}
            className="mt-6 rounded-lg bg-[#0F2D52] px-4 py-2 text-xs font-semibold text-white hover:bg-[#163B6B] transition-colors"
          >
            Avaliar primeira proposta
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-600">
          Nenhuma avaliação corresponde aos filtros aplicados.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
              <tr>
                <th className="px-5 py-3">Candidato(a)</th>
                <th className="px-5 py-3">Cargo Pleiteado</th>
                <th className="px-5 py-3">Status Edital</th>
                <th className="px-5 py-3 text-right">Páginas</th>
                <th className="px-5 py-3 text-right">Data</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-900">{item.candidato}</td>
                  <td className="px-5 py-3.5 text-slate-700">{item.cargoPleiteado}</td>
                  <td className={`px-5 py-3.5 font-semibold ${statusColor(item.statusConformidade)}`}>
                    {item.statusConformidade}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-xs text-slate-600 tabular-nums">
                    {item.verificacaoDocumental.numeroPaginasDetectado !== null
                      ? `${item.verificacaoDocumental.numeroPaginasDetectado}/10`
                      : 'Texto'}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-xs text-slate-500 tabular-nums">
                    {new Date(item.evaluatedAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenEvaluation(item)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        Abrir
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap"
                        title="Copiar parecer em Markdown"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {copiedId === item.id ? 'Copiado' : 'Copiar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteEvaluation(item.id)}
                        aria-label={`Excluir avaliação de ${item.candidato}`}
                        className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
