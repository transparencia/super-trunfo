<?php
/**
 * Classes e interfaces relacionadas com o protocolo HTTP
 * @package iMasters\http
 */
namespace iMasters\http;

/**
 * Requisição HTTP com socket. Implementação da interface HTTPRequest para uma
 * requisição HTTP que utiliza cURL.
 */
class SocketRequest extends AbstractHTTPRequest {
    /**
     * @var resource
     */
    private $handler;
    
    /**
     * @var	boolean
     */
    private $openned = false;

    /* (non-PHPdoc)
	 * @see iMasters\http.HTTPRequest::close()
	 */
    public function close() {
        if ($this->openned) {
            fclose($this->handler);
        }
        
        $this->openned = false;
    }

    /* (non-PHPdoc)
	 * @see iMasters\http.HTTPRequest::execute()
	 */
    public function execute($path = '/', $method = HTTPRequest::GET) {
    }

    /* (non-PHPdoc)
	 * @see iMasters\http.HTTPRequest::open()
	 */
    public function open(HTTPConnection $httpConnection) {
        $error = null;
        $errno = 0;
        $this->handler = fsockopen($httpConnection->getHost(),
                                   $httpConnection->getPort(),
                                   $errno,
                                   $error,
                                   $httpConnection->getConnectionTimeout());
    
    }
}