//================================================
// AS AVENTURAS DE HELÔ, LIS E THOR
// Runner inspirado em Subway Surfers
// Phaser 3
//================================================

//--------------- CONFIGURAÇÃO -------------------

const config = {

    type: Phaser.AUTO,

    width: 400,

    height: 600,

    parent: "game",

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 1200
            },

            debug: false

        }

    },

    scene: {

        preload,

        create,

        update

    }

};

const game = new Phaser.Game(config);

//--------------- PISTAS -------------------------

const pistas = [

    90,

    200,

    310

];

let pistaAtual = 1;

//--------------- PERSONAGEM ---------------------

let player;

let personagem = "helo";

//--------------- FUNDO --------------------------

let fundo1;

let fundo2;

//--------------- GRUPOS -------------------------

let itens;

let obstaculos;

//--------------- HUD ----------------------------

let scoreText;

let moedasText;

let vidasText;

//--------------- AUDIO --------------------------

let musica;

let latido;

let fogos;

//--------------- GAME ---------------------------

let score = 0;

let moedas = 0;

let vidas = 3;

let velocidade = 350;

let velocidadeFundo = 8;

let jogoIniciado = false;

let pulando = false;

//--------------- TOQUE --------------------------

let inicioX = 0;

let inicioY = 0;
