//====================================================
// AS AVENTURAS DE HELÔ, LIS E THOR
// Runner estilo Subway Surfers
//====================================================

//====================
// CONFIGURAÇÃO
//====================

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    pixelArt: true,

    physics: {
        default: 'arcade',
        arcade: {
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

//====================
// VARIÁVEIS GLOBAIS
//====================

const lanes = [100, 200, 300];

let lane = 1;

let player;
let moldura;

let items;

let scoreText;
let livesText;
let moedasText;

let fundo1;
let fundo2;

let musica;
let latido;

let vidas = 3;
let moedas = 0;

let gameStarted = false;
let pulando = false;

let velocidadeFundo = 8;
let dificuldade = 320;

let startX = 0;
let startY = 0;

let estado = {

    personagem: "helo",

    placar: {
        helo: 0,
        lis: 0,
        thor: 0
    }

};

//====================
// PRELOAD
//====================

function preload() {

    // CAPA

    this.load.image(
        "capa",
        "capa.jpg"
    );

    // FUNDOS

    this.load.image(
        "fundoMeninas",
        "quarto.jpg"
    );

    this.load.image(
        "fundoThor",
        "casa.jpg"
    );

    // PERSONAGENS

    this.load.image(
        "helo",
        "helo.png"
    );

    this.load.image(
        "lis",
        "lis.png"
    );

    this.load.image(
        "thor",
        "thor.png"
    );

    // ITENS

    this.load.image("agua","agua.png");
    this.load.image("carne","carne.png");
    this.load.image("osso","osso.png");

    this.load.image("secador","secador.png");
    this.load.image("escova","escova.png");
    this.load.image("oculos","oculos.png");

    this.load.image("tenis1","tenis1.png");
    this.load.image("tenis2","tenis2.png");

    this.load.image("agenda","agenda.png");
    this.load.image("amigos","amigos.png");

    this.load.image("caderno","caderno.png");
    this.load.image("estojo","estojo.png");

    this.load.image("garrafa","garrafa.png");
    this.load.image("kit","kit.png");

    this.load.image("lapis","lapis.png");
    this.load.image("livro","livro.png");

    this.load.image("lanche","lanche.png");

    this.load.image("mochila1","mochila1.png");
    this.load.image("mochila2","mochila2.png");
    this.load.image("mochila3","mochila3.png");

    // MOEDA

    this.load.image(
        "moeda",
        "moeda.png"
    );

    // OBSTÁCULOS

    this.load.image(
        "urso",
        "urso.png"
    );

    this.load.image(
        "leao",
        "leao.png"
    );

    this.load.image(
        "onca",
        "onca.png"
    );

    // ÁUDIO

    this.load.audio(
        "trilha",
        "musica.mp3"
    );

    this.load.audio(
        "latido",
        "latido.mp3"
    );

    this.load.audio(
        "fogos",
        "Fogo.mp3"
    );

}
