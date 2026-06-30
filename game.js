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
let estrada;
let efeitoTexto;
let nivel = 1;

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
//================================================
// PRELOAD
//================================================

function preload() {

    //----------------------------
    // FUNDOS
    //----------------------------

    this.load.image("capa", "imagens/capa.jpg");
    this.load.image("fundoMeninas", "imagens/quarto.jpg");
    this.load.image("fundoThor", "imagens/casa.jpg");

    //----------------------------
    // PERSONAGENS
    //----------------------------

    this.load.image("helo", "imagens/helo.png");
    this.load.image("lis", "imagens/lis.png");
    this.load.image("thor", "imagens/thor.png");

    //----------------------------
    // OBSTÁCULOS
    //----------------------------

    this.load.image("urso", "imagens/urso.png");
    this.load.image("leao", "imagens/leao.png");
    this.load.image("onca", "imagens/onca.png");

    //----------------------------
    // ITENS
    //----------------------------

    this.load.image("moeda", "imagens/moeda.png");

    this.load.image("agua", "imagens/agua.png");
    this.load.image("carne", "imagens/carne.png");
    this.load.image("osso", "imagens/osso.png");

    this.load.image("livro", "imagens/livro.png");
    this.load.image("agenda", "imagens/agenda.png");
    this.load.image("caderno", "imagens/caderno.png");
    this.load.image("estojo", "imagens/estojo.png");
    this.load.image("garrafa", "imagens/garrafa.png");
    this.load.image("kit", "imagens/kit.png");
    this.load.image("lapis", "imagens/lapis.png");
    this.load.image("lanche", "imagens/lanche.png");

    this.load.image("mochila1", "imagens/mochila1.png");
    this.load.image("mochila2", "imagens/mochila2.png");
    this.load.image("mochila3", "imagens/mochila3.png");

    this.load.image("tenis1", "imagens/tenis1.png");
    this.load.image("tenis2", "imagens/tenis2.png");

    this.load.image("oculos", "imagens/oculos.png");
    this.load.image("escova", "imagens/escova.png");
    this.load.image("secador", "imagens/secador.png");
    this.load.image("amigos", "imagens/amigos.png");

    //----------------------------
    // ÁUDIOS
    //----------------------------

    this.load.audio("trilha", "sons/musica.mp3");
    this.load.audio("latido", "sons/latido.mp3");
    this.load.audio("fogos", "sons/Fogo.mp3");

}
//================================================
// CREATE
//================================================

function create() {

    //============================
    // FUNDOS
    //============================

    fundo1 = this.add.image(200, 300, "fundoMeninas")
        .setDisplaySize(400, 600);

    fundo2 = this.add.image(200, -300, "fundoMeninas")
        .setDisplaySize(400, 600);

    //============================
    // ÁUDIO
    //============================

    musica = this.sound.add("trilha", {
        loop: true,
        volume: 0.4
    });

    latido = this.sound.add("latido", {
        volume: 0.6
    });

    fogos = this.sound.add("fogos", {
        volume: 0.7
    });

    //============================
    // GRUPOS
    //============================

    itens = this.physics.add.group();
    obstaculos = this.physics.add.group();

    //============================
    // PERSONAGEM
    //============================

    player = this.physics.add.sprite(

        pistas[pistaAtual],
        470,
        personagem

    );

    player.setDisplaySize(90, 110);

    player.setCollideWorldBounds(true);

    //============================
    // HUD
    //============================

    scoreText = this.add.text(
        15,
        15,
        "SCORE: 0",
        {
            fontSize: "22px",
            color: "#FFFFFF",
            fontStyle: "bold"
        }
    );

    moedasText = this.add.text(
        15,
        45,
        "MOEDAS: 0",
        {
            fontSize: "18px",
            color: "#FFD700"
        }
    );

    vidasText = this.add.text(
        385,
        15,
        "❤️❤️❤️",
        {
            fontSize: "22px"
        }
    ).setOrigin(1,0);

    //============================
    // TECLADO
    //============================

    this.cursors = this.input.keyboard.createCursorKeys();

    //============================
    // CONTROLE TOUCH
    //============================

    this.input.on("pointerdown",(pointer)=>{

        inicioX = pointer.x;
        inicioY = pointer.y;

    });

    this.input.on("pointerup",(pointer)=>{

        let dx = pointer.x - inicioX;
        let dy = pointer.y - inicioY;

        // direita
        if(dx > 50){

            if(pistaAtual < 2){

                pistaAtual++;

            }

        }

        // esquerda
        if(dx < -50){

            if(pistaAtual > 0){

                pistaAtual--;

            }

        }

        // pulo

        if(dy < -60 && !pulando){

            pulando = true;

            player.setVelocityY(-650);

        }

    });

    //============================
    // COLISÕES
    //============================

    this.physics.add.overlap(

        player,

        itens,

        pegarItem,

        null,

        this

    );

    this.physics.add.overlap(

        player,

        obstaculos,

        baterObstaculo,

        null,

        this

    );

    //============================
    // TELA INICIAL
    //============================

    criarTelaInicial(this);
    iniciarSpawn(this);
}
//================================================
// PEGA ITEM
//================================================

function pegarItem(player, item){

    if(item.texture.key == "moeda"){

        moedas += 1;
        score += 20;

    }else{

        score += 10;

    }

  moedasText.setText("MOEDAS: " + moedas);
scoreText.setText("SCORE: " + score);

if(score > melhorPontuacao){
    melhorPontuacao = score;
}

item.destroy();
    // aumenta a dificuldade a cada 100 pontos
    if(score % 100 == 0){

        velocidade += 20;

        velocidadeFundo += 0.5;

    }

    // vitória
    if(score >= 1000){

        vitoria(player.scene);

    }

}

//================================================
// BATEU NO OBSTÁCULO
//================================================

function baterObstaculo(player, obstaculo){

    obstaculo.destroy();

    perderVida(player.scene);

}

//================================================
// PERDER VIDA
//================================================

function perderVida(scene){

    vidas--;

    vidasText.setText("❤️".repeat(vidas));

    if(vidas <= 0){

        gameOver(scene);

    }

}
//================================================
// TELA INICIAL
//================================================

function criarTelaInicial(scene){

    let capa = scene.add.image(200,300,"capa")
        .setDisplaySize(400,600)
        .setDepth(100);

    let titulo = scene.add.text(
        200,
        140,
        "AS AVENTURAS\nDE HELÔ, LIS E THOR",
        {
            fontSize:"24px",
            fontStyle:"bold",
            color:"#FFFFFF",
            align:"center"
        }
    ).setOrigin(0.5).setDepth(101);

    let jogar = scene.add.text(
        200,
        470,
        "JOGAR",
        {
            fontSize:"34px",
            backgroundColor:"#27ae60",
            color:"#FFFFFF",
            padding:{
                left:20,
                right:20,
                top:10,
                bottom:10
            }
        }
    ).setOrigin(0.5).setDepth(101).setInteractive();

    jogar.on("pointerdown",()=>{

        jogoIniciado = true;

        musica.play();

        capa.destroy();
        titulo.destroy();
        jogar.destroy();

    });

}

//================================================
// BOTÃO PERSONAGEM
//================================================

function criarBotao(scene,x,y,texto,nome){

    scene.add.text(

        x,
        y,
        texto,

        {

            fontSize:"18px",

            backgroundColor:"#34495e",

            color:"#FFFFFF",

            padding:{
                left:8,
                right:8,
                top:5,
                bottom:5
            }

        }

    )

    .setOrigin(0.5)

    .setInteractive()

    .on("pointerdown",()=>{

        personagem = nome;

        player.setTexture(nome);

        if(nome=="thor"){

            fundo1.setTexture("fundoThor");
            fundo2.setTexture("fundoThor");

            musica.stop();

            latido.play();

            scene.time.delayedCall(1500,()=>{

                musica.play();

            });

        }

        else{

            fundo1.setTexture("fundoMeninas");
            fundo2.setTexture("fundoMeninas");

        }

    });

}

//================================================
// GAME OVER
//================================================

function gameOver(scene){

    jogoIniciado=false;

    scene.physics.pause();

    musica.stop();

    scene.add.rectangle(
        200,
        300,
        400,
        600,
        0x000000,
        0.6
    );

    scene.add.text(
        200,
        250,
        "GAME OVER",
        {
            fontSize:"42px",
            color:"#FF0000",
            fontStyle:"bold"
        }
    ).setOrigin(0.5);

    let reiniciar = scene.add.text(
        200,
        360,
        "JOGAR NOVAMENTE",
        {
            fontSize:"22px",
            backgroundColor:"#2980b9",
            color:"#FFFFFF",
            padding:10
        }
    )
    .setOrigin(0.5)
    .setInteractive();

    reiniciar.on("pointerdown",()=>{

        location.reload();

    });

}

//================================================
// VITÓRIA
//================================================

function vitoria(scene){

    jogoIniciado=false;

    scene.physics.pause();

    musica.stop();

    fogos.play();

    scene.add.rectangle(
        200,
        300,
        400,
        600,
        0x000000,
        0.5
    );

    scene.add.text(
        200,
        220,
        "VOCÊ VENCEU!",
        {
            fontSize:"36px",
            color:"#00FF00",
            fontStyle:"bold"
        }
    ).setOrigin(0.5);

    scene.add.text(
        200,
        280,
        "Pontuação: "+score,
        {
            fontSize:"24px",
            color:"#FFFFFF"
        }
    ).setOrigin(0.5);

    let jogarNovamente = scene.add.text(
        200,
        380,
        "JOGAR NOVAMENTE",
        {
            fontSize:"22px",
            backgroundColor:"#27ae60",
            color:"#FFFFFF",
            padding:10
        }
    )
    .setOrigin(0.5)
    .setInteractive();

    jogarNovamente.on("pointerdown",()=>{

        location.reload();

    });

}
//================================================
// UPDATE
//================================================

function update() {

    // Não faz nada enquanto o jogo não iniciar
    if (!jogoIniciado) {
        return;
         this.children.getByName("nivelText")
        .setText("NÍVEL: "+nivel);
    }
   

    //----------------------------
    // MOVIMENTO DO FUNDO
    //----------------------------

    fundo1.y += velocidadeFundo;
    fundo2.y += velocidadeFundo;

    if (fundo1.y >= 900) {
        fundo1.y = fundo2.y - 600;
    }

    if (fundo2.y >= 900) {
        fundo2.y = fundo1.y - 600;
    }

    //----------------------------
    // MOVIMENTO ENTRE AS PISTAS
    //----------------------------

   player.x = Phaser.Math.Linear(
    player.x,
    pistas[pistaAtual],
    0.35
);
    );

    //----------------------------
    // PULO
    //----------------------------

    if (player.body.touching.down) {
        pulando = false;
    }

    //----------------------------
    // CONTROLE PELO TECLADO
    //----------------------------

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {

        if (pistaAtual > 0) {
            pistaAtual--;
        }

    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {

        if (pistaAtual < 2) {
            pistaAtual++;
        }

    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {

        if (!pulando) {

            pulando = true;

            player.setVelocityY(-650);

        }

    }

    //----------------------------
    // REMOVE ITENS FORA DA TELA
    //----------------------------

    itens.children.each(function(item){

        if(item.y > 700){

            item.destroy();

        }

    });

    //----------------------------
    // REMOVE OBSTÁCULOS
    //----------------------------

    obstaculos.children.each(function(obs){

        if(obs.y > 700){

            obs.destroy();

        }

    });
player.angle = Math.sin(player.y/10)*2;
}
//================================================
// SPAWN DOS OBJETOS
//================================================

function iniciarSpawn(scene){

    scene.time.addEvent({

        delay:800,

        loop:true,

        callback:function(){

            if(!jogoIniciado){
                return;
            }

            let pista = Phaser.Math.Between(0,2);

            // 30% de chance de obstáculo
            let obstaculo = Phaser.Math.Between(1,100);

            if(obstaculo <=30){

                const listaObstaculos=[

                    "urso",
                    "leao",
                    "onca"

                ];

                let nome = Phaser.Utils.Array.GetRandom(listaObstaculos);

                let obj = obstaculos.create(

                    pistas[pista],
                    -60,
                    nome

                );

                obj.setDisplaySize(90,90);

                obj.setVelocityY(velocidade);

            }

            else{

                const listaItens=[

                    "livro",
                    "agenda",
                    "caderno",
                    "garrafa",
                    "kit",
                    "lapis",
                    "lanche",
                    "mochila1",
                    "mochila2",
                    "mochila3",
                    "tenis1",
                    "tenis2",
                    "agua",
                    "carne",
                    "osso",
                    "moeda"

                ];

                let nome=Phaser.Utils.Array.GetRandom(listaItens);

                let item=itens.create(

                    pistas[pista],
                    -60,
                    nome

                );

                item.setDisplaySize(70,70);

                item.setVelocityY(velocidade);

            }

        }

    });

}
