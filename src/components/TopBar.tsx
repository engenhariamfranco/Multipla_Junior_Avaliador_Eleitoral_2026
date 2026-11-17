import React from 'react';

export type ActiveTab = 'avaliador' | 'documentos' | 'cargos' | 'historico';

interface TopBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onNewAnalysis: () => void;
  historyCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onNewAnalysis,
  historyCount,
}) => {
  const navItems: Array<{ id: ActiveTab; label: string }> = [
    { id: 'avaliador', label: 'Avaliador' },
    { id: 'documentos', label: 'Base Oficial' },
    { id: 'cargos', label: 'Cargos' },
    { id: 'historico', label: historyCount > 0 ? `Histórico (${historyCount})` : 'Histórico' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-8 px-6 py-3.5">
        <button
          type="button"
          onClick={() => onSelectTab('avaliador')}
          className="font-display text-lg font-bold tracking-tight text-[#0F2D52] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          Múltipla Júnior
        </button>

        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 ${
                  isActive ? 'text-[#0F2D52]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-[#0F2D52]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onNewAnalysis}
            className="rounded-lg bg-[#0F2D52] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#163B6B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            Nova Análise
          </button>
        </div>
      </div>

      {/* Mobile secondary navigation */}
      <div className="flex items-center gap-5 overflow-x-auto border-t border-slate-100 px-6 py-2 md:hidden">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`text-xs font-medium whitespace-nowrap shrink-0 py-1 ${
                isActive ? 'text-[#0F2D52] underline underline-offset-4' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
