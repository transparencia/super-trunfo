# Super Trunfo

Esse jogo foi criado por [Bernard De Luna](http://github.com/bernarddeluna), [João Batista Neto](http://github.com/netojoaobatista) e [Zeno Rocha](http://github.com/zenorocha), utilizando dados abertos cedidos pelo governo brasileiro com o intuito de compartilhar o conhecimento da nossa política de uma forma mais divertida e interativa.

* [Apresentação do case na Conferência da W3C](http://www.slideshare.net/zenorocha/slides-14815770)
* [Entrevista de Zeno Rocha para OD4D](http://soundcloud.com/od4d/zeno-rocha)

## Qual o propósito do projeto?

Nós não queremos de maneira nenhuma classificar ou julgar um candidato X como melhor do que um candidato Y. O que queremos é conscientizar o eleitor sobre os pontos fortes e pontos fracos de cada um dos candidatos.

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

## Por que quando eu seleciono o atributo "Projetos aprovados" quem ganha é quem tem o maior valor?

Porque nós consideramos que quanto maior o número de projetos aprovados melhor.

## Por que quando eu seleciono o atributo "Projetos vetados" quem ganha é quem tem o menor valor?

Porque nós considerados que quanto menor o número de projetos vetados melhor.

## Por que quando eu seleciono o atributo "Tem processos" quem ganha é quem tem o valor "NÃO"?

Porque nós considerados que é melhor aquele que não possui processo judicial do que aquele que tem.

## Por que quando eu seleciono o atributo "Quantidade de votos" quem ganha é quem tem o maior valor?

Porque nós consideramos que quanto maior o número de votos, mais popular é o candidato.

## Vocês tem direito de imagem dos políticos?

Os políticos em questão são figuras públicas, por opção própria. Desta forma, a menção a seus nomes e cargos não se constitui em qualquer violação de direito.