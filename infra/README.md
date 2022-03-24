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

Foi feito um benchmark da api de votação utilizando a ferramenta [wrk](https://github.com/wg/wrk), vou listar abaixo os parametro utilizados e as mudanças na api para melhorar a performance.

### Performance base - sem otimizações

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

### Etapa de otimização 2

Foi identificado que mesmo com sidekiq e com voto assíncrono, ainda estava fazendo uma request síncrona para o banco para validar o usuário / token

```
wrk -t4 -c500 -d5s -s benchmark.lua http://localhost:3000/votes
Running 5s test @ http://localhost:3000/votes
  4 threads and 500 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    90.92ms  219.11ms   1.86s    96.61%
    Req/Sec    73.17     32.45   120.00     61.90%
  472 requests in 5.09s, 186.59KB read
  Socket errors: connect 0, read 543, write 0, timeout 30
Requests/sec:     92.77
Transfer/sec:     36.67KB
```

após diversos testes em diferentes configurações de threads e connections foi constatado que a média da api como implementada está em 92 requests/s

### Etapa de otimização 2

Foi identificado que mesmo com sidekiq e com voto assíncrono, ainda estava fazendo uma request síncrona para o banco para validar o usuário / token

```
wrk -t4 -c500 -d5s -s benchmark.lua http://localhost:3000/votes
Running 5s test @ http://localhost:3000/votes
  4 threads and 500 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    90.92ms  219.11ms   1.86s    96.61%
    Req/Sec    73.17     32.45   120.00     61.90%
  472 requests in 5.09s, 186.59KB read
  Socket errors: connect 0, read 543, write 0, timeout 30
Requests/sec:     92.77
Transfer/sec:     36.67KB
```

após diversos testes em diferentes configurações de threads e connections foi constatado que a média da api como implementada está em 92 requests/s


### Etapa de otimização 3

Iniciando o puma com o comando `PORT=3000 RAILS_ENV=production bundle exec puma -C config/puma.rb`, foi também configurado para acessar o banco de desenvolvimento

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

após diversos testes em diferentes configurações de threads e connections foi constatado que a média da api como implementada está em 160 requests/s


### Etapa de otimização 4

Tentando trocar o Puma pelo Unicorn, continuou nas mesmas médias anteriores, por isso nem salvei o resultado.


----

### Etapa de otimização 5 - após horário de entrega do teste

Rodando a aplicação fora do docker foi possível chegar na marca dos 1000 requests/s, para isto foi necessário: 
- rodar a aplicação com RAILS_ENV=production fora do docker
- configurar o puma para 10 threads e 10 workers

O número final ficou assim:

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

E usando RAILS_ENV=development denovo

```
Running 10s test @ http://127.0.0.1:3000/votes
  10 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   134.03ms  175.25ms   1.70s    93.36%
    Req/Sec   108.60     27.01   181.00     72.60%
  10122 requests in 10.06s, 3.89MB read
Requests/sec:   1006.20
Transfer/sec:    396.07KB
```