const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

function preload() {
  console.log('Preloading assets...');
  this.load.image('player', 'char/unicorn2.png');
  this.load.image('background', 'background/land.jpg');
}

function create() {
  console.log('Creating game scene...');
  const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
  background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  this.player = this.physics.add.sprite(this.sys.game.config.width, this.sys.game.config.height, 'player').setOrigin(1, 1);
  this.player.setScale(0.5); // Reduce the size of the player to half
}

function update() {
  console.log('Updating game state...');

}