# Desafio Globo

Este repositório exemplifica a solução de um sistema de votação do paredão do BBB onde é possível adicionar 2 ou mais integrantes em uma votação, permitindo que os telespectadores possam escolher um para eliminar.

Foi escolhido usar uma estrutura de repositórios [monorepo](https://en.wikipedia.org/wiki/Monorepo) por se tratar de um desafio, visto que simplifica o compartilhamento, os projetos estão organizados seguindo os diretórios:

- **[api](/api)**: Projeto backend desenvolvido em Ruby on Rails

- **[client](/client)**: Projeto frontend desenvolvido em React usando Typescript

- **[infra](/infra)**: Arquivos de benchmarks, docker e docker-compose

<br>

## Dependências

- docker
- docker-compose

<br>

## Como rodar os projetos

Para criar as imagens do docker rode os comandos

```bash
cd infra
make build
```

Então, para rodar os projetos, basta rodar

```bash
docker-compose up

# ou 

docker-compose up -d
```

Agora basta acessar no navegador http://localhost

<br>

_estes comandos foram testados no macos e no linux, porém devem funcionar no windows também_

<br>

## Rotas das aplicações

- http://localhost <- frontend

- http://localhost:81 <- grafana
- http://localhost:3000 <- api
- http://localhost:3000/sidekiq <- sidekiq
- http://localhost:9090 <- prometheus
- http://localhost:9394/metrics <- métricas da aplicação

## Benchmarks

No estado atual da aplicação, em ambiente de desenvolvimento, foi constatado que a aplicação consegue suportar até 160 requests/s

```
wrk -t10 -c100 -d10s -s benchmark.lua http://127.0.0.1:3000/votes
Running 10s test @ http://127.0.0.1:3000/votes
  10 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    80.63ms   74.25ms 897.53ms   90.31%
    Req/Sec   143.31     33.67   250.00     71.10%
  14339 requests in 10.06s, 5.51MB read
Requests/sec:   1424.99
Transfer/sec:    560.81KB
```

Mais benchmarks no diretório [infra](/infra)

<br>

## Funcionalidades
 - Gestão de usuários via api
 - Gestão de brothers via api 
 - Gestão de paredões via api

 - Cadastro de novo usuário 
 - Votação nos paredões

 - Visualização e estatisticas dos paredões como produção
 - Encerrar votação como produção
 - Métricas da api no grafana

<br>

## Para o futuro

 - Melhorar o dashboard do grafana coletando novas métricas
 - Melhorar as métricas adicionando a votação como uma futura métrica
 - Testes para frontend
 - Melhorar a autorização
 - Melhorar cobertura dos testes
