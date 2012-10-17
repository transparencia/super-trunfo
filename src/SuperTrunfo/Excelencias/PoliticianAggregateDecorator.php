<?php
namespace SuperTrunfo\Excelencias;

use \DOMDocument;
use iMasters\http\HTTPRequest;
use SuperTrunfo\URLFetcher;
use SuperTrunfo\Eleicoes2012\PoliticianAggregate;

class PoliticianAggregateDecorator extends PoliticianAggregate
{
    /**
     * @var SuperTrunfo\Eleicoes2012\PoliticianAggregate
     */
    private $politicianAggregate;

    public function __construct(PoliticianAggregate $politicianAggregate)
    {
        $this->politicianAggregate = $politicianAggregate;
    }


    public function getPoliticians()
    {
        $politicians = $this->politicianAggregate->getPoliticians();

        foreach ($politicians as $politician) {
            if (!empty($politician->nomeReal)) {
                $dom = $this->search($politician->nomeReal);

                if ($dom instanceof \DOMDocument) {
                    $politicianInfoBuilder = new PoliticianInfoBuilder($dom);
                    $politicianInfoBuilder->build($politician);
                }
            }
        }

        return $politicians;
    }

    private function search($name)
    {
        $urlFetcher = new URLFetcher();
        $content = $urlFetcher->fetch('www.excelencias.org.br', '/@busca.php', array(
            'nome' => $name
        ));

        if (!preg_match('/Nenhum parlamentar encontrado/i', $content)) {
            $matches = array();

            if (preg_match('/\<a class\="listapar" href\="@candidato.php\?id=(\d+).*/', $content, $matches)) {
                $content = $urlFetcher->fetchXML('www.excelencias.org.br', '/candidato/@candidato_direta.php', array(
                    'id' => $matches[1]
                ));

                $dom = new DOMDocument();
                $dom->preserveWhiteSpace = false;
                $dom->formatOutput = false;
                $dom->loadXML($content);

                return $dom;
            }
        }
    }
}