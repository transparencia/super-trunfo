<?php
namespace SuperTrunfo;

use \DOMDocument;
use \tidy;
use \RuntimeException;
use iMasters\http\HTTPConnection;
use iMasters\http\HTTPRequest;

class URLFetcher
{
    private function cleanRepair($data, $input = 'utf8', $output = 'output-html')
    {

        $tidy = new tidy();

        return $tidy->repairString($data, array(
                'clean' => 'yes',
                'input-encoding' => $input,
                'output-encoding' => 'utf8',
                'ascii-chars' => 'yes',
                'hide-comments' => 'yes',
                'wrap' => 0,
                'preserve-entities' => 'no',
                'output-xml' => $output == 'output-xml',
                'output-html' => $output == 'output-html'
        ));
    }

    private function execute($host,
                             $path = '/',
                             array $params = array(),
                             $method = HTTPRequest::GET)
    {
        $query = count($params) == 0? null: '?'.http_build_query($params);

        printf("\r%100s", null);
        printf("\rHTTP %s %s%s%s", $method, $host, $path, $query);

        $hash = md5(print_r(func_get_args(), true));
        $cachepath = implode(DIRECTORY_SEPARATOR, array(
            __DIR__,
            '..', '..','cache',
            $hash
        ));

        if (is_file($cachepath)) {
            $content = file_get_contents($cachepath);

            return unserialize($content);
        }

        $httpConnection = $this->getHTTPConnection();
        $httpConnection->clear();
        $httpConnection->initialize($host);

        foreach ($params as $name => $value) {
            $httpConnection->setParam($name, $value);
        }

        $response = $httpConnection->execute($path,$method);

        file_put_contents($cachepath, serialize($response));

        return $response;
    }

    /**
     * @param string $host
     * @param string $path
     * @param array $params
     * @param string $method
     * @return string
     * @throws RuntimeException
     */
    public function fetch($host,
                          $path = '/',
                          array $params = array(),
                          $method = HTTPRequest::GET)
    {
        $response = $this->realFetch($host, $path, $params, $method);

        return $this->cleanRepair($response->getContent());
    }

    public function fetchXML($host,
                            $path = '/',
                            array $params = array(),
                            $method = HTTPRequest::GET)
    {
        $response = $this->realFetch($host, $path, $params, $method);

        return preg_replace('/^[^\<]*/', null, $response->getContent());
    }

    private function realFetch($host,
                               $path = '/',
                               array $params = array(),
                               $method = HTTPRequest::GET)
    {
        for ($i = 0; $i < 3; ++$i) {
            $response = $this->execute($host, $path, $params, $method);

            if ($response->getStatusCode() == 200) {
                return $response;
            }
        }

        throw new RuntimeException(__CLASS__ . ': Falha ao obter dados');
    }

    /**
     * @return iMasters\http\HTTPConnection
     */
    protected function getHTTPConnection()
    {
        return new HTTPConnection();
    }
}