<?php
error_reporting(E_ALL|E_STRICT);
ini_set('display_errors', 'On');
ini_set('include_path',implode(PATH_SEPARATOR, array_merge(
    array(realpath(__DIR__)),
    explode(PATH_SEPARATOR, ini_get('include_path'))
)));

spl_autoload_register(function($class) {
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    $pathname = stream_resolve_include_path($filename);

    if ($pathname && is_readable($pathname)) {
        require $pathname;
    }
});