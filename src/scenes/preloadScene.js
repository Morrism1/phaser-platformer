// @ts-nocheck
import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

  preload() {
    const { width, height } = this.cameras.main;
    this.add.image(width * 0.5, 100, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 150, height / 2 - 30, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });

    loadingText.setOrigin(0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    percentText.setOrigin(0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    assetText.setOrigin(0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}  %`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 150 + 10, height / 2 - 30 + 10, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('cherryImage', 'assets/cherry.png');
    this.load.image('healthImage', 'assets/health.png');
    this.load.image('player', 'assets/kim.png');
    this.load.image('Kimlogo', 'assets/kimLogo.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('snowBlock', 'assets/blockSnowLong.png');
    this.load.image('blueButton1', 'assets/blue_button02.png');
    this.load.image('blueButton2', 'assets/blue_button03.png');
    this.load.image('background', 'assets/background.jpg');
  }
}
