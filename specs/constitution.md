# Groupify.dev — Constitution

> **Princípios inegociáveis para o desenvolvimento do Groupify.dev (web).**
> Leia este arquivo antes de qualquer alteração.

## Regras Fundamentais

1. **Não há código sem spec** — Trabalho não-trivial (≥20 linhas ou mudança em
   contrato público: props, rotas, API contracts, exported types) exige spec
   aprovado.
2. **Falhe alto, não silenciosamente** — `Error` com mensagem clara; nunca
   deixar promises rejeitarem sem tratamento.
3. **Secrets nunca no código** — `.env` (gitignored), nunca commitar chaves,
   tokens ou credenciais.
4. **Contratos públicos são imutáveis** — Breaking changes versionados com nota
   no spec.
5. **Não pule fases** — spec → plan → tasks → implement → review.
6. **Specs são documentos vivos** — se o escopo muda, o spec muda primeiro.

## Regras do Groupify.dev (Web)

7. **Rotas file-based com TanStack Router** — rotas em `src/routes/`; não
   refatorar o fluxo de navegação sem spec.
8. **Dados com TanStack Query** — todo fetch de servidor via hooks em
   `hooks/useQuery/` / `hooks/mutations/`; não duplicar cache em estado local.
9. **Valide entrada com Zod** — toda fronteira (props, form inputs, response da
   API) validada antes de usar; `z.infer` para tipar.
10. **Componentes UI em `components/ui/`** — Radix UI + Tailwind v4 + CVA;
    reutilize antes de criar novo.
11. **Acessibilidade** — landmarks/labels corretos, foco visível, hit targets
    adequados, contraste WCAG AA.
12. **SSR-safe** — código que roda no servidor (TanStack Start) não acessa
    `window`/`document` sem guard.

## Stack Imutável

- **Framework:** TanStack Start + Vite (React 19)
- **Routing:** TanStack Router (file-based)
- **Data:** TanStack Query v5
- **Validation:** Zod
- **Styling:** Tailwind CSS v4 (+ Radix UI, CVA)
- **Language:** TypeScript (strict)
- **Lint/Format:** Biome

## Agentes

| Agente | Responsabilidade |
|--------|------------------|
| `leader` | Orquestrar fluxo, revisar specs |
| `spec_author` | Escrever specs de features |
| `architect` | Planos técnicos, decisões de arquitetura |
| `implementer` | Código de tarefas específicas |
| `reviewer` | Validar que tarefas estão completas e testadas |

## O Que NÃO Fazer

- Não inventar rotas/hooks/APIs sem spec aprovado
- Não ampliar escopo silenciosamente — atualize o spec
- Não pular lint/typecheck com flags de bypass
- Não commitar `.env` ou secrets
- Não duplicar cache de servidor em estado local

---

**Status:** Vigente
