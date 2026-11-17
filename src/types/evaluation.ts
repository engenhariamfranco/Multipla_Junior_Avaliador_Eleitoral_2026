export type CargoId =
  | 'presidente'
  | 'vp-operacional'
  | 'vp-cultura'
  | 'diretor-comercial'
  | 'diretor-marketing'
  | 'diretor-financeiro'
  | 'diretor-rh'
  | 'diretor-projetos'
  | 'conselheiro-fiscal';

export type StatusConformidade = 'Aprovado' | 'Requer Ajustes' | 'Crítico';

export interface SecaoModeloCheck {
  secao: string;
  presente: boolean;
  observacao: string;
}

export interface VerificacaoDocumental {
  numeroPaginasDetectado: number | null;
  dentroLimitePaginas: boolean;
  formatacaoTimesNewRoman12Espacamento15: string;
  formatoArquivoPdf: boolean;
  secoesObrigatorias: SecaoModeloCheck[];
  resumoConformidade: string;
}

export interface PerguntaSabatina {
  numero: number;
  foco: string;
  pergunta: string;
  objetivoBanca: string;
}

export interface EvaluationResult {
  id: string;
  evaluatedAt: string;
  fileName: string | null;
  candidato: string;
  cargoPleiteado: string;
  cargoId: CargoId;
  statusConformidade: StatusConformidade;
  verificacaoDocumental: VerificacaoDocumental;
  parecer: {
    diagnosticoContexto: string;
    visaoSistemica: string;
    planoAcaoExecucao: string;
    alinhamentoEscopo: string;
    recomendacoesPraticas: string[];
  };
  feedbackCandidato: {
    paragrafo1Reconhecimento: string;
    paragrafo2Oportunidades: string;
  };
  perguntasSabatina: PerguntaSabatina[];
  markdownCompleto: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
