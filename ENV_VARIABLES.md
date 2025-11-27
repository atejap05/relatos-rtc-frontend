# Variáveis de Ambiente - Frontend

Este arquivo documenta todas as variáveis de ambiente necessárias para o frontend.

## Desenvolvimento Local

Crie um arquivo `.env.local` na raiz do projeto `relatos-rtc-frontend/` com:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Produção (Vercel)

Configure a variável de ambiente no painel da Vercel:

### Obrigatória:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.render.com/api
```

ou

```env
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api
```

**Substitua** `seu-backend.render.com` ou `seu-backend.railway.app` pela URL real do seu backend deployado.

## Como Configurar na Vercel

1. Acesse o projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://seu-backend.render.com/api` (substitua pela URL real)
   - **Environment:** Selecione Production, Preview e Development conforme necessário
4. Clique em **Save**
5. Faça um novo deploy para aplicar as mudanças

## Nota sobre NEXT_PUBLIC_

Variáveis de ambiente que começam com `NEXT_PUBLIC_` são expostas ao cliente (browser). Isso é necessário para que o frontend possa fazer requisições para o backend.

**Importante:** Nunca coloque credenciais secretas em variáveis `NEXT_PUBLIC_*`, pois elas serão visíveis no código JavaScript do cliente.

