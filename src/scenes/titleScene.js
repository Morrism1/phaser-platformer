import Phaser from 'phaser'
import Button from '../stateMachine/button'

const config = {
  width: 1200,
  height: 800,
}

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('title')
  }

  create() {
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 - 100,
      'blueButton1',
      'blueButton2',
      'Play',
      'game'
    )

    // Options
    this.optionsButton = new Button(
      this,
      config.width / 2,
      config.height / 2,
      'blueButton1',
      'blueButton2',
      'Options',
      'options'
    )

    // Credits
    this.creditsButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Credits',
      'credits'
    )

    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton2')
    })

    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('blueButton1')
    })
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height)
    )
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton)
  }
}
