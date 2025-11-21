# Sistema Acadêmico Full Stack

## Descrição do Projeto

Este projeto consiste no desenvolvimento de uma aplicação web full stack simulando um sistema acadêmico completo, conforme especificado na Prática Avaliativa. O sistema implementa funcionalidades essenciais de gestão educacional, incluindo relacionamento entre entidades, segurança com autenticação, monitoramento com métricas e alertas, testes unitários, de carga e stress, documentação da API e deploy completo do backend e frontend.

O projeto está estruturado em duas partes principais: um **backend** desenvolvido com Spring Boot 3 que expõe uma API RESTful protegida por autenticação, e um **frontend** desenvolvido com React que consome essa API, oferecendo uma interface moderna e responsiva para gerenciamento de alunos e cursos. A arquitetura foi projetada para ser escalável, monitorável e facilmente implantável em ambientes de produção.

## Tecnologias Utilizadas

### Backend

O backend foi desenvolvido utilizando o ecossistema Spring, uma das plataformas mais robustas para desenvolvimento de aplicações empresariais em Java. A escolha do Spring Boot 3 permite um desenvolvimento ágil com configurações automáticas e suporte nativo para microsserviços e monitoramento.

| Categoria | Tecnologia | Versão | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | Spring Boot | 3.2.0 | Desenvolvimento rápido de aplicações Java com configuração automática |
| **Linguagem** | Java | 17 | Linguagem principal do projeto com suporte a recursos modernos |
| **Persistência** | Spring Data JPA | - | Abstração de acesso a dados com repositórios e mapeamento objeto-relacional |
| **Banco de Dados** | H2 Database | - | Banco de dados em memória para desenvolvimento e testes rápidos |
| **Segurança** | Spring Security | - | Autenticação HTTP Basic e controle de acesso baseado em papéis |
| **Documentação** | Springdoc OpenAPI | 2.3.0 | Geração automática de documentação interativa Swagger UI |
| **Monitoramento** | Spring Boot Actuator | - | Exposição de métricas, health checks e informações operacionais |
| **Monitoramento** | Prometheus | latest | Coleta e armazenamento de métricas em séries temporais |
| **Visualização** | Grafana | latest | Dashboards interativos para visualização de métricas |
| **Testes de Carga** | Gatling | - | Simulação de carga e testes de desempenho |
| **Build** | Apache Maven | - | Gerenciamento de dependências e ciclo de vida do projeto |

### Frontend

O frontend foi desenvolvido com tecnologias modernas do ecossistema JavaScript/TypeScript, priorizando uma experiência de usuário fluida e responsiva. A escolha do React permite a construção de interfaces dinâmicas com componentes reutilizáveis e estado gerenciado de forma eficiente.

| Categoria | Tecnologia | Versão | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 19 | Biblioteca para construção de interfaces de usuário baseadas em componentes |
| **Linguagem** | TypeScript | - | Superset do JavaScript com tipagem estática para maior segurança |
| **Roteamento** | Wouter | - | Roteamento leve e performático para aplicações React |
| **Estilização** | Tailwind CSS | 4 | Framework CSS utility-first para estilização rápida e consistente |
| **Componentes UI** | shadcn/ui | - | Biblioteca de componentes acessíveis e customizáveis |
| **Build** | Vite | - | Ferramenta de build extremamente rápida com HMR |
| **Gerenciador** | pnpm | - | Gerenciador de pacotes eficiente com economia de espaço |

## Arquitetura e Relacionamento entre Entidades

O sistema acadêmico foi projetado com base em duas entidades principais que representam os conceitos fundamentais de uma instituição educacional: **Aluno** e **Curso**. Essas entidades possuem um relacionamento muitos-para-muitos (N:N), refletindo a realidade de que um aluno pode estar matriculado em vários cursos simultaneamente, e um curso pode ter vários alunos matriculados.

### Entidade Aluno

A entidade Aluno representa os estudantes cadastrados no sistema, contendo informações essenciais para identificação e contato.

**Atributos:**
- **id** (Long): Identificador único gerado automaticamente
- **nome** (String): Nome completo do aluno
- **email** (String): Endereço de e-mail para comunicação
- **matricula** (String): Número de matrícula único do aluno
- **cursos** (Set\<Curso\>): Conjunto de cursos nos quais o aluno está matriculado

### Entidade Curso

A entidade Curso representa as disciplinas ou programas oferecidos pela instituição, incluindo informações sobre carga horária.

**Atributos:**
- **id** (Long): Identificador único gerado automaticamente
- **nome** (String): Nome do curso ou disciplina
- **cargaHoraria** (Integer): Carga horária total do curso em horas
- **alunos** (Set\<Aluno\>): Conjunto de alunos matriculados no curso

### Diagrama de Relacionamento

```
+--------+          +-----------+          +-------+
| Aluno  |----------| AlunoCurso|----------| Curso |
+--------+          +-----------+          +-------+
```

O relacionamento N:N é implementado através de uma tabela intermediária gerenciada automaticamente pelo JPA, permitindo operações de matrícula e desmatrícula de forma eficiente e mantendo a integridade referencial dos dados.

## Como Rodar Localmente

### Backend (Spring Boot)

O backend pode ser executado localmente para desenvolvimento e testes. É necessário ter o ambiente Java configurado adequadamente.

**Pré-requisitos:**
- Java Development Kit (JDK) 17 ou superior instalado
- Apache Maven 3.6 ou superior instalado
- Variável de ambiente JAVA_HOME configurada corretamente

**Passos para execução:**

1. **Clone o repositório e navegue até o diretório do backend:**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd sistema-academico/backend
   ```

2. **Compile e empacote a aplicação usando Maven:**
   ```bash
   mvn clean install
   ```
   Este comando irá baixar todas as dependências, compilar o código-fonte e executar os testes unitários.

3. **Execute a aplicação Spring Boot:**
   ```bash
   java -jar target/sistema-academico-0.0.1-SNAPSHOT.jar
   ```
   Alternativamente, você pode usar o plugin do Maven:
   ```bash
   mvn spring-boot:run
   ```

A aplicação será iniciada na porta **8080** e estará pronta para receber requisições. Você pode verificar se o backend está funcionando acessando o endpoint de health check em `http://localhost:8080/actuator/health`.

### Frontend (React)

O frontend é uma aplicação React moderna que consome a API do backend. É necessário ter o Node.js instalado para executar o ambiente de desenvolvimento.

**Pré-requisitos:**
- Node.js 18 ou superior instalado
- pnpm instalado globalmente (`npm install -g pnpm`)

**Passos para execução:**

1. **Navegue até o diretório do frontend:**
   ```bash
   cd sistema-academico/frontend
   ```

2. **Instale as dependências do projeto:**
   ```bash
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```

A aplicação frontend será iniciada na porta **3000** com hot-reload habilitado. Acesse `http://localhost:3000` no navegador para visualizar a interface.

**Observação importante:** O frontend está configurado para se conectar ao backend em `http://localhost:8080`. Certifique-se de que o backend esteja em execução antes de utilizar o frontend.

## Como Acessar Swagger e Autenticação

A API REST do backend está protegida com **Spring Security** utilizando autenticação **HTTP Basic**. Isso significa que todas as requisições devem incluir um cabeçalho de autorização com credenciais válidas codificadas em Base64.

### Credenciais de Teste

O sistema vem pré-configurado com duas contas de teste para facilitar o desenvolvimento e demonstração:

| Usuário | Senha | Papéis | Descrição |
| :--- | :--- | :--- | :--- |
| `user` | `password` | `USER` | Usuário comum com permissões básicas |
| `admin` | `admin` | `ADMIN`, `USER` | Administrador com permissões completas |

### Acesso à Documentação Interativa (Swagger UI)

A documentação interativa da API está disponível através do Swagger UI, uma interface web que permite visualizar todos os endpoints disponíveis, seus parâmetros, modelos de dados e testar as requisições diretamente no navegador.

**URL de acesso:** `http://localhost:8080/swagger-ui.html`

**Como autenticar no Swagger UI:**
1. Acesse a URL do Swagger UI
2. Clique no botão **"Authorize"** no topo da página
3. Insira as credenciais de teste (por exemplo, `user` e `password`)
4. Clique em **"Authorize"** e depois em **"Close"**
5. Agora você pode testar os endpoints clicando em **"Try it out"**

### Endpoints Principais da API

A API RESTful segue os princípios REST e utiliza os métodos HTTP apropriados para cada operação. Todos os endpoints retornam dados no formato JSON.

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Alunos** | GET | `/api/alunos` | Lista todos os alunos cadastrados |
| **Alunos** | GET | `/api/alunos/{id}` | Busca um aluno específico por ID |
| **Alunos** | POST | `/api/alunos` | Cria um novo aluno |
| **Alunos** | PUT | `/api/alunos/{id}` | Atualiza os dados de um aluno existente |
| **Alunos** | DELETE | `/api/alunos/{id}` | Remove um aluno do sistema |
| **Cursos** | GET | `/api/cursos` | Lista todos os cursos cadastrados |
| **Cursos** | GET | `/api/cursos/{id}` | Busca um curso específico por ID |
| **Cursos** | POST | `/api/cursos` | Cria um novo curso |
| **Cursos** | PUT | `/api/cursos/{id}` | Atualiza os dados de um curso existente |
| **Cursos** | DELETE | `/api/cursos/{id}` | Remove um curso do sistema |
| **Matrícula** | POST | `/api/alunos/{alunoId}/matricular/{cursoId}` | Matricula um aluno em um curso específico |

## Como Consumir a API no Frontend

O frontend React foi desenvolvido para consumir a API do backend de forma integrada e segura. A autenticação é gerenciada através de um contexto React que armazena as credenciais e as inclui automaticamente em todas as requisições.

### Fluxo de Autenticação

1. **Login:** O usuário acessa a página de login (`/login`) e insere suas credenciais
2. **Validação:** O frontend envia uma requisição de teste para o backend com as credenciais
3. **Armazenamento:** Se a autenticação for bem-sucedida, as credenciais são armazenadas no localStorage
4. **Requisições:** Todas as requisições subsequentes incluem o header de autorização automaticamente
5. **Logout:** Ao fazer logout, as credenciais são removidas do localStorage

### Páginas Disponíveis

O frontend oferece uma interface completa para gerenciamento do sistema acadêmico:

**Página de Login (`/login`):**
- Formulário de autenticação com validação
- Exibição das credenciais de teste para facilitar o acesso
- Redirecionamento automático após login bem-sucedido

**Página de Alunos (`/alunos`):**
- Listagem de todos os alunos em formato de tabela
- Criação de novos alunos através de modal
- Edição de alunos existentes
- Exclusão de alunos com confirmação
- Matrícula de alunos em cursos através de seleção
- Visualização dos cursos em que cada aluno está matriculado

**Página de Cursos (`/cursos`):**
- Listagem de todos os cursos em formato de tabela
- Criação de novos cursos através de modal
- Edição de cursos existentes
- Exclusão de cursos com confirmação
- Visualização da quantidade de alunos matriculados em cada curso

### Layout e Navegação

O sistema utiliza um layout com sidebar persistente que oferece navegação clara entre as diferentes seções. A sidebar inclui:
- Logo e nome do sistema
- Links de navegação para Alunos e Cursos
- Informações do usuário logado
- Botão de logout

## Como Configurar Prometheus e Grafana

O sistema está preparado para monitoramento completo através da integração entre Spring Boot Actuator, Prometheus e Grafana. Essa stack de monitoramento permite coletar métricas detalhadas sobre o desempenho da aplicação, uso de recursos e comportamento em produção.

### Arquitetura de Monitoramento

O Spring Boot Actuator expõe métricas no formato Prometheus através do endpoint `/actuator/prometheus`. O Prometheus coleta essas métricas periodicamente (scraping) e as armazena em seu banco de dados de séries temporais. O Grafana então consulta o Prometheus para criar dashboards visuais interativos.

### Configuração do Backend

O arquivo `application.properties` do Spring Boot já está configurado para expor as métricas necessárias:

```properties
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
management.metrics.export.prometheus.enabled=true
```

Essas configurações garantem que:
- Todos os endpoints do Actuator estejam disponíveis
- O health check mostre detalhes completos
- As métricas sejam exportadas no formato Prometheus

### Executando com Docker Compose

O projeto inclui um arquivo `docker-compose.yml` que orquestra todos os serviços necessários para o monitoramento.

**Pré-requisitos:**
- Docker instalado (versão 20.10 ou superior)
- Docker Compose instalado (versão 2.0 ou superior)

**Passos para execução:**

1. **Navegue para o diretório raiz do projeto:**
   ```bash
   cd sistema-academico
   ```

2. **Inicie todos os serviços com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

   Este comando irá:
   - Construir a imagem Docker do backend Spring Boot
   - Iniciar o container do backend
   - Iniciar o container do Prometheus
   - Iniciar o container do Grafana
   - Configurar a rede Docker para comunicação entre os serviços

### Acessos aos Serviços

Após a inicialização completa, os seguintes serviços estarão disponíveis:

| Serviço | URL | Credenciais | Descrição |
| :--- | :--- | :--- | :--- |
| **Backend API** | `http://localhost:8080` | user/password ou admin/admin | API REST do sistema acadêmico |
| **Swagger UI** | `http://localhost:8080/swagger-ui.html` | user/password ou admin/admin | Documentação interativa da API |
| **Métricas Prometheus** | `http://localhost:8080/actuator/prometheus` | user/password ou admin/admin | Endpoint de métricas em formato Prometheus |
| **Prometheus UI** | `http://localhost:9090` | Sem autenticação | Interface de consulta e visualização de métricas |
| **Grafana** | `http://localhost:3000` | admin/admin | Plataforma de dashboards e visualização |

### Configuração do Prometheus

O arquivo `prometheus.yml` define como o Prometheus deve coletar as métricas do backend:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'spring-boot-app'
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['backend:8080']
```

Esta configuração instrui o Prometheus a:
- Coletar métricas a cada 15 segundos
- Acessar o endpoint `/actuator/prometheus` do serviço `backend` na porta 8080
- Utilizar o nome do serviço Docker (`backend`) para resolução de DNS

### Configuração do Grafana

Após acessar o Grafana pela primeira vez:

1. **Faça login com as credenciais padrão:** admin/admin
2. **Adicione o Prometheus como Data Source:**
   - Clique em "Configuration" (ícone de engrenagem) → "Data Sources"
   - Clique em "Add data source"
   - Selecione "Prometheus"
   - Configure a URL: `http://prometheus:9090`
   - Clique em "Save & Test"

3. **Importe um Dashboard para Spring Boot:**
   - Clique em "+" → "Import"
   - Digite o ID do dashboard: **4701** (JVM Micrometer) ou **11378** (Spring Boot Statistics)
   - Selecione o Prometheus data source configurado anteriormente
   - Clique em "Import"

Agora você terá dashboards completos mostrando métricas de JVM, requisições HTTP, uso de memória, threads, garbage collection e muito mais.

## Como Executar Testes de Carga e Stress com Gatling

O projeto inclui testes de carga implementados com **Gatling**, uma ferramenta poderosa para simulação de carga e testes de desempenho. Os testes permitem avaliar como o sistema se comporta sob diferentes níveis de carga, identificando gargalos de desempenho e limites de escalabilidade.

### Objetivo dos Testes

Os testes de carga implementados simulam múltiplos usuários acessando simultaneamente os endpoints da API, permitindo avaliar:
- **Tempo de resposta:** Quanto tempo cada requisição leva para ser processada
- **Taxa de erro:** Percentual de requisições que falham sob carga
- **Throughput:** Quantidade de requisições processadas por segundo
- **Estabilidade:** Capacidade do sistema de manter desempenho consistente

### Estrutura do Teste

O script de simulação está localizado em `tests/gatling/user-files/simulations/SistemaAcademicoSimulation.scala` e simula o seguinte cenário:
- 10 usuários virtuais simultâneos
- Período de rampa de 5 segundos (aumento gradual de usuários)
- Requisições GET para `/api/alunos` e `/api/cursos`
- Autenticação HTTP Basic com as credenciais `user:password`

### Pré-requisitos

Para executar os testes de Gatling, você precisa ter o Gatling instalado. Existem duas opções:

**Opção 1: Instalação local do Gatling**
- Baixe o Gatling em [https://gatling.io/open-source/](https://gatling.io/open-source/)
- Extraia o arquivo ZIP
- Adicione o diretório `bin` ao PATH do sistema

**Opção 2: Uso de imagem Docker**
- Utilize a imagem oficial do Gatling: `denvazh/gatling`

### Instruções para Execução

1. **Certifique-se de que o backend está em execução:**
   ```bash
   cd sistema-academico/backend
   mvn spring-boot:run
   ```

2. **Execute o script de simulação do Gatling:**

   Se estiver usando instalação local:
   ```bash
   cd sistema-academico/tests/gatling
   gatling.sh -sf user-files/simulations
   ```

   Se estiver usando Docker:
   ```bash
   docker run -it --rm -v $(pwd)/tests/gatling:/opt/gatling/user-files \
     --network host denvazh/gatling \
     -sf /opt/gatling/user-files/simulations
   ```

3. **Aguarde a conclusão da simulação:** O Gatling exibirá estatísticas em tempo real no console

4. **Acesse o relatório gerado:** Após a conclusão, o Gatling gerará um relatório HTML detalhado em `target/gatling/[nome-da-simulacao]-[timestamp]/index.html`

### Interpretação dos Resultados

O relatório HTML do Gatling inclui:
- **Global Statistics:** Estatísticas gerais de todas as requisições
- **Response Time Distribution:** Distribuição dos tempos de resposta
- **Response Time Percentiles:** Percentis de tempo de resposta (p50, p75, p95, p99)
- **Requests per Second:** Gráfico de requisições por segundo ao longo do tempo
- **Responses per Second:** Gráfico de respostas por segundo
- **Active Users:** Número de usuários ativos ao longo do tempo

**Métricas importantes a observar:**
- **Mean (média):** Tempo médio de resposta
- **p95:** 95% das requisições foram processadas em até este tempo
- **p99:** 99% das requisições foram processadas em até este tempo
- **KO (Knock Out):** Percentual de requisições que falharam

## Como Fazer Deploy no Render

O deploy da aplicação pode ser realizado em plataformas de hospedagem cloud. Para o backend, recomenda-se o **Render**, que oferece suporte nativo para aplicações Java e Spring Boot. Para o frontend, recomenda-se o **Vercel**, otimizado para aplicações React.

### Deploy do Backend no Render

O Render é uma plataforma moderna de hospedagem que simplifica o deploy de aplicações através de integração direta com repositórios Git.

**Passos para deploy:**

1. **Crie uma conta no Render:**
   - Acesse [https://render.com](https://render.com)
   - Faça login com sua conta GitHub

2. **Crie um novo Web Service:**
   - No dashboard do Render, clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub contendo o projeto
   - Selecione o repositório e a branch desejada

3. **Configure o serviço:**
   - **Name:** sistema-academico-backend
   - **Region:** Escolha a região mais próxima dos usuários
   - **Branch:** main (ou a branch que você deseja deployar)
   - **Root Directory:** backend (se o backend estiver em um subdiretório)
   - **Runtime:** Java
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/sistema-academico-0.0.1-SNAPSHOT.jar`

4. **Configure variáveis de ambiente (se necessário):**
   - Clique em "Advanced" → "Add Environment Variable"
   - Adicione variáveis como `SPRING_PROFILES_ACTIVE=prod` se necessário

5. **Inicie o deploy:**
   - Clique em "Create Web Service"
   - O Render irá clonar o repositório, executar o build e iniciar a aplicação
   - Aguarde a conclusão do deploy (pode levar alguns minutos)

6. **Acesse a aplicação:**
   - Após o deploy, o Render fornecerá uma URL pública (ex: `https://sistema-academico-backend.onrender.com`)
   - Acesse a documentação Swagger em `https://[sua-url].onrender.com/swagger-ui.html`

### Deploy do Frontend no Vercel

O Vercel é a plataforma ideal para aplicações React, oferecendo deploy automático e CDN global.

**Passos para deploy:**

1. **Crie uma conta no Vercel:**
   - Acesse [https://vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Importe o projeto:**
   - No dashboard do Vercel, clique em "Add New" → "Project"
   - Selecione o repositório do frontend
   - Clique em "Import"

3. **Configure o projeto:**
   - **Framework Preset:** Vite
   - **Root Directory:** frontend (se estiver em um subdiretório)
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`

4. **Configure variáveis de ambiente:**
   - Adicione a variável `VITE_API_URL` apontando para a URL do backend no Render
   - Exemplo: `VITE_API_URL=https://sistema-academico-backend.onrender.com`

5. **Atualize o código para usar a variável de ambiente:**
   - No código do frontend, substitua `http://localhost:8080` por `import.meta.env.VITE_API_URL`

6. **Inicie o deploy:**
   - Clique em "Deploy"
   - O Vercel irá construir e deployar automaticamente
   - Cada push para a branch principal acionará um novo deploy automático

7. **Acesse a aplicação:**
   - O Vercel fornecerá uma URL pública (ex: `https://sistema-academico.vercel.app`)

