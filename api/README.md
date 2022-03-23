# Desafio Globo API

Projeto backend feito em Ruby on Rails para realizar a votação no paredão BBB.

## Entidades

- User: usuários dos bastidores (role backstage) ou usuários que votam (role viewer)
- Brother: participantes do reality show
- Survey: paredão do BBB, pode ter uma lista de brother
- Answer: voto de um user para uma survey

<br>

## Dependências

- MySQL
- Redis
- Sidekiq
- RSpec

<br>

## Rodando o projeto

No [readme principal](../README.md) temos instruções para rodar os projetos com docker-compose.

<br>

## Principais rotas

`{{api_url}}` => `http://localhost`

<br>

### Authenticação

`POST` em `{{api_url}}/auth/login`

body:
```json
{
    "email": "{{email}}",
    "password": "{{password}}"
}
```

Exemplo de retorno:
```
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDgwNjgwOTZ9.9xpjx2e7frCdMRxUshy4gkLnlFOp-pTUsaVre13S5no",
  "exp": "03-23-2022 20:41",
  "user": {
    "name": "Suzanne Stracke",
    "email": "Leanna_Reichel@example.com"
  }
}
```

---

### Lista de usuários

`GET` em `{{api_url}}/users`

header:

`Authorization: Bearer {{token de um usuário backstage}}` 
<br>

Exemplo de retorno:
```
[
  {
    "id": 1,
    "name": "Domingo Wisoky",
    "email": "Trystan95@example.com",
    "password_digest": "$2a$12$ll/cfbeUpbu89O2tNhJ81eZyHU9LhdZ6oYj84FPTI1kL43uFT.Tl6",
    "role": "backstage",
    "created_at": "2022-03-23T00:39:34.448Z",
    "updated_at": "2022-03-23T00:39:34.448Z"
  }
]
```
### Criar usuário

`POST` em `{{api_url}}/users`

body:
```json
{
  "user": {
    "name": "{{$randomFullName}}",
    "email": "{{$randomExampleEmail}}",
    "role": "backstage", // backstage ou viewer
    "password": "12345678",
    "password_confirmation": "12345678"
  }
}
```
header:

`Authorization: Bearer {{token de um usuário backstage}}` 
<br>

Exemplo de retorno:
```
{
  "id": 1,
  "name": "Domingo Wisoky",
  "email": "Trystan95@example.com",
  "password_digest": "$2a$12$ll/cfbeUpbu89O2tNhJ81eZyHU9LhdZ6oYj84FPTI1kL43uFT.Tl6",
  "role": "backstage",
  "created_at": "2022-03-23T00:39:34.448Z",
  "updated_at": "2022-03-23T00:39:34.448Z"
}
```

---


### Lista de brothers

`GET` em `{{api_url}}/brothers`


Exemplo de retorno:
```
[
  {
    "id": 1,
    "name": "Arthur Aguiar ",
    "avatar": "/brothers/arthur-aguiar-header.png",
    "gshow_url": "http://gshow.globo.com/artistas/arthur-aguiar",
    "status": "regular",
    "created_at": "2022-03-22T22:50:35.985Z",
    "updated_at": "2022-03-22T22:50:35.985Z"
  }
]
```
### Criar brother

`POST` em `{{api_url}}/brothers`

body:
```json
{
  "brother": {
    "name": "{{$randomFullName}}",
    "avatar": "{{$randomPeopleImage}}",
    "gshow_url": "{{$randomUrl}}",
    "status": "regular"
  }
}
```

header:

`Authorization: Bearer {{token de um usuário backstage}}` 
<br>

Exemplo de retorno:
```
{
  "id": 22,
  "name": "Brittany Bogisich",
  "avatar": "http://placeimg.com/640/480/people",
  "gshow_url": null,
  "status": "regular",
  "created_at": "2022-03-23T00:45:26.420Z",
  "updated_at": "2022-03-23T00:45:26.420Z"
}
```

---

### Lista de paredões

`GET` em `{{api_url}}/surveys`


Exemplo de retorno:
```
[
  {
    "id": 1,
    "date": "2022-03-22",
    "status": "active",
    "brother_out_id": null,
    "created_at": "2022-03-22T23:23:08.784Z",
    "updated_at": "2022-03-22T23:23:08.784Z"
  }
]
```
### Criar paredão

`POST` em `{{api_url}}/surveys`

body:
```json
{
  "survey": {
    "date": "2020-04-04",
    "brothers_ids": [
      1,
      2
    ]
  }
}
```

header:

`Authorization: Bearer {{token de um usuário backstage}}` 
<br>

Exemplo de retorno:
```
{
  "id": 2,
  "date": "2020-04-04",
  "status": "created",
  "brother_out_id": null,
  "created_at": "2022-03-23T00:47:23.894Z",
  "updated_at": "2022-03-23T00:47:23.894Z"
}
```

### Ativar paredão

`PUT` em `{{api_url}}/surveys/:id`

body:
```json
{
  "status": "active"
}
```

header:

`Authorization: Bearer {{token de um usuário backstage}}` 
<br>

Exemplo de retorno:
```
{
  "status": "active",
  "id": 1,
  "date": "2022-03-22",
  "brother_out_id": null,
  "created_at": "2022-03-22T23:23:08.784Z",
  "updated_at": "2022-03-22T23:23:08.784Z"
}
```

---

### Votar

`PUT` em `{{api_url}}/votes`

body:
```json
{
  "brother_id": 1
}
```

header:

`Authorization: Bearer {{token de um usuário viewer}}` 
<br>
