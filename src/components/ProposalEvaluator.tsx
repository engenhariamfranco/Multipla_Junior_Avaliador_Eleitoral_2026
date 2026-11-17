import React, { useRef, useState } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Mail,
  Send,
  X,
  Loader2,
} from 'lucide-react';
import { CARGOS_MAPEAMENTO, EXEMPLO_PROPOSTA_TEXTO } from '../data/referenceData';
import type { CargoId, ChatMessage, EvaluationResult } from '../types/evaluation';
import { SabatinaTimer } from './SabatinaTimer';

interface ProposalEvaluatorProps {
  selectedCargoId: CargoId;
  onChangeCargoId: (id: CargoId) => void;
  currentEvaluation: EvaluationResult | null;
  onEvaluationComplete: (result: EvaluationResult) => void;
  onResetWorkspace: () => void;
}

type InputMode = 'pdf' | 'texto';

export const ProposalEvaluator: React.FC<ProposalEvaluatorProps> = ({
  selectedCargoId,
  onChangeCargoId,
  currentEvaluation,
  onEvaluationComplete,
  onResetWorkspace,
}) => {
  const [inputMode, setInputMode] = useState<InputMode>('pdf');
  const [nomeInformado, setNomeInformado] = useState('');
  const [contextoAdicional, setContextoAdicional] = useState('');
  const [textoProposta, setTextoProposta] = useState('');
  const [pdfFile, setPdfFile] = useState<{
    name: string;
    size: number;
    base64: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCargo =
    CARGOS_MAPEAMENTO.find((c) => c.id === selectedCargoId) ?? CARGOS_MAPEAMENTO[0];

  const readPdfAsBase64 = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Envie um arquivo no formato PDF (.pdf), conforme exigido no Item 3.6 do Edital.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('O arquivo PDF excede o limite de 15 MB.');
      return;
    }
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      setPdfFile({
        name: file.name,
        size: file.size,
        base64,
      });
    };
    reader.onerror = () => {
      setErrorMsg('Falha ao ler o arquivo selecionado.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setInputMode('pdf');
      readPdfAsBase64(file);
    }
  };

  const handleLoadExample = () => {
    onChangeCargoId('diretor-projetos');
    setInputMode('texto');
    setPdfFile(null);
    setNomeInformado('Lucas Henrique Almeida');
    setContextoAdicional(
      'Verificar interface com Comercial/Financeiro e viabilidade dos prazos de implantação.'
    );
    setTextoProposta(EXEMPLO_PROPOSTA_TEXTO);
    setErrorMsg(null);
  };

  const handleClearForm = () => {
    setPdfFile(null);
    setTextoProposta('');
    setNomeInformado('');
    setContextoAdicional('');
    setErrorMsg(null);
    setChatMessages([]);
    onResetWorkspace();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (inputMode === 'pdf' && !pdfFile) {
      setErrorMsg('Selecione ou arraste o arquivo PDF da proposta antes de avaliar.');
      return;
    }
    if (inputMode === 'texto' && !textoProposta.trim()) {
      setErrorMsg('Cole o texto da proposta antes de iniciar a avaliação.');
      return;
    }

    setIsEvaluating(true);
    setChatMessages([]);

    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cargoPleiteado: selectedCargo.nome,
          cargoId: selectedCargo.id,
          nomeInformado: nomeInformado.trim() || undefined,
          contextoAdicional: contextoAdicional.trim() || undefined,
          fileName: inputMode === 'pdf' ? pdfFile?.name : null,
          mimeType: inputMode === 'pdf' ? 'application/pdf' : null,
          fileBase64: inputMode === 'pdf' ? pdfFile?.base64 : null,
          textoProposta: inputMode === 'texto' ? textoProposta : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Não foi possível concluir a avaliação.');
      }

      onEvaluationComplete(data as EvaluationResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro inesperado ao avaliar a proposta.';
      setErrorMsg(msg);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleCopyFull = async () => {
    if (!currentEvaluation) return;
    try {
      await navigator.clipboard.writeText(currentEvaluation.markdownCompleto);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleCopyEmail = async () => {
    if (!currentEvaluation) return;
    const subject = `Devolutiva Fase II - Processo Eleitoral 2026 Múltipla Júnior (${currentEvaluation.cargoPleiteado})`;
    const body = `Prezado(a) ${currentEvaluation.candidato},\n\nSegue o retorno da Comissão Organizadora referente à análise preliminar da sua proposta para o cargo de ${currentEvaluation.cargoPleiteado} (Status de Conformidade: ${currentEvaluation.statusConformidade}):\n\n${currentEvaluation.feedbackCandidato.paragrafo1Reconhecimento}\n\n${currentEvaluation.feedbackCandidato.paragrafo2Oportunidades}\n\nLembramos que eventuais ajustes e envio da versão final devem observar o prazo da Fase III (08/11/2026 a 15/11/2026) e os requisitos formais do Edital (máximo 10 páginas com capa, Times New Roman 12, espaçamento 1,5, formato PDF).\n\nAtenciosamente,\nComissão Eleitoral — Múltipla Júnior`;

    try {
      await navigator.clipboard.writeText(`Assunto: ${subject}\n\n${body}`);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEvaluation || !chatInput.trim() || isChatting) return;

    const userMessage: ChatMessage = { role: 'user', content: chatInput.trim() };
    const nextMessages = [...chatMessages, userMessage];
    setChatMessages(nextMessages);
    setChatInput('');
    setIsChatting(true);

    try {
      const response = await fetch('/api/chat-sabatina', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluationSummary: currentEvaluation.markdownCompleto,
          question: userMessage.content,
          history: chatMessages,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Erro ao consultar o especialista.');
      }
      setChatMessages([...nextMessages, { role: 'assistant', content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro na consulta complementar.';
      setChatMessages([
        ...nextMessages,
        { role: 'assistant', content: `Não foi possível responder: ${msg}` },
      ]);
    } finally {
      setIsChatting(false);
    }
  };

  const renderStatusIndicator = (status: EvaluationResult['statusConformidade']) => {
    if (status === 'Aprovado') {
      return (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          Aprovado
        </span>
      );
    }
    if (status === 'Requer Ajustes') {
      return (
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Requer Ajustes
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
        <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        Crítico
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-[1360px] px-6 py-8">
      <div className="grid gap-8 lg:grid-cols-[430px_minmax(0,1fr)] items-start">
        {/* COLUNA ESQUERDA: Parâmetros e Envio */}
        <aside className="rounded-xl border border-slate-200 bg-white p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <p className="text-xs font-medium text-slate-500">
              Comissão Eleitoral · Processo Seletivo 2026
            </p>
            <h1 className="mt-1 font-display text-xl font-bold tracking-tight text-slate-900">
              Avaliação de Proposta
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Cargo Pleiteado */}
            <div>
              <label htmlFor="cargo-select" className="block text-xs font-semibold text-slate-700">
                Cargo Pleiteado (Edital Item 4.2)
              </label>
              <select
                id="cargo-select"
                value={selectedCargoId}
                onChange={(e) => onChangeCargoId(e.target.value as CargoId)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#0F2D52] focus:outline-none"
              >
                {CARGOS_MAPEAMENTO.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.ordemEdital} — {cargo.nome}
                  </option>
                ))}
              </select>

              <div className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
                <p className="font-semibold text-slate-800">
                  Escopo oficial ({selectedCargo.area}):
                </p>
                <p className="mt-1">{selectedCargo.objetivo}</p>
              </div>
            </div>

            {/* Modo de Envio */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-700">Documento da Proposta</span>
                <button
                  type="button"
                  onClick={handleLoadExample}
                  className="text-xs font-medium text-[#0F2D52] hover:underline whitespace-nowrap"
                >
                  Carregar exemplo (Projetos)
                </button>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setInputMode('pdf')}
                  className={`rounded-md py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    inputMode === 'pdf'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Enviar PDF
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('texto')}
                  className={`rounded-md py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                    inputMode === 'texto'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Colar Texto
                </button>
              </div>

              {inputMode === 'pdf' ? (
                <div className="mt-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) readPdfAsBase64(file);
                    }}
                  />

                  {pdfFile ? (
                    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="h-4 w-4 text-[#0F2D52] shrink-0" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-900">
                            {pdfFile.name}
                          </p>
                          <p className="font-mono text-[11px] text-slate-500 tabular-nums">
                            {(pdfFile.size / 1024).toFixed(0)} KB · PDF pronto para auditoria
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPdfFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        aria-label="Remover arquivo PDF"
                        className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-800"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      className={`cursor-pointer rounded-lg border border-dashed px-4 py-7 text-center transition-colors ${
                        isDragging
                          ? 'border-[#0F2D52] bg-blue-50/40'
                          : 'border-slate-300 bg-slate-50/60 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Upload
                        className="mx-auto h-5 w-5 text-slate-500"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-xs font-semibold text-slate-800">
                        Clique para selecionar ou arraste o PDF
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Verificação automática de páginas (máx. 10) e formatação
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-3">
                  <textarea
                    rows={8}
                    value={textoProposta}
                    onChange={(e) => setTextoProposta(e.target.value)}
                    placeholder="Cole aqui o texto completo da proposta de candidatura (Histórico MEJ, Motivação, Cenário Atual, Propostas com Plano de Execução, Resultados Esperados e Considerações Finais)..."
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-[#0F2D52] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Campos Opcionais */}
            <div className="grid gap-4">
              <div>
                <label htmlFor="nome-input" className="block text-xs font-semibold text-slate-700">
                  Nome do(a) Candidato(a) <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <input
                  id="nome-input"
                  type="text"
                  value={nomeInformado}
                  onChange={(e) => setNomeInformado(e.target.value)}
                  placeholder="Extrair automaticamente do documento"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F2D52] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="notas-input" className="block text-xs font-semibold text-slate-700">
                  Foco da Banca / Observações <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <input
                  id="notas-input"
                  type="text"
                  value={contextoAdicional}
                  onChange={(e) => setContextoAdicional(e.target.value)}
                  placeholder="Ex: Candidato inscrito em 2 cargos; checar realismo financeiro"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F2D52] focus:outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs leading-relaxed text-red-800"
              >
                {errorMsg}
              </div>
            )}

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={isEvaluating}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F2D52] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#163B6B] disabled:opacity-60 whitespace-nowrap"
              >
                {isEvaluating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Analisando proposta...
                  </>
                ) : (
                  'Avaliar Proposta'
                )}
              </button>

              {(pdfFile || textoProposta || currentEvaluation) && (
                <button
                  type="button"
                  onClick={handleClearForm}
                  disabled={isEvaluating}
                  className="rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>
        </aside>

        {/* COLUNA DIREITA: Parecer Estruturado */}
        <main className="min-w-0">
          {isEvaluating ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <Loader2 className="h-5 w-5 animate-spin text-[#0F2D52]" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-lg font-semibold text-slate-900">
                    Cruzando proposta com documentos oficiais
                  </h2>
                  <p className="text-xs text-slate-500">
                    Auditando Edital PE 2026, Modelo 2026-2027 e Job Description de{' '}
                    {selectedCargo.nome}...
                  </p>
                </div>
              </div>

              <div className="space-y-4 animate-pulse">
                <div className="h-4 w-2/3 rounded bg-slate-200" />
                <div className="h-20 w-full rounded bg-slate-100" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-24 w-full rounded bg-slate-100" />
                <div className="h-4 w-3/5 rounded bg-slate-200" />
                <div className="h-24 w-full rounded bg-slate-100" />
              </div>
            </div>
          ) : !currentEvaluation ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 md:p-10 space-y-8">
              <div className="border-b border-slate-100 pb-6">
                <p className="text-xs font-medium text-slate-500">
                  Múltipla Júnior · UFMS Engenharia de Produção
                </p>
                <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-slate-900 text-balance">
                  Painel Técnico de Avaliação Eleitoral 2026
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                  Selecione o cargo pleiteado e envie a proposta em PDF (ou cole o texto) para gerar
                  o parecer crítico padronizado da Comissão Eleitoral, a devolutiva para e-mail da
                  Fase II e as questões estratégicas da Sabatina.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold text-slate-500">
                    5 Dimensões Obrigatórias Avaliadas
                  </h3>
                  <ol className="space-y-2.5 text-sm text-slate-700">
                    <li>
                      <span className="font-semibold text-slate-900">1. Conformidade Edital:</span>{' '}
                      Máximo 10 páginas, Times New Roman 12, espaçamento 1,5 e seções do Modelo.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">2. Diagnóstico Real:</span>{' '}
                      Veracidade e profundidade sobre o momento atual da EJ e da área.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">3. Visão Sistêmica:</span>{' '}
                      Impacto transversal no caixa, outras diretorias, membros e imagem externa.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">4. Execução & KPIs:</span>{' '}
                      Clareza de O quê, Quem, Como, prazos, cronograma e indicadores tangíveis.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">5. Escopo do Cargo:</span>{' '}
                      Aderência estrita ao Mapeamento de Cargos sem invasão de alçada.
                    </li>
                  </ol>
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                  <h3 className="text-xs font-semibold text-slate-500">
                    Entregáveis Gerados para a Banca
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li>
                      <span className="font-semibold text-slate-900">Parecer Técnico Estruturado:</span>{' '}
                      Diagnóstico por dimensão + 2 a 3 recomendações acionáveis.
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">E-mail de Devolutiva (Fase II):</span>{' '}
                      2 parágrafos formais prontos para envio ao candidato (05/11 a 07/11).
                    </li>
                    <li>
                      <span className="font-semibold text-slate-900">2 Perguntas de Sabatina:</span>{' '}
                      Questões investigativas acompanhadas de cronômetro oficial (10m + 10m).
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200">
              {/* CABEÇALHO DO PARECER */}
              <div className="p-6 md:p-8 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>Parecer de Avaliação de Proposta</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {new Date(currentEvaluation.evaluatedAt).toLocaleString('pt-BR')}
                      </span>
                      {currentEvaluation.fileName && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{currentEvaluation.fileName}</span>
                        </>
                      )}
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
                      {currentEvaluation.candidato}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      Cargo Pleiteado: {currentEvaluation.cargoPleiteado}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2">
                      {renderStatusIndicator(currentEvaluation.statusConformidade)}
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyFull}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0F2D52] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#163B6B] transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedFull ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Parecer Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copiar Parecer Completo
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Auditoria Objetiva de Conformidade */}
                <div className="grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-slate-500">Limite de Páginas (Item 3.6 I)</p>
                    <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-slate-900">
                      {currentEvaluation.verificacaoDocumental.numeroPaginasDetectado !== null
                        ? `${currentEvaluation.verificacaoDocumental.numeroPaginasDetectado} / 10 páginas`
                        : 'Avaliado via texto'}
                      {' · '}
                      <span
                        className={
                          currentEvaluation.verificacaoDocumental.dentroLimitePaginas
                            ? 'text-emerald-700'
                            : 'text-red-700'
                        }
                      >
                        {currentEvaluation.verificacaoDocumental.dentroLimitePaginas
                          ? 'Conforme'
                          : 'Excede limite'}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Formato Oficial (Item 3.6 IV)</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {currentEvaluation.verificacaoDocumental.formatoArquivoPdf
                        ? 'PDF enviado'
                        : 'Rascunho em texto (exige PDF final)'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Times New Roman 12 / 1,5</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-700">
                      {currentEvaluation.verificacaoDocumental.formatacaoTimesNewRoman12Espacamento15}
                    </p>
                  </div>
                </div>

                {/* Checklist de Seções Obrigatórias */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs font-semibold text-slate-500 mb-2.5">
                    Checklist Estrutural do Modelo 2026-2027 (Item 3.5)
                  </p>
                  <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {currentEvaluation.verificacaoDocumental.secoesObrigatorias.map((sec, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        {sec.presente ? (
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 text-emerald-700 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircle
                            className="mt-0.5 h-3.5 w-3.5 text-red-700 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <p className="text-slate-700 leading-relaxed">
                          <span className="font-semibold text-slate-900">{sec.secao}:</span>{' '}
                          {sec.observacao}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BLOCO 1: PARECER CRÍTICO NAS 4 DIMENSÕES */}
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Parecer de Avaliação Técnica
                </h3>

                <div className="space-y-5">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      1. Diagnóstico e Veracidade do Contexto
                    </h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
                      {currentEvaluation.parecer.diagnosticoContexto}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      2. Visão Sistêmica e Impacto Estratégico
                    </h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
                      {currentEvaluation.parecer.visaoSistemica}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      3. Qualidade do Plano de Ação, Prazos e Execução
                    </h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
                      {currentEvaluation.parecer.planoAcaoExecucao}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      4. Alinhamento com o Escopo do Cargo (Job Description)
                    </h4>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">
                      {currentEvaluation.parecer.alinhamentoEscopo}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-sm font-semibold text-slate-900">
                      Recomendações Práticas / Pontos de Melhoria
                    </h4>
                    <ul className="mt-2 space-y-2 text-[15px] text-slate-700 list-disc pl-5">
                      {currentEvaluation.parecer.recomendacoesPraticas.map((rec, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* BLOCO 2: FEEDBACK RESUMIDO PARA O CANDIDATO */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      Feedback Resumido para o Candidato (2 Parágrafos)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Texto formal pronto para devolutiva por e-mail na Fase II (05/11 a 07/11/2026)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        E-mail Copiado
                      </>
                    ) : (
                      <>
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        Copiar E-mail Fase II
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4 pt-2 text-[15px] leading-relaxed text-slate-800">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Parágrafo 1 (Reconhecimento e Alinhamento):{' '}
                    </span>
                    {currentEvaluation.feedbackCandidato.paragrafo1Reconhecimento}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Parágrafo 2 (Oportunidades de Evolução):{' '}
                    </span>
                    {currentEvaluation.feedbackCandidato.paragrafo2Oportunidades}
                  </p>
                </div>
              </div>

              {/* BLOCO 3: PERGUNTAS ESTRATÉGICAS PARA SABATINA + CRONÔMETRO */}
              <div className="p-6 md:p-8 space-y-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Perguntas Estratégicas para a Sabatina (2 Questões)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Uso na Assembleia Geral Ordinária em 20/11/2026 (Fase IV)
                  </p>
                </div>

                <SabatinaTimer />

                <div className="space-y-5 pt-2">
                  {currentEvaluation.perguntasSabatina.map((q) => (
                    <div key={q.numero} className="space-y-1.5">
                      <p className="text-xs font-semibold text-[#0F2D52]">
                        Questão {q.numero} · {q.foco}
                      </p>
                      <p className="text-[15px] font-medium leading-relaxed text-slate-900">
                        {q.pergunta}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-500">
                        O que observar na resposta: {q.objetivoBanca}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BLOCO 4: CONSULTA COMPLEMENTAR DA COMISSÃO */}
              <div className="p-6 md:p-8 space-y-4 bg-slate-50/50 rounded-b-xl">
                <div>
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    Aprofundamento com a Comissão Eleitoral
                  </h3>
                  <p className="text-xs text-slate-500">
                    Solicite uma 3ª pergunta de desempate, valide regras do Edital para este candidato
                    ou ajuste a devolutiva.
                  </p>
                </div>

                {chatMessages.length > 0 && (
                  <div className="space-y-3 border-t border-slate-200 pt-4">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-[#0F2D52] text-white ml-8'
                            : 'bg-white border border-slate-200 text-slate-800 mr-8'
                        }`}
                      >
                        <p className="text-[11px] font-semibold opacity-75 mb-1">
                          {msg.role === 'user' ? 'Comissão Eleitoral' : 'Agente Avaliador'}
                        </p>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleSendChat} className="flex items-center gap-2.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ex: Gere uma 3ª pergunta focada em gestão de crise no caixa..."
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0F2D52] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isChatting || !chatInput.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F2D52] px-4 py-2 text-xs font-semibold text-white hover:bg-[#163B6B] disabled:opacity-50 whitespace-nowrap shrink-0"
                  >
                    {isChatting ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    Consultar
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
