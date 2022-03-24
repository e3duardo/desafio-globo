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

http://localhost <- frontend

http://localhost:81 <- grafana
http://localhost:3000 <- api
http://localhost:3000/sidekiq <- sidekiq
http://localhost:9090 <- prometheus
http://localhost:9394/metrics <- métricas da aplicação

## Benchmarks

No estado atual da aplicação, em ambiente de desenvolvimento, foi constatado que a aplicação consegue suportar até 160 requests/s

```
wrk -t4 -c500 -d2s -s benchmark.lua http://localhost:3000/votes
Running 2s test @ http://localhost:3000/votes
  4 threads and 500 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   132.56ms  356.46ms   1.99s    92.10%
    Req/Sec   127.60     59.24   190.00     76.00%
  330 requests in 2.06s, 130.45KB read
  Socket errors: connect 0, read 585, write 1, timeout 1
Requests/sec:    160.54
Transfer/sec:     63.46KB
```

<br>

## Funcionalidades
 - 

<br>

## O que falta implementar

- [x] Tela de cadastrar usuário
- [x] Panorama percentual de votos até o momento, após votar
- [x] Catalogar os benchmarks feitos
- [x] Utilizar uma ferramenta de métrica como prometheus
- [ ] Criar dashboards do grafana
- [x] Total geral de votos / total de votos por participante / total de votos por hora para produção (user role backstage)
- [ ] Conferir os testes unitários
- [x] Encerrar votação
