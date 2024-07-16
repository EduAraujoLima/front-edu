# PokeTcg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Tecnologias Utilizadas
Angular 18: O framework base para a construção da aplicação.
NGXS: Biblioteca de gerenciamento de estado para manter os dados do aplicativo consistentes.
Tailwind CSS: Biblioteca de CSS para estilização rápida e responsiva.
pokemon-tcg-sdk-typescript: Biblioteca TypeScript para tipagem precisa de cartas Pokémon.
@angular/cdk: Biblioteca Angular para implementar rolagem virtual na tela de montagem do deck.
Recursos
Visualização de decks:
O usuário pode ver uma lista de seus decks salvos.
Criação de decks:
O usuário pode criar novos decks com nome personalizado e adicionar cartas.
Edição de decks:
O usuário pode editar decks existentes, alterando o nome, adicionando ou removendo cartas.
Remoção de decks:
Decks podem ser removidos permanentemente.
Detalhes do deck:
Cada deck mostra informações detalhadas, como número de cartas de Pokémon e treinador, cores e tipos presentes.
Validação de decks:
A aplicação garante que os decks sigam as regras do jogo Pokémon TCG, como o número mínimo e máximo de cartas, e a quantidade máxima de cartas com o mesmo nome.
Navegação suave:
A navegação entre as telas é fluida e rápida, graças ao lazy loading de componentes.
Implementações Detalhadas
Diretivas Angular:
As novas diretivas @if, @for e @let do Angular 18 foram utilizadas para melhorar a legibilidade e a reutilização do código.
Signals e Computed Signals:
Signals para inputs e outputs foram usados para gerenciar o fluxo de dados reativamente. Computed signals foram utilizados para derivar informações a partir de outros dados do aplicativo.
Componentes Standalone:
Os componentes da aplicação foram criados como standalone, facilitando o teste e a reutilização.
Lazy Loading:
Os componentes são carregados de forma preguiçosa, otimizando o desempenho da aplicação.
Observações
Infragistics: A biblioteca Infragistics foi testada, mas devido à lentidão extrema na compilação (de 0.1 ms para mais de 7 segundos por alteração), foi substituída por outras soluções.
Armazenamento de dados: Os decks são armazenados apenas na memória do navegador. A persistência de dados em um banco de dados pode ser implementada posteriormente.
Começando
Para executar a aplicação, siga estas etapas:

Clone o repositório do projeto.
Instale as dependências com npm install.
Execute ng serve para iniciar a aplicação em um servidor de desenvolvimento local.
Acesse a aplicação em http://localhost:4200.
Contribuições
Sua contribuição para este projeto é bem-vinda! Se você tiver sugestões de melhorias, correções de bugs ou novas ideias, sinta-se à vontade para abrir um pull request.
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
