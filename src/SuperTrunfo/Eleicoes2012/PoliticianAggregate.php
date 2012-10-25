<?php
namespace SuperTrunfo\Eleicoes2012;

use \ArrayIterator;
use \DOMDocument;
use \DOMXPath;
use \IteratorAggregate;
use SuperTrunfo\URLFetcher;
use SuperTrunfo\DataAccess\PoliticianDataAccess;

class PoliticianAggregate implements \IteratorAggregate
{
    private $hasNextPage = true;
    private $path;

    private function getPageContents($page)
    {
        $fetcher = new URLFetcher();

        return $fetcher->fetch('www.eleicoes2012.info',
                               $this->path . '/alf/' . $page . '/');
    }

    private function getPage($page)
    {
        $politicians = array();

        $dom = new DOMDocument();
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = false;
        $dom->substituteEntities = false;
        $dom->loadHTML($this->getPageContents($page));

        $xpath = new DOMXPath($dom);

        foreach ($xpath->query('.//div[@id="lista-candidatos"]/div[@class="listCandidato"]/div/p') as $p) {
            $a = $p->childNodes->item(0);

            if ($a !== null) {
                $politicians[] = $a->getAttribute('href');
            }
        }

        $this->hasNextPage = count($politicians) >= 1;

        return $politicians;
    }

    public function getPoliticians()
    {
        $politicians = array();
        $politicianInfo = new PoliticianInfo();

        for ($i = 1; $i <= 59 && $this->hasNextPage; ++$i) {
            foreach ($this->getPage($i) as $path) {
                $politician = $politicianInfo->getInfo($path);

                if ($politician !== null) {
                    $politicians[] = $politician;
                }
            }
        }

        return $politicians;
    }

    public function getIterator()
    {
        return new ArrayIterator($this->getPoliticians());
    }

    public function setPath($path)
    {
        $this->path = $path;
    }
}