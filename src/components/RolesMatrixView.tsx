import React, { useState } from 'react';
import { CARGOS_MAPEAMENTO } from '../data/referenceData';
import type { CargoId } from '../types/evaluation';

interface RolesMatrixViewProps {
  onEvaluateRole: (cargoId: CargoId) => void;
}

export const RolesMatrixView: React.FC<RolesMatrixViewProps> = ({ onEvaluateRole }) => {
  const [selectedId, setSelectedId] = useState<CargoId>('presidente');
  const cargo = CARGOS_MAPEAMENTO.find((c) => c.id === selectedId) ?? CARGOS_MAPEAMENTO[0];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-medium text-slate-500">
          Edital Item 4.2 · Planilha Oficial de Mapeamento de Cargos
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900 text-balance">
          Mapeamento de Cargos e Fronteiras de Alçada
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Consulte as atribuições oficiais, competências e limites de atuação de cada cadeira para
          validar aderência de escopo e evitar propostas que invadam competências de outras diretorias.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] items-start">
        <aside aria-label="Lista de cargos" className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
          {CARGOS_MAPEAMENTO.map((item) => {
            const active = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left px-4 py-3 transition-colors flex items-baseline justify-between gap-3 ${
                  active
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{item.nome}</p>
                  <p className={`text-xs truncate ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                    {item.area}
                  </p>
                </div>
                <span
                  className={`font-mono text-xs tabular-nums shrink-0 ${
                    active ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {item.ordemEdital}
                </span>
              </button>
            );
          })}
        </aside>

        <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Item {cargo.ordemEdital} do Edital</span>
                <span aria-hidden="true">·</span>
                <span>{cargo.area}</span>
                <span aria-hidden="true">·</span>
                <span>Reporta-se a: {cargo.subordinacao}</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">{cargo.nome}</h2>
              <p className="mt-1 text-xs text-slate-500">
                Ocupante de referência (2026): {cargo.atualOcupante}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onEvaluateRole(cargo.id)}
              className="rounded-lg bg-[#0F2D52] px-4 py-2 text-xs font-semibold text-white hover:bg-[#163B6B] transition-colors whitespace-nowrap shrink-0"
            >
              Avaliar proposta para este cargo
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-500">Objetivo do Cargo</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">{cargo.objetivo}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500">Descrição Sumária</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-800">{cargo.descricao}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-xs font-semibold text-slate-500">
              Fronteiras de Alçada e Sinergia Obrigatória
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-800 bg-slate-50 rounded-lg border border-slate-200 p-4">
              {cargo.fronteirasAlcadas}
            </p>
          </div>

          <div className="grid gap-8 border-t border-slate-100 pt-6 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-500">Principais Responsabilidades</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
                {cargo.principaisResponsabilidades.map((resp, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {resp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500">Conhecimentos Técnicos</h3>
                <ul className="mt-2.5 space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                  {cargo.conhecimentosTecnicos.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500">Perfil Comportamental</h3>
                <ul className="mt-2.5 space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                  {cargo.habilidadesComportamentais.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-500">Ferramentas Utilizadas</h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                  {cargo.ferramentas.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
