<img src="public/barber-shop-api.png" width="100%">

[![Coverage Status](https://coveralls.io/repos/github/WalanyCosta/barber-shop-api/badge.svg)](https://coveralls.io/github/WalanyCosta/barber-shop-api)
[![Node.js CI](https://github.com/WalanyCosta/barber-shop-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/WalanyCosta/barber-shop-api/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Descrição do Projeto

> Este projeto está repartida em duas partes uma ainda não se começou dar inicio está em stand by que é o app mobile, e essa parte que é backend que tem como finalidade de trabalhar em toda a regra de negocio, se conectar com serviços externo(pagamento, notificações, mensagem), a base de dados, libs entre outros mais. Usando melhor práticas de programação como: BDD, TDD, Arquitetura limpa, CI/CD, SOLID, design patterns, git entre outros, tendo a linguagem javascript para sua implementação em apoio com seu superSet o typescript, nodejs, express, entre outros mais recursos. Para gerencia das tarefas
> ou as atividades está se utilizando notion que tem-se encaixado como uma luva.

### Sobre este projeto

> Esse projeto surgiu devido em consequência de um app mobile que eu queria desenvolver que com react-native (barber-shop) que tem como objetivo ajudar o cliente da barbearia que quisessem marcar um dia e hora na semana, no primordios das implementação já sentia que necessitava de um backend ou API para as regras de negocios, visto que o firebase só fornece o serviço de armazenamento e eu não queria a minha regra de negocios estivesse no meu app por causa caso quisesse implementar o projeto futuramente na web não me desse tanto trabalho então vee que a API seria a melhor opção. Mas também pelo gostinho de desenvolver o backend que é a parte de desenvolvimento que mais se encaixa comigo mesmo não tanto amando ela.

### Links
-   [Documentação da api](http://localhost:5555/api-docs).
_Nota:lembrando que o servidor deve estar rodando_
-   [Notion](#)
-   [API-HOSPEDADA](#)

<p align='center'>🚧A Barber-Shop(API) 🚀 Em construção... 🚧</p>

## Indices

-   [Descrisão do projeto](#descrisão-do-projeto)
-   [Features](#🔨-features)
-   [Começando a usar](#🚀-começando-a-usar)
-   [Tecnologia usada](#🛠️-tecnologia-usada)
-   [Executando testes](#⚙️-executando-os-testes)
-   [Autores](#✒️-autores)
-   [Licença](#📄-licença)
-   [Expressões de gratidão](#🎁-expressões-de-gratidão)

## 🔨 Features

> Aqui temos as rotas desenvolvidas nesse projeto:

-   [x] feat: signUp
-   [x] feat: login
-   [x] feat: buscar todos os servicos
-   [x] feat: buscar por id um serviço
-   [x] feat: buscar todas a categorias
-   [x] feat: buscar por id uma categoria
-   [x] feat: buscar as horas consoante o barbeiro e a data escolhida

**Acessa API por esta url** : https://barber-shop-api.onrender.com/api/

## 🚀 Começando a usar

> Para que esse projeto possa funcionar na sua máquina deve-se cumprir os seguintes requisitos
> e depois seguir passo a passo como instalar o projeto.

### 📋 Pré-requisitos

> Para se ter esse projeto a funcionar deve se ter o [Nodejs](https://nodejs.org/pt-br/download) na sua maquina que vai permitir com que projeto rode na sua maquina, [Git](https://git-scm.com/downloads), conseguir clonar o projeto na sua máquina, [Vscode](https://code.visualstudio.com/download).

### 🔧 instalação do projeto

```bash
 # Primeiro clonar o projeto
    git clone <URL>

 # Acender a pasta
    cd barber-shop-api

 # instalar as dependencias do projeto
    npm install

 # Rodar aplicativo
    npm start:dev

 # Depois scanner o QRcode ou uri para ver o projeto a funcionar
```

## ⚙️ Executando os testes

> Para rodar os testes basta seguir os passos descritos em baixo:

```bash

 # Esse comando permite rodar todos os testes tanto de integração como de unidade
    npm test

 # Esse comando permite rodar teste que em arquivos que mudando
    npm run test:watch

 # Esse comando permite rodar todos teste e mostra o coverage no final
    npm run test:ci

```

## Para poder ver a documentação

> Para rodar os testes basta seguir os passos descritos em baixo:

```bash

 # Esse comando permite rodar todos os testes tanto de integração como de unidade
    npm run start:dev
 # copia o link: 
 http://localhost:5555/api-docs

```

## 🛠️ Tecnologia usada

> Durante as bibliotecas que estão sendo usada para desenvolvimento desta api:

#### Dependencia de desenvolvimento

-   [prisma](https://www.prisma.io/)
-   [jest](https://jestjs.io/)
-   [eslint](https://eslint.org/)
-   [husky](https://github.com/typicode/husky)
-   [typescript](https://www.typescriptlang.org/)
-   [lint-staged](https://github.com/lint-staged/lint-staged)
-   [rimraf](https://www.npmjs.com/package/rimraf)
-   [semantic-release](https://github.com/semantic-release/semantic-release)
-   [supertest](https://www.npmjs.com/package/supertest)
-   [tsx](https://www.npmjs.com/package/tsx)
-   [prisma](https://www.prisma.io/)
-   [git-commit-msg-linter](https://www.npmjs.com/package/git-commit-msg-linter)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [prettier](https://prettier.io/)
-   [mockdate](https://www.npmjs.com/package/mockdate)


#### Dependencia de produção

-   [module-alias](https://www.npmjs.com/package/module-alias)
-   [express](https://expressjs.com/en/starter/installing.html)
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   [jwt](https://github.com/auth0/node-jsonwebtoken)
-   [zod](https://github.com/colinhacks/zod)
-   [swagger-ui-express](https://swagger.io/)
-   [dayjs](https://day.js.org/docs/en/installation/installation)


## ✒️ Autores

> Projeto desenvolvido por Walany da Costa.

## 📄 Licença

> Este projeto está sob a licença MIT [licença](#).

## 🎁 Expressões de gratidão

> Convidou Todas a gente que gostou desse projeto tanto nos aspeto de tecnologia ou a ideias do projeto para contribuir esse
> projeto afim de dar passo maior.
