import Phaser from 'phaser'
import PlayerController from './playerController'
import ObstaclesController from './obstacles'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')
    this.playerController = undefined
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.obstacles = new ObstaclesController()
  }

  preload() {
    this.load.atlas('kim', 'assets/kim.png', 'assets/kim.json')
    this.load.image('tiles', 'assets/sheet.png')
    this.load.image('health', 'assets/health.png')
    this.load.tilemapTiledJSON('tilemap', 'assets/iceMap.json')

    this.load.image('cherry', 'assets/cherry.png')
  }

  create() {
    this.scene.launch('score')
    const map = this.make.tilemap({ key: 'tilemap' })
    const tileset = map.addTilesetImage('iceground', 'tiles')
    const ground = map.createLayer('ground', tileset)
    ground.setCollisionByProperty({ collides: true })
    map.createLayer('obstacles', tileset)

    const objLayer = map.getObjectLayer('objects')
    objLayer.objects.forEach((obj) => {
      const { x, y, name, width, height = 0 } = obj
      if (name === 'kim-spawn') {
        this.kim = this.matter.add
          .sprite(x + width * 0.5, y, 'kim')
          .setScale(0.3)
          .setFixedRotation()

        this.playerController = new PlayerController(this, this.kim, this.cursors, this.obstacles)

        this.cameras.main.startFollow(this.kim)
      }
      if (name === 'cherry') {
        const cherry = this.matter.add
          .sprite(x, y, 'cherry', undefined, {
            isSensor: true,
            isStatic: true,
          })
          .setScale(0.5)
          .setFixedRotation()

        cherry.setData('type', 'cherry')
      }

      if (name === 'health') {
        const health = this.matter.add.sprite(x, y, 'health', undefined, {
          isStatic: true,
          isSensor: true,
        })

        health.setData('type', 'health')
        health.setData('healthValue', 10)
      }

      if (name === 'spikes') {
        const spike = this.matter.add.rectangle(x + width * 0.5, y + height * 0.5, width, height, {
          isStatic: true,
        })

        this.obstacles.add('spikes', spike)
      }
    })

    this.matter.world.convertTilemapLayer(ground)
  }

  update(time, dt) {
    if (!this.playerController) {
      return
    }

    this.playerController.update(dt)
  }
}
