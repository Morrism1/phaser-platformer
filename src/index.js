import Phaser from 'phaser';
import ScoreLabel from './scenes/scoreLabel';
import Game from './scenes/gameScene';

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 900;

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  scene: [Game, ScoreLabel],
  physics: {
    default: 'matter',
    matter: {
      debug: true,
    },
  },
};

window.addEventListener('load', () => {
  const game = new Phaser.Game(config);
});
