<?php
use SuperTrunfo\Entity\Politician;

require 'bootstrap.php';

use SuperTrunfo\SuperTrunfo;

$states = array(
    'Ceará' => array('path' => 'candidatos-fortaleza-ce'),
    'Paraíba' => array('path' => 'candidatos-joao-pessoa-pb'),
    'Pernambuco' => array('path' => 'candidatos-recife-pe'),
    'Rio de Janeiro' => array('path' => 'candidatos-rio-de-janeiro-rj'),
    'Santa Catarina' => array('path' => 'candidatos-florianopolis-sc'),	
    'São Paulo' => array('path' => 'candidatos-sao-paulo-sp'),
	'Rio Grande do Sul' => array('path' => 'candidatos-porto-alegre-rs'),
	'Minas Gerais' => array('path' => 'candidatos-belo-horizonte-mg')
);

$states['São Paulo']['Super Trunfo'] = new Politician();
$states['São Paulo']['Super Trunfo']->nome= 'Gilberto Kassab';
$states['São Paulo']['Super Trunfo']->nomeReal = 'Gilberto Kassab';
$states['São Paulo']['Super Trunfo']->cargo = 'Prefeito';
$states['São Paulo']['Super Trunfo']->foto = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Gilberto_Kassab_%282007%29.jpg/250px-Gilberto_Kassab_%282007%29.jpg';
$states['São Paulo']['Super Trunfo']->partido = 'PSD';
$states['São Paulo']['Super Trunfo']->quantidadeVotos = 3790558;
$states['São Paulo']['Super Trunfo']->superTrunfo = true;
$states['São Paulo']['Super Trunfo']->escolaridade = 'Não informado';
$states['São Paulo']['Super Trunfo']->resultado = 'ELEITO';

$states['Ceará']['Super Trunfo'] = new Politician();
$states['Ceará']['Super Trunfo']->nome = 'Luizianne Lins';
$states['Ceará']['Super Trunfo']->nomeReal = 'Luizianne Lins';
$states['Ceará']['Super Trunfo']->cargo = 'Prefeito';
$states['Ceará']['Super Trunfo']->foto = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Luizianne_Lins.jpg/210px-Luizianne_Lins.jpg';
$states['Ceará']['Super Trunfo']->partido = 'PT';
$states['Ceará']['Super Trunfo']->quantidadeVotos = 593778;
$states['Ceará']['Super Trunfo']->superTrunfo = true;
$states['Ceará']['Super Trunfo']->escolaridade = 'Não informado';
$states['Ceará']['Super Trunfo']->resultado = 'ELEITO';

$states['Paraíba']['Super Trunfo'] = new Politician();
$states['Paraíba']['Super Trunfo']->nome = 'Luciano Agra';
$states['Paraíba']['Super Trunfo']->nomeReal = 'Luciano Agra';
$states['Paraíba']['Super Trunfo']->cargo = 'Prefeito';
$states['Paraíba']['Super Trunfo']->foto = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/LucianoAgra.jpg/200px-LucianoAgra.jpg';
$states['Paraíba']['Super Trunfo']->partido = 'PSB';
$states['Paraíba']['Super Trunfo']->temProcessos = 'não';
$states['Paraíba']['Super Trunfo']->quantidadeVotos = 262041;
$states['Paraíba']['Super Trunfo']->superTrunfo = true;
$states['Paraíba']['Super Trunfo']->escolaridade = 'Não informado';
$states['Paraíba']['Super Trunfo']->resultado = 'ELEITO';

$states['Pernambuco']['Super Trunfo'] = new Politician();
$states['Pernambuco']['Super Trunfo']->id = '8B';
$states['Pernambuco']['Super Trunfo']->nome = 'João da Costa Bezerra';
$states['Pernambuco']['Super Trunfo']->nomeReal = 'João da Costa Bezerra';
$states['Pernambuco']['Super Trunfo']->cargo = 'Prefeito';
$states['Pernambuco']['Super Trunfo']->foto = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jo%C3%A3o_da_Costa.jpeg/200px-Jo%C3%A3o_da_Costa.jpeg';
$states['Pernambuco']['Super Trunfo']->partido = 'PT';
$states['Pernambuco']['Super Trunfo']->temProcessos = 'não';
$states['Pernambuco']['Super Trunfo']->quantidadeVotos = 432707;
$states['Pernambuco']['Super Trunfo']->superTrunfo = true;
$states['Pernambuco']['Super Trunfo']->escolaridade = 'Não informado';
$states['Pernambuco']['Super Trunfo']->resultado = 'ELEITO';

$states['Rio de Janeiro']['Super Trunfo'] = new Politician();
$states['Rio de Janeiro']['Super Trunfo']->nome = 'Eduardo Paes';
$states['Rio de Janeiro']['Super Trunfo']->nomeReal = 'Eduardo da Costa Paes';
$states['Rio de Janeiro']['Super Trunfo']->cargo = 'Prefeito';
$states['Rio de Janeiro']['Super Trunfo']->foto = 'http://static.eleicoes2012.info/fotos/5c/ed/eduardo-paes.jpg';
$states['Rio de Janeiro']['Super Trunfo']->partido = 'PMDB';
$states['Rio de Janeiro']['Super Trunfo']->temProcessos = 'não';
$states['Rio de Janeiro']['Super Trunfo']->quantidadeVotos = 2097733;
$states['Rio de Janeiro']['Super Trunfo']->superTrunfo = true;
$states['Rio de Janeiro']['Super Trunfo']->bio = '<p><span class=\'legenda\'>Nome:</span> Eduardo da Costa Paes<br><span class=\'legenda\'>Idade:</span> 42 anos (14/11/1969)<br><span class=\'legenda\'>Naturalidade:</span> Rio de Janeiro/RJ<br><span class=\'legenda\'>Estado Civil:</span> Casado(A)<br><span class=\'legenda\'>Ocupa&ccedil;&atilde;o:</span> Prefeito<br><span class=\'legenda\'>Escolaridade:</span> Superior Completo<br></p>\n';
$states['Rio de Janeiro']['Super Trunfo']->resultado = 'ELEITO';

$states['Santa Catarina']['Super Trunfo'] = new Politician();
$states['Santa Catarina']['Super Trunfo']->nome = 'Dário Berger';
$states['Santa Catarina']['Super Trunfo']->nomeReal = 'Dário Berger';
$states['Santa Catarina']['Super Trunfo']->cargo = 'Prefeito';
$states['Santa Catarina']['Super Trunfo']->foto = 'http://cl.ly/image/1e0H0M0K1Q0q/XJ7MS4XJ.jpg';
$states['Santa Catarina']['Super Trunfo']->partido = 'PMDB';
$states['Santa Catarina']['Super Trunfo']->temProcessos = 'não';
$states['Santa Catarina']['Super Trunfo']->quantidadeVotos = 129969;
$states['Santa Catarina']['Super Trunfo']->superTrunfo = true;
$states['Santa Catarina']['Super Trunfo']->escolaridade = 'Não informado';
$states['Santa Catarina']['Super Trunfo']->resultado = 'ELEITO';

$states['Rio Grande do Sul']['Super Trunfo'] = new Politician();
$states['Rio Grande do Sul']['Super Trunfo']->nome = 'Fortunati';
$states['Rio Grande do Sul']['Super Trunfo']->nomeReal = 'José Alberto Reus Fortunati';
$states['Rio Grande do Sul']['Super Trunfo']->cargo = 'Prefeito';
$states['Rio Grande do Sul']['Super Trunfo']->foto = 'http://static.eleicoes2012.info/fotos/7f/fo/fortunati.jpg';
$states['Rio Grande do Sul']['Super Trunfo']->partido = 'PDT';
$states['Rio Grande do Sul']['Super Trunfo']->temProcessos = 'não';
$states['Rio Grande do Sul']['Super Trunfo']->quantidadeVotos = 517969;
$states['Rio Grande do Sul']['Super Trunfo']->superTrunfo = true;
$states['Rio Grande do Sul']['Super Trunfo']->bio = '<p><span class="legenda">Nome:</span> Jos&eacute; Alberto Reus Fortunati<br><span class="legenda">Idade:</span> 56 anos (24/10/1955)<br><span class="legenda">Naturalidade:</span> Flores da Cunha/RS<br><span class="legenda">Estado Civil:</span> Casado(A)<br><span class="legenda">Ocupa&ccedil;&atilde;o:</span> Prefeito<br><span class="legenda">Escolaridade:</span> Superior Completo<br></p>';
$states['Rio Grande do Sul']['Super Trunfo']->resultado = 'ELEITO';

$states['Minas Gerais']['Super Trunfo'] = new Politician();
$states['Minas Gerais']['Super Trunfo']->nome = 'Marcio Lacerda';
$states['Minas Gerais']['Super Trunfo']->nomeReal = 'Marcio Araujo de Lacerda';
$states['Minas Gerais']['Super Trunfo']->cargo = 'Prefeito';
$states['Minas Gerais']['Super Trunfo']->foto = 'http://static.eleicoes2012.info/fotos/ca/ma/marcio-lacerda-psb-40.jpg';
$states['Minas Gerais']['Super Trunfo']->partido = 'PSB';
$states['Minas Gerais']['Super Trunfo']->temProcessos = 'sim';
$states['Minas Gerais']['Super Trunfo']->quantidadeVotos = 676215;
$states['Minas Gerais']['Super Trunfo']->superTrunfo = true;
$states['Minas Gerais']['Super Trunfo']->bio = '<p><span class="legenda">Nome:</span> Marcio Araujo de Lacerda<br><span class="legenda">Idade:</span> 66 anos (22/01/1946)<br><span class="legenda">Naturalidade:</span> Leopoldina/MG<br><span class="legenda">Estado Civil:</span> Casado(A)<br><span class="legenda">Ocupa&ccedil;&atilde;o:</span> Prefeito<br><span class="legenda">Escolaridade:</span> Superior Completo<br></p>';
$states['Minas Gerais']['Super Trunfo']->resultado = 'ELEITO';

foreach ($states as $state => $item) {
	printf("\nPath: %s\n", $item['path']);
	
    $superTrunfo = new SuperTrunfo($item['Super Trunfo']);
    $superTrunfo->setPath($item['path']);
    $superTrunfo->saveAllPoliticiansTo('../public/data');
    $superTrunfo->saveCardsTo('../public/data');
}