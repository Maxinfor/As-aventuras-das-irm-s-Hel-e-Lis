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
//==========================================
// CREATE
//==========================================

function create() {

    //--------------------------------------
    // FUNDO INFINITO
    //--------------------------------------

    fundo1 = this.add.image(
        200,
        300,
        "fundoMeninas"
    ).setDisplaySize(400,600);

    fundo2 = this.add.image(
        200,
        -300,
        "fundoMeninas"
    ).setDisplaySize(400,600);

    //--------------------------------------
    // SOM
    //--------------------------------------

    musica = this.sound.add("trilha",{
        loop:true,
        volume:0.4
    });

    latido = this.sound.add("latido",{
        volume:0.6
    });

    //--------------------------------------
    // GRUPO DOS ITENS
    //--------------------------------------

    itens = this.physics.add.group();

    //--------------------------------------
    // PERSONAGEM
    //--------------------------------------

    player = this.physics.add.sprite(

        pistas[pistaAtual],
        470,
        personagem

    );

    player.setDisplaySize(90,110);

    player.setCollideWorldBounds(true);

    //--------------------------------------
    // HUD
    //--------------------------------------

    scoreText = this.add.text(

        15,
        15,

        "SCORE: 0",

        {

            fontSize:"22px",

            color:"#ffffff",

            fontStyle:"bold"

        }

    );

    moedasText = this.add.text(

        15,
        45,

        "MOEDAS: 0",

        {

            fontSize:"18px",

            color:"#FFD700"

        }

    );

    vidasText = this.add.text(

        385,
        15,

        "❤️❤️❤️",

        {

            fontSize:"22px",

            color:"#ff0000"

        }

    ).setOrigin(1,0);

    //--------------------------------------
    // COLISÃO
    //--------------------------------------

    this.physics.add.overlap(

        player,

        itens,

        pegarItem,

        null,

        this

    );

    //--------------------------------------
    // CONTROLE TECLADO
    //--------------------------------------

    this.cursors =
        this.input.keyboard.createCursorKeys();

    //--------------------------------------
    // CONTROLE POR TOQUE
    //--------------------------------------

    this.input.on("pointerdown",(pointer)=>{

        this.inicioX = pointer.x;

        this.inicioY = pointer.y;

    });

    this.input.on("pointerup",(pointer)=>{

        let dx = pointer.x - this.inicioX;

        let dy = pointer.y - this.inicioY;

        //--------------------------------------------------

        if(Math.abs(dx) > Math.abs(dy)){

            if(dx > 50){

                moverDireita();

            }

            if(dx < -50){

                moverEsquerda();

            }

        }

        //--------------------------------------------------

        else{

            if(dy < -50){

                pular(player,this);

            }

        }

    });

    //--------------------------------------
    // BOTÕES
    //--------------------------------------

    criarBotao(

        this,

        80,

        565,

        "Helô",

        "helo"

    );

    criarBotao(

        this,

        200,

        565,

        "Lis",

        "lis"

    );

    criarBotao(

        this,

        320,

        565,

        "Thor",

        "thor"

    );

    //--------------------------------------
    // CAPA
    //--------------------------------------

    criarTelaInicial(this);

}
