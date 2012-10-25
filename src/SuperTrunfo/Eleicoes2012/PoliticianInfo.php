<?php
namespace SuperTrunfo\Eleicoes2012;

use SuperTrunfo\Entity\Politician;

use \DOMNode;
use \DOMDocument;
use \DOMXPath;
use SuperTrunfo\Entity\Parlamentar;
use SuperTrunfo\URLFetcher;

class PoliticianInfo
{
    private function getPageContents($path)
    {
        $fetcher = new URLFetcher();

        return $fetcher->fetch('www.eleicoes2012.info', $path);
    }

    public function getInfo($path)
    {
        $dom = new DOMDocument();
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = false;
        $dom->loadHTML($this->getPageContents($path));

        $politician = new Politician();

        $xpath = new DOMXPath($dom);
        $imgElement = $xpath->query('.//div[@id="fotoCandidato"]/img')->item(0);

        if ($imgElement !== null) {
            $politician->foto = $imgElement->getAttribute('src');
        }
        
        $nomeElement = $xpath->query('.//h1[@id="nomeCandidato"]')->item(0);

        if ($nomeElement !== null) {
            $politician->nome = $nomeElement->nodeValue;
            $paragraphs = $xpath->query('.//div[@id="content"]/p');
            
            $bioNode = $paragraphs->item(1);
            $lastSpan = null;
            $found = false;
            
            foreach ($bioNode->childNodes as $node) {
            	if ($node->nodeName == 'span') {
            		$lastSpan = trim($node->nodeValue);
            	}
            	
            	if ($node->nodeName == '#text' && $lastSpan == 'Escolaridade:') {
	            	$politician->escolaridade = trim(preg_replace('/ensino/i', null, $node->nodeValue));
	            	$found = true;
	            	break;
            	}
            }
            
            if (!$found) {
            	$politician->escolaridade = 'Não informado';
            }
            
            $politician->nomeReal = trim($xpath->query('.//span[contains(text(), "Nome")]/following-sibling::text()', $paragraphs->item(1))->item(0)->nodeValue);
            $politician->bio = $this->getInnerHTML($bioNode);
            $politician->resultado = preg_replace('/(ELEITO|SUPLENTE|NÃO ELEITO).*/', '$1', $xpath->query('.//*[starts-with(., "Res")]/following-sibling::*', $paragraphs->item(2))->item(0)->firstChild->nodeValue);
            $politician->quantidadeVotos = (int) preg_replace(array('/Votação:\s*/', '/\s*votos?/i', '/\./'), null, $xpath->query('.//*[contains(text(), "Vot")]', $paragraphs->item(2))->item(0)->nodeValue);
            $politician->cargo = trim($xpath->query('.//span[contains(text(), "Cargo")]/following-sibling::text()', $paragraphs->item(2))->item(0)->nodeValue);

            $numeroNode = $xpath->query('.//span[contains(text(), "Número")]/following-sibling::text()', $paragraphs->item(2))->item(0);

            if ($numeroNode !== null) {
                $politician->numero = trim($numeroNode->nodeValue);
            }

            $politician->partido = trim($xpath->query('.//span[contains(text(), "Partido")]/following-sibling::text()', $paragraphs->item(2))->item(0)->nodeValue);
            $politician->partido = preg_replace('/[^-]+(\s*-\s*)(.*)/', '$2', $politician->partido);
            $politician->nome = trim(str_replace($politician->numero, null, $politician->nome));

            $coligacao = $xpath->query('.//span[contains(text(), "Coligação")]/following-sibling::text()', $paragraphs->item(2));

            if ($coligacao !== null && is_object($coligacao->item(0))) {
                $politician->coligacao = trim($coligacao->item(0)->nodeValue);
            }

            return $politician;
        }
    }

    private function getInnerHTML(DOMNode $node)
    {
        $dom = new DOMDocument();
        $dom->appendChild($dom->importNode($node, true));

        return $dom->saveHTML();
    }
}