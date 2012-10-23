<?php
require 'bootstrap.php';

use SuperTrunfo\SuperTrunfo;

$states = array(
    'Acre' => 'candidatos-rio-branco-ac',
    'Alagoas' => 'candidatos-maceio-al',
    'Amazonas' => 'candidatos-manaus-am',
    'Amapá' => 'candidatos-macapa-ap',
    'Bahia' => 'candidatos-salvador-ba',
    'Ceará' => 'candidatos-fortaleza-ce',
    'Espírito Santo' => 'candidatos-vitoria-es',
    'Goiás' => 'candidatos-goiania-go',
    'Maranhão' => 'candidatos-sao-luis-ma',
    'Minas Gerais' => 'candidatos-belo-horizonte-mg',
    'Mato Grosso' => 'candidatos-cuiaba-mt',
    'Mato Grosso do Sul' => 'candidatos-campo-grande-ms',
    'Pará' => 'candidatos-belem-pa',
    'Paraíba' => 'candidatos-joao-pessoa-pb',
    'Paraná' => 'candidatos-curitiba-pr',
    'Pernambuco' => 'candidatos-recife-pe',
    'Piauí' => 'candidatos-teresina-pi',
    'Rio de Janeiro' => 'candidatos-rio-de-janeiro-rj',
    'Rio Grande do Norte' => 'candidatos-natal-rn',
    'Rondônia' => 'candidatos-porto-velho-ro',
    'Roraima' => 'candidatos-boa-vista-rr',
    'Rio Grande do Sul' => 'candidatos-porto-alegre-rs',
    'Santa Catarina' => 'candidatos-florianopolis-sc',
    'São Paulo' => 'candidatos-sao-paulo-sp',
    'Sergipe' => 'candidatos-aracaju-se',
    'Tocantins' => 'candidatos-palmas-to'
);

foreach ($states as $state => $path) {
    $superTrunfo = new SuperTrunfo();
    $superTrunfo->setPath($path);
    $superTrunfo->saveAllPoliticiansTo('../public/data');
    $superTrunfo->saveCardsTo('../public/data');
}