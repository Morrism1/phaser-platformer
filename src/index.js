// @ts-nocheck
import Phaser from 'phaser';
import ScoreLabel from './scenes/scoreLabel';
import Game from './scenes/gameScene';
import GameOver from './scenes/gameOver';
import BootScene from './scenes/bootScene';
import CreditsScene from './scenes/creditsScene';
import PreloadScene from './scenes/preloadScene';
import TitleScene from './scenes/titleScene';
import InputForm from './scenes/inputForm';
import LeaderboardScene from './scenes/leaderboardScene';

const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  dom: { createContainer: true },
  scene: [
    BootScene,
    InputForm,
    Game,
    ScoreLabel,
    GameOver,
    CreditsScene,
    PreloadScene,
    TitleScene,
    LeaderboardScene,
  ],
  physics: {
    default: 'matter',
    matter: {
      debug: false,
    },
  },
};

window.game = new Phaser.Game(config);
