<?php
/**
 * Classes e interfaces relacionadas com o protocolo HTTP
 * @package iMasters\http
 */
namespace iMasters\http;

/**
 * Interface para definição de um autenticador HTTP.
 */
interface HTTPAuthenticator {
	/**
	 * Autentica uma requisição HTTP.
	 * @param	HTTPRequest $httpRequest
	 */
	public function authenticate(HTTPRequest $httpRequest);
}