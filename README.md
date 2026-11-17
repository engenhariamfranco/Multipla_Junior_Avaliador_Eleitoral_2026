# ⚖️ Agente Analisador de Propostas — Processo Eleitoral (Múltipla Júnior)

[![Governança](https://img.shields.io/badge/Governan%C3%A7a-M%C3%BAltipla%20J%C3%BAnior-F59E0B?style=for-the-badge)](https://github.com/engenhariamfranco/Multipla_Junior_Avaliador_Eleitoral_2026)
[![Arquitetura](https://img.shields.io/badge/AI%20Builder-RAG%20Normativo-0B1120?style=for-the-badge)](https://github.com/engenhariamfranco/Multipla_Junior_Avaliador_Eleitoral_2026)

> Agente especialista em IA Generativa desenvolvido para automatizar a auditoria técnica, documental e estratégica de candidaturas para a **Diretoria Executiva** e **Conselho Fiscal** da **Múltipla Júnior Consultoria** (Empresa Júnior de Engenharia de Produção da UFMS).

---

## 🎯 Problema (Gargalo)
Durante o Processo Eleitoral, a comissão avaliadora precisava analisar detalhadamente cada proposta de candidatura realizando o cruzamento manual com **três bases normativas distintas**:
1. **Edital do Processo Eleitoral** (regras, prazos e critérios eliminatórios/classificatórios);
2. **Modelo Oficial de Proposta** (estrutura obrigatória e tópicos mínimos);
3. **Mapeamento de Cargos (*Job Descriptions*)** (escopo, responsabilidades e KPIs de cada diretoria).

Esse processo manual consumia horas da equipe, gerava risco de subjetividade entre avaliadores e dificultava a elaboração de feedbacks padronizados e perguntas direcionadas para a sabatina.

---

## 💡 Arquitetura & Solução
Desenvolvimento de um **Agente Avaliador Especialista** com base documental incorporada (contexto normativo). Ao receber a proposta de um candidato e o cargo pretendido, o agente realiza a auditoria completa e entrega um relatório estruturado de apoio à comissão eleitoral.

---

## 🧠 Engenharia de Prompt & Boas Práticas (AI Builder)
* **Injeção de Contexto Normativo (Grounding Documental):** Cruzamento simultâneo do documento do candidato contra as três fontes oficiais da empresa júnior, garantindo aderência total ao escopo real de cada cargo (Presidência, Operações, Projetos, Comercial, Marketing, Cultura, Financeiro e Conselho Fiscal).
* **Persona & Critérios de Imparcialidade:** Configuração de persona avaliadora técnica, exigindo evidências textuais da própria proposta para justificar cada pontuação ou apontamento de melhoria.
* **Structured Output (Saída Padronizada em 3 Blocos):**
  1. **Auditoria de Conformidade & Diagnóstico:** Verificação de estrutura, viabilidade das metas e coerência com o *Job Description*;
  2. **Feedback Construtivo ao Candidato:** Texto padronizado em exatamente **dois parágrafos** (pontos fortes + pontos de atenção) pronto para envio;
  3. **Roteiro de Sabatina:** Perguntas estratégicas e situacionais personalizadas com base nas lacunas identificadas na proposta.

---

## 🛠️ Tecnologias & Competências
* **IA & Automação:** IA Generativa, System Instructions, Contexto Normativo (RAG), Structured Output
* **Gestão & Governança:** Processos Seletivos, Mapeamento de Cargos (*Job Descriptions*), Padronização (POPs)

---

## 👩‍💻 Autoria
**Maria Clara Maranhão Franco** — Vice-Presidente Operacional (Múltipla Júnior Consultoria) | Engenharia de Produção (UFMS)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/maria-clara-m-franco-0b76a8332)
