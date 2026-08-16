# Ash do Código — Pokédex GraphQL

Uma Pokédex responsiva construída com React, TypeScript, GraphQL e Apollo Client.

> Este projeto nasceu em **janeiro de 2024 como teste técnico para uma vaga júnior**. Em 2026, ele foi revisitado para registrar evolução técnica: o histórico original foi preservado no Git e a aplicação recebeu uma reconstrução focada em arquitetura, funcionalidades completas, responsividade e experiência do usuário.

## O que a aplicação faz

- lista os 151 Pokémon da primeira geração usando a PokéAPI GraphQL;
- pesquisa por nome ou número;
- filtra por tipo e habilidade;
- ordena por número ou nome;
- abre detalhes sem perder o contexto da listagem;
- exibe tipos, habilidades, altura, peso e experiência base;
- permite favoritar Pokémon;
- persiste favoritos no `localStorage`;
- trata estados de carregamento, erro e resultado vazio;
- funciona em desktop e mobile.

## Stack

- React 18
- TypeScript
- Vite
- Apollo Client
- GraphQL
- React Router
- React Hook Form
- Tailwind CSS
- React Icons

## Arquitetura atual

A versão de 2024 tentava usar ao mesmo tempo `useQuery`, uma camada de `service` e uma camada de `repository`. Isso criava dois caminhos diferentes para acessar os mesmos dados e deixava a arquitetura difícil de defender para o tamanho do projeto.

Na revisão de 2026, a regra ficou simples:

```text
UI React
   ↓
Apollo Client
   ↓
Queries GraphQL
   ↓
PokéAPI
```

As **reactive vars do Apollo** ficam apenas para pequenos estados globais da interface, como o Pokémon selecionado e a lista de IDs favoritos.

## Principais melhorias da revisão 2026

### Dados

- queries GraphQL corrigidas e padronizadas;
- consulta por ID usando a query correta;
- remoção da duplicação entre service/repository e `useQuery`;
- consulta de detalhes ignorada enquanto não há Pokémon selecionado.

### Funcionalidades

- filtros realmente funcionais;
- busca por nome e número;
- favoritos completos;
- persistência dos favoritos;
- ordenação dos resultados;
- estados de vazio e erro.

### Interface

- redesign completo;
- navegação responsiva com React Router;
- cards adaptados para celular;
- painel de detalhes responsivo;
- loading states;
- melhor hierarquia visual e acessibilidade básica;
- suporte a `prefers-reduced-motion`.

## Como executar

```bash
git clone https://github.com/andersonjhonatan/PokeDex--Graphl.git
cd PokeDex--Graphl
npm install
npm run dev
```

Para gerar o build de produção:

```bash
npm run build
```

Para validar o lint:

```bash
npm run lint
```

## API

Os dados vêm da API GraphQL da PokéAPI:

```text
https://beta.pokeapi.co/graphql/v1beta
```

## Por que manter a história do projeto?

A intenção desta revisão não é fingir que o código de 2024 nunca existiu. Para um projeto de portfólio, considero mais valioso mostrar **como eu pensava no início da carreira e como resolveria o mesmo problema hoje**.

O histórico de commits anterior à reconstrução continua disponível no repositório.

## Autor

**Anderson Jhonatan dos Santos**  
Full Stack Developer · CEO da K2 Tech

- GitHub: `andersonjhonatan`
- Portfólio: `portfolio-seven-flax-47.vercel.app`

---

Pokémon e os nomes/personagens relacionados pertencem aos seus respectivos proprietários. Este é um projeto educacional e de portfólio, sem vínculo oficial com a franquia.
