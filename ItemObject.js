import { GridObject } from "./GridObject.js";

class ItemObject extends GridObject {
    #stats = {
        name: null,
        attack: 0,
        defence: 0,
        hp: 0
    }


    constructor(sprite, stats) {
        super(sprite);
        this.type = 'item'
        this.#stats = stats;
    }

    itemName() {
        return this.#stats.name
    }

    getStats() {
        return {
            attack: this.#stats.attack,
            defence: this.#stats.defence,
            hp: this.#stats.hp
        }
    }

    describe() {
        const stats = this.#stats;
        console.log(`${this.sprite} You found a ${stats.name}`);
        console.log(`${stats.name}'s Stats: Hp: ${stats.hp} ATK:${stats.attack} DEF: ${stats.defence}`);
    }


}

export { ItemObject }