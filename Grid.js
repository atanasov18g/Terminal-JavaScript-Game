import { EnemyObject } from "./EnemyObject.js";
import { GridObject } from "./GridObject.js";
import { ItemObject } from "./ItemObject.js";
import { Player } from "./Player.js"
import { promptPlayerForDirection } from "./playerPrompts.js";



class Grid {

    #currentObject;


    constructor(height, width, playerStartX = 0, playerStartY = height - 1) {
        this.height = height;
        this.width = width
        this.playerX = playerStartX;
        this.playerY = playerStartY;
        this.player = new Player("Bus-Kun", { attack: 7, defence: 3, hp: 20 })



        this.grid = [];

        for (let row = 0; row < height; row++) {
            let thisRow = [];
            for (let col = 0; col < width; col++) {
                thisRow.push(new GridObject())
            }
            this.grid.push(thisRow)
        }

        this.grid[height - 1][0] = new GridObject("🚍", "player")
        this.grid[0][width - 1] = new GridObject("🍁", "win")

        this.startGame();

    }


    async startGame() {
        while (this.player.getStats().hp > 0) {
            this.displayGrid();
            const response = await promptPlayerForDirection();


            switch (response) {
                case "Up": {
                    this.movePlayerUp()
                    break;
                }
                case "Down": {
                    this.movePlayerDown()
                    break;
                }
                case "Left": {
                    this.movePlayerLeft()
                    break;
                }
                case "Right": {
                    this.movePlayerRight()
                    break;
                }
            }

            console.log("--------------------         ----------------------");

        }
    }


    displayGrid() {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                // console.log(this.grid[row][col]);
                process.stdout.write(this.grid[row][col].sprite)
                process.stdout.write("\t")
            }
            process.stdout.write("\n")
        }

        console.log("--------------------         ----------------------");
    }


    generateGridObject() {
        const random = Math.random();
        let object;
        if (random < 0.15) {
            const randomItem = Math.random();
            if (randomItem < 0.15) {
                object = new ItemObject('🛑', {
                    name: 'Stop Sign',
                    attack: 1,
                    defence: 2,
                    hp: 0,
                })
            } else if (randomItem < 0.35) {
                object = new ItemObject('🛒', {
                    name: 'Shop Cart',
                    attack: 4,
                    defence: 0,
                    hp: 0,
                })
            } else if (randomItem < 0.75) {
                object = new ItemObject('🍔', {
                    name: 'Burger',
                    attack: 0,
                    defence: 0,
                    hp: 5,
                })
            } else if (randomItem < 0.85) {
                object = new ItemObject('🍀', {
                    name: 'Four Leaf Clover',
                    attack: 1,
                    defence: 1,
                    hp: 1,
                })
            } else {
                object = new ItemObject('🥖', {
                    name: 'Legendary Baguette',
                    attack: 10,
                    defence: 10,
                    hp: 10,
                })
            }

        } else if (random < 0.51) {
            const randomEnemy = Math.random();
            if (randomEnemy < 0.10) {
                object = new EnemyObject('🧛‍♂️', {
                    name: "Vampire",
                    attack: 4,
                    defence: 4,
                    hp: 3,
                })
            } else if (randomEnemy < 0.20) {
                object = new EnemyObject('🏍', {
                    name: "Motorcycle",
                    attack: 5,
                    defence: 1,
                    hp: 1,
                })
            } else if (randomEnemy < 0.30) {
                object = new EnemyObject('🐴', {
                    name: "Horse",
                    attack: 2,
                    defence: 2,
                    hp: 2,
                })
            } else if (randomEnemy < 0.40) {
                object = new EnemyObject('♟', {
                    name: "Pawn",
                    attack: 1,
                    defence: 3,
                    hp: 5,
                })
            } else if (randomEnemy < 0.50) {
                object = new EnemyObject('🎃', {
                    name: "Pumpkin Head",
                    attack: 2,
                    defence: 5,
                    hp: 5,
                })
            } else if (randomEnemy < 0.60) {
                object = new EnemyObject('💧', {
                    name: "Rainy Day",
                    attack: 4,
                    defence: 0,
                    hp: 40,
                })
            } else if (randomEnemy < 0.70) {
                object = new EnemyObject('🚛', {
                    name: "Truck-Kun",
                    attack: 6,
                    defence: 6,
                    hp: 32,
                })
            } else if (randomEnemy < 0.80) {
                object = new EnemyObject('🚦', {
                    name: "Traffic Light",
                    attack: 1,
                    defence: 6,
                    hp: 1,
                })
            } else if (randomEnemy < 0.97) {
                object = new EnemyObject('🐲', {
                    name: "Dragon",
                    attack: 10,
                    defence: 10,
                    hp: 40,
                })
            }

        } else {
            object = new GridObject("🪔", "discovered")
        }

        return object

    }

    executeTurn() {
        if (this.grid[this.playerY][this.playerX].type === "win") {
            console.log("You reached the goal! 🥇");
            process.exit()
        }

        if (this.grid[this.playerY][this.playerX].type === "discovered") {
            this.#currentObject.describe();
            return;
        }


        if (this.#currentObject.type === 'item') {
            this.#currentObject.describe();
            const itemStats = this.#currentObject.getStats();
            this.player.addToStats(itemStats);
            console.log(`New Stats:${this.player.describe()}`);
            return;
        }

        if (this.#currentObject.type === 'enemy') {
            console.log(this.#currentObject);
            this.#currentObject.describe();

            const enemyStats = this.#currentObject.getStats();
            const enemyName = this.#currentObject.getName();
            const playerStats = this.player.getStats();

            if (enemyStats.defence > playerStats.attack) {
                console.log(`${enemyName} was too powerful. You are destroyed.`);
                process.exit();
            }

            let totalPlayerDamage = 0;
            while (enemyStats.hp > 0) {
                const enemyDamageTurn = playerStats.attack - enemyStats.defence
                const playerDamageTurn = enemyStats.attack - playerStats.defence;

                if (enemyDamageTurn > 0) {
                    enemyStats.hp -= enemyDamageTurn;
                }
                if (playerDamageTurn > 0) {
                    playerStats.hp -= playerDamageTurn
                    totalPlayerDamage += playerDamageTurn
                }
            }

            if (playerStats.hp <= 0) {
                console.log(`You are destroyed - ${enemyName} too strong.`);
                process.exit();
            }

            this.player.addToStats({ hp: -totalPlayerDamage });
            console.log(`You defeated the ${enemyName}! Your remaining strength:`);
            this.player.describe();

        }
    }

    movePlayerRight() {
        if (this.playerX === this.width - 1) {
            console.log("Cannot move right.");
            return
        }

        this.grid[this.playerY][this.playerX] = new GridObject("🪔", "discovered")
        this.playerX += 1;


        if (this.grid[this.playerY][this.playerX].type === 'discovered') {
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject("🚍");
            return;
        }



        this.#currentObject = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject("🚍");


    }
    movePlayerLeft() {
        if (this.playerX === 0) {
            console.log("Cannot move left.");
            return
        }

        this.grid[this.playerY][this.playerX] = new GridObject("🪔", "discovered")
        this.playerX -= 1;


        if (this.grid[this.playerY][this.playerX].type === 'discovered') {
            this.grid[this.playerY][this.playerX] = new GridObject("🚍");
            this.grid[this.playerY][this.playerX].describe();
            return;
        }



        this.#currentObject = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject("🚍");


    }
    movePlayerUp() {
        if (this.playerY === 0) {
            console.log("Cannot move up.");
            return
        }

        this.grid[this.playerY][this.playerX] = new GridObject("🪔", "discovered")
        this.playerY -= 1;


        if (this.grid[this.playerY][this.playerX].type === 'discovered') {
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject("🚍");
            return;
        }



        this.#currentObject = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject("🚍");


    }
    movePlayerDown() {
        if (this.playerY === this.height - 1) {
            console.log("Cannot move down.");
            return
        }

        this.grid[this.playerY][this.playerX] = new GridObject("🪔", "discovered")
        this.playerY += 1;


        if (this.grid[this.playerY][this.playerX].type === 'discovered') {
            this.grid[this.playerY][this.playerX].describe();
            this.grid[this.playerY][this.playerX] = new GridObject("🚍");
            return;
        }



        this.#currentObject = this.generateGridObject();
        this.executeTurn();
        this.grid[this.playerY][this.playerX] = new GridObject("🚍");


    }


}

new Grid(10, 5)