# Runbook de Deploy (Frontend)

Este runbook define o mínimo operacional para deploy seguro com auto-deploy via GitHub + Vercel.

## Pré-deploy

1. Executar localmente:
   - `npm run lint`
   - `npm test`
   - `npm run build`
2. Confirmar que `NEXT_PUBLIC_API_URL` está correto no ambiente da Vercel.
3. Confirmar que o backend está saudável (`/` e `/posts/paginated`).

## Deploy

1. Abrir PR para `main`.
2. Garantir checks verdes no GitHub Actions.
3. Fazer merge (isso dispara deploy automático na Vercel).

## Pós-deploy (Smoke)

Validar:
- Home: `https://helemoficial.com`
- Notícias: `https://helemoficial.com/noticias`

Além disso, o workflow `Post Deploy Smoke` roda automaticamente no push da `main`.

## Rollback

Se o deploy falhar funcionalmente:
1. Na Vercel, redeploy do deployment anterior estável; ou
2. Reverter o commit na `main` e fazer push.
