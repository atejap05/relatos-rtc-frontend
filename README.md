# Frontend - Relatos RTC

Frontend moderno desenvolvido com Next.js 16 para gerenciamento de Relatos de Testes (RTC) no contexto da Reforma Tributária - NFSe.

## Stack Tecnológico

- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn UI** - Componentes UI baseados em Radix UI
- **React Query** - Gerenciamento de estado e cache de dados
- **React Hook Form + Zod** - Formulários e validação
- **Recharts** - Gráficos e visualizações
- **Axios** - Cliente HTTP
- **Sonner** - Notificações toast

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                    # Rotas (App Router)
│   │   ├── page.tsx           # Dashboard
│   │   ├── relatos/
│   │   │   ├── page.tsx       # Listagem
│   │   │   ├── novo/          # Criação
│   │   │   └── [id]/          # Detalhes/Edição
│   ├── components/
│   │   ├── ui/                # Componentes Shadcn
│   │   ├── relatos/           # Componentes específicos
│   │   ├── layout/            # Header, Nav
│   │   ├── dashboard/         # Gráficos e KPIs
│   │   └── providers/         # Providers (React Query)
│   ├── lib/
│   │   ├── api.ts             # Configuração Axios
│   │   └── utils.ts           # Utilitários
│   ├── hooks/                 # Custom hooks (useRelatos)
│   └── types/                 # Definições TypeScript
└── public/
```

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

## Funcionalidades

### Dashboard
- KPIs: Total de relatos, por status, por responsável
- Gráfico de pizza: Distribuição por status
- Gráfico de barras: Relatos por responsável

### Listagem de Relatos
- Tabela interativa com ordenação
- Filtros por status e busca textual
- Ações rápidas (Visualizar, Editar, Excluir)

### CRUD Completo
- **Criar**: Formulário com validação
- **Ler**: Visualização detalhada
- **Atualizar**: Edição de relatos existentes
- **Deletar**: Exclusão com confirmação

## Integração com Backend

O frontend consome a API REST do backend Python em `http://localhost:8000/api`.

Certifique-se de que o backend está rodando antes de iniciar o frontend:

```bash
# Backend (em outro terminal)
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

## Deploy na Vercel

### Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Repositório GitHub criado (`relatos-rtc-frontend`)
- Backend já deployado (Railway/Render/etc)

### Passo a Passo

1. **Conectar Repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "Add New Project"
   - Selecione o repositório `relatos-rtc-frontend`

2. **Configurar Projeto:**
   - **Framework Preset:** Next.js (detectado automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build` (padrão)
   - **Output Directory:** `.next` (padrão)
   - **Install Command:** `npm install` (padrão)

3. **Variáveis de Ambiente:**
   - Vá em "Environment Variables"
   - Adicione:
     ```
     NEXT_PUBLIC_API_URL=https://seu-backend.railway.app/api
     ```
   - Substitua `https://seu-backend.railway.app/api` pela URL real do seu backend

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o build completar
   - A aplicação estará disponível em uma URL como: `https://relatos-rtc-frontend.vercel.app`

5. **Deploy Automático:**
   - A cada push na branch `main`, um novo deploy será feito automaticamente
   - Pull Requests geram preview deployments automaticamente

### Configuração de Domínio Customizado (Opcional)

1. Vá em "Settings" → "Domains"
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruções da Vercel

### Variáveis de Ambiente por Ambiente

Você pode configurar variáveis diferentes para:
- **Production:** Produção (branch main)
- **Preview:** Preview deployments (PRs)
- **Development:** Ambiente local

Exemplo:
- **Production:** `NEXT_PUBLIC_API_URL=https://api.producao.com/api`
- **Preview:** `NEXT_PUBLIC_API_URL=https://api.staging.com/api`
- **Development:** `NEXT_PUBLIC_API_URL=http://localhost:8000/api`

### Troubleshooting

**Erro de Build:**
- Verifique se todas as dependências estão no `package.json`
- Execute `npm run build` localmente para identificar erros

**Erro de CORS:**
- Certifique-se de que o backend está configurado para aceitar requisições do domínio da Vercel
- Adicione a URL da Vercel nas origens permitidas no backend

**API não encontrada:**
- Verifique se `NEXT_PUBLIC_API_URL` está configurada corretamente
- Certifique-se de que o backend está rodando e acessível

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (porta 3000)
- `npm run build` - Cria build de produção
- `npm start` - Executa build de produção
- `npm run lint` - Executa ESLint

## Desenvolvimento

A aplicação está configurada para desenvolvimento local. O CORS no backend já está configurado para aceitar requisições de `localhost:3000`.
