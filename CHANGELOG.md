# Changelog — Helem Oficial Web

## [Unreleased] — 2026-03-14

### Added
- **Dashboard dinâmico:** `admin/page.tsx` consumindo `GET /stats/dashboard` com dados reais
  - Cards: Total de Posts, Total de Fotos, Visualizações hoje
  - Seção de Atividade Recente com timestamp relativo
- **Toast notifications:** `react-hot-toast` integrado no `AdminLayoutClient`
  - Feedback visual em todas operações de criar, editar e deletar (notícias, galeria)
- **Skeleton loading:** estado `isAuthLoading` no `AdminLayoutClient` previne flash branco durante verificação de autenticação
- **Sidebar mobile:** hamburger menu, overlay escuro e botão X para fechar — layout 100% responsivo
- **Módulo de Equipe (RBAC):**
  - `src/services/users.ts` — serviço de CRUD de membros
  - `/admin/usuarios` — tabela com badges de cargo (Administrador / Editor), editar, remover
  - `/admin/usuarios/novo` — formulário de criação de membro (nome, e-mail, senha, cargo)
  - `/admin/usuarios/[id]` — formulário de edição (senha opcional)
  - Item "Equipe" no sidebar visível **somente para ADMIN**

### Changed
- `src/services/auth.ts` — interface `User` agora inclui `role: 'ADMIN' | 'EDITOR'`
- `authService.getMe()` retorna `User` diretamente (antes retornava `{ user: User }`)
- `AdminLayoutClient.tsx` — captura `role` do `/auth/me` no `useEffect` inicial

### Documentation
- `DOCUMENTACAO_TECNICA.md` — seções 7 (Backoffice) e 8 (RBAC) adicionadas
