<h1>Angular Deck Builder</h1>

<h2>Descrição</h2>
<p>Este é um projeto desenvolvido utilizando Angular 18 com suporte das seguintes bibliotecas e ferramentas:</p>
<ul>
  <li><strong>NGXS</strong> para gerenciamento de estados</li>
  <li><strong>Tailwind CSS</strong> para estilização</li>
  <li><strong>pokemon-tcg-sdk-typescript</strong> para tipagens</li>
  <li><strong>@angular/cdk</strong> para implementação do virtual scroll na tela de montagem do deck</li>
</ul>
<p>A biblioteca Infragistics foi considerada, mas não utilizada devido à extrema lentidão na compilação da aplicação em ambiente de desenvolvimento, onde o tempo de compilação foi de 0.1 milissegundos para mais de 7 segundos a cada alteração feita.</p>

<h2>Funcionalidades Implementadas</h2>

<h3>Gerenciamento de Baralhos</h3>
<ul>
  <li>O usuário pode ver seus baralhos</li>
  <li>O usuário pode criar um novo baralho</li>
  <li>O usuário pode remover um baralho</li>
  <li>O usuário pode editar um baralho</li>
  <li>O usuário pode clicar num baralho para visualizar seus detalhes</li>
</ul>

<h3>Criação de um Baralho</h3>
<ul>
  <li>O usuário pode colocar um nome no seu baralho</li>
  <li>O usuário pode inserir cartas no baralho</li>
  <li>O baralho deve ter no mínimo 24 cartas e no máximo 60 cartas</li>
  <li>Só podem ter 4 cartas com o mesmo nome no baralho (nome, não ID)</li>
  <li>Após salvar o baralho, o usuário é redirecionado para a página de lista de baralhos atualizada</li>
  <li>O baralho será salvo apenas em memória</li>
</ul>

<h3>Detalhes do Baralho</h3>
<ul>
  <li>O usuário consegue ver quantos pokémons e cartas de treinador existem no baralho (atributo supertype)</li>
  <li>O usuário consegue ver de quantas cores é o baralho, quantos types únicos existem no baralho</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>Angular 18</strong>: Framework principal para o desenvolvimento da aplicação</li>
  <li><strong>NGXS</strong>: Gerenciamento de estado</li>
  <li><strong>Tailwind CSS</strong>: Estilização</li>
  <li><strong>pokemon-tcg-sdk-typescript</strong>: Tipagens para cartas Pokémon</li>
  <li><strong>@angular/cdk</strong>: Virtual scroll na tela de montagem do deck</li>
</ul>

<h2>Detalhes Técnicos</h2>
<ul>
  <li>Utilização das novas diretivas <code>@if</code>, <code>@for</code>, <code>@let</code></li>
  <li>Utilização de signals e computed signals para inputs e outputs</li>
  <li>Implementação de standalone components</li>
  <li>Navegação com lazy load dos componentes</li>
</ul>

<h2>Instalação e Execução</h2>
<p>Para rodar este projeto em sua máquina local, siga os passos abaixo:</p>
<ol>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/EduAraujoLima/front-edu</code></pre>
  </li>
  <li>Navegue até o diretório do projeto:
    <pre><code>cd angular-deck-builder</code></pre>
  </li>
  <li>Instale as dependências:
    <pre><code>npm install</code></pre>
  </li>
  <li>Inicie o servidor de desenvolvimento:
    <pre><code>ng serve</code></pre>
  </li>
  <li>Abra o navegador e acesse:
    <pre><code>http://localhost:4200</code></pre>
  </li>
</ol>
