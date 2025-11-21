package com.manus.academico.simulation

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class SistemaAcademicoSimulation extends Simulation {

  // 1. Configuração HTTP
  val httpProtocol = http
    .baseUrl("http://localhost:8080") // URL base da aplicação Spring Boot
    .acceptHeader("application/json")
    .authorizationHeader("Basic dXNlcjpwYXNzd29yZA==") // Credenciais: user:password (Base64)

  // 2. Cenário de Usuário (Simulação de Ações)
  val scn = scenario("Cenario de Acesso a Alunos e Cursos")
    .exec(http("GET /api/alunos")
      .get("/api/alunos")
      .check(status.is(200)))
    .pause(1) // Pausa de 1 segundo
    .exec(http("GET /api/cursos")
      .get("/api/cursos")
      .check(status.is(200)))
    .pause(1)

  // 3. Configuração de Carga (Injeção de Usuários)
  setUp(
    scn.inject(
      rampUsers(10) during (5.seconds) // 10 usuários injetados em 5 segundos
    )
  ).protocols(httpProtocol)
}
