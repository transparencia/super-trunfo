// definindo um namespace para evitar conflito com outros objetos
window.SUPERTRUNFO = window.SUPERTRUNFO || {};
SUPERTRUNFO.APPS = SUPERTRUNFO.APPS || {};

(function($){

    SUPERTRUNFO.APPS.Jogo = function(options){

        // cache de variáveis privadas
        var $screen = $('.screen'),

            $placarJogador = $('.score-me .score-number'),
            $placarOponente = $('.score-opponent .score-number'),

            $idCartaJogador = $('.cards-yourturn .card-id'),
            $idCartaOponente = $('.cards-opponentsturn .card-id'),

            $nomeCartaJogador = $('.cards-yourturn .card-name'),
            $nomeCartaOponente = $('.cards-opponentsturn .card-name'),

            $numCartaJogador = $('.cards-yourturn .card-number'),
            $numCartaOponente = $('.cards-opponentsturn .card-number'),

            $fotoCartaJogador = $('.cards-yourturn .card-photo'),
            $fotoCartaOponente = $('.cards-opponentsturn .card-photo'),

            $partidoJogador = $('.cards-yourturn .card-party strong'),
            $partidoOponente = $('.cards-opponentsturn .card-party strong'),

            $projetosAprovadosJogador = $('.cards-yourturn [data-attribute="projs-aprovados"] .card-label-value'),
            $projetosAprovadosOponente = $('.cards-opponentsturn [data-attribute="projs-aprovados"] .card-label-value'),

            $projetosVetadosJogador = $('.cards-yourturn [data-attribute="projs-vetados"] .card-label-value'),
            $projetosVetadosOponente = $('.cards-opponentsturn [data-attribute="projs-vetados"] .card-label-value'),

            $fichaLimpaJogador = $('.cards-yourturn [data-attribute="ficha-limpa"] .card-label-value'),
            $fichaLimpaOponente = $('.cards-opponentsturn [data-attribute="ficha-limpa"] .card-label-value'),

            $quantidadeVotosJogador = $('.cards-yourturn [data-attribute="qt-votos"] .card-label-value'),
            $quantidadeVotosOponente = $('.cards-opponentsturn [data-attribute="qt-votos"] .card-label-value'),

            $bioCartaJogador = $('.cards-yourturn .card-bio'),
            $bioCartaOponente = $('.cards-opponentsturn .card-bio'),

            opcaoJogador,
            opcaoOponente,

            listaCandidatos = [],
            listaCandidatosJogador = [],
            listaCandidatosOponente = [],

            pontuacaoLimite,

            cartaAtualJogador,
            cartaAtualOponente,

            isFeedbackTime,
            isSuperTrunfo;

        // define valores padrão caso não receba nenhum valor como parâmetro
        var defaults = {
            'rodada': 0,
            'placarJogador': 18,
            'placarOponente': 18
        };

        // mescla do conteúdo dos dois objetos
        var settings = $.extend({}, defaults, options);

        // console.log(options);
        // console.log(defaults);
        // console.log(settings);

        var carregaCandidatos = function() {

            $.getJSON('data/candidatos.json',function(result){

                listaCandidatos = result.candidatos;
                embaralhaCandidatos(listaCandidatos);

                // espera 2s até mostrar a próxima tela
                setTimeout(function() {

                    // libera tela de jogo
                    $screen.addClass('ready');
                    $screen.addClass('turn');
                    $('.ui-turns').fadeIn();

                    // povoa cartas
                    novaRodada();

                    // libera eventos de clique
                    bind();

                }, 2000);

            });

        },

        embaralhaCandidatos = function(candidatos) {

            // bagunça a ordem da lista de candidatos carregados
            listaCandidatos = shuffle(candidatos);

            // distribui os candidatos para os jogadores
            listaCandidatosJogador = listaCandidatos.slice(0, listaCandidatos.length / 2);
            listaCandidatosOponente = listaCandidatos.slice(listaCandidatos.length / 2, listaCandidatos.length);

        }

        bind = function() {

            // armazena a opção escolhida pelo usuário e sua opção respectiva no oponente
            $('.card-label').on('click', function(e) {

                // console.log(isFeedbackTime);

                // caso não esteja exibindo o resultado da jogada passada
                if (!isFeedbackTime) {

                    var $self = $(this);
                    $self.addClass('selected');

                    // interação válida apenas se o clique for no jogador e não no oponente
                    if ($self.parent().parent().parent().hasClass('cards-yourturn')) {

                        atributoEscolhido = $self.data('attribute');
                        // console.log('atributoEscolhido: ' + atributoEscolhido);

                        opcaoJogador = $self.find('.card-label-value').text();
                        // console.log('opcaoJogador: ' + opcaoJogador);

                        // percorre todos os campos do oponente até encontrar aquele escolhido pelo jogador
                        $('.cards-opponentsturn .card-label').each(function (i, field) {

                            if ($(field).data('attribute') == atributoEscolhido) {
                                opcaoOponente = $(field).find('.card-label-value').text();
                                $(field).addClass('selected');
                                // console.log('opcaoOponente: ' + opcaoOponente);
                            }

                        });

                        // se for um número, converter para base numérica
                        if ($self.hasClass('vence-boolean') == false){
                            opcaoJogador = parseInt(opcaoJogador, 10);
                            opcaoOponente = parseInt(opcaoOponente, 10);
                        }

                    }

                    superTrunfo();

                }

                e.preventDefault();

            });

            $('.vence-maior').on('click', venceMaior);
            $('.vence-menor').on('click', venceMenor);
            $('.vence-boolean').on('click', venceBoolean);

            // ao clicar no botão de informações
            $('.view-info').on('click', function(e) {
                $(this).parent().parent().toggleClass('card-info');
                e.preventDefault();
            });
            $('.link-about, .modal-about').on('click', function(e) {
                $('.modal-about').slideToggle(300);
                e.preventDefault();
            });

        },

        superTrunfo = function() {

            // se o jogador estiver com o super trunfo
            if (cartaAtualJogador.superTrunfo) {

                isSuperTrunfo = true;

                // se o oponente estiver com uma carta A
                if (cartaAtualOponente.id.indexOf('A') != -1) {
                    jogadorPerdeu();
                } else {
                    jogadorVenceu();
                }

            } // se o oponente estiver com o super trunfo
            else if (cartaAtualOponente.superTrunfo) {

                isSuperTrunfo = true;

                // se o jogador estiver com uma carta A
                if (cartaAtualJogador.id.indexOf('A') != -1) {
                    jogadorVenceu();
                } else {
                    jogadorPerdeu();
                }

            } // se ninguém estiver com o super trunfo
            else {
                isSuperTrunfo = false;
            }

        },

        venceMaior = function() {

            // console.log('vence maior');
            // console.log(opcaoJogador);
            // console.log(opcaoOponente);

            // caso não esteja exibindo o resultado da jogada passada
            if (!isFeedbackTime) {

                // se não for super trunfo
                if (!isSuperTrunfo) {

                    if (opcaoJogador > opcaoOponente) {
                        // console.log('opcaoJogador > opcaoOponente');
                        jogadorVenceu();
                    } else if (opcaoJogador == opcaoOponente) {
                        // console.log('opcaoJogador == opcaoOponente');
                        empate();
                    } else {
                        // console.log('opcaoJogador < opcaoOponente');
                        jogadorPerdeu();
                    }

                }

            }

        },

        venceMenor = function() {

            // console.log('vence menor');
            // console.log(opcaoJogador);
            // console.log(opcaoOponente);

            // caso não esteja exibindo o resultado da jogada passada
            if (!isFeedbackTime) {

                // se não for super trunfo
                if (!isSuperTrunfo) {

                    if (opcaoJogador < opcaoOponente) {
                        // console.log('opcaoJogador < opcaoOponente');
                        jogadorVenceu();
                    } else if (opcaoJogador == opcaoOponente) {
                        // console.log('opcaoJogador == opcaoOponente');
                        empate();
                    } else {
                        // console.log('opcaoJogador > opcaoOponente');
                        jogadorPerdeu();
                    }

                }

            }

        },

        venceBoolean = function() {

            // console.log('venceBoolean');
            // console.log(opcaoJogador);
            // console.log(opcaoOponente);

            // caso não esteja exibindo o resultado da jogada passada
            if (!isFeedbackTime) {

                // se não for super trunfo
                if (!isSuperTrunfo) {

                    if (opcaoJogador == 'sim' && opcaoOponente == 'não') {
                        jogadorVenceu();
                    } else if ((opcaoJogador == 'sim' && opcaoOponente == 'sim') || (opcaoJogador == 'não' && opcaoOponente == 'não')) {
                        empate();
                    } else {
                        jogadorPerdeu();
                    }

                }

            }

        },

        jogadorVenceu = function() {

            // itera o placar
            settings.placarJogador++;
            settings.placarOponente--;

            // coloca a carta do oponente perdedor no fim do bolo do jogador vencedor
            listaCandidatosOponente.shift();
            listaCandidatosJogador.push(cartaAtualOponente);

            // coloca a carta jogador vencedor no fim do bolo dele
            listaCandidatosJogador.shift();
            listaCandidatosJogador.push(cartaAtualJogador);

            // se não for super trunfo
            if (!isSuperTrunfo) {
                feedback('<span class="msg msg-won">Você ganhou!</span>', 'card-won');
            } else {
                feedback('<span class="msg msg-won">Super trunfo! Você ganhou!</span>', 'card-won');
            }

        },

        jogadorPerdeu = function() {

            // itera o placar
            settings.placarOponente++;
            settings.placarJogador--;

            // coloca a carta do jogador perdedor no fim do bolo do oponente vencedor
            listaCandidatosJogador.shift();
            listaCandidatosOponente.push(cartaAtualJogador);

            // coloca a carta oponente vencedor no fim do bolo dele
            listaCandidatosOponente.shift();
            listaCandidatosOponente.push(cartaAtualOponente);

            // se não for super trunfo
            if (!isSuperTrunfo) {
                feedback('<span class="msg msg-lose">Você perdeu!</span>', 'card-lose');
            }  else {
                feedback('<span class="msg msg-lose">Super trunfo! Você perdeu!</span>', 'card-won');
            }

        },

        empate = function() {

            // coloca a carta do jogador no fim do bolo dele
            listaCandidatosJogador.shift();
            listaCandidatosJogador.push(cartaAtualJogador);

            // coloca a carta do oponente no fim do bolo dele
            listaCandidatosOponente.shift();
            listaCandidatosOponente.push(cartaAtualOponente);

            feedback('<span class="msg msg-draw">Deu empate!</span>', 'card-draw');
        },

        feedback = function(msg, result) {

            isFeedbackTime = true;

            // vira carta do oponente
            $('.cards-opponentsturn').addClass('cards-flip');

            // tempo para terminar a animação de virar a carta
            setTimeout(function() {
                $('.ui-turns').append(msg);
                $('.cards-yourturn .card').addClass(result);
            }, 1000);

            setTimeout(function() {
                atualizaPlacar();
                novaRodada(result);
            }, 3000);

        },

        atualizaPlacar = function() {
            $placarJogador.html('(' + settings.placarJogador + ')');
            $placarOponente.html('(' + settings.placarOponente + ')');

            // fim de jogo
            if (settings.placarJogador == pontuacaoLimite) {

                // exibe mensagem de vitória
                $('.ui-final').addClass('ui-final-won');
                $('.final').css("z-index", "10");

                // aguarda 5 segundos até recomeçar o jogo
                setTimeout(function() {
                    novoJogo();
                }, 5000);

            } else if (settings.placarOponente == pontuacaoLimite) {

                // exibe mensagem de derrota
                $('.ui-final').addClass('ui-final-lose');
                $('.final').css("z-index", "10");

                // aguarda 5 segundos até recomeçar o jogo
                setTimeout(function() {
                    novoJogo();
                }, 5000);

            }
        },

        novoJogo = function() {

            settings.placarJogador = 18;
            settings.placarOponente = 18;
            atualizaPlacar();
            embaralhaCandidatos(listaCandidatos);
            novaRodada();
            $('.final').css("z-index", "1");

        },

        novaRodada = function(resultRodadaPassada) {

            isFeedbackTime = false;

            // apaga feedback da rodada passada
            if (resultRodadaPassada != undefined) {

                $('.cards-opponentsturn').removeClass('cards-flip');
                $('.msg').remove();
                $('.card-label').removeClass('selected');
                $('.cards-yourturn .card').removeClass(resultRodadaPassada);

                // tempo para terminar a animação de virar a carta
                setTimeout(function() {
                    montaCartaJogador();
                    montaCartaOponente();
                }, 300);

            } else {
                montaCartaJogador();
                montaCartaOponente();
            }

            // settings.rodada++;
            // $rodada.html(settings.rodada);

            // console.log('\ncomeça nova rodada\n');

            // console.log(listaCandidatosJogador);
            // console.log(listaCandidatosOponente);
        },

        montaCartaJogador = function(i) {

            cartaAtualJogador = listaCandidatosJogador[0];
            // console.log(cartaAtualJogador);

            $idCartaJogador.text(cartaAtualJogador.id);
            $nomeCartaJogador.text(cartaAtualJogador.nome);
            $numCartaJogador.text(cartaAtualJogador.numero);
            $fotoCartaJogador.html('<img src="' + cartaAtualJogador.foto + '" alt="' + cartaAtualJogador.nome + '" />');
            $partidoJogador.text(cartaAtualJogador.partido);
            $projetosAprovadosJogador.text(cartaAtualJogador.projetosAprovados);
            $projetosVetadosJogador.text(cartaAtualJogador.projetosVetados);
            $fichaLimpaJogador.text(cartaAtualJogador.fichaLimpa);
            $quantidadeVotosJogador.text(cartaAtualJogador.quantidadeVotos);
            $bioCartaJogador.html(cartaAtualJogador.bio);

            if (cartaAtualJogador.superTrunfo) {
                $('.cards-yourturn .card-front').addClass('card-supertrunfo');
            } else {
                $('.cards-yourturn .card-front').removeClass('card-supertrunfo');
            }

        },

        montaCartaOponente = function(i) {

            cartaAtualOponente = listaCandidatosOponente[0];
            // console.log(cartaAtualOponente);

            $idCartaOponente.text(cartaAtualOponente.id);
            $nomeCartaOponente.text(cartaAtualOponente.nome);
            $numCartaOponente.text(cartaAtualOponente.numero);
            $fotoCartaOponente.html('<img src="' + cartaAtualOponente.foto + '" alt="' + cartaAtualOponente.nome + '" />');
            $partidoOponente.text(cartaAtualOponente.partido);
            $projetosAprovadosOponente.text(cartaAtualOponente.projetosAprovados);
            $projetosVetadosOponente.text(cartaAtualOponente.projetosVetados);
            $fichaLimpaOponente.text(cartaAtualOponente.fichaLimpa);
            $quantidadeVotosOponente.text(cartaAtualOponente.quantidadeVotos);
            $bioCartaOponente.html(cartaAtualOponente.bio);

            if (cartaAtualOponente.superTrunfo) {
                $('.cards-opponentsturn .card-front').addClass('card-supertrunfo');
            } else {
                $('.cards-opponentsturn .card-front').removeClass('card-supertrunfo');
            }

        },

        random = function(min, max) {
            return parseInt(Math.random() * (max - min) + min, 10);
        },

        shuffle = function(array) {

            var tmp, current, top = array.length;

            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }

            return array;

        };

        return {

            init: function(){
                pontuacaoLimite = settings.placarJogador + settings.placarOponente;
                atualizaPlacar();
                carregaCandidatos();
            }

        };
    };
}(jQuery));