import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.image('logo', 'assets/kimLogo.png');
  }

  create() {
    this.scene.start('input');
  }
}
