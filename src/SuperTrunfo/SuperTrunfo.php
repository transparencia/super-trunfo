<?php
namespace SuperTrunfo;

use SuperTrunfo\Entity\PoliticianSuperTrunfo;

use \stdClass;
use \RuntimeException;
use SuperTrunfo\Entity\Politician;
use SuperTrunfo\Eleicoes2012\PoliticianAggregate;
use SuperTrunfo\Excelencias\PoliticianAggregateDecorator;

class SuperTrunfo
{
    private $politicians;

    public function __construct()
    {
        libxml_use_internal_errors(true);
    }

    public function __destruct()
    {
        libxml_get_errors();
        libxml_clear_errors();
    }

    public function getCards()
    {
        $politicians = $this->getPoliticians();

        /**
         * 35 candidatos + prefeito atual => 36 total
         * 4 grupos => A, B, C e D
         * 9 cartas por grupo
         * Cartas A com os 9 mais votados
         * Super Trunfo => B8
         **/
        uasort($politicians, function($a, $b) {
            if ($a->quantidadeVotos == $b->quantidadeVotos) return 0;
            else if ($a->quantidadeVotos > $b->quantidadeVotos) return -1;
            else return 1;
        });

        $politicians = array_slice($politicians, 0, 35);
        $politician = new PoliticianSuperTrunfo();
        $offset = 0;

        foreach (range(65, 68) as $ord) {
            for ($i = 1; $i <= 9; ++$i) {
                if ($ord == 66 && $i == 8) {
                    $part1 = array_slice($politicians, 0, $offset);
                    $part2 = array_slice($politicians, $offset);

                    $politician->id = '8B';
                    $politician->superTrunfo = true;

                    $politicians = array_merge($part1,
                                               array($politician),
                                               $part2);
                    ++$offset;

                    continue;
                }

                $politicians[$offset++]->id = $i . chr($ord);
            }
        }

        return $politicians;
    }

    private function getRealPath($path, $name)
    {
        if (!is_writable($path)) {
            throw new RuntimeException('Sem permissões para gravação em ' . $path);
        }

        if (is_dir($path)) {
            $path = realpath($path) . DIRECTORY_SEPARATOR . $name;
        }

        return $path;
    }

    public function getPoliticians()
    {
        if ($this->politicians === null) {
            $aggregate = new PoliticianAggregate();
            $decorator = new PoliticianAggregateDecorator($aggregate);

            $this->politicians = $decorator->getPoliticians();
        }

        return $this->politicians;
    }

    public function saveAllPoliticiansTo($path)
    {
        $path = $this->getRealPath($path, 'candidatos.full.json');
        $politicians = $this->getPoliticians();

        file_put_contents($path, json_encode($politicians));
    }

    public function saveCardsTo($path)
    {
        $path = $this->getRealPath($path, 'candidatos.json');
        $politicians = new stdClass();
        $politicians->candidatos = $this->getCards();

        file_put_contents($path, json_encode($politicians));
    }
}