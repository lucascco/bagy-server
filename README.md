# NodeJs Bagy Server
![Bagy Logo](https://sites.bagy.com.br/wp-content/uploads/2020/02/logo-bagy-OPTIMIZED-GT-METRIX-min.png)
## Arquitetura

A arquitetura do projeto segue alguns principios do DDD, no qual os arquivos são organizados por dominio da aplicação. Eu busquei desacoplar a camada de infra da camada de domínio para possibilitar uma maior flexibilidade em relação as dependecias de infra do projeto.

## Responsabilidades

Tipo | Pasta | Responsabilidade
------------ | -------- | -------------
Resolver | module/(name_module)/schemas | Mutations e Queries do graphql
Repository | modules/(name_module)/infra/typeorm/repository | Manipulação do banco com o o typeorm
Interface Repository | modules/(name_module)/repository | Cria um interface dos repositorios para comunicação com os servers.
Entity | modules/(name_module)/entities | Modelos da reporesentação das entidades no banco de dados
Services | modules/(name_module)/services | Executa um bound de ações com regras de negócios especificas. ex.: Registar Compra
Types Input | modules/(name_module)/schemas/types-input | Define um DTO para envio de dados para uma Mutation no graphql
Fake | modules/(name_module)/**/fakes | Define classes fakes para execucão de testes

##SOLID
Busquei atender alguns principios do SOLID como Principio da Responsabilidade Única e o Princípio da Substituição de Liskov na dependecia dos services com os repositorios.

## Executando o projeto

### Docker

`git clone https://github.com/lucascco/bagy-server.git`

`cd bagy-server`

- Este comando pode demorar um tempo
`docker build -t lucascco/bagy-server . `

`docker run -p 4000:8080 -d lucascco/bagy-server`

Agora é só acessar http://localhost:4000/graphql do seu navegador.

### Sem Docker

`git clone https://github.com/lucascco/bagy-server.git`

`cd bagy-server`

`yarn` or `npm install`

`yarn dev:server` or `npm dev:server`

Agora é só acessar http://localhost:4000/graphql do seu navegador.

## Testes Unitários

Foquei os testes unitários no service de Order, pois concentra o core da aplicação, com a responsabilidade de registrar uma compra para um usuário e enivar um email.

Para executar os testes

`yarn test`
