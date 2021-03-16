# phaser-platformer

[![Netlify Status](https://api.netlify.com/api/v1/badges/e9179379-a0be-44e5-986a-1bf88289cdaa/deploy-status)](https://app.netlify.com/sites/kim-platformer/deploys)
[![Build Status](https://www.travis-ci.com/Morrism1/phaser-platformer.svg?branch=ft%2Fgame)](https://www.travis-ci.com/Morrism1/phaser-platformer)
[![Maintainability](https://api.codeclimate.com/v1/badges/dd0e047e4387efd1306e/maintainability)](https://codeclimate.com/github/Morrism1/phaser-platformer/maintainability)

This is a platformer game Built with Phaser 3. I designed the character using TexturePacker with Assets from [Kenney's Site](kenney.nl) and the map with Tiled. I used MatterJs Physics instead of Arcade Physics which is commonly used.

![screely-game](https://user-images.githubusercontent.com/46853433/111025835-8d8a3700-83ef-11eb-8ea4-c254d3e0517c.png)

## Built With

- Phaser 3.52
- Javascript/Es6
- Tiled
- Texture Packer

## Live Demo

[Live Demo](https://kim-platformer.netlify.app/)

## Getting Started

To get a local copy of it and run it, follow these simple example steps.

- Git clone [Repo](https://github.com/Morrism1/phaser-platformer)

- Change the directory by `cd phaser-platformer`.

- Git checkout to your favorite branch and create a pull request if you want to add a new feature.

- Run `npm start` to start the development server.

### Prerequisites

- Code editor
- Browser

### Usage

Accessing the application requires a running server. This can easily be achieved from the project's root directory by running first `npm install` to install required dependencies and later `npm start` to start the server. The app will now be accessible at the following URL: `http://localhost:8080/`.

## Testing

- Run `npm install` to install required packages for testing and the whole project.
- Run `npm run test` to run the tests
- Tests are located in `./test`.

## Running The Game

1. You have cloned the repo, next go to the terminal.

2. Run `npm install` or `yarn` for yarn users also remember to remove `package-lock.json` if you use `yarn`

3. To start the development server run `npm start` or `yarn start`

4. The server will start automatically on `http://localhost:8080/` if not browse to `http://localhost:8080/`

5. For production, you can run `npm run build` or `yarn build`

## About My Game

I named my game `Kim's Game`. Kim is the main character of the game. She is an adventurer. she is going to run and jump collecting Cherries and avoiding walking on spikes which can reduce her health. But also there are health kits she can collect to get healed when walked on spikes.

1. The game, will load and be asked the put in your name. It is for connecting your scores with you.

2. After that, You will have 3 buttons namely:

   - `PLAY`: Click to start playing
   - `LEADERBOARD`: Click to View who is leading the scores
   - `CREDITS`: Click to see the acknowledgment to those who inspired the game.

3. When you click `play` the game starts and see the tilemap and the character, scores, and health bar.

4. When playing, try to avoid walking on spikes as they are going to remove `40%` from your health and the health kit will only add `10%` to your health.

5. Each Cherry collected, you will get `10` points added to your scores.

6. When your health ends that will be game over.

## Game Movements

- A player can be operated by using keyboard cursors arrows (←, →, ↑).

- To run to the left, click ←, to the right, click →, and to jump up, click ↑

- A player can double jump, to do it, click ↑ again in the air.

## Author Details

👤 **Maurice MURANGWA**

- Github: [@Morrism1](https://github.com/Morrism1)

- Twitter: [@MorrisMontana0](https://twitter.com/MurangwaMorris)

- Linkedin: [Maurice Murangwa](https://www.linkedin.com/in/mauricemurangwa/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show your support

Give and ⭐️ if you like this project!

## Acknowledgements

- [SuperTommy from Ourcade](https://ourcade.co)
- [Kenney](https://kenney.nl)
- [Phaser 3](https://phaser.io/phaser3)
- [Texture Packer](https://www.codeandweb.com/texturepacker)
- [Tiled from mapeditor](https://www.mapeditor.org/)
