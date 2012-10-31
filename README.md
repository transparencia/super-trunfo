# Super Trunfo

Jogo que utiliza dados abertos cedidos pelo governo brasileiro com o intuito de compartilhar o conhecimento da nossa política de uma forma mais divertida e interativa. 

[Roadmap do projeto.](https://github.com/transparencia/super-trunfo/wiki/Roadmap)

### Na mídia

* [Apresentação do case na Conferência da W3C](http://www.slideshare.net/zenorocha/slides-14815770)
* [Entrevista de Zeno Rocha para OD4D](http://soundcloud.com/od4d/zeno-rocha)
* [Jovens criam versão de Super Trunfo para debater política com diversão](http://fernandovieri.com/2012/10/22/jovens-recriam-versao-de-super-trunfo-para-debater-politica-com-diversao-2/)
* [Super Trunfo Político????? WTF?](http://amomarketing.com.br/super-trunfo-politico-wtf-via-savicentini/) 
* [Super Trunfo Político vence disputa no Hackaton InterCon 2012](http://imasters.com.br/noticia/super-trunfo-politico-vence-disputa-no-hackaton-intercon-2012)

### Para imprensa

* [Release completo](https://github.com/transparencia/super-trunfo/blob/dev/release/1.pdf?raw=true)
* [Release alternativo](https://github.com/transparencia/super-trunfo/blob/dev/release/2.pdf?raw=true)


## Como rodar o projeto localmente?

1. Vá até o arquivo `public/index.html`
2. Remova o script `<script src="js/facebook.js"></script>`
3. Adicione o script `<script src="js/local.js"></script>`

## Qual o propósito do projeto?

Esse jogo foi criado para incentivar a transparência e colaboração em cima dos dados abertos, mostrando o que é possível fazer com as informações cedidas pelo governo brasileiro, seguindo as definições do W3C.

É importante ressaltar que nós não queremos de maneira nenhuma classificar ou julgar um candidato X como melhor do que um candidato Y. O que queremos é conscientizar o eleitor sobre os pontos fortes e pontos fracos de cada um dos candidatos.

Desde a Lei da Transparência(131/2009) em 2010, o Brasil vem se destacando quanto a obrigação dos estados a documentarem sua contabilidade na internet, e assim resolvemos criar um jogo famoso que consome, através de um webservice, os dados abertos do primeiro turno das eleições de 2012.

Qualquer informação, divulgação ou dúvidas sobre o Super Trunfo - Política de São Paulo, entre em contato através do email [supertrunfopolitica@gmail.com](mailto:supertrunfopolitica@gmail.com).

## Quem está por trás disso?

* [Bernard De Luna](http://github.com/bernarddeluna)
* [João Batista Neto](http://github.com/netojoaobatista)
* [Zeno Rocha](http://github.com/zenorocha)

## De onde foram obtidos os dados?

Os dados são obtidos primeiro do site [eleicoes2012.info](http://www.eleicoes2012.info/). Depois processamos toda a lista de candidatos obtidos e ordenamos por ordem alfabética. Então consultamos dados básicos do TSE (Tribunal Superior Eleitoral) como nome, número do partido e número de votos. Com o nome de batismo, fazemos uma busca no site [excelencias.org.br](http://excelencias.org.br) que contém os dados de projetos, processos, frequência, etc. Esses dados são disponibilizados por diversas casas como Tribunais de Justiça, Tribunal de Contas, Tribunais Eleitorais, Tribunais Superiores.

## Quais foram as tecnologias usadas?

Toda obtenção dos dados foram feitos a partir de crawlers escritos em PHP. Já para a interação do jogador com o jogo foram utilizados HTML, CSS e JavaScript.

## Quais são as regras do jogo?

As 36 cartas são distribuídas em número igual para cada um dos jogadores. Cada jogador só poderá ver a primeira carta da pilha. As cartas possuem uma série de informações, tais como: número de projetos aprovados, número de projetos vetados, presença ou falta de processos judiciais e a quantidade de votos que o candidato obteve no primeiro turno das eleições de 2012. Com essas informações que cada um vai jogar.

### Como jogar

Escolha, dentre as informações contidas em sua carta, aquela que você julga ser capaz de superar a que se encontra nas mãos do seu adversário, por exemplo: você escolhe a informação número de projetos aprovados, imediatamente o outro jogador exibe a primeira carta de sua pilha e confere o valor da informação. Quem tiver o valor mais alto, ganha a carta do adversário. O próximo a jogar será o que venceu a jogada anterior. Assim prossegue o jogo, até que um dos participantes fique com todas as cartas do baralho, vencendo a partida.

### Carta Super Trunfo

A carta Super Trunfo é embaralhada com as demais. Seus dados técnicos superam todos os dados de cartas marcadas com B/C/D. Assim, se você tiver uma carta Super Trunfo, sua chance de ganhar de seus adversários é muito grande. Você só vai perder se um deles lhe apresentar uma carta marcada com A (1A, 2A, 3A, 4A, etc.).

## Qual candidato é a carta Super Trunfo?

Em busca de tornar o jogo mais imparcial possível, a carta Super Trunfo é o atual prefeito do município, independente de ser um candidato nas eleições de 2012 ou não.

## Quem são as cartas marcadas com A?

São os 9 candidatos mais bem votados no primeiro turno.

##  Por que só 36 candidatos participam do jogo?

Para garantir uma jogabilidade agradável não foi possível incluir todos os candidatos, portanto selecionamos os 35 candidatos mais bem votados no primeiro turno e o atual prefeito.

## Por que só candidatos de São Paulo?

Esse foi o objetivo para o lançamento do jogo, agora estamos trabalhando para que você possa jogar com candidatos de qualquer cidade do país.

## O que são "Projetos aprovados"?

Projetos aprovados são proposições feitas no ano de 2012 pelos políticos que, após apresentação em sessão, foram aprovados pela casa virando lei no município.

O game considera que quanto **maior** o número de projetos aprovados **melhor**.

## O que são "Projetos vetados"?

Projetos vetados são proposições feitas no ano de 2012 pelos políticos que, após apresentação em sessão, não tiveram votos suficientes para virar lei.

O game considera que quanto **menor** o número de projetos vetados **melhor**.

## O que é "Escolaridade"?

Escolaridade é o nível de ensino que o candidato possui. 

O game considera que quanto **maior** o nível de escolaridade **melhor**.

## O que é "Quantidade de votos"?

Quantidade de votos é o número de votos que os candidatos na eleição de 2012 obtiveram. 

Para algumas cartas Super Trunfo que não são candidatos na eleição de 2012, são pegos os votos que os mesmos obtiveram na eleição de 2008.

O game considera que quanto **maior** o número de votos **melhor**.

## Vocês tem direito de imagem dos políticos?

Os políticos em questão são figuras públicas, por opção própria. Desta forma, a menção a seus nomes e cargos não se constitui em qualquer violação de direito.