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

            $placarJogador = $('.score-me'),
            $placarOponente = $('.score-opponent'),

            $numCartaJogador = $('.jogador .card-number'),
            $numCartaOponente = $('.oponente .card-number'),

            $partidoJogador = $('.jogador .card-party .card-label-value'),
            $partidoOponente = $('.oponente .card-party .card-label-value'),

            $numeroObrasJogador = $('.jogador .numero-obras .card-label-value'),
            $numeroObrasOponente = $('.oponente .numero-obras .card-label-value'),

            $numeroProcessosJogador = $('.jogador .numero-processos .card-label-value'),
            $numeroProcessosOponente = $('.oponente .numero-processos .card-label-value'),

            $fichaLimpaJogador = $('.jogador .ficha-limpa .card-label-value'),
            $fichaLimpaOponente = $('.oponente .ficha-limpa .card-label-value'),

            opcaoJogador,
            opcaoOponente,

            listaCandidatos = [],
            pontuacaoLimite;

        // define valores padrão caso não receba nenhum valor como parâmetro
        var defaults = {
            'rodada': 0,
            'placarJogador': 5,
            'placarOponente': 5
        };

        // mescla do conteúdo dos dois objetos
        var settings = $.extend({}, defaults, options);

        // console.log(options);
        // console.log(defaults);
        // console.log(settings);

        var carregaCandidatos = function() {

            $.getJSON('data/candidatos.json',function(result){
                listaCandidatos = result.candidatos;
                bind();
                novaRodada();
            });

        },

        bind = function() {

            // armazena a opção escolhida pelo usuário e sua opção respectiva no oponente
            $('.card-label').on('click', function(e) {

                var $self = $(this);

                // interação válida apenas se o clique for no jogador e não no oponente
                if ($self.parent().parent().parent().hasClass('jogador')) {

                    atributoEscolhido = $self.data('attribute');
                    console.log(atributoEscolhido);

                    opcaoJogador = $self.find('.card-label-value').text();
                    // console.log(opcaoJogador);

                    // percorre todos os campos do oponente até encontrar aquele escolhido pelo jogador
                    $('.oponente .card-label').each(function (i, field) {

                        if ($(field).data('attribute') == atributoEscolhido) {
                            opcaoOponente = $(field).find('.card-label-value').text();
                            // console.log(opcaoOponente);
                        }

                    });

                    // se for um número, converter para base numérica
                    if ($self.hasClass('vence-boolean') == 'false'){
                        opcaoJogador = parseInt(opcaoJogador, 10);
                        opcaoOponente = parseInt(opcaoOponente, 10);
                    }

                }

                e.preventDefault();

            });

            $('.vence-maior').on('click', venceMaior);
            $('.vence-menor').on('click', venceMenor);
            $('.vence-boolean').on('click', venceBoolean);

            $novaRodada.on('click', novaRodada);

        },

        venceMaior = function() {

            console.log('vence maior');
            console.log(opcaoJogador);
            console.log(opcaoOponente);

            if (opcaoJogador > opcaoOponente) {
                jogadorVenceu();
            } else if (opcaoJogador == opcaoOponente) {
                empate();
            } else {
                jogadorPerdeu();
            }

        },

        venceMenor = function() {

            console.log('vence menor');
            console.log(opcaoJogador);
            console.log(opcaoOponente);

            if (opcaoJogador < opcaoOponente) {
                jogadorVenceu();
            } else if (opcaoJogador == opcaoOponente) {
                empate();
            } else {
                jogadorPerdeu();
            }

        },

        venceBoolean = function() {

            console.log('venceBoolean');
            console.log(opcaoJogador);
            console.log(opcaoOponente);

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

            atualizaPlacar();

            feedback('Você venceu =D');

        },

        jogadorPerdeu = function() {

            settings.placarOponente++;
            settings.placarJogador--;

            atualizaPlacar();

            feedback('Você perdeu =(');

        },

        empate = function() {
            feedback('Deu empate');
        },

        atualizaPlacar = function() {
            $placarJogador.html(settings.placarJogador + '<i class="ic-card"></i>');
            $placarOponente.html('<i class="ic-card"></i>' + settings.placarOponente);

            if (settings.placarJogador == pontuacaoLimite) {
                alert('Você VENCEU o jogo inteiro!');
            } else if (settings.placarOponente == pontuacaoLimite) {
                alert('Você PERDEU o jogo inteiro!');
            }
        },

        feedback = function(msg) {
            $feedbackRodada.text(msg);
            $feedback.fadeIn();
        },

        novaRodada = function() {

            $feedback.hide();
            montaCartaJogador();
            montaCartaOponente();

            settings.rodada++;
            $rodada.html(settings.rodada);

            console.log('\ncomeça nova rodada\n');
        },

        montaCartaJogador = function(i) {

            // escolhe um candidato aleatório dentre os demais
            var jogador = listaCandidatos[random(0, listaCandidatos.length)];

            $numCartaJogador.text(jogador.carta);
            $partidoJogador.text('(' + jogador.partido + ')');
            $numeroObrasJogador.text(jogador.numeroDeObras);
            $numeroProcessosJogador.text(jogador.numeroDeProcessos);
            $fichaLimpaJogador.text(jogador.fichaLimpa);

        },

        montaCartaOponente = function(i) {

            // escolhe um candidato aleatório dentre os demais
            var oponente = listaCandidatos[random(0, listaCandidatos.length)];

            $numCartaOponente.text(oponente.carta);
            $partidoOponente.text('(' + oponente.partido + ')');
            $numeroObrasOponente.text(oponente.numeroDeObras);
            $numeroProcessosOponente.text(oponente.numeroDeProcessos);
            $fichaLimpaOponente.text(oponente.fichaLimpa);

        },

        random = function(min, max) {
            return parseInt(Math.random() * (max - min) + min, 10);
        };

        return {

            init: function(){
                pontuacaoLimite = settings.placarJogador + settings.placarOponente;
                atualizaPlacar();
                carregaCandidatos();
            }

        };
    };

    // exemplo de uma instância encapsulada
    $(function(){

        var jogo = new SUPERTRUNFO.APPS.Jogo();
        jogo.init();

    });

}(jQuery));