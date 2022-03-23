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