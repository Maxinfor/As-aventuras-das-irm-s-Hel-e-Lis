const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

// ===== SISTEMA SUBWAY =====
const lanes = [100, 200, 300];
let lane = 1;
let pulando = false;

let player, moldura, items, scoreText, livesText, musica, latido;
let fundo1, fundo2;

let gameStarted = false;
let vidas = 3;
let dificuldade = 300;

let estado = {
    personagem: 'helo',
    placar: { helo: 0, lis: 0, thor: 0 }
};

// ================= PRELOAD =================
function preload() {
    this.load.image('capa', 'capa.jpg');
    this.load.image('fundoThor', 'casa.jpg');
    this.load.image('fundoMeninas', 'quarto.jpg');

    this.load.image('helo', 'helo.png');
    this.load.image('lis', 'lis.png');
    this.load.image('thor', 'thor.png');

    // itens
    this.load.image('agua', 'agua.png');
    this.load.image('carne', 'carne.png');
    this.load.image('osso', 'osso.png');
    this.load.image('secador', 'secador.png');
    this.load.image('escova', 'escova.png');
    this.load.image('oculos', 'oculos.png');
    this.load.image('tenis1', 'tenis1.png');
    this.load.image('tenis2', 'tenis2.png');
    this.load.image('amigos', 'amigos.png');
    this.load.image('agenda', 'agenda.png');
    this.load.image('caderno', 'caderno.png');
    this.load.image('estojo', 'estojo.png');
    this.load.image('garrafa', 'garrafa.png');
    this.load.image('kit', 'kit.png');
    this.load.image('lapis', 'lapis.png');
    this.load.image('livro', 'livro.png');
    this.load.image('mochila1', 'mochila1.png');
    this.load.image('mochila2', 'mochila2.png');
    this.load.image('mochila3', 'mochila3.png');
    this.load.image('lanche', 'lanche.png');

    // obstáculos (adicione seus arquivos)
    this.load.image('urso', 'urso.png');
    this.load.image('leao', 'leao.png');
    this.load.image('onca', 'onca.png');

    this.load.audio('trilha', 'musica.mp3');
    this.load.audio('latido', 'latido.mp3');
    this.load.audio('fogos', 'Fogo.mp3');
}

// ================= CREATE =================
function create() {

    // fundo infinito
    fundo1 = this.add.image(200, 300, 'fundoMeninas').setDisplaySize(400, 600);
    fundo2 = this.add.image(200, -300, 'fundoMeninas').setDisplaySize(400, 600);

    this.add.rectangle(200, 300, 400, 600, 0x000000, 0.2);

    musica = this.sound.add('trilha', { loop: true, volume: 0.3 });
    latido = this.sound.add('latido', { volume: 0.5 });

    items = this.physics.add.group();

    scoreText = this.add.text(20, 20, 'SCORE: 0', {
        fontSize: '24px',
        fill: '#fff'
    });

    livesText = this.add.text(380, 20, 'VIDAS: ❤️❤️❤️', {
        fontSize: '20px',
        fill: '#ff0000'
    }).setOrigin(1, 0);

    // player
    player = this.physics.add.sprite(lanes[lane], 450, estado.personagem);
    player.setDisplaySize(100, 80);
    player.setCollideWorldBounds(true);

    moldura = this.add.ellipse(lanes[lane], 450, 110, 90, 0xffffff)
        .setStrokeStyle(4, 0x000000);

    // colisão
    this.physics.add.overlap(player, items, (p, item) => {

        if (item.tipo === 'obstaculo') {
            item.destroy();
            perderVida(this);
            return;
        }

        let pontos = item.isGold ? 60 : 10;

        estado.placar[estado.personagem] += pontos;

        scoreText.setText(
            'SCORE: ' + estado.placar[estado.personagem]
        );

        item.destroy();
    });

    // teclas
    this.input.keyboard.on('keydown-LEFT', () => {
        if (lane > 0) lane--;
    });

    this.input.keyboard.on('keydown-RIGHT', () => {
        if (lane < 2) lane++;
    });

    this.input.keyboard.on('keydown-UP', () => {

        if (!pulando) {
            pulando = true;

            this.tweens.add({
                targets: player,
                y: 350,
                duration: 250,
                yoyo: true,
                onComplete: () => {
                    pulando = false;
                }
            });
        }

    });

    // spawn
    this.time.addEvent({
        delay: 800,
        loop: true,
        callback: () => {

            if (!gameStarted || items.countActive() > 10) return;

            let itensThor = ['agua', 'carne', 'osso'];
            let itensGeral = [
                'secador', 'escova', 'oculos', 'tenis1', 'tenis2',
                'amigos', 'agenda', 'caderno', 'estojo', 'garrafa',
                'kit', 'lapis', 'livro', 'mochila1', 'mochila2',
                'mochila3', 'lanche'
            ];

            let tipos = (estado.personagem === 'thor') ? itensThor : itensGeral;

            let obstaculos = ['urso', 'leao', 'onca'];

            let isObstacle = Phaser.Math.Between(1, 4) === 1;

            let key;
            let item;

            if (isObstacle) {

                key = obstaculos[Phaser.Math.Between(0, 2)];

                item = items.create(
                    lanes[Phaser.Math.Between(0, 2)],
                    -50,
                    key
                );

                item.tipo = 'obstaculo';

            } else {

                key = tipos[Phaser.Math.Between(0, tipos.length - 1)];

                item = items.create(
                    lanes[Phaser.Math.Between(0, 2)],
                    -50,
                    key
                );

                item.tipo = 'premio';

                item.isGold = Phaser.Math.Between(1, 10) === 1;
            }

            item.setDisplaySize(80, 80);
            item.setVelocityY(dificuldade);

            if (item.isGold) item.setTint(0xFFD700);

        }
    });

    criarBotao(this, 100, 550, 'Helo', 'helo');
    criarBotao(this, 200, 550, 'Lis', 'lis');
    criarBotao(this, 300, 550, 'Thor', 'thor');

    criarCapa(this);
}

// ================= UPDATE =================
function update() {

    if (!gameStarted) return;

    // movimento pista
    player.x = Phaser.Math.Linear(player.x, lanes[lane], 0.25);
    moldura.x = player.x;

    // fundo infinito
    fundo1.y += 4;
    fundo2.y += 4;

    if (fundo1.y >= 900) fundo1.y = fundo2.y - 600;
    if (fundo2.y >= 900) fundo2.y = fundo1.y - 600;

    // itens fora da tela
    items.children.iterate((item) => {
        if (item && item.y > 650) {
            item.destroy();
            perderVida(this);
        }
    });
}

// ================= FUNÇÕES =================
function perderVida(scene) {
    vidas--;
    livesText.setText('VIDAS: ' + '❤️'.repeat(vidas));
    if (vidas <= 0) gameOver(scene);
}

function criarCapa(scene) {
    let bg = scene.add.image(200, 300, 'capa')
        .setDisplaySize(400, 600)
        .setDepth(10);

    let btnJogar = scene.add.text(200, 450, 'JOGAR', {
        fontSize: '32px',
        backgroundColor: '#000',
        color: '#fff',
        padding: 15
    }).setOrigin(0.5).setInteractive().setDepth(20);

    btnJogar.on('pointerup', () => {
        gameStarted = true;
        musica.play();
        bg.destroy();
        btnJogar.destroy();
    });
}

function vitoria(scene) {
    gameStarted = false;
    scene.physics.pause();

    scene.sound.play('fogos');

    scene.add.text(200, 300, 'VOCÊ VENCEU!', {
        fontSize: '40px',
        fill: '#00ff00'
    }).setOrigin(0.5);

}

function criarBotao(scene, x, y, texto, key) {
    scene.add.text(x, y, texto, {
        backgroundColor: '#2c3e50',
        color: '#fff',
        padding: 5
    }).setOrigin(0.5).setInteractive()
        .on('pointerup', () => {
            estado.personagem = key;
            player.setTexture(key);

            if (key === 'thor') {
                fundo1.setTexture('fundoThor');
                fundo2.setTexture('fundoThor');
                musica.stop();
                latido.play();
                setTimeout(() => musica.play(), 1500);
            } else {
                fundo1.setTexture('fundoMeninas');
                fundo2.setTexture('fundoMeninas');
            }
        });
}

function gameOver(scene) {
    gameStarted = false;
    scene.physics.pause();

    scene.add.text(200, 300, 'GAME OVER', {
        fontSize: '40px',
        fill: '#ff0000'
    }).setOrigin(0.5);
}
