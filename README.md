# Dra. Paola Medeiros

Site institucional em português, construído com Next.js App Router, TypeScript, Tailwind CSS, Motion e Lucide React. Preparado para a Vercel; não foi publicado automaticamente.

## Executar localmente

Requisitos: Node.js 22 ou superior e npm. Na pasta do projeto:

```bash
npm install
npm run dev
```

Abra http://localhost:3000. No PowerShell com restrição de scripts, use `npm.cmd` no lugar de `npm`; não é necessário alterar a política de execução do Windows.

Para reproduzir a instalação com as versões fixadas no lockfile, use `npm ci`.

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`start` serve o build de produção. Encerre o servidor de desenvolvimento antes de usar a mesma porta.

## Editar textos e contatos

- `src/data/professional.ts`: identidade, CRO, WhatsApp, redes sociais, biografia, formação, áreas de atuação, trajetória, diferenciais e localidades.
- `src/data/testimonials.ts`: depoimentos e controles de autorização/publicação.
- `src/app/page.tsx`: composição da página e títulos editoriais com quebras de linha específicas.
- `src/lib/site.ts` e `src/app/layout.tsx`: título, descrição e metadados.
- `src/app/globals.css`: paleta, tipografia, espaçamentos e comportamento responsivo.
- `src/app/social-image/route.tsx`: imagem para compartilhamento social.

Antes do uso oficial, a profissional deve revisar os dados fornecidos pela família, incluindo formação, registro, áreas de atuação, número de contato e localidades. Não foram acrescentadas datas de especialização, endereços, horários, resultados clínicos ou títulos não informados. Reabilitação Oral é apresentada como formação/área de atuação, sem afirmar registro de especialidade em Prótese Dentária.

## Fotografias

Todos os originais foram preservados. Os arquivos encontrados são:

| Arquivo                                | Dimensões | Uso                              |
| -------------------------------------- | --------- | -------------------------------- |
| `public/images/paola-principal.png`    | 425 × 641 | Hero, com fundo transparente     |
| `public/images/paola-profissional.png` | 483 × 641 | Apresentação profissional        |
| `public/images/paola-formatura.png`    | 647 × 834 | Trajetória                       |
| `public/images/paola-retrato.jpg`      | 150 × 150 | Pequeno retrato na identificação |

O retrato disponível é JPG, não PNG. Sua resolução pequena foi respeitada. Para trocar uma foto, adicione o novo arquivo em `public/images`, atualize `professional.images` e ajuste `width`/`height` no componente correspondente se a proporção mudar. Preserve os originais como cópia local. Prefira imagens com boa resolução e rosto integralmente visível. Next/Image gera versões otimizadas em WebP/AVIF, carrega imagens secundárias sob demanda e prioriza a foto principal.

## Depoimentos e privacidade

A página pública continua exibindo **Nossa forma de cuidar**. Os quatro textos fornecidos estão somente em `.local/testimonials.json`, ignorado pelo Git e pela Vercel. O arquivo versionado `src/data/testimonials.ts` mantém os textos vazios e os controles `authorized: false` e `published: false`.

### Visualizar os quatro cards localmente

```powershell
npm.cmd run dev:preview
```

Abra **http://127.0.0.1:3101/previa/depoimentos**. O servidor fica restrito ao computador local. Se já houver outro `next dev` aberto neste projeto, encerre-o antes de iniciar este comando. Também é possível acessar `/previa/depoimentos` pelo endereço localhost do servidor de desenvolvimento existente.

A prévia lê o JSON privado apenas no servidor, em desenvolvimento, sem alterar as autorizações. Os cards mostram **Prévia local · Aguardando autorização**. Apenas o terceiro relato tem cinco estrelas confirmadas; os outros não exibem estrelas. O quarto é identificado explicitamente como opinião de outra pessoa compartilhada por mensagem. Os textos não são exibidos na página inicial, mesmo durante o desenvolvimento.

Em produção, a rota de prévia retorna 404 e o arquivo local não é lido. `.local/` também está excluída do rastreamento de arquivos do build Next.js, do Git e do envio pela Vercel CLI. Não importe o JSON em componentes e não utilize `git add -f` para esses arquivos. Uma cópia nova do repositório não terá os textos privados: mantenha o arquivo local guardado no seu computador. Sua estrutura é uma lista de objetos com `id`, `text`, `authorized: false` e `published: false`, um para cada identificador existente no arquivo de dados.

Para ativar uma entrada em `src/data/testimonials.ts`:

1. Obtenha e documente autorização específica para divulgar o texto.
2. Somente depois da liberação, copie para `text` o trecho aprovado do arquivo local, removendo nomes, informações clínicas, identificadores e outros dados pessoais. Apenas esse conteúdo aprovado poderá entrar no repositório público.
3. Escolha um `publicLabel` genérico: `Relato de paciente`, `Avaliação de paciente` ou `Experiência compartilhada`. A observação `Relato autorizado` aparece separadamente no card.
4. Defina **ambos** `authorized: true` e `published: true` após a revisão.
5. Rode o build e publique novamente. Entradas sem texto continuam ocultas.

Os prints originais foram movidos para `.local/depoimentos/dep1.png` a `dep4.png`, preservando os arquivos fora de `public`. Não há rota para servi-los. Os caminhos antigos continuam bloqueados por `src/proxy.ts`, inclusive pelo endpoint de otimização de imagens. Não são importados nem exibidos. Não mova os prints de volta para a pasta pública.

## Publicar na Vercel

1. Crie um repositório e envie o projeto, respeitando o `.gitignore`. Os prints privados não devem estar no repositório.
2. Na Vercel, importe o repositório e selecione o framework **Next.js**.
3. Mantenha a pasta raiz atual, o comando de build `npm run build` e a saída padrão do Next.js. Use Node.js 22 ou superior.
4. Faça o primeiro deploy. Quando souber a URL pública real, configure `NEXT_PUBLIC_SITE_URL` nas variáveis de ambiente da Vercel, com protocolo HTTPS.
5. Faça um novo deploy para gerar URLs de SEO e compartilhamento com o endereço configurado.

Alternativamente, a Vercel CLI pode publicar esta pasta, respeitando `.vercelignore`. Não use exportação estática: o bloqueio dos prints depende do proxy Next.js.

Não é necessário backend, banco de dados ou formulário. Os botões abrem o WhatsApp com a mensagem solicitada. Links externos usam nova aba e `noopener noreferrer`. Não há analytics, cookies de marketing ou envio de informações médicas pelo site.

## Configurar o domínio depois

1. Adicione o domínio escolhido em **Project → Settings → Domains** na Vercel.
2. No provedor do domínio, configure os registros DNS exatamente como a Vercel indicar.
3. Escolha o endereço principal e configure o redirecionamento entre as versões com e sem `www`.
4. Atualize `NEXT_PUBLIC_SITE_URL` para esse endereço HTTPS e faça novo deploy.
5. Confira `/robots.txt`, `/sitemap.xml`, a URL canônica e o compartilhamento social.

Para testar localmente, copie `.env.example` para `.env.local` e preencha a variável somente com um endereço real quando disponível. Sem a variável, o site funciona, não declara domínio canônico nem imagem social absoluta, e o sitemap permanece vazio. Nenhum domínio definitivo foi inventado. O favicon PM está em `src/app/icon.svg`.

## Verificação no navegador

Os testes utilizam Google Chrome instalado no computador:

```bash
npm run build
npm run test:e2e
```

O Playwright inicia o servidor de produção se necessário. Para ambientes sem Google Chrome, instale o Chromium do Playwright (`npx playwright install chromium`) e remova `channel: "chrome"` de `playwright.config.ts`.

Os testes cobrem links e mensagem de WhatsApp, proteção dos prints, imagens, rotas de SEO, menu mobile com teclado, movimento reduzido, ausência de overflow em seis larguras entre 320 e 1440 px e verificação automatizada WCAG com axe em desktop/mobile. Capturas são salvas em `artifacts/` e não entram no deploy. A análise automatizada não substitui revisão humana de acessibilidade.

Os testes de privacidade também verificam o 404 da prévia em produção e a ausência dos textos privados nos arquivos de produção e nos traces. Para testar a prévia real, mantenha o servidor de desenvolvimento aberto e, em outro PowerShell, execute:

```powershell
$env:PLAYWRIGHT_BASE_URL = "http://127.0.0.1:3102"
$env:TEST_PREVIEW_BASE_URL = "http://127.0.0.1:3101"
npm.cmd run build
npm.cmd run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL, Env:TEST_PREVIEW_BASE_URL
```

O Playwright usa um servidor de produção separado na porta 3102. Os testes da prévia são ignorados quando `TEST_PREVIEW_BASE_URL` não está definida ou quando o arquivo privado não existe; os testes de bloqueio em produção continuam ativos.

Para Lighthouse, use um build de produção e o painel Lighthouse do Chrome. Métricas variam por dispositivo, rede e hospedagem. As fontes são obtidas pelo `next/font` no build e servidas pelo próprio site; o primeiro build precisa de acesso à rede.

### Resultado da verificação local

- Lint, TypeScript e build de produção aprovados.
- Oito testes aprovados, incluindo axe em desktop/mobile, prévia local e verificação de privacidade do build.
- Lighthouse mobile local: desempenho 91, acessibilidade 100, boas práticas 82 e SEO 100; CLS 0 e bloqueio total de 50 ms.
- A medição inicial de desempenho foi 80 devido a um script HTTP injetado pelo Kaspersky do computador. O resultado 91 foi obtido bloqueando somente as URLs desse script na sessão de auditoria. A tentativa de injeção ainda afetou boas práticas. Nenhuma configuração do antivírus foi modificada. Repita a medição na hospedagem HTTPS para avaliar o ambiente final.
- Relatórios locais: `artifacts/lighthouse.json`, `artifacts/lighthouse-controlled.json`; capturas em `artifacts/site-375.png` e `artifacts/site-1440.png`.

## Dependências

O lockfile fixa as versões instaladas. Na verificação inicial, `npm audit --omit=dev` não encontrou vulnerabilidades de produção. A auditoria completa apontou uma cadeia de cinco alertas de desenvolvimento em `eslint-config-next → fast-glob → micromatch → braces`, sem versão corrigida de `braces` disponível. Não foi aplicado o downgrade incompatível sugerido por `npm audit fix --force`. Reavalie com `npm audit` ao atualizar as ferramentas.

Referência de estrutura e comandos: [documentação oficial do Next.js](https://nextjs.org/docs/app/getting-started/installation).
