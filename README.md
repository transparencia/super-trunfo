# Super Trunfo

Jogo que utiliza dados abertos cedidos pelo governo brasileiro com o intuito de compartilhar o conhecimento da nossa política de uma forma mais divertida e interativa.

* [Apresentação do case na Conferência da W3C](http://www.slideshare.net/zenorocha/slides-14815770)
* [Entrevista de Zeno Rocha para OD4D](http://soundcloud.com/od4d/zeno-rocha)
* [Jovens criam versão de Super Trunfo para debater política com diversão](http://fernandovieri.com/2012/10/22/jovens-recriam-versao-de-super-trunfo-para-debater-politica-com-diversao-2/)

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

## Por que quando eu seleciono o atributo "Projetos aprovados" quem ganha é quem tem o maior valor?

Porque nós consideramos que quanto maior o número de projetos aprovados melhor.

## Por que quando eu seleciono o atributo "Projetos vetados" quem ganha é quem tem o menor valor?

Porque nós considerados que quanto menor o número de projetos vetados melhor.

## Por que quando eu seleciono o atributo "Tem processos" quem ganha é quem tem o valor "NÃO"?

Antes de mais nada, é importante deixar claro o motivo de termos utilizado "Tem processos" em vez de "Ficha limpa". Segundo a Lei Complementar nº. 135 de 2010, `Ficha limpa` é uma emenda à Lei Complementar nº. 64 de 1990, ou Lei das Condições de Inelegibilidade, que visa impedir a eleição de candidatos condenados por órgão colegiados a cargos políticos.

Ou seja, para um político ser considerado, sedundo a lei, como "ficha suja", ele **precisa** ter sido condenado com um colegiado (com mais do que 1 juiz). Muitos processos ocorrem em instâncias onde apenas 1 juiz julga o caso. Nesses processos, o acusado pode recorrer a uma instância superior, pedindo a revisão do julgamento anterior.

Ter processo pode significar que, por exemplo, na eleição do ano X o candidato não teve suas contas aprovadas pelo TSE. Mesmo que ele tenha recorrido a uma segunda instância, essa ainda não é composta por um colegiado e, dessa forma, segundo os parâmetros da Lei Complementar nº. 135 de 2010, ele **não é** *ficha suja**.

Deixado claro o significado do termo, é importante deixar claro também que, por ter sido julgado em primeira instância e por ter o direito de poder recorrer da decisão em uma instância superior, apenas os candidatos que "perderam" em instâncias superiores são configurados como **Tem Processos**.

Segundo a ministra do Supremo Tribunal Federal Rosa Weber:

> O homem público, ou que pretende ser público, não se encontra no mesmo patamar de obrigações do cidadão comum no trato da coisa pública. O representante do povo, o detentor de mandato eletivo, subordina-se à moralidade, à probidade, à honestidade e à boa-fé, exigências do ordenamento jurídico e que compõem um mínimo ético, condensado pela lei da Ficha Limpa, através de hipóteses concretas e objetivas de inelegibilidade.

Por esse motivo, decidimos qualificar um político que **não tem processos** como sendo **melhor** que um político que tem processos.

## Por que quando eu seleciono o atributo "Quantidade de votos" quem ganha é quem tem o maior valor?

Porque nós consideramos que quanto maior o número de votos, mais popular é o candidato.

## Vocês tem direito de imagem dos políticos?

Os políticos em questão são figuras públicas, por opção própria. Desta forma, a menção a seus nomes e cargos não se constitui em qualquer violação de direito.