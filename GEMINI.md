# Portfolio - Master AI Instructions (GEMINI, CURSOR, CLAUDE, COPILOT)

Este documento é a referência central para qualquer IA trabalhando neste projeto. Ele contém os padrões arquiteturais, convenções de código e fluxos de trabalho obrigatórios.

## 1. Visão Geral do Projeto

Um portfólio pessoal moderno construído com Next.js 15, focado em performance e visual polido, integrando dados dinâmicos do GitHub e conteúdo local.

## 1.2 Modelo do layout

O layout deve seguir explicitamente o mock do modelo construido com html/css/js que se encontra na pasta ./LOCAL/novo-modelo-layout.html

## 2. Tech Stack Core

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript (Strict Mode)
- **Estilização**: Tailwind CSS 4 (Uso de variáveis CSS nativas e `@theme`)
- **Animações**: Framer Motion
- **Ícones**: Iconify (`@iconify/react`)
- **Data Fetching**: Fetch no lado do servidor com integração API GitHub e cache local.
- **UI Components**: Swiper (Carrosséis), React Loading Skeleton.

## 3. Padrões de Desenvolvimento

### Criação de Componentes

Siga sempre estes passos ao criar componentes em `src/components/`:

1. Crie uma pasta com o nome do componente (PascalCase).
2. Adicione um `index.tsx`.
3. Defina as tipagens em `src/interfaces/` ou `src/types/` se forem complexas ou compartilhadas.
4. Mantenha componentes como **Server Components** por padrão. Use `"use client"` apenas se houver hooks ou interatividade.

### Organização de Imports (Ordem Lógica)

Mantenha os imports agrupados na seguinte ordem:

1. **Externos/Bibliotecas**: React, Next.js, Iconify, Framer Motion, etc.
2. **Componentes/Widgets**: Componentes locais de `src/components` ou `src/widgets`.
3. **Hooks/Contextos**: Custom hooks de `src/hooks` e contexts de `src/context`.
4. **Negócio/Tipagem**: Interfaces, enums, tipos e constantes.
5. **Assets/Estilos**: Imagens e arquivos CSS.

### Tipagem TypeScript

- **Proibido o uso de `any`**.
- Refatore componentes legados que ainda usam `any` ao realizar modificações neles.
- Todas as props de componentes e retornos de API devem estar devidamente interfaceados.

### Estilização e UI

- **Unidades**: Use `rem` para tamanhos e espaçamentos (10px = 1rem).
- **Cores Customizadas**: Use as variáveis CSS definidas em `globals.css` (`--special-color`, `--background`).
- **Responsividade**: Mobile-first ou uso rigoroso de modificadores Tailwind (`max-sm`, `max-md`).
- **Feedback**: Sempre implemente estados de `loading` (Skeletons) e `error` (Popups genéricos do projeto).

## 4. Estrutura de Diretórios

- `src/app`: Rotas, layouts e endpoints de API.
- `src/components`: Blocos de construção da UI reutilizáveis.
- `src/widgets`: Componentes mais complexos que compõem seções das páginas.
- `src/context`: Gerenciamento de estado (Context API).
- `src/hooks`: Lógica de cliente reutilizável.
- `src/functions/server`: Lógica exclusiva de servidor e fetchers de API.
- `src/interfaces` / `src/types`: Contratos de tipos e definições TypeScript.
- `src/constants`: Valores estáticos e configurações globais.
- `src/enums`: Categorizações e tipos enumerados.
- `src/utils`: Funções utilitárias (datas, formatação, etc).
- `portfolio-content`: Informações necessárias para que o projeto apareça no site do portfolio.

## 5. Fluxo de Trabalho da IA

- **Pesquisa**: Verifique `src/interfaces` antes de criar novos modelos de dados.
- **Consistência**: Antes de estilizar, verifique se já existe uma classe utilitária em `globals.css`.
- **Validação**: Sempre sugira ou execute `npm run lint` e `npm run type-check` após mudanças estruturais.
- **Simplicidade**: Prefira abstrações limpas em vez de lógica espalhada entre camadas.

## 6. Comandos Úteis

- `npm run dev`: Ambiente de desenvolvimento.
- `npm run lint`: Verificação de linting.
- `npm run type-check`: Verificação de tipos TypeScript.
