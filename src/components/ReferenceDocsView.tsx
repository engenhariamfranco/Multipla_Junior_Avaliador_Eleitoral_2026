import React from 'react';
import { ExternalLink, FileText, Calendar, ShieldAlert } from 'lucide-react';
import { CRONOGRAMA_ELEITORAL, DOCUMENTOS_OFICIAIS } from '../data/referenceData';

export const ReferenceDocsView: React.FC = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8 space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-medium text-slate-500">
          Processo Eleitoral 2026 · Gestão 2027 · Engenharia de Produção UFMS
        </p>
        <h1 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900 text-balance">
          Base Normativa e Documentos de Referência
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Toda avaliação gerada pelo sistema cruza a proposta do candidato diretamente com os três
          documentos oficiais homologados pela Múltipla Júnior para o ciclo eleitoral 2026-2027.
        </p>
      </div>

      {/* Documentos Oficiais */}
      <section aria-labelledby="docs-heading" className="space-y-4">
        <h2 id="docs-heading" className="font-display text-lg font-semibold text-slate-900">
          01. Documentos Incorporados
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {DOCUMENTOS_OFICIAIS.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <FileText className="h-5 w-5 text-[#0F2D52] shrink-0" aria-hidden="true" />
                  <span className="text-xs text-slate-500 tabular-nums">{doc.atualizacao}</span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
                  {doc.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{doc.subtitulo}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <a
                  href={doc.arquivoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F2D52] hover:text-blue-700 transition-colors whitespace-nowrap"
                >
                  Abrir PDF oficial
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cronograma + Regras de Formatação e Desclassificação */}
      <div className="grid gap-8 lg:grid-cols-2 items-start">
        <section
          aria-labelledby="cronograma-heading"
          className="rounded-xl border border-slate-200 bg-white p-6"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <Calendar className="h-4 w-4 text-[#0F2D52]" aria-hidden="true" />
            <h2 id="cronograma-heading" className="font-display text-base font-semibold text-slate-900">
              02. Cronograma Oficial (Edital Item 5.2)
            </h2>
          </div>
          <div className="divide-y divide-slate-100 mt-2">
            {CRONOGRAMA_ELEITORAL.map((item) => (
              <div key={item.fase} className="py-3.5 grid grid-cols-[120px_1fr] gap-4 items-baseline">
                <div>
                  <p className="text-xs font-semibold text-slate-900">{item.fase}</p>
                  <p className="mt-0.5 font-mono text-xs text-slate-500 tabular-nums">
                    {item.periodo}
                  </p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="regras-heading"
          className="rounded-xl border border-slate-200 bg-white p-6 space-y-5"
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
            <ShieldAlert className="h-4 w-4 text-[#0F2D52]" aria-hidden="true" />
            <h2 id="regras-heading" className="font-display text-base font-semibold text-slate-900">
              03. Exigências Formais & Desclassificação
            </h2>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Apresentação Obrigatória (Item 3.6):</p>
            <ul className="space-y-1.5 text-slate-600 list-disc pl-5">
              <li>Limite máximo de 10 (dez) páginas, incluindo a capa.</li>
              <li>Fonte Times New Roman, tamanho 12, com espaçamento entre linhas de 1,5.</li>
              <li>Envio exclusivamente em formato PDF via Formulário Oficial.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Estrutura Mínima do Modelo (Item 3.5):</p>
            <ul className="space-y-1.5 text-slate-600 list-disc pl-5">
              <li>Identificação (Nome, Período, Tempo na EJ, Cargo Atual, Cargo Pleiteado).</li>
              <li>Histórico MEJ e Motivação à Candidatura.</li>
              <li>Objetivos Gerais e Diagnóstico do Cenário Atual (Múltipla e área).</li>
              <li>Propostas de Trabalho com Plano de Execução (O quê, Quem, Como, Prazos, Indicadores).</li>
              <li>Resultados Esperados e Considerações Finais.</li>
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
            Atenção (Item 7.1, III): O não atendimento aos itens 3.5 e 3.6 na versão final enviada
            após a Fase III implica desclassificação da candidatura.
          </div>
        </section>
      </div>
    </div>
  );
};
