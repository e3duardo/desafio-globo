# Desafio Globo Infra

Arquivos de benchmarks, docker e docker-compose

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

## Benchmarks

Foi feito um benchmark da api de votação utilizando a ferramenta [wrk](https://github.com/wg/wrk), vou listar abaixo os parametro utilizados e as mudanças na api para melhorar a performanse.

### Performanse base - sem otimizações

```
wrk -t3 -c500 -d5s -s benchmark.lua http://localhost:3000/votes

Running 5s test @ http://localhost:3000/votes
  3 threads and 500 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   176.13ms  235.70ms   1.61s    97.13%
    Req/Sec    18.85      7.70    40.00     52.69%
  184 requests in 5.07s, 115.10KB read
  Socket errors: connect 0, read 447, write 0, timeout 10
Requests/sec:     36.30
Transfer/sec:     22.71KB
```

após diversos testes em diferentes configurações de threads e connections foi constatado que a média da api como implementada está em 36 requests/s

### Etapa de otimização 1

Foi adicionado sidekiq no projeto e agora a api de votação agenda um job para um voto assíncrono e retorna imediatamente para o usuário

```
wrk -t4 -c500 -d5s -s benchmark.lua http://localhost:3000/votes
Running 5s test @ http://localhost:3000/votes
  4 threads and 500 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    98.24ms  187.49ms   1.51s    97.13%
    Req/Sec    39.82     24.27   101.00     64.13%
  373 requests in 5.05s, 147.45KB read
  Socket errors: connect 0, read 496, write 14, timeout 25
Requests/sec:     73.83
Transfer/sec:     29.19KB
```

após diversos testes em diferentes configurações de threads e connections foi constatado que a média da api como implementada está em 73 requests/s