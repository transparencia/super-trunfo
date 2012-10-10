// definindo um namespace para evitar conflito com outros objetos
window.SUPERTRUNFO = window.SUPERTRUNFO || {};
SUPERTRUNFO.APPS = SUPERTRUNFO.APPS || {};

(function($){

    SUPERTRUNFO.APPS.Jogo = function(options){

        // cache de variáveis privadas
        var $rodada = $('.rodada'),

            $feedback = $('.feedback'),
            $feedbackRodada = $('.feedback-rodada'),
            $novaRodada = $('.nova-rodada'),

            $placarJogador = $('.placar-jogador'),
            $placarOponente = $('.placar-oponente'),

            $numeroObrasJogador = $('.jogador .numero-obras'),
            $numeroObrasOponente = $('.oponente .numero-obras'),
            $numeroProcessosJogador = $('.jogador .numero-processos'),
            $numeroProcessosOponente = $('.oponente .numero-processos'),
            $fichaLimpaJogador = $('.jogador .ficha-limpa'),
            $fichaLimpaOponente = $('.oponente .ficha-limpa'),

            opcaoJogador,
            opcaoOponente;

        // define valores padrão caso não receba nenhum valor como parâmetro
        var defaults = {
            'rodada': 0,
            'placarJogador': 50,
            'placarOponente': 50
        };

        // mescla do conteúdo dos dois objetos
        var settings = $.extend({}, defaults, options);

        // console.log(options);
        // console.log(defaults);
        // console.log(settings);

        var bind = function() {

            // armazena a opção escolhida pelo usuário e sua opção respectiva no oponente
            $('a').on('click', function(e) {

                classeAtual = $(this).attr('class');

                opcaoJogador = $(this).find('.atributo').text();
                opcaoOponente = $('li.' + classeAtual).find('.atributo').text();

                // se for um número
                if ($(this).hasClass('.vence-boolean') == 'false'){
                    opcaoJogador = parseInt(opcaoJogador, 10);
                    opcaoOponente = parseInt(opcaoOponente, 10);
                }

                e.preventDefault();

            });

            $('a.vence-maior').on('click', venceMaior);
            $('a.vence-menor').on('click', venceMenor);
            $('a.vence-boolean').on('click', venceBoolean);

            $novaRodada.on('click', novaRodada);

        },

        venceMaior = function() {

            if (opcaoJogador > opcaoOponente) {
                jogadorVenceu();
            } else if (opcaoJogador == opcaoOponente) {
                empate();
            } else {
                jogadorPerdeu();
            }

        },

        venceMenor = function() {

            // console.log('vence menor');
            // console.log(opcaoJogador);
            // console.log(opcaoOponente);

            if (opcaoJogador < opcaoOponente) {
                jogadorVenceu();
            } else if (opcaoJogador == opcaoOponente) {
                empate();
            } else {
                jogadorPerdeu();
            }

        },

        venceBoolean = function() {

            // console.log('venceBoolean');
            // console.log(opcaoJogador);
            // console.log(opcaoOponente);

            if (opcaoJogador == 'sim' && opcaoOponente == 'não') {
                jogadorVenceu();
            } else if ((opcaoJogador == 'sim' && opcaoOponente == 'sim') || (opcaoJogador == 'não' && opcaoOponente == 'não')) {
                empate();
            } else {
                jogadorPerdeu();
            }

        },

        jogadorVenceu = function() {

            settings.placarJogador++;
            settings.placarOponente--;

            $placarJogador.html(settings.placarJogador);
            $placarOponente.html(settings.placarOponente);

            feedback('Você venceu =D');

        },

        jogadorPerdeu = function() {

            settings.placarOponente++;
            settings.placarJogador--;

            $placarOponente.html(settings.placarOponente);
            $placarJogador.html(settings.placarJogador);

            feedback('Você perdeu =(');

        },

        empate = function() {
            feedback('Deu empate');
        },

        feedback = function(msg) {
            $feedbackRodada.text(msg);
            $feedback.fadeIn();
        },

        random = function(min, max) {
            return parseInt(Math.random() * (max - min) + min, 10);
        },

        novaRodada = function() {

            $feedback.hide();
            geraValoresAleatorios();

            settings.rodada++;
            $rodada.html(settings.rodada);

            // console.log('Começa nova rodada');
        },

        geraValoresAleatorios = function() {

            $numeroObrasJogador.text(random(1, 100));
            $numeroProcessosJogador.text(random(1, 100));

            if (random(0, 2) == 0) {
                $fichaLimpaJogador.text('não');
            } else {
                $fichaLimpaJogador.text('sim');
            }

            $numeroObrasOponente.text(random(1, 100));
            $numeroProcessosOponente.text(random(1, 100));

            if (random(0, 2) == 0) {
                $fichaLimpaOponente.text('não');
            } else {
                $fichaLimpaOponente.text('sim');
            }

        };

        return {

            init: function(){
                bind();
                novaRodada();
            }

        };
    };

    // exemplo de uma instância encapsulada
    $(function(){

        var jogo = new SUPERTRUNFO.APPS.Jogo();
        jogo.init();

    });

}(jQuery));