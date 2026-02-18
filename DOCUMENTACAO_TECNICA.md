# Documentação Técnica - Frontend (Web)

## 1. Visão Geral
Este é o projeto frontend do site "Helem Christina", desenvolvido utilizando **Next.js** com **App Router**. O projeto serve tanto a landing page pública quanto o painel administrativo para gerenciamento de conteúdo.

## 2. Stack Tecnológica
- **Framework Core**: Next.js 16.1.6
- **UI Library**: React 19
- **Estilização**: Tailwind CSS 4
- **Linguagem**: TypeScript
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Fontes**: Geist (Sans/Mono), Caveat, Indie Flower (Google Fonts via `next/font`)

## 3. Estrutura de Diretórios

```
web/src/
├── app/                 # Next.js App Router (Páginas e Layouts)
│   ├── admin/           # Rotas protegidas do painel administrativo
│   ├── noticias/[slug]/ # Página de detalhes da notícia (Página dinâmica instalada recentemente)
│   ├── login/           # Página de login
│   ├── globals.css      # Estilos globais e configuração Tailwind
│   ├── layout.tsx       # Root Layout (HTML/Body, Fontes)
│   └── page.tsx         # Landing Page principal
├── components/          # Componentes Reutilizáveis de UI
│   ├── Hero.tsx         # Seção principal
│   ├── Navbar.tsx       # Navegação
│   └── ...              # Outras seções da landing page
├── lib/                 # Utilitários e Configurações Core
│   └── api.ts           # Wrapper do Fetch API para comunicação com Backend
└── services/            # Camada de Integração com API (Business Logic)
    ├── auth.ts          # Serviço de Autenticação
    ├── gallery.ts       # Serviço de Galeria
    └── ...
```

## 4. Configuração e Instalação

### Pré-requisitos
- Node.js (v20+ recomendado)
- npm

### Instalação
```bash
cd web
npm install
```

### Variáveis de Ambiente
O projeto depende de variáveis de ambiente para conectar com o backend. Crie um arquivo `.env` ou `.env.local` na raiz da pasta `web`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### Rodando o Projeto
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:3000`.

## 5. Arquitetura e Fluxos

### Comunicação com Backend (`src/lib/api.ts`)
A comunicação é centralizada através de um wrapper da Fetch API chamado `apiRequest`. 
- **Base URL**: Definida via `NEXT_PUBLIC_API_URL`.
- **Credenciais**: Configurado com `credentials: 'include'` para permitir envio de cookies (HttpOnly) para autenticação.
- **Tratamento de Erro**: Centralizado, lançando erros com mensagens vindas da API.

### Serviços (`src/services/`)
Cada domínio de dados (Auth, Gallery, Posts) possui um serviço dedicado que utiliza o `apiRequest`. Isso desacopla os componentes React da lógica de chamada HTTP direta.

### Autenticação (Estado Atual vs Arquitetura)
> ⚠️ **Nota Importante**: O código contém atualmente uma implementação mista.

1.  **Implementação Atual (UI)**: 
    - As páginas de Login (`app/login/page.tsx`) e o Layout Admin (`app/admin/layout.tsx`) estão usando uma verificação temporária baseada em `localStorage` e credenciais hardcoded (`admin@helem.com`).
    
2.  **Arquitetura Planejada (Services)**:
    - O arquivo `src/services/auth.ts` já está preparado para a autenticação real.
    - O fluxo real deve utilizar Cookies HttpOnly setados pelo backend.
    - **TODO**: Refatorar `app/login/page.tsx` para usar `authService.login()` e remover checagem hardcoded.

## Atualizações Recentes (Integração e Otimização) - Fev/2026

### Galeria de Fotos
- Integração com API Real: `galleryService.getAll()` substituiu os dados mockados.
- Upload de Imagens: Implementado upload via `uploadService` conectando ao backend.
- Layout: Ajuste de tamanho das imagens para 280px (desktop) e 200px (mobile) para melhor performance e visual.
- Altura: Seção ajustada para `min-h-screen`.

### Seção de Notícias
- Nova seção `NewsSection` na Home Page exibindo as 3 últimas notícias publicadas.
- Geração automática de `slug` no backend baseada no título.
- Altura: Seção ajustada para `min-h-screen` com alinhamento vertical flexbox.
- Correção no painel administrativo para visualizar rascunhos (`getAllAdmin`).

### Otimização de Imagens
- Backend agora utiliza `sharp` para:
  - Redimensionar imagens para no máximo 1920x1080px.
  - Converter para formato WebP.
  - Comprimir com qualidade 80%.

### Rotas e Proteção
- **Públicas**: 
    - `/` (Landing Page)
    - `/login`
- **Privadas (`/admin`)**:
    - Protegidas atualmente por verificação de `localStorage` no `useLayoutEffect`/`useEffect` dentro de `app/admin/layout.tsx`.
    - Redirecionam para `/login` se não autenticado.

## 6. Estilização e Design System

- **Tailwind v4**: Utiliza a nova engine do Tailwind.
- **Tipografia**:
    - *Sans*: Geist Sans (Texto geral)
    - *Cursiva*: Caveat e Indie Flower (Títulos e detalhes artísticos)
- **Tema**:
    - Cores primárias focadas em tons de roxo (`purple-900`, `purple-800`).
    - Design responsivo mobile-first.

## 7. Próximos Passos Recomendados

1.  **Refatoração de Auth**: Integrar a página de login com o `authService` real e remover hardcoded credentials.
2.  **Middleware do Next.js**: Implementar `middleware.ts` para proteção de rotas no servidor (edge) ao invés de apenas no cliente (`useLayoutEffect`), garantindo maior segurança e performance.
3.  **Tratamento de Loading**: Adicionar estados de loading nas chamadas de serviço.
