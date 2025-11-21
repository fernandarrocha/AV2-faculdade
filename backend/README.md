# Sistema Acadêmico - Backend (Spring Boot 3)

## 1. Descrição do Projeto

Este projeto consiste no desenvolvimento do backend de um Sistema Acadêmico, conforme a Prática Avaliativa. O foco principal é a implementação de uma API RESTful para gerenciar as entidades **Aluno** e **Curso**, com um relacionamento N:N entre elas. A aplicação é construída com **Spring Boot 3** e inclui módulos essenciais como persistência de dados (JPA), segurança (Spring Security) e documentação da API (Springdoc/Swagger).

A arquitetura foi projetada para ser facilmente estendida, com a inclusão de endpoints de monitoramento (Actuator) e a estrutura de segurança configurada para suportar a futura implementação de testes de carga e integração com ferramentas de monitoramento como Prometheus e Grafana.

## 2. Tecnologias Utilizadas

| Categoria | Tecnologia | Versão | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | Spring Boot | 3.2.0 | Desenvolvimento rápido de aplicações Java. |
| **Linguagem** | Java | 17 | Linguagem principal do projeto. |
| **Persistência** | Spring Data JPA | - | Acesso e manipulação de dados. |
| **Banco de Dados** | H2 Database | - | Banco de dados em memória para desenvolvimento e testes. |
| **Segurança** | Spring Security | - | Autenticação e Autorização. |
| **Documentação** | Springdoc OpenAPI | 2.3.0 | Geração automática de documentação Swagger UI. |
| **Monitoramento** | Spring Boot Actuator | - | Exposição de métricas e informações de saúde (Health Check). |
| **Build** | Apache Maven | - | Gerenciamento de dependências e ciclo de vida do projeto. |

## 3. Como Rodar Localmente

### Pré-requisitos

*   Java Development Kit (JDK) 17 ou superior.
*   Apache Maven.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_REPOSITORIO]
    cd sistema-academico/backend
    ```

2.  **Compile e empacote a aplicação:**
    ```bash
    mvn clean install
    ```

3.  **Execute a aplicação:**
    ```bash
    java -jar target/sistema-academico-0.0.1-SNAPSHOT.jar
    ```

A aplicação será iniciada na porta `8080`.

## 4. Como Acessar Swagger e Autenticação

A API está protegida com **Spring Security** usando autenticação **HTTP Basic**.

### Credenciais de Teste

| Usuário | Senha | Papéis |
| :--- | :--- | :--- |
| `user` | `password` | `USER` |
| `admin` | `admin` | `ADMIN`, `USER` |

### Acesso à Documentação (Swagger UI)

A documentação interativa da API está disponível em:

`http://localhost:8080/swagger-ui.html`

Para testar os endpoints no Swagger UI, clique no botão **"Authorize"** e insira as credenciais de teste.

### Endpoints Principais

| Recurso | Método | Descrição |
| :--- | :--- | :--- |
| `/api/alunos` | `GET` | Lista todos os alunos. |
| `/api/alunos` | `POST` | Cria um novo aluno. |
| `/api/cursos` | `GET` | Lista todos os cursos. |
| `/api/cursos` | `POST` | Cria um novo curso. |
| `/api/alunos/{alunoId}/matricular/{cursoId}` | `POST` | Matricula um aluno em um curso. |

## 5. Configuração para Monitoramento (Actuator, Prometheus e Grafana)

O projeto já inclui a dependência **Spring Boot Actuator** e a configuração no `application.properties` para expor as métricas, facilitando a integração futura.

**Configuração no `application.properties`:**
```properties
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
management.metrics.export.prometheus.enabled=true
```

### Endpoints de Monitoramento

*   **Health Check:** `http://localhost:8080/actuator/health`
*   **Métricas Prometheus:** `http://localhost:8080/actuator/prometheus`

### Próximos Passos para Monitoramento

Para completar a etapa de monitoramento, siga estes passos:

1.  **Configurar `docker-compose.yml`:** Utilize o arquivo `docker-compose.yml` fornecido na avaliação para subir o Prometheus e o Grafana.
2.  **Configurar `prometheus.yml`:** O arquivo de configuração do Prometheus deve ser ajustado para fazer o *scrape* do endpoint `/actuator/prometheus` da aplicação Spring Boot. **Atenção:** Se estiver rodando o Spring Boot diretamente na máquina host e o Prometheus no Docker, pode ser necessário ajustar o `targets` para `host.docker.internal:8080` (no Windows/Mac) ou configurar a rede Docker corretamente (no Linux).
3.  **Configurar Grafana:** Crie um *Data Source* no Grafana apontando para o Prometheus e importe um *Dashboard* para visualizar as métricas do Spring Boot.

## 6. Como Executar Testes de Carga e Stress (Gatling ou JMeter)

O projeto está pronto para receber a implementação de testes de desempenho.

### Próximos Passos para Testes de Carga

1.  **Escolha da Ferramenta:** Selecione entre **Gatling** ou **Apache JMeter**.
2.  **Criação dos Scripts:** Desenvolva scripts de teste que simulem:
    *   Múltiplos acessos simultâneos aos endpoints de leitura (`GET /api/alunos`, `GET /api/cursos`).
    *   Simulação de criação de novos recursos (`POST /api/alunos`, `POST /api/cursos`).
    *   Simulação de matrícula (`POST /api/alunos/{alunoId}/matricular/{cursoId}`).
3.  **Execução e Relatório:** Execute os testes e configure a ferramenta para gerar um relatório de execução (HTML ou CSV) que avalie o tempo de resposta, taxa de erro e *throughput*.
4.  **Documentação:** Adicione as instruções detalhadas para rodar os testes nesta seção do `README.md`.

## 7. Como Fazer Deploy no Render

O deploy do backend pode ser realizado na plataforma **Render**.

1.  **Criação de um Serviço Web:** No Render, crie um novo **Web Service**.
2.  **Conexão com o Repositório:** Conecte o Render ao seu repositório GitHub.
3.  **Configurações de Build:**
    *   **Runtime:** Java
    *   **Build Command:** `mvn clean package -DskipTests`
    *   **Start Command:** `java -jar target/sistema-academico-0.0.1-SNAPSHOT.jar`
4.  **Variáveis de Ambiente:** Configure as variáveis de ambiente, se necessário (ex: para um banco de dados externo, embora o H2 em memória seja suficiente para um teste inicial).

## 8. Referências Utilizadas

*   [Spring Boot Documentation] [ref-1]
*   [Spring Data JPA Documentation] [ref-2]
*   [Spring Security Documentation] [ref-3]
*   [Springdoc OpenAPI Documentation] [ref-4]
*   [Spring Boot Actuator Documentation] [ref-5]

[ref-1]: https://docs.spring.io/spring-boot/docs/current/reference/html
[ref-2]: https://docs.spring.io/spring-data/jpa/docs/current/reference/html
[ref-3]: https://docs.spring.io/spring-security/reference/index.html
[ref-4]: https://springdoc.org
[ref-5]: https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html
