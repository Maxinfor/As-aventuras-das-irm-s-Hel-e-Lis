//==========================================
// AS AVENTURAS DE HELÔ, LIS E THOR
// Runner inspirado em Subway Surfers
//==========================================

// ---------- CONFIGURAÇÃO ----------

const config = {
    type: Phaser.AUTO,

    width: 400,
    height: 600,

    parent: "game",

    physics: {
        default: "arcade",

        arcade: {
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// ---------- PISTAS ----------

const pistas = [100, 200, 300];

let pistaAtual = 1;

// ---------- GAME ----------

let player;

let fundo1;
let fundo2;

let itens;

let scoreText;
let vidasText;
let moedasText;

let musica;
let latido;

let score = 0;
let moedas = 0;
let vidas = 3;

let velocidade = 350;
let velocidadeFundo = 8;

let jogoIniciado = false;

let personagem = "helo";

//==========================================
// PRELOAD
//==========================================

function preload() {

    //--------------------
    // Fundos
    //--------------------

    this.load.image(
        "fundoMeninas",
        "imagens/quarto.jpg"
    );

    this.load.image(
        "fundoThor",
        "imagens/casa.jpg"
    );

    this.load.image(
        "capa",
        "imagens/capa.jpg"
    );

    //--------------------
    // Personagens
    //--------------------

    this.load.image(
        "helo",
        "imagens/helo.png"
    );

    this.load.image(
        "lis",
        "imagens/lis.png"
    );

    this.load.image(
        "thor",
        "imagens/thor.png"
    );

    //--------------------
    // Obstáculos
    //--------------------

    this.load.image(
        "urso",
        "imagens/urso.png"
    );

    this.load.image(
        "leao",
        "imagens/leao.png"
    );

    this.load.image(
        "onca",
        "imagens/onca.png"
    );

    //--------------------
    // Itens
    //--------------------

    this.load.image(
        "moeda",
        "imagens/moeda.png"
    );

    this.load.image(
        "livro",
        "imagens/livro.png"
    );

    this.load.image(
        "agenda",
        "imagens/agenda.png"
    );

    this.load.image(
        "garrafa",
        "imagens/garrafa.png"
    );

    this.load.image(
        "lanche",
        "imagens/lanche.png"
    );

    //--------------------
    // Sons
    //--------------------

    this.load.audio(
        "trilha",
        "sons/musica.mp3"
    );

    this.load.audio(
        "latido",
        "sons/latido.mp3"
    );

    this.load.audio(
        "fogos",
        "sons/Fogo.mp3"
    );

}
