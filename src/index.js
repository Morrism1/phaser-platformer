import Phaser from 'phaser'
import HelloWorldScene from './scenes/mainScene'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [HelloWorldScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 200 },
    },
  },
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
