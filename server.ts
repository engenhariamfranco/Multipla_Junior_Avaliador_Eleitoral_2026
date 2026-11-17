import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Chave GEMINI_API_KEY não encontrada no ambiente. Verifique as configurações de Secrets no AI Studio.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const REFERENCE_KNOWLEDGE_BASE = `
=== DOCUMENTO 1: EDITAL DO PROCESSO ELEITORAL 2026 (MÚLTIPLA JÚNIOR - UFMS) ===
- Finalidade: Seleção de Diretoria Executiva e Conselheiro Fiscal para gestão de 2027 (mandato de 1 ano: 20/11/2026 a 20/11/2027; Co-Gestão: 20/11/2026 a 31/01/2027).
- Requisitos de elegibilidade (Item 2.1): Membro efetivo na inscrição; vínculo acadêmico regular com UFMS; ciência e concordância com Edital, Estatuto Social e Regimento Interno.
- Regra de Candidatura (Item 3.3 e 5.5.4): Até 2 cargos, mas Regra do Cargo Único (assume apenas 1). Conselho Fiscal é tratado separadamente da hierarquia da Diretoria Executiva.
- Conteúdo Mínimo Obrigatório da Proposta (Item 3.5):
  I - apresentação e trajetória do candidato na Múltipla Júnior e/ou no MEJ;
  II - motivação para concorrer ao cargo;
  III - diagnóstico do contexto atual da Múltipla Júnior e da área pretendida;
  IV - objetivos e propostas de trabalho para o período de gestão;
  V - resultados esperados e, quando possível, indicadores para seu acompanhamento;
  VI - considerações finais.
- Requisitos Formais de Apresentação (Item 3.6) — CRITÉRIO DE DESCLASSIFICAÇÃO NA VERSÃO FINAL (Item 7.1, III):
  I - limite máximo de 10 (dez) páginas, a contar com capa;
  II - fonte Times New Roman, tamanho 12;
  III - espaçamento entre linhas de 1,5;
  IV - envio em formato PDF pelo formulário oficial.
- Fases e Cronograma (Item 5.1 e 5.2):
  Fase I (20/10 a 04/11/2026): Inscrição e envio da proposta.
  Fase II (05/11 a 07/11/2026): Análise pela comissão organizadora e envio de devolutiva por e-mail sugerindo alterações.
  Fase III (08/11 a 15/11/2026): Envio do modelo final corrigido.
  Divulgação homologadas: 16/11/2026.
  Fases IV, V, VI, VII (20/11/2026): Sabatina (10 min apresentação + 10 min perguntas), Eleição, 2º turno se <= 50% votos válidos, Divulgação e Posse.

=== DOCUMENTO 2: MODELO OFICIAL DE PROPOSTA 2026-2027 ===
- Cabeçalho obrigatório: Nome, Período, Tempo na EJ, Cargo Atual, Cargo Pleiteado.
- Seções:
  1. Histórico MEJ (trajetória/participação na EJ ou eventos MEJ)
  2. Motivação à Candidatura (por que concorre ao nível tático/estratégico, incluindo subtópicos: Objetivos Gerais e Cenário atual e contexto do cargo/setor)
  3. Propostas de Trabalho (Proposta 1, 2, 3..., obrigatoriamente incluindo plano de execução: O quê? Quem? Como? Prazos/Cronograma? Indicadores, etc.)
  4. Resultados Esperados (impacto dentro da Múltipla e o que pretende alcançar)
  5. Considerações Finais.

=== DOCUMENTO 3: JOB DESCRIPTION / MAPEAMENTO DE CARGOS OFICIAL ===
1) Presidente(a) [Área: Estratégico | Subordinação: Conselho Consultivo e Assembleia Geral]:
   - Objetivo: Alcançar objetivos estratégicos via integração entre setores, acompanhamento de metas (KPIs/OKRs), desenvolvimento de lideranças, tomada de decisão e fortalecimento institucional.
   - Funções: Gestão estratégica, liderança da diretoria executiva, integração entre setores, acompanhamento de resultados, condução de reuniões, suporte à tomada de decisão, desenvolvimento de lideranças, fortalecimento da cultura, articulação externa e representação institucional (UFMS, FEJEMS, Brasil Júnior, parceiros, clientes), validação estratégica de documentos/decisões de maior impacto, comunicação estratégica, melhoria contínua.
   - Fronteira: Nível estratégico global e representação institucional. Não microgerenciar rotinas operacionais de diretorias específicas.

2) Vice-Presidente(a) Operacional [Área: Estratégico | Subordinação: Presidência]:
   - Objetivo: Garantir processos claros e eficientes, organização, integração entre setores e gestão orientada por dados.
   - Funções: Desdobramento estratégico em metas/processos/ações; acompanhamento direto das diretorias de PROJETOS e FINANCEIRO (follow-up de demandas); monitoramento de KPIs/OKRs operacionais; análise de dados; mapeamento e padronização de processos internos; gestão e atualização de POPs; documentação para continuidade entre gestões; acompanhamento de ferramentas (ClickUp, Portal BJ); identificação de gargalos operacionais; integração entre setores.
   - Fronteira: Supervisiona diretamente Projetos e Financeiro e padronização operacional. Não substitui a VPC na supervisão de RH/Marketing.

3) Vice-Presidente(a) de Cultura [Área: Estratégico | Subordinação: Presidência]:
   - Objetivo: Garantir aplicação consistente da cultura organizacional, promovendo engajamento, desenvolvimento humano e continuidade entre gestões.
   - Funções: Gestão do engajamento; integração entre setores e pertencimento; acompanhamento estratégico de RECURSOS HUMANOS e MARKETING; alinhamento institucional com Presidência; monitoramento do clima organizacional (Pesquisa de Clima); gestão do conhecimento organizacional; apoio à integração, onboarding e PDC com o RH; fortalecimento de valores/cultura; mediação de conflitos; relacionamento institucional em ações, capacitações e eventos (UFMS, FEJEMS, parceiros).
   - Fronteira: Supervisiona estrategicamente RH e Marketing, cultura, clima e gestão do conhecimento. Não executa o operacional diário de RH/Marketing nem assume Projetos/Financeiro.

4) Diretor(a) Comercial [Área: Comercial | Subordinação: Presidência]:
   - Objetivo: Assegurar crescimento via gestão estratégica do setor Comercial, coordenando prospecção, relacionamento com clientes, negociações e desenvolvimento da equipe.
   - Funções: Gestão do relacionamento com clientes estratégicos; validação final das propostas comerciais antes do envio; planejamento estratégico do setor (metas de prospecção/captação); distribuição e acompanhamento de demandas da equipe; definição de escopo e precificação em conjunto com PROJETOS e FINANCEIRO; acompanhamento de prospecções ativas e negociações; capacitação e redução da concentração de atividades na diretoria; integração com Presidência e demais diretorias; uso da Carta de Serviços e ClickUp.
   - Fronteira: Prospecção ativa, negociação e interface cliente-EJ. Precificação e escopo são conjuntos com Projetos e Financeiro; execução técnica de projetos é de Projetos; tráfego/mídias/branding são de Marketing.

5) Diretor(a) de Marketing [Área: Marketing | Subordinação: Presidência / acompanhamento VPC]:
   - Objetivo: Garantir representação de marca assertiva, alinhada ao público acadêmico e ao perfil de clientes da Múltipla.
   - Funções: Planejamento estratégico de mídias (mensal, semestral, anual); definição de diretrizes de comunicação e gestão da identidade visual/branding; acompanhamento operacional e prazos; revisão, validação e aprovação de designs; alinhamento com Comercial e VPC; estratégias de divulgação de produtos/serviços em conjunto com Comercial (inbound/outbound, tráfego orgânico, endomarketing); planejamento e organização de eventos (articulado com Comercial e VPC); orientação e desenvolvimento da equipe; análise no Google Analytics e ClickUp.
   - Fronteira: Job Description explicitamente diz "desconsiderando as ações de prospecção ativa" (que pertencem ao Comercial).

6) Diretor(a) Financeiro(a) [Área: Financeiro e Administrativo | Subordinação: Presidência / acompanhamento VP Operacional]:
   - Objetivo: Garantir organização administrativa e financeira, cumprimento de obrigações legais/financeiras, execução de processos e distribuição eficiente de responsabilidades.
   - Funções: Gestão e distribuição de demandas dos assessores; controle financeiro (entradas/saídas); fluxo de caixa; relatórios financeiros; DRE e indicadores financeiros; processos cartoriais (atas, editais, termos); assinaturas digitais e registros (Plataforma GOV); manutenção e documentação do Selo EJ; contato e alinhamento com contador; orçamentos com Presidência/VP/setores; apoio na precificação de projetos; movimentação da conta bancária CORA e Portal BJ; desenvolvimento técnico da equipe para reduzir concentração.
   - Fronteira: Gestão administrativa, contábil-operacional, financeira e cartorial. Não se confunde com a fiscalização independente do Conselho Fiscal.

7) Diretor(a) de Recursos Humanos [Área: Gestão de Pessoas / RH | Subordinação: Presidência / acompanhamento VPC]:
   - Objetivo: Liderar e organizar o RH, garantindo projetos/demandas, desenvolvimento/capacitação, engajamento e melhoria contínua dos processos de gestão de pessoas.
   - Funções: Liderança do setor e condução de reuniões setoriais; engajamento e cultura organizacional; condução do Processo Seletivo; acompanhamento de membros (feedbacks, necessidades); revisão e validação de entregas; desenvolvimento e capacitação; incentivo a novas lideranças; gestão do conhecimento e POPs/fluxogramas/atas; acompanhamento de metas, OKRs e KPIs de RH com a Presidência; distribuição de demandas no ClickUp; gestão da Gamification; integração com demais setores.
   - Fronteira: Execução e gestão dos processos de pessoas, PS, capacitação e Gamification, em sinergia com a VPC (nível estratégico de cultura).

8) Diretor(a) de Projetos [Área: Projetos | Subordinação: Presidência / acompanhamento VP Operacional]:
   - Objetivo: Garantir excelência na entrega dos projetos, estruturando o setor, organizando demandas e capacitando membros na aplicação prática de ferramentas de Engenharia de Produção.
   - Funções: Alocação de equipes e designação de líderes; elaboração de propostas técnico-comerciais em parceria direta com Comercial; organização e revisão de mapeamentos de processos (internos e clientes externos em BPMN/Bizagi); acompanhamento e revisão de entregáveis e POPs; visitas técnicas e diagnósticos iniciais; integração com Comercial (propostas/visitas) e RH (capacitações); capacitação e orientação técnica da equipe; gestão e acompanhamento de demandas no ClickUp.
   - Fronteira: Liderança técnica das entregas, alocação de consultores/assessores e qualidade técnica. Prospecção ativa e fechamento contratual pertencem ao Comercial; precificação financeira envolve Financeiro e Comercial.

9) Conselheiro Fiscal [Órgão Independente | Subordinação: Assembleia Geral - Edital Item 4.4]:
   - Finalidade: Fiscalização contábil-financeira diligente e independente da Diretoria Executiva, conforme Estatuto Social.
   - Atribuições: (a) examinar livros, documentos e demonstrativos contábeis; (b) emitir parecer sobre prestações de contas e demonstrações financeiras; (c) acompanhar a execução orçamentária e recomendar medidas corretivas; (d) solicitar esclarecimentos à Diretoria quando necessário; (e) encaminhar relatórios e pareceres à Assembleia Geral.
   - Fronteira: Atuação independente fiscalizadora. Não deve propor ações de execução operacional/administrativa direta (que pertencem à Diretoria Financeira), mas sim auditoria, fiscalização, pareceres e recomendações à Diretoria/AGO.
`;

const EVALUATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    candidato: {
      type: Type.STRING,
      description: 'Nome completo do(a) candidato(a) extraído da proposta ou informado.',
    },
    cargoPleiteado: {
      type: Type.STRING,
      description: 'Nome oficial do cargo pleiteado.',
    },
    statusConformidade: {
      type: Type.STRING,
      enum: ['Aprovado', 'Requer Ajustes', 'Crítico'],
      description: 'Status geral de conformidade com o Edital PE 2026 e Modelo Oficial.',
    },
    verificacaoDocumental: {
      type: Type.OBJECT,
      properties: {
        dentroLimitePaginas: {
          type: Type.BOOLEAN,
          description: 'True se respeita o máximo de 10 páginas (contando com capa).',
        },
        formatacaoTimesNewRoman12Espacamento15: {
          type: Type.STRING,
          description:
            'Avaliação da conformidade visual/documental com fonte Times New Roman 12 e espaçamento 1,5 (ou indicação de verificação via PDF/texto).',
        },
        formatoArquivoPdf: {
          type: Type.BOOLEAN,
          description: 'True se enviado em formato PDF conforme item 3.6 IV.',
        },
        secoesObrigatorias: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              secao: { type: Type.STRING },
              presente: { type: Type.BOOLEAN },
              observacao: { type: Type.STRING },
            },
            required: ['secao', 'presente', 'observacao'],
          },
          description:
            'Checklist das seções obrigatórias: Dados Iniciais, Histórico MEJ, Motivação à Candidatura, Objetivos Gerais, Cenário Atual, Propostas de Trabalho + Plano de Execução, Resultados Esperados/Indicadores, Considerações Finais.',
        },
        resumoConformidade: {
          type: Type.STRING,
          description: 'Síntese objetiva da conformidade documental segundo os itens 3.5, 3.6 e 7.1 do Edital.',
        },
      },
      required: [
        'dentroLimitePaginas',
        'formatacaoTimesNewRoman12Espacamento15',
        'formatoArquivoPdf',
        'secoesObrigatorias',
        'resumoConformidade',
      ],
    },
    parecer: {
      type: Type.OBJECT,
      properties: {
        diagnosticoContexto: {
          type: Type.STRING,
          description: 'Resumo crítico de 2 a 4 linhas avaliando o diagnóstico da Múltipla Júnior e da área pretendida.',
        },
        visaoSistemica: {
          type: Type.STRING,
          description:
            'Avaliação sobre se o candidato enxerga os impactos do cargo na Múltipla como um todo (sinergia entre diretorias, caixa, membros, imagem externa).',
        },
        planoAcaoExecucao: {
          type: Type.STRING,
          description:
            'Feedback rigoroso sobre viabilidade, clareza do plano de execução (O quê, Quem, Como, Prazos/Cronograma) e indicadores/metas.',
        },
        alinhamentoEscopo: {
          type: Type.STRING,
          description:
            'Verificação estrita se cumpre as atribuições específicas do Mapeamento de Cargos e se evita desvios de escopo ou invasão de alçada de outros cargos.',
        },
        recomendacoesPraticas: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: 'De 2 a 3 pontos práticos e acionáveis para aprimoramento antes da versão final ou sabatina.',
        },
      },
      required: [
        'diagnosticoContexto',
        'visaoSistemica',
        'planoAcaoExecucao',
        'alinhamentoEscopo',
        'recomendacoesPraticas',
      ],
    },
    feedbackCandidato: {
      type: Type.OBJECT,
      properties: {
        paragrafo1Reconhecimento: {
          type: Type.STRING,
          description:
            'Parágrafo 1 formal e construtivo, direcionado diretamente ao candidato, elogiando pontos fortes, alinhamento com a essência do cargo e diagnóstico.',
        },
        paragrafo2Oportunidades: {
          type: Type.STRING,
          description:
            'Parágrafo 2 construtivo, destacando pontos de atenção, lacunas nos planos de execução, prazos, indicadores ou adequação documental para a fase III/sabatina.',
        },
      },
      required: ['paragrafo1Reconhecimento', 'paragrafo2Oportunidades'],
    },
    perguntasSabatina: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          numero: { type: Type.INTEGER },
          foco: { type: Type.STRING },
          pergunta: { type: Type.STRING },
          objetivoBanca: {
            type: Type.STRING,
            description: 'O que a Comissão Eleitoral deve observar na resposta do candidato durante a Sabatina.',
          },
        },
        required: ['numero', 'foco', 'pergunta', 'objetivoBanca'],
      },
      description: 'Exatamente 2 perguntas estratégicas e investigativas para a Sabatina da AGO.',
    },
  },
  required: [
    'candidato',
    'cargoPleiteado',
    'statusConformidade',
    'verificacaoDocumental',
    'parecer',
    'feedbackCandidato',
    'perguntasSabatina',
  ],
};

function buildMarkdownReport(parsed: {
  candidato: string;
  cargoPleiteado: string;
  statusConformidade: string;
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
  perguntasSabatina: Array<{
    numero: number;
    foco: string;
    pergunta: string;
  }>;
}): string {
  const recs = parsed.parecer.recomendacoesPraticas.map((r) => `* ${r}`).join('\n');
  const q1 = parsed.perguntasSabatina[0];
  const q2 = parsed.perguntasSabatina[1];

  return `### 🔍 PARECER DE AVALIAÇÃO DE PROPOSTA
* **Candidato(a):** ${parsed.candidato}
* **Cargo Pleitado:** ${parsed.cargoPleiteado}
* **Status de Conformidade com o Edital:** ${parsed.statusConformidade}

#### 1. Diagnóstico e Veracidade do Contexto:
* *Análise:* ${parsed.parecer.diagnosticoContexto}

#### 2. Visão Sistêmica e Impacto Estratégico:
* *Análise:* ${parsed.parecer.visaoSistemica}

#### 3. Qualidade do Plano de Ação, Prazos e Execução:
* *Análise:* ${parsed.parecer.planoAcaoExecucao}

#### 4. Alinhamento com o Escopo do Cargo (Job Description):
* *Análise:* ${parsed.parecer.alinhamentoEscopo}

#### 🛠️ Recomendações Práticas / Pontos de Melhoria:
${recs}

---
### ✉️ Feedback Resumido para o Candidato (2 Parágrafos)
*Parágrafo 1 (Reconhecimento e Alinhamento):* ${parsed.feedbackCandidato.paragrafo1Reconhecimento}

*Parágrafo 2 (Oportunidades de Evolução):* ${parsed.feedbackCandidato.paragrafo2Oportunidades}

---
### 🎯 Perguntas Estratégicas para a Sabatina (2 Questões)
1. **[${q1?.foco ?? 'Execução/Prazos ou Visão Sistêmica'}]:** ${q1?.pergunta ?? ''}
2. **[${q2?.foco ?? 'Alinhamento ao Cargo / Gestão de Desafios'}]:** ${q2?.pergunta ?? ''}`;
}

async function createApp() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post('/api/evaluate', async (req: Request, res: Response) => {
    try {
      const {
        cargoPleiteado,
        cargoId,
        nomeInformado,
        fileName,
        mimeType,
        fileBase64,
        textoProposta,
        contextoAdicional,
      } = req.body as {
        cargoPleiteado?: string;
        cargoId?: string;
        nomeInformado?: string;
        fileName?: string | null;
        mimeType?: string | null;
        fileBase64?: string | null;
        textoProposta?: string | null;
        contextoAdicional?: string | null;
      };

      if (!cargoPleiteado) {
        res.status(400).json({ error: 'Informe o cargo pleiteado para realizar a avaliação.' });
        return;
      }

      if (!fileBase64 && (!textoProposta || !textoProposta.trim())) {
        res.status(400).json({ error: 'Envie o PDF da proposta ou cole o texto completo para análise.' });
        return;
      }

      let detectedPageCount: number | null = null;
      const isPdf = Boolean(fileBase64 && mimeType === 'application/pdf');

      if (isPdf && fileBase64) {
        try {
          const pdfBytes = Buffer.from(fileBase64, 'base64');
          const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
          detectedPageCount = pdfDoc.getPageCount();
        } catch (pdfErr) {
          console.error('Erro ao ler contagem de páginas do PDF:', pdfErr);
          res.status(400).json({
            error: 'Não foi possível ler o arquivo PDF enviado. Verifique se o arquivo não está corrompido.',
          });
          return;
        }
      }

      const ai = getGeminiClient();

      const systemInstruction = `Você é o Agente Especialista em Avaliação de Propostas e Processos Seletivos da Múltipla Júnior (Empresa Júnior de Engenharia de Produção da UFMS - Campo Grande/MS).
Sua missão é analisar criticamente as propostas de candidatura para Diretoria Executiva e Conselho Fiscal (Processo Eleitoral 2026 - Gestão 2027), cruzando rigorosamente com os 3 documentos oficiais incorporados abaixo:

${REFERENCE_KNOWLEDGE_BASE}

REGRAS CRÍTICAS DE AVALIAÇÃO:
1. Conformidade Documental e Estrutural (Edital Itens 3.5, 3.6 e 7.1):
   - Máximo de 10 páginas contando capa. Se o PDF tiver mais de 10 páginas, sinalize como irregularidade crítica (passível de desclassificação na versão final).
   - Fonte Times New Roman 12 e espaçamento entre linhas 1,5: ao analisar um PDF visualmente, observe a tipografia (serifada Times New Roman vs. sans-serif como Arial/Calibri) e o espaçamento entre linhas. Se for apenas texto colado sem PDF, declare explicitamente que a formatação visual (fonte Times 12 e espaçamento 1,5) e o envio em PDF precisam ser validados no arquivo final.
   - Seções obrigatórias do Modelo 2026-2027: Dados iniciais, Histórico MEJ, Motivação à Candidatura, Objetivos Gerais, Cenário Atual/Contexto, Propostas de Trabalho com Plano de Execução (O quê? Quem? Como? Prazos? Indicadores), Resultados Esperados e Considerações Finais.
2. Veracidade e Profundidade do Contexto: Avalie se o diagnóstico reflete a realidade operacional de uma EJ de Engenharia de Produção (ClickUp, Bizagi, POPs, fluxo de caixa/CORA, Selo EJ, Pesquisa de Clima, Gamification, Carta de Serviços, interface Comercial-Projetos-Financeiro) ou se é genérico/superficial.
3. Visão Sistêmica e Impacto Além do Setor: Verifique se o candidato compreende como suas decisões afetam caixa, outras diretorias, satisfação dos membros, imagem externa (UFMS, FEJEMS, Brasil Júnior, clientes).
4. Qualidade Técnica e de Execução: Cobrar rigorosamente plano de execução completo (O quê, Quem, Como, Prazos/Cronograma) e indicadores/metas tangíveis (KPIs/OKRs). Propostas vagas sem prazo ou indicador devem ser apontadas com clareza.
5. Concordância com o Escopo do Cargo (Job Description): Cruze linha a linha com o Mapeamento de Cargos do cargo pleiteado. Aponte explicitamente se houver desvio de escopo ou invasão de alçada (ex: Diretor de Marketing propondo prospecção ativa que é do Comercial; Conselheiro Fiscal propondo gerir contas a pagar em vez de fiscalizar; Diretor de Projetos precificando sem Comercial/Financeiro).
6. Linguagem: Português do Brasil (pt-BR), tom técnico, construtivo, imparcial, direto e respeitoso. Nunca invente informações que não estejam na proposta; se algo faltar na proposta, aponte a lacuna objetivamente.`;

      const promptParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

      if (fileBase64 && mimeType) {
        promptParts.push({
          inlineData: {
            mimeType,
            data: fileBase64,
          },
        });
      }

      const evaluationPrompt = `Analise a proposta de candidatura anexada/fornecida para o Processo Eleitoral 2026 da Múltipla Júnior.

DADOS INFORMADOS PELA COMISSÃO ELEITORAL:
- Cargo Pleiteado: ${cargoPleiteado}
- Nome informado (opcional — confirme/extraia do documento): ${nomeInformado?.trim() || 'Extrair diretamente da proposta'}
- Formato enviado: ${isPdf ? `Arquivo PDF (${fileName || 'proposta.pdf'})` : 'Texto colado para análise preliminar'}
- Contagem exata de páginas do PDF (medida no servidor): ${detectedPageCount !== null ? `${detectedPageCount} página(s)` : 'Não aplicável (texto colado)'}
- Observações adicionais da Comissão: ${contextoAdicional?.trim() || 'Nenhuma observação adicional.'}

${textoProposta?.trim() ? `CONTEÚDO TEXTUAL DA PROPOSTA:\n"""\n${textoProposta.trim()}\n"""\n` : ''}

Gere a avaliação completa e rigorosa no JSON estruturado solicitado, garantindo 2 a 3 recomendações práticas acionáveis, exatamente 2 parágrafos construtivos direcionados ao candidato para e-mail de devolutiva (Fase II) e exatamente 2 perguntas estratégicas investigativas para a Sabatina (10 min de arguição).`;

      promptParts.push({ text: evaluationPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: { parts: promptParts },
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: EVALUATION_SCHEMA,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });

      const rawText = (response.text ?? '').trim();
      if (!rawText) {
        throw new Error('O modelo não retornou conteúdo para a avaliação.');
      }

      const parsed = JSON.parse(rawText);

      // Enforce exact server-measured page count and PDF check
      if (detectedPageCount !== null) {
        parsed.verificacaoDocumental.dentroLimitePaginas = detectedPageCount <= 10;
      }
      parsed.verificacaoDocumental.formatoArquivoPdf = isPdf;
      parsed.cargoPleiteado = cargoPleiteado;

      const result = {
        id: `eval_${Date.now()}`,
        evaluatedAt: new Date().toISOString(),
        fileName: fileName || null,
        candidato: parsed.candidato || nomeInformado?.trim() || 'Candidato(a) não identificado(a)',
        cargoPleiteado,
        cargoId: cargoId || 'presidente',
        statusConformidade: parsed.statusConformidade,
        verificacaoDocumental: {
          numeroPaginasDetectado: detectedPageCount,
          ...parsed.verificacaoDocumental,
        },
        parecer: parsed.parecer,
        feedbackCandidato: parsed.feedbackCandidato,
        perguntasSabatina: parsed.perguntasSabatina,
        markdownCompleto: buildMarkdownReport({
          candidato: parsed.candidato || nomeInformado?.trim() || 'Candidato(a)',
          cargoPleiteado,
          statusConformidade: parsed.statusConformidade,
          parecer: parsed.parecer,
          feedbackCandidato: parsed.feedbackCandidato,
          perguntasSabatina: parsed.perguntasSabatina,
        }),
      };

      res.json(result);
    } catch (err: unknown) {
      console.error('Erro em /api/evaluate:', err);
      const message = err instanceof Error ? err.message : 'Erro interno ao processar a avaliação da proposta.';
      const status =
        message.includes('429') || message.includes('RESOURCE_EXHAUSTED')
          ? 429
          : message.includes('API_KEY_INVALID') || message.includes('PERMISSION_DENIED')
            ? 403
            : 500;
      res.status(status).json({ error: message });
    }
  });

  app.post('/api/chat-sabatina', async (req: Request, res: Response) => {
    try {
      const { evaluationSummary, question, history } = req.body as {
        evaluationSummary?: string;
        question?: string;
        history?: Array<{ role: string; content: string }>;
      };

      if (!evaluationSummary || !question?.trim()) {
        res.status(400).json({ error: 'Contexto da avaliação e pergunta são obrigatórios.' });
        return;
      }

      const ai = getGeminiClient();
      const historyText = (history ?? [])
        .map((m) => `${m.role === 'user' ? 'Comissão Eleitoral' : 'Especialista'}: ${m.content}`)
        .join('\n\n');

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `CONTEXTO DA AVALIAÇÃO JÁ REALIZADA:\n${evaluationSummary}\n\nHISTÓRICO DA CONVERSA:\n${historyText}\n\nNOVA SOLICITAÇÃO DA COMISSÃO ELEITORAL:\n${question.trim()}`,
        config: {
          systemInstruction: `Você é o Agente Especialista do Processo Eleitoral 2026 da Múltipla Júnior (UFMS). Responda à Comissão Eleitoral com precisão técnica, baseando-se exclusivamente no Edital PE 2026, Modelo de Proposta 2026-2027, Mapeamento de Cargos e no parecer já emitido. Seja objetivo, estruturado e prático (máximo 3 parágrafos ou lista curta).`,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      res.json({ reply: (response.text ?? '').trim() });
    } catch (err: unknown) {
      console.error('Erro em /api/chat-sabatina:', err);
      const message = err instanceof Error ? err.message : 'Erro ao consultar o especialista.';
      res.status(500).json({ error: message });
    }
  });

  // Vite dev middleware vs production static serving
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build não encontrado.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Múltipla Júnior Avaliador Eleitoral running on http://0.0.0.0:${PORT}`);
  });
}

createApp().catch((err) => {
  console.error('Falha ao iniciar servidor:', err);
  process.exit(1);
});
