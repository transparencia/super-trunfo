<?php
namespace SuperTrunfo\Entity;

class Politician
{
    public $id;
    public $nome;
    public $nomeReal;
    public $numero;
    public $cargo;
    public $foto;
    public $partido;
    public $coligacao;
    public $projetosAprovados = '0';
    public $projetosVetados = '0';
    public $temProcessos = 'não';
    public $quantidadeVotos;
    public $superTrunfo = false;
    public $bio;
    public $resultado;
    public $presencas = 0;
    public $faltas;
}