<?php
namespace SuperTrunfo\Excelencias;

use SuperTrunfo\Entity\Politician;

use \DOMDocument;

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
        $dom = $this->dom;

        $processosNode = $dom->getElementsByTagName('processos')->item(0);

        if ($processosNode !== null) {
            $processos = preg_replace('/\\n|\\r|\\t|\s*/', null, $processosNode->nodeValue);
            $politician->fichaLimpa = empty($processos) ? 'SIM': 'NÃO';
        }

        $aprovados = 0;
        $vetados = 0;
        $materiasLegislativasNode = $dom->getElementsByTagName('materiasLegislativas')->item(0);

        if ($materiasLegislativasNode !== null) {
            foreach ($materiasLegislativasNode->childNodes as $node) {
                switch ($node->nodeName) {
                    case 'outras':
                        $aprovados += (int) $node->nodeValue;
                        break;
                    case 'irrelevantes':
                        $vetados += (int) $node->nodeValue;
                        break;
                }
            }
        }

        $politician->projetosAprovados = $aprovados;
        $politician->projetosVetados = $vetados;

        $assiduidadeNode = $dom->getElementsByTagName('assiduidade')->item(0);

        if ($assiduidadeNode !== null) {
            $presencas = 0;
            $sessoes = 0;
            $faltas = 0;
            $presencasNode = $assiduidadeNode->childNodes->item(0);
            $sessoesNode = $assiduidadeNode->childNodes->item(1);
            $faltasNode = $assiduidadeNode->childNodes->item(2);

            if ($presencasNode !== null) {
                $presencas = (int) $presencasNode->nodeValue;
            }

            if ($sessoesNode !== null) {
                $sessoes = (int) $sessoesNode->nodeValue;
            }

            if ($faltasNode !== null) {
                $faltas = (int) $faltasNode->nodeValue;
            }

            if ($sessoes > 0) {
                $politician->presencas = $presencas * 100 / $sessoes;
                $politician->faltas = $faltas * 100 / $sessoes;
            }
        }

    }
}