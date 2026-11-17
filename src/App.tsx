import { useEffect, useState } from 'react';
import { TopBar, type ActiveTab } from './components/TopBar';
import { ProposalEvaluator } from './components/ProposalEvaluator';
import { ReferenceDocsView } from './components/ReferenceDocsView';
import { RolesMatrixView } from './components/RolesMatrixView';
import { EvaluationHistoryView } from './components/EvaluationHistoryView';
import type { CargoId, EvaluationResult } from './types/evaluation';

const STORAGE_KEY = 'multipla_pe2026_evaluations_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('avaliador');
  const [selectedCargoId, setSelectedCargoId] = useState<CargoId>('presidente');
  const [currentEvaluation, setCurrentEvaluation] = useState<EvaluationResult | null>(null);
  const [history, setHistory] = useState<EvaluationResult[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as EvaluationResult[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore storage quota errors
    }
  }, [history]);

  const handleEvaluationComplete = (result: EvaluationResult) => {
    setCurrentEvaluation(result);
    setHistory((prev) => [result, ...prev.filter((item) => item.id !== result.id)].slice(0, 50));
  };

  const handleNewAnalysis = () => {
    setCurrentEvaluation(null);
    setActiveTab('avaliador');
  };

  const handleOpenEvaluation = (evaluation: EvaluationResult) => {
    setSelectedCargoId(evaluation.cargoId);
    setCurrentEvaluation(evaluation);
    setActiveTab('avaliador');
  };

  const handleDeleteEvaluation = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (currentEvaluation?.id === id) {
      setCurrentEvaluation(null);
    }
  };

  const handleEvaluateRole = (cargoId: CargoId) => {
    setSelectedCargoId(cargoId);
    setCurrentEvaluation(null);
    setActiveTab('avaliador');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNewAnalysis={handleNewAnalysis}
        historyCount={history.length}
      />

      <div className="flex-1">
        {activeTab === 'avaliador' && (
          <ProposalEvaluator
            selectedCargoId={selectedCargoId}
            onChangeCargoId={setSelectedCargoId}
            currentEvaluation={currentEvaluation}
            onEvaluationComplete={handleEvaluationComplete}
            onResetWorkspace={() => setCurrentEvaluation(null)}
          />
        )}

        {activeTab === 'documentos' && <ReferenceDocsView />}

        {activeTab === 'cargos' && <RolesMatrixView onEvaluateRole={handleEvaluateRole} />}

        {activeTab === 'historico' && (
          <EvaluationHistoryView
            history={history}
            onOpenEvaluation={handleOpenEvaluation}
            onDeleteEvaluation={handleDeleteEvaluation}
            onGoToEvaluator={() => setActiveTab('avaliador')}
          />
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white py-4 px-6">
        <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <span>Múltipla Júnior Consultoria · Engenharia de Produção UFMS</span>
          <span>Processo Eleitoral 2026 · Gestão 2027</span>
        </div>
      </footer>
    </div>
  );
}
