window.SUPERTRUNFO = window.SUPERTRUNFO || {};
SUPERTRUNFO.APPS = SUPERTRUNFO.APPS || {};

(function($){

    SUPERTRUNFO.APPS.Jogo = function(options){

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

            $escolaridadeJogador = $('.cards-yourturn [data-attribute="escolaridade"] .card-label-value'),
            $escolaridadeOponente = $('.cards-opponentsturn [data-attribute="escolaridade"] .card-label-value'),

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

            modalSelecionada,

            isFeedbackTime,
            isSuperTrunfo,
            isModalAberta = false;

        // define valores padrão caso não receba nenhum valor como parâmetro
        var defaults = {
            'rodada': 0,
            'placarJogador': 18,
            'placarOponente': 18
        };

        // mescla do conteúdo dos dois objetos
        var settings = $.extend({}, defaults, options);

        var carregaCandidatos = function(cidadeEscolhida) {

            $.getJSON('data/' + cidadeEscolhida + '.json?v=3',function(result){

                listaCandidatos = result.candidatos;
                embaralhaCandidatos(listaCandidatos);

                novaRodada();

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

                // caso não esteja exibindo o resultado da jogada passada
                if (!isFeedbackTime) {

                    var $self = $(this);
                    $self.addClass('selected');

                    // interação válida apenas se o clique for no jogador e não no oponente
                    if ($self.parent().parent().parent().hasClass('cards-yourturn')) {

                        atributoEscolhido = $self.data('attribute');
                        opcaoJogador = $self.find('.card-label-value').text();

                        // percorre todos os campos do oponente até encontrar aquele escolhido pelo jogador
                        $('.cards-opponentsturn .card-label').each(function (i, field) {

                            if ($(field).data('attribute') == atributoEscolhido) {
                                opcaoOponente = $(field).find('.card-label-value').text();
                                $(field).addClass('selected');
                            }

                        });

                        // se for escolaridade, substituir o texto para número
                        if (atributoEscolhido == "escolaridade") {
                            opcaoJogador = escolaridade(opcaoJogador);
                            opcaoOponente = escolaridade(opcaoOponente);
                        } // se for um número, converter para base numérica
                        else {
                            opcaoJogador = parseInt(opcaoJogador, 10);
                            opcaoOponente = parseInt(opcaoOponente, 10);
                        }

                        console.log(opcaoJogador);
                        console.log(opcaoOponente);

                    }

                    superTrunfo();

                }

                e.preventDefault();

            });

            $('.vence-maior').on('click', venceMaior);
            $('.vence-menor').on('click', venceMenor);

            // ao clicar no botão de novo jogo
            $('#escolha-cidade').on('submit', function(e) {

                var cidadeEscolhida = $(this).find('option:selected').val();

                // libera tela de jogo
                $('.ui-turns').fadeIn();
                $screen.addClass('turn');

                // povoa cartas
                carregaCandidatos(cidadeEscolhida);

                e.preventDefault();

            });

            // ao clicar no botão de visualizar informações do atributo
            $('.attribute-detail').on('click', function(e) {

                if (!isModalAberta) {
                    isModalAberta = true;
                    modalSelecionada = $(this).parent().parent().data('attribute');
                    $('.modal-' + modalSelecionada).slideToggle(300);

                } else {
                    isModalAberta = false;
                    $('.modal-' + modalSelecionada).slideToggle(300);
                }

                e.stopPropagation();
                e.preventDefault();

            });

            // esconde as modais ao clicar nelas mesmas
            $('.modal').on('click', function() {
                isModalAberta = false;
                $(this).slideToggle(300);
            });

            // ao clicar no botão de informações do jogo
            $('.link-about').on('click', function(e) {

                if (!isModalAberta) {
                    isModalAberta = true;
                    modalSelecionada = "about";
                    $('.modal-about').slideToggle(300);
                } else {
                    isModalAberta = false;
                    $('.modal-' + modalSelecionada).slideToggle(300);
                }

                e.preventDefault();

            });

            // ao clicar no botão de informações da carta
            $('.view-info').on('click', function(e) {
                $(this).parent().parent().toggleClass('card-info');
                e.preventDefault();
            });

        },

        escolaridade = function(opcao) {

            if (opcao == "Não informado") { opcao = -1; }
            else if (opcao == "Analfabeto") { opcao = 0; }
            else if (opcao == "Lê e Escreve") { opcao = 1; }
            else if (opcao == "Fundamental Incompleto") { opcao = 2; }
            else if (opcao == "Fundamental Completo") { opcao = 3; }
            else if (opcao == "Médio Incompleto") { opcao = 4; }
            else if (opcao == "Médio Completo") { opcao = 5; }
            else if (opcao == "Superior Incompleto") { opcao = 6; }
            else if (opcao == "Superior Completo") { opcao = 7; }
            else if (opcao == "Pós Graduado Incompleto") { opcao = 8; }
            else if (opcao == "Pós Graduado Completa") { opcao = 9; }
            else if (opcao == "Mestrado Incompleto") { opcao = 10; }
            else if (opcao == "Mestrado Completo") { opcao = 11; }
            else if (opcao == "Doutorado Incompleto") { opcao = 12; }
            else if (opcao == "Doutorado Completo") { opcao = 13; }
            else if (opcao == "PhD Incompleto") { opcao = 14; }
            else if (opcao == "PhD Completo") { opcao = 15; }

            return opcao;
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

            // caso não esteja exibindo o resultado da jogada passada
            if (!isFeedbackTime) {

                // se não for super trunfo
                if (!isSuperTrunfo) {

                    if (opcaoJogador > opcaoOponente) {
                        jogadorVenceu();
                    } else if (opcaoJogador == opcaoOponente) {
                        empate();
                    } else {
                        jogadorPerdeu();
                    }

                }

            }

        },

        venceMenor = function() {

            // caso não esteja exibindo o resultado da jogada passada
            if (!isFeedbackTime) {

                // se não for super trunfo
                if (!isSuperTrunfo) {

                    if (opcaoJogador < opcaoOponente) {
                        jogadorVenceu();
                    } else if (opcaoJogador == opcaoOponente) {
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
            }, 6000);

        },

        atualizaPlacar = function() {
            $placarJogador.html(settings.placarJogador);
            $placarOponente.html(settings.placarOponente);

            // fim de jogo
            if (settings.placarJogador == pontuacaoLimite) {

                // exibe mensagem de vitória
                $('.ui-final').addClass('ui-final-won');
                $('.final').css("display", "block").css("z-index", "10");

                // aguarda 5 segundos até recomeçar o jogo
                setTimeout(function() {
                    novoJogo();
                }, 5000);

            } else if (settings.placarOponente == pontuacaoLimite) {

                // exibe mensagem de derrota
                $('.ui-final').addClass('ui-final-lose');
                $('.final').css("display", "block").css("z-index", "10");

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

            $('.final').css("display", "none").css("z-index", "1");

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

        },

        montaCartaJogador = function(i) {

            cartaAtualJogador = listaCandidatosJogador[0];

            $idCartaJogador.text(cartaAtualJogador.id);
            $nomeCartaJogador.text(cartaAtualJogador.nome).textFit({minFontSize: 17});

            if (cartaAtualJogador.numero != null) {
                $numCartaJogador.text(cartaAtualJogador.numero);
            } else {
                $numCartaJogador.text("");
            }

            $fotoCartaJogador.html('<img src="' + cartaAtualJogador.foto + '" alt="' + cartaAtualJogador.nome + '" />');
            $partidoJogador.text(cartaAtualJogador.partido);
            $projetosAprovadosJogador.text(cartaAtualJogador.projetosAprovados);
            $projetosVetadosJogador.text(cartaAtualJogador.projetosVetados);
            $escolaridadeJogador.text(cartaAtualJogador.escolaridade);
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

            $idCartaOponente.text(cartaAtualOponente.id);
            $nomeCartaOponente.text(cartaAtualOponente.nome).textFit({minFontSize: 17});

            if (cartaAtualOponente.numero != null) {
                $numCartaOponente.text(cartaAtualOponente.numero);
            } else {
                $numCartaOponente.text("");
            }

            $fotoCartaOponente.html('<img src="' + cartaAtualOponente.foto + '" alt="' + cartaAtualOponente.nome + '" />');
            $partidoOponente.text(cartaAtualOponente.partido);
            $projetosAprovadosOponente.text(cartaAtualOponente.projetosAprovados);
            $projetosVetadosOponente.text(cartaAtualOponente.projetosVetados);
            $escolaridadeOponente.text(cartaAtualOponente.escolaridade);
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

                // espera 2s até mostrar a próxima tela
                setTimeout(function() {

                    // libera tela de jogo
                    $screen.addClass('ready');

                    // libera eventos de clique
                    bind();

                }, 2000);

            }

        };
    };
}(jQuery));