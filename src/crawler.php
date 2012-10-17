<?php
require 'bootstrap.php';

use SuperTrunfo\SuperTrunfo;

$superTrunfo = new SuperTrunfo();
$superTrunfo->saveAllPoliticiansTo('../app/data');
$superTrunfo->saveCardsTo('../app/data');