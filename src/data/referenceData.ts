import type { CargoId } from '../types/evaluation';

export interface CargoReferencia {
  id: CargoId;
  ordemEdital: string;
  nome: string;
  area: string;
  subordinacao: string;
  atualOcupante: string;
  objetivo: string;
  descricao: string;
  principaisResponsabilidades: string[];
  habilidadesComportamentais: string[];
  conhecimentosTecnicos: string[];
  ferramentas: string[];
  fronteirasAlcadas: string;
}

export const DOCUMENTOS_OFICIAIS = [
  {
    id: 'edital-2026',
    titulo: 'Edital do Processo Eleitoral 2026',
    subtitulo: 'Regras de elegibilidade, formato (máx. 10 pág., Times 12, 1,5), cronograma e desclassificação',
    arquivoUrl: '/assets/aistudio/Edital_PE_2026_M_ltipla_J_nior__1__2e8dba51.pdf',
    atualizacao: '20 de outubro de 2026 · 13 páginas',
  },
  {
    id: 'modelo-proposta',
    titulo: 'Modelo Oficial de Proposta 2026-2027',
    subtitulo: 'Estrutura mínima obrigatória: Histórico MEJ, Motivação, Cenário, Propostas com Plano de Execução e Resultados',
    arquivoUrl: '/assets/aistudio/_Modelo_de_Proposta_2026_-_CRIAR_C_PIA__77da21d0.pdf',
    atualizacao: 'Gestão 2026-2027 · 2 páginas',
  },
  {
    id: 'mapeamento-cargos',
    titulo: 'Job Description & Mapeamento de Cargos',
    subtitulo: 'Atribuições detalhadas, requisitos técnicos, perfil comportamental e ferramentas de cada diretoria',
    arquivoUrl: '/assets/aistudio/Mapeamento_de_Cargos___M_ltipla_J_nior_f496569d.pdf',
    atualizacao: 'Atualizado até 15/10/2026 · RH Múltipla Júnior',
  },
];

export const CRONOGRAMA_ELEITORAL = [
  {
    fase: 'Fase I',
    periodo: '20/10 a 04/11/2026',
    descricao: 'Inscrição via Formulário Oficial, questionário e envio da proposta em PDF.',
  },
  {
    fase: 'Fase II',
    periodo: '05/11 a 07/11/2026',
    descricao: 'Análise das propostas pela Comissão Organizadora e envio de devolutiva por e-mail.',
  },
  {
    fase: 'Fase III',
    periodo: '08/11 a 15/11/2026',
    descricao: 'Prazo para regularização de pendências documentais e envio da versão final.',
  },
  {
    fase: 'Homologação',
    periodo: '16/11/2026',
    descricao: 'Divulgação das propostas homologadas aos membros na Comunidade de Avisos.',
  },
  {
    fase: 'Fases IV a VII',
    periodo: '20/11/2026',
    descricao: 'Sabatina (10 min apresentação + 10 min perguntas), Eleição, 2º turno, Resultado e Posse.',
  },
  {
    fase: 'Co-Gestão',
    periodo: '20/11/2026 a 31/01/2027',
    descricao: 'Período de transição entre Diretoria 2026 e Diretoria Eleita (mandato até 20/11/2027).',
  },
];

export const CARGOS_MAPEAMENTO: CargoReferencia[] = [
  {
    id: 'presidente',
    ordemEdital: 'I',
    nome: 'Presidente(a)',
    area: 'Estratégico',
    subordinacao: 'Conselho Consultivo e Assembleia Geral da Múltipla Júnior',
    atualOcupante: 'Bárbara Hamer',
    objetivo:
      'Garantir que a Múltipla Júnior alcance seus objetivos estratégicos por meio da integração entre os setores, acompanhamento das metas, desenvolvimento das lideranças, tomada de decisões estratégicas e fortalecimento institucional da empresa.',
    descricao:
      'Responsável por garantir o alinhamento entre as diretorias, o cumprimento do planejamento estratégico e o desenvolvimento sustentável da organização. Lidera a diretoria executiva e representa institucionalmente a EJ perante UFMS, FEJEMS, Brasil Júnior e parceiros.',
    principaisResponsabilidades: [
      'Garantir o alinhamento das diretorias ao planejamento estratégico da Múltipla',
      'Liderar e acompanhar a diretoria executiva',
      'Monitorar metas, indicadores e resultados estratégicos da organização',
      'Conduzir reuniões estratégicas, de diretoria e alinhamentos gerais',
      'Validar decisões, documentos e demandas de maior impacto organizacional',
      'Representar institucionalmente perante UFMS, FEJEMS, Brasil Júnior e parceiros',
      'Promover o desenvolvimento das lideranças e a autonomia dos diretores',
    ],
    habilidadesComportamentais: [
      'Liderança e visão sistêmica',
      'Comunicação clara e assertiva',
      'Tomada de decisão e resolução de problemas',
      'Inteligência emocional e escuta ativa',
      'Capacidade de delegação e gestão de conflitos',
      'Capacidade de negociação',
    ],
    conhecimentosTecnicos: [
      'Planejamento estratégico e definição de metas',
      'Gestão de indicadores (KPIs e OKRs)',
      'Gestão de pessoas, liderança e estrutura organizacional',
      'Diretrizes do Movimento Empresa Júnior (MEJ)',
      'Comunicação institucional e relacionamento com stakeholders',
    ],
    ferramentas: ['ClickUp', 'Google Drive', 'Google Meet', 'Google Forms', 'Google Planilhas', 'WhatsApp', 'Canva', 'Portal BJ'],
    fronteirasAlcadas:
      'Atua no nível estratégico global e representação externa. Não deve microgerenciar rotinas operacionais exclusivas de diretorias específicas (ex: edição de posts ou lançamentos contábeis diários), mas sim garantir desdobramento estratégico, sinergia e validação de alto impacto.',
  },
  {
    id: 'vp-operacional',
    ordemEdital: 'II',
    nome: 'Vice-Presidente(a) Operacional',
    area: 'Estratégico',
    subordinacao: 'Presidência',
    atualOcupante: 'Maria Clara',
    objetivo:
      'Garantir processos claros e eficientes, promovendo organização, integração entre setores e uma gestão orientada por dados.',
    descricao:
      'Transforma as estratégias da Múltipla em processos estruturados, garantindo padronização, eficiência operacional, acompanhamento de indicadores e melhoria contínua. Acompanha diretamente as diretorias de Projetos e Financeiro.',
    principaisResponsabilidades: [
      'Traduzir o planejamento estratégico em metas, processos e ações operacionais',
      'Acompanhar diretamente as diretorias de Projetos e Financeiro (follow-up de demandas)',
      'Monitorar KPIs, metas e resultados operacionais das diretorias',
      'Estruturar, mapear e padronizar processos internos e gestão de POPs',
      'Identificar gargalos operacionais e propor melhorias baseadas em análise de dados',
      'Garantir a utilização adequada do ClickUp e Portal BJ',
      'Promover documentação dos processos para continuidade entre gestões',
    ],
    habilidadesComportamentais: [
      'Visão sistêmica e capacidade analítica',
      'Organização e resiliência',
      'Comunicação clara e assertiva',
      'Escuta ativa e empatia',
      'Capacidade de mediação de conflitos',
    ],
    conhecimentosTecnicos: [
      'Mapeamento de processos e elaboração de POPs',
      'Planejamento estratégico e gestão de projetos',
      'Indicadores (KPIs e OKRs) e análise de dados',
      'Ferramentas de gestão e acompanhamento',
    ],
    ferramentas: ['ClickUp', 'Google Drive', 'Google Meet', 'Google Planilhas', 'WhatsApp', 'Portal BJ'],
    fronteirasAlcadas:
      'Tem alçada direta sobre Projetos e Financeiro, padronização de POPs e gestão orientada a dados. Não substitui a VPC no acompanhamento estratégico de RH/Marketing nem assume a representação institucional primária da Presidência.',
  },
  {
    id: 'vp-cultura',
    ordemEdital: 'III',
    nome: 'Vice-Presidente(a) de Cultura',
    area: 'Estratégico',
    subordinacao: 'Presidência',
    atualOcupante: 'Bruno Camacho',
    objetivo:
      'Garantir que a cultura organizacional seja aplicada de forma consistente, promovendo engajamento, desenvolvimento dos membros e continuidade entre gestões.',
    descricao:
      'Atua estrategicamente no fortalecimento da cultura organizacional, promovendo integração entre setores, desenvolvimento humano e preservação do conhecimento institucional. Acompanha estrategicamente as diretorias de Recursos Humanos e Marketing.',
    principaisResponsabilidades: [
      'Acompanhar estrategicamente as diretorias de Recursos Humanos e Marketing',
      'Garantir aplicação e fortalecimento dos valores e identidade organizacional',
      'Monitorar clima organizacional (Pesquisa de Clima) e propor ações de melhoria',
      'Gerir o engajamento e apoiar processos de integração, onboarding e PDC com o RH',
      'Preservar e disseminar práticas e conhecimentos entre gestões',
      'Apoiar mediação de conflitos e fortalecimento do relacionamento entre setores',
      'Manter relacionamento institucional com UFMS, FEJEMS e parceiros em capacitações e eventos',
    ],
    habilidadesComportamentais: [
      'Visão estratégica e colaboração',
      'Comunicação clara e assertiva',
      'Inteligência emocional e mediação de conflitos',
      'Análise crítica e disciplina',
      'Orientação para resultados',
    ],
    conhecimentosTecnicos: [
      'Gestão de pessoas, clima e cultura organizacional',
      'Comunicação interna e endomarketing',
      'Gestão do conhecimento e documentação institucional',
      'Planejamento de integração/onboarding e PDCA/follow-up/KPIs',
    ],
    ferramentas: ['ClickUp', 'Google Drive', 'Google Meet', 'Google Forms', 'Google Planilhas', 'WhatsApp', 'Canva', 'Portal BJ'],
    fronteirasAlcadas:
      'Acompanha estrategicamente RH e Marketing, clima, cultura e gestão do conhecimento. Não deve invadir a alçada técnica de execução de Projetos/Financeiro (VP Operacional) nem executar manualmente o operacional diário de RH ou Marketing.',
  },
  {
    id: 'diretor-comercial',
    ordemEdital: 'IV',
    nome: 'Diretor(a) Comercial',
    area: 'Comercial',
    subordinacao: 'Presidência',
    atualOcupante: 'Travis Aurélio Volpa',
    objetivo:
      'Assegurar o crescimento da Múltipla Júnior por meio da gestão estratégica do setor Comercial, coordenando a prospecção, o relacionamento com clientes, as negociações e o desenvolvimento da equipe.',
    descricao:
      'Principal responsável pelo relacionamento entre a Empresa Júnior e os clientes. Coordena o contato comercial, lidera o setor e atua como principal referência na comunicação entre o ambiente interno e externo.',
    principaisResponsabilidades: [
      'Elaborar e monitorar o planejamento estratégico do setor Comercial (metas e captação)',
      'Gerir relacionamento com clientes estratégicos e acompanhar prospecções/negociações',
      'Realizar validação final das propostas comerciais antes do envio ao cliente',
      'Definir escopo e precificação de projetos em conjunto com Projetos e Financeiro',
      'Distribuir demandas considerando disponibilidade e maturidade dos membros',
      'Orientar, capacitar e reduzir concentração de atividades na Diretoria',
      'Manter alinhamento com Presidência e demais diretorias (especialmente Marketing e Projetos)',
    ],
    habilidadesComportamentais: [
      'Liderança, persuasão e comunicação clara/escuta ativa',
      'Organização, adaptabilidade e criatividade',
      'Inteligência interpessoal e postura profissional',
      'Delegação e capacidade de motivar a equipe',
    ],
    conhecimentosTecnicos: [
      'Planejamento estratégico e gestão comercial',
      'Técnicas de prospecção, negociação e fechamento de contratos',
      'Definição de escopo, precificação e Carta de Serviços',
      'Gestão e estruturação de processos comerciais',
    ],
    ferramentas: ['ClickUp', 'WhatsApp', 'Google Drive', 'Google Meet', 'Carta de Serviços', 'Excel/Planilhas Google', 'Canva/PowerPoint'],
    fronteirasAlcadas:
      'Responsável por prospecção ativa, negociação e relacionamento com clientes. A execução técnica da entrega dos projetos é de Projetos; a precificação e escopo exigem interface obrigatória com Projetos e Financeiro; comunicação digital passiva/branding é de Marketing.',
  },
  {
    id: 'diretor-marketing',
    ordemEdital: 'V',
    nome: 'Diretor(a) de Marketing',
    area: 'Marketing',
    subordinacao: 'Presidência (acompanhamento estratégico da VPC)',
    atualOcupante: 'Em Vacância',
    objetivo:
      'Garantir uma representação de marca assertiva, alinhada ao público acadêmico e ao perfil de clientes da Múltipla.',
    descricao:
      'Responsável pelo planejamento estratégico de Marketing, pela representação da Múltipla nas mídias digitais e pelo primeiro contato com o público, desconsiderando as ações de prospecção ativa. Coordena a equipe e eventos da empresa.',
    principaisResponsabilidades: [
      'Planejamento estratégico de mídias (mensal, semestral e anual)',
      'Definir diretrizes de comunicação e garantir consistência da identidade visual e branding',
      'Revisar, validar e aprovar designs e conteúdos produzidos pelos assessores',
      'Definir com o Comercial estratégias de divulgação de produtos e serviços (inbound/outbound)',
      'Planejar e coordenar eventos da Múltipla em articulação com Comercial e VPC',
      'Acompanhar operacional, prazos e desenvolvimento técnico da equipe no ClickUp e métricas',
    ],
    habilidadesComportamentais: [
      'Liderança e visão estratégica',
      'Inteligência emocional e comunicação assertiva',
      'Capacidade de delegação e autorresponsabilidade',
      'Criatividade e comprometimento',
    ],
    conhecimentosTecnicos: [
      'Design gráfico, edição de vídeo e imagens',
      'Marketing inbound e outbound, endomarketing e tráfego orgânico',
      'Planejamento estratégico de Marketing e produção de conteúdo',
      'Gestão de identidade visual, branding e tendências digitais',
    ],
    ferramentas: ['Canva', 'CapCut', 'Google Analytics', 'ClickUp', 'Excel/Planilhas Google', 'Google Docs', 'Google Drive', 'WhatsApp'],
    fronteirasAlcadas:
      'Cuida de marca, mídias digitais, identidade visual, comunicação de eventos e geração de atração. O Job Description exclui explicitamente ações de prospecção ativa (alçada do Comercial). Eventos devem ser articulados com Comercial e VPC.',
  },
  {
    id: 'diretor-financeiro',
    ordemEdital: 'VI',
    nome: 'Diretor(a) Financeiro(a)',
    area: 'Financeiro e Administrativo',
    subordinacao: 'Presidência (acompanhamento direto da VP Operacional)',
    atualOcupante: 'Davi Zanezi De Assunção',
    objetivo:
      'Garantir a organização administrativa e financeira da Múltipla Júnior, assegurando o cumprimento adequado das obrigações legais e financeiras, a correta execução dos processos do setor e a distribuição eficiente das responsabilidades.',
    descricao:
      'Gere a organização administrativa e financeira, coordena a equipe, conduz processos cartoriais e documentais legais, acompanha controle financeiro, relatórios, DRE, fluxo de caixa e conformidade do Selo EJ.',
    principaisResponsabilidades: [
      'Planejar, distribuir e acompanhar atividades e entregas dos assessores no setor',
      'Controlar entradas/saídas, atualizar fluxo de caixa, elaborar relatórios e analisar DRE/KPIs',
      'Conduzir processos cartoriais (atas, editais, termos) e assinaturas digitais (Plataforma GOV)',
      'Acompanhar demandas e documentação para manutenção do Selo EJ',
      'Manter contato e alinhamento com contador/contabilidade e movimentar conta bancária CORA',
      'Alinhar orçamentos com Presidência/VP e apoiar precificação de projetos',
      'Desenvolver equipe e reduzir concentração de conhecimento técnico',
    ],
    habilidadesComportamentais: [
      'Organização, paciência e didática',
      'Liderança e análise crítica',
      'Delegação e desenvolvimento de pessoas',
      'Relacionamento interpessoal e mediação entre setores',
    ],
    conhecimentosTecnicos: [
      'Gestão financeira: fluxo de caixa, DRE, conciliação e relatórios',
      'Documentação jurídica, processos cartoriais e estatutários',
      'Assinatura digital, processos administrativos e precificação de projetos',
      'Padronização de processos e documentos',
    ],
    ferramentas: ['Excel/Planilhas Google', 'Google Docs', 'Google Drive', 'ClickUp', 'Portal BJ', 'Plataforma GOV', 'Conta CORA', 'E-mail institucional', 'WhatsApp', 'Google Meet'],
    fronteirasAlcadas:
      'Executa gestão financeira, administrativa, cartorial e Selo EJ. Não deve confundir suas atribuições com a fiscalização independente do Conselho Fiscal (órgão fiscalizador autônomo) nem assumir a decisão comercial final de propostas.',
  },
  {
    id: 'diretor-rh',
    ordemEdital: 'VII',
    nome: 'Diretor(a) de Recursos Humanos',
    area: 'Gestão de Pessoas / Recursos Humanos',
    subordinacao: 'Presidência (acompanhamento estratégico da VPC)',
    atualOcupante: 'César Akio Kitaguti Moura',
    objetivo:
      'Liderar e organizar o setor de Recursos Humanos, garantindo o acompanhamento e a execução dos projetos e demandas, o desenvolvimento e a capacitação dos membros, o engajamento da equipe e a melhoria contínua dos processos de gestão de pessoas.',
    descricao:
      'Lidera o setor de RH na organização da equipe, distribuição de demandas, capacitação e desenvolvimento dos membros, condução do Processo Seletivo, gestão da Gamification, fortalecimento do engajamento/cultura e gestão do conhecimento.',
    principaisResponsabilidades: [
      'Liderar a equipe de RH, conduzir reuniões setoriais e distribuir demandas',
      'Conduzir e participar das etapas do Processo Seletivo de novos membros',
      'Acompanhar necessidades, desenvolvimento e capacitação dos membros com feedbacks',
      'Promover engajamento, cultura organizacional e gerir o projeto de Gamification',
      'Acompanhar metas, OKRs e KPIs de RH e alinhar ações estratégicas com Presidência/VPC',
      'Garantir documentação (POPs, fluxogramas, atas) e transferência de conhecimento',
      'Incentivar autonomia e desenvolvimento de novas lideranças',
    ],
    habilidadesComportamentais: [
      'Liderança, organização e planejamento',
      'Comunicação assertiva, empatia e paciência',
      'Firmeza no acompanhamento e cobrança de demandas',
      'Fornecimento/recebimento de feedbacks e escuta ativa',
      'Incentivo ao engajamento e protagonismo',
    ],
    conhecimentosTecnicos: [
      'Gestão de pessoas, cultura organizacional e estratégias de engajamento',
      'Recrutamento e seleção e desenvolvimento/capacitação de membros',
      'Gestão do conhecimento, documentação e padronização de processos',
      'Acompanhamento de indicadores, controles e organização do trabalho',
    ],
    ferramentas: ['ClickUp', 'Google Forms', 'Google Meet', 'WhatsApp', 'Excel/Planilhas Google', 'Google Drive', 'Google Docs', 'Canva', 'Google Agenda'],
    fronteirasAlcadas:
      'Executa e lidera os processos internos de gestão de pessoas, PS, capacitação, feedbacks e Gamification, em forte sinergia com a VPC (nível estratégico de cultura) e com os demais diretores para suprir lacunas técnicas.',
  },
  {
    id: 'diretor-projetos',
    ordemEdital: 'VIII',
    nome: 'Diretora de Projetos',
    area: 'Projetos',
    subordinacao: 'Presidência (acompanhamento direto da VP Operacional)',
    atualOcupante: 'Iris Gabriela Colmán Torres',
    objetivo:
      'Garantir a excelência na entrega dos projetos da empresa júnior, estruturando o setor, organizando demandas e capacitando os membros para aplicação prática das ferramentas de Engenharia de Produção.',
    descricao:
      'Coordena a execução de projetos externos e mapeamentos internos, aloca equipes e lideranças, constrói propostas técnico-comerciais com o Comercial, realiza visitas técnicas/diagnósticos e assegura a qualidade técnica das entregas.',
    principaisResponsabilidades: [
      'Alocar equipes e designar líderes de projetos conforme complexidade e competências',
      'Construir e estruturar propostas técnico-comerciais em parceria direta com o Comercial',
      'Realizar ou acompanhar visitas técnicas e diagnósticos iniciais com clientes',
      'Supervisionar e revisar mapeamentos de processos (BPMN), POPs e entregáveis técnicos',
      'Organizar e distribuir demandas no ClickUp e acompanhar prazos e qualidade',
      'Capacitar e orientar tecnicamente a equipe nas ferramentas de Engenharia de Produção',
      'Alinhar demandas contínuas com Comercial (propostas) e RH (capacitações)',
    ],
    habilidadesComportamentais: [
      'Organização, liderança e gestão do tempo',
      'Capacidade analítica, atenção aos detalhes e visão sistêmica',
      'Didática e disponibilidade para suporte/orientação',
      'Flexibilidade para demandas simultâneas e facilidade de delegação',
    ],
    conhecimentosTecnicos: [
      'Gestão de projetos (escopo, cronograma, liderança)',
      'Mapeamento e modelagem de processos (BPMN / Bizagi) e POPs',
      'Ferramentas clássicas de Engenharia de Produção e melhoria contínua',
      'Excel intermediário, noções de Power BI e elaboração de propostas técnico-comerciais',
    ],
    ferramentas: ['ClickUp', 'Bizagi Modeler', 'Google Docs', 'Google Sheets / Excel', 'Google Drive', 'Google Meet', 'WhatsApp'],
    fronteirasAlcadas:
      'Lidera a entrega técnica, qualidade dos projetos, alocação de consultores/assessores e elaboração técnica de propostas. Não conduz sozinho a negociação/prospecção comercial (Comercial) nem a precificação final sem alinhamento com Comercial e Financeiro.',
  },
  {
    id: 'conselheiro-fiscal',
    ordemEdital: 'IX',
    nome: 'Conselheiro Fiscal',
    area: 'Fiscalização Contábil-Financeira (Órgão Independente)',
    subordinacao: 'Assembleia Geral (atuação independente, conforme Estatuto Social)',
    atualOcupante: 'Eleição PE 2026 (Edital Item 4.4)',
    objetivo:
      'Exercer a fiscalização contábil-financeira da Múltipla Júnior de forma diligente e independente, assegurando transparência, conformidade orçamentária e proteção patrimonial perante a Assembleia Geral.',
    descricao:
      'Órgão responsável pela fiscalização contábil-financeira independente da Diretoria Executiva, com competências estatutárias descritas no Item 4.4 do Edital PE 2026.',
    principaisResponsabilidades: [
      'Examinar livros, documentos e demonstrativos contábeis da Múltipla Júnior',
      'Emitir parecer formal sobre prestações de contas e demonstrações financeiras',
      'Acompanhar a execução orçamentária e recomendar medidas corretivas',
      'Solicitar esclarecimentos à Diretoria Executiva sempre que necessário',
      'Encaminhar relatórios e pareceres diretamente à Assembleia Geral',
    ],
    habilidadesComportamentais: [
      'Independência e imparcialidade crítica',
      'Rigor analítico e atenção minuciosa a conformidade',
      'Ética, diligência e transparência institucional',
      'Comunicação técnica clara para a Assembleia Geral',
    ],
    conhecimentosTecnicos: [
      'Leitura e análise de demonstrativos contábeis, DRE e fluxo de caixa',
      'Acompanhamento orçamentário e auditoria básica de prestações de contas',
      'Estatuto Social, Regimento Interno e obrigações fiscais/Selo EJ',
    ],
    ferramentas: ['Excel/Planilhas Google', 'Demonstrativos Contábeis', 'Conta CORA (extratos)', 'Google Docs', 'Relatórios à AGO'],
    fronteirasAlcadas:
      'Órgão fiscalizador independente, tratado separadamente da hierarquia da Diretoria Executiva (Edital Item 5.5.4.3). Não deve propor ações de execução operacional/comercial ou gerir o caixa no dia a dia (papel do Diretor Financeiro), mas sim fiscalizar, auditar, recomendar correções e reportar à Assembleia Geral.',
  },
];

export const EXEMPLO_PROPOSTA_TEXTO = `Nome: Lucas Henrique Almeida
Período: 6º semestre de Engenharia de Produção (UFMS)
Tempo na EJ: 1 ano e 4 meses
Cargo Atual: Consultor de Projetos
Cargo Pleiteado: Diretor(a) de Projetos

1. Histórico MEJ
Ingressei na Múltipla Júnior no segundo semestre de 2025 como trainee, sendo efetivado como Assessor de Projetos após concluir o processo trainee com destaque na entrega de mapeamento de processos para uma clínica odontológica em Campo Grande. Em 2026, assumi o cargo de Consultor de Projetos, liderando três projetos consecutivos (mapeamento BPMN em empresa de logística, estruturação de POPs em indústria alimentícia e análise de layout produtivo), além de participar do EMEJ e de capacitações da FEJEMS sobre gestão ágil e precificação baseada em horas.

2. Motivação à Candidatura e Objetivos Gerais
Minha motivação nasce da convicção de que a Engenharia de Produção aplicada em projetos reais é o motor que sustenta a reputação, o caixa e o aprendizado dos membros da Múltipla Júnior. Nos últimos meses, observei que embora tenhamos bom volume de diagnósticos, enfrentamos gargalos na transição entre a venda pelo Comercial e o início efetivo da execução técnica.
Objetivos Gerais para a gestão 2027:
- Elevar o índice de entregas dentro do prazo acordado com o cliente de 72% para 95%.
- Reduzir em 30% o retrabalho nas revisões de POPs e fluxogramas BPMN até o final do 1º semestre de 2027.
- Estruturar trilhas práticas de capacitação técnica junto ao RH para preparar novos líderes de projeto.

3. Cenário Atual e Contexto do Setor de Projetos
Atualmente, o setor conta com 1 Diretora, 4 Consultores e 6 Assessores. As entregas concentram-se fortemente em Mapeamento de Processos e POPs, utilizando Bizagi Modeler, Google Docs e ClickUp. Identifico três desafios concretos no contexto atual:
1) Assimetria de carga entre consultores mais experientes e assessores recém-efetivados;
2) Falta de checklists padronizados antes das visitas técnicas e na entrega das propostas técnico-comerciais em parceria com o Comercial;
3) Baixa visibilidade semanal de horas dedicadas por projeto no ClickUp, dificultando o feedback para precificação junto ao Financeiro e Comercial.

4. Propostas de Trabalho e Plano de Execução

Proposta 1: Padronização do Handoff Comercial-Projetos e Kit de Diagnóstico Técnico
- O quê: Criar um protocolo único de passagem de bastão (handoff) entre visita diagnóstica, elaboração de proposta técnico-comercial e kickoff do projeto, com checklist de requisitos e matriz de horas estimadas.
- Quem: Diretor de Projetos (responsável), Consultores de Projetos (apoio técnico) e alinhamento direto com Diretor Comercial e Diretor Financeiro.
- Como: Mapear o fluxo atual em BPMN no Bizagi durante a Co-Gestão (dezembro/2026 - janeiro/2027), validar modelo padrão de escopo e tabela de esforço por complexidade e integrar o checklist no ClickUp.
- Prazo: Implantação completa até 15/02/2027, com revisão trimestral.
- Indicadores: Tempo médio entre solicitação comercial e envio da proposta técnica (meta: <= 4 dias úteis); % de projetos sem aditivo por falha de escopo (meta: >= 90%).

Proposta 2: Programa de Mentoria em Duplas e Nivelamento Técnico em Engenharia de Produção
- O quê: Parear cada assessor com um consultor-mentor por ciclo de projeto e realizar oficinas mensais práticas de Bizagi, POPs, Excel e ferramentas Lean.
- Quem: Diretor de Projetos, Consultores de Projetos e parceria com Diretoria de Recursos Humanos para registro no PDC e Gamification.
- Como: Aplicar diagnóstico inicial de competências técnicas em fevereiro/2027, definir matriz de alocação equilibrando maturidade e complexidade do cliente, e realizar checkpoints quinzenais de revisão antes da entrega final.
- Prazo: Diagnóstico em fevereiro/2027; oficinas mensais de março a outubro/2027.
- Indicadores: Taxa de aprovação de entregáveis na 1ª revisão técnica pela Diretoria (meta: >= 85%); índice de assessores aptos a liderar etapas até julho/2027 (meta: 100% dos assessores com >= 6 meses).

Proposta 3: Painel de Saúde dos Projetos e Controle de Prazos no ClickUp
- O quê: Implantar acompanhamento semanal padronizado de cronograma, risco de atraso e satisfação intermediária dos clientes no ClickUp, reportando indicadores à Vice-Presidência Operacional.
- Quem: Diretor de Projetos e Líderes de Projeto (Consultores).
- Como: Configurar status obrigatórios (Em dia, Atenção, Crítico), rito de 15 minutos às segundas-feiras para destravar gargalos e formulário de feedback parcial na metade do cronograma do projeto.
- Prazo: Início em 01/02/2027, acompanhamento semanal contínuo.
- Indicadores: % de projetos entregues no prazo original (meta: 95%); NPS técnico dos clientes ao final dos projetos (meta: >= 80).

5. Resultados Esperados
Com a execução dessas três frentes integradas ao Comercial, Financeiro, RH e VP Operacional, espera-se consolidar um setor de Projetos previsível, com menor sobrecarga concentrada na diretoria, propostas mais bem precificadas que protejam a margem e o fluxo de caixa da Múltipla Júnior, e consultores/assessores tecnicamente mais autônomos e preparados para futuras lideranças.

6. Considerações Finais
Coloco-me à disposição da Comissão Eleitoral e dos membros efetivos da Múltipla Júnior para debater cada etapa deste plano na Sabatina, reafirmando meu compromisso ético e estatutário com a gestão 2027.`;
