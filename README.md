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

## Benchmarks


<br>

## Funcionalidades
 - 

<br>

## O que falta implementar

- [ ] Tela de cadastrar usuário
- [ ] Panorama percentual de votos até o momento, após votar
- [ ] Catalogar os benchmarks feitos
- [ ] Utilizar uma ferramenta de métrica como prometheus
- [ ] Total geral de votos / total de votos por participante / total de votos por hora para produção (user role backstage)
- [ ] Conferir os testes unitários
- [ ] Encerrar votação
