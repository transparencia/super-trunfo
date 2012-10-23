<?php
namespace SuperTrunfo\Entity;

use SuperTrunfo\Entity\Politician;

class PoliticianSuperTrunfo extends Politician
{
    public function __construct()
    {
        $this->nome = 'Gilberto Kassab';
        $this->nomeReal = 'Gilberto Kassab';
        $this->partido = 'PSD';
        $this->cargo = 'Prefeito';
        $this->fichaLimpa = 'sim';
        $this->foto = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Gilberto_Kassab_%282007%29.jpg/250px-Gilberto_Kassab_%282007%29.jpg';
        $this->numero = '55';
        $this->quantidadeVotos = '3790558';
        $this->projetosAprovados = 0;
        $this->projetosVetados = 0;
    }
}