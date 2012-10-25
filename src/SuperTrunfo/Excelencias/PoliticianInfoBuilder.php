<?php
namespace SuperTrunfo\Excelencias;

use \DOMXPath;
use \DOMDocument;
use SuperTrunfo\Entity\Politician;

class PoliticianInfoBuilder
{
    /**
     *
     * @var \DOMDocument
     */
    private $dom;

    public function __construct(DOMDocument $dom)
    {
        $this->dom = $dom;
    }
    
    public function build(Politician $politician)
    {
    	$this->buildProjects($politician);
    	$this->buildProcesses($politician);
    }
    
    public function buildProcesses(Politician $politician)
    {
    	$dom = $this->dom;
    	
    	$xpath = new DOMXPath($dom);
    	
    	$processesElement = $xpath->query('.//div[@id="contem_boxes"]/div[@id="contem_titulo"][text()="Ocorrências na Justiça e Tribunais de Contas"]/..')->item(0);
    	
    	if ($processesElement !== null) {
	    	$politician->temProcessos = $processesElement->getElementsByTagName('a')->length > 0;
    	}
    }

    public function buildProjects(Politician $politician)
    {
        $dom = $this->dom;

        $xpath = new DOMXPath($dom);

        $materiasElement = $xpath->query('.//div[@id="contem_boxes"]/div[@id="contem_titulo"][text()="Matérias legislativas"]/..')->item(0);
        
        if ($materiasElement) {
        	$i = 0;
        	$j = 0;
        	$totalOffset = null;
        	$lastRow = null;
        	
        	foreach ($materiasElement->getElementsByTagName('tr') as $tr) {
        		$j = 0;
        		
        		foreach ($tr->getElementsByTagName('td') as $td) {
        			if ($i == 0) {
        				if ($td->nodeValue == 'Total') {
        					$totalOffset = $j;
        					continue;
        				}
        			} else {
        				if ($j == 0) {
        					if ($td->nodeValue == 'Sem relevância' || $td->nodeValue == 'Outras') {
        						$lastRow = $td->nodeValue;
        					} else {
        						$lastRow = null;
        					}
        				}
        				
        				if ($j == $totalOffset) {
        					if ($lastRow == 'Sem relevância') {
        						$politician->projetosAprovados = (int) $td->nodeValue;
        					} else if ($lastRow == 'Outras') {
        						$politician->projetosVetados = (int) $td->nodeValue;
        					}
        				}
        			}
        			
        			$j++;
        		}
        		
        		++$i;
        	}
        }
    }
}