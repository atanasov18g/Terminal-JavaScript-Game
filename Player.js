class Player {

    #stats = {
        attack: 0,
        defence: 0,
        hp: 0,
    }

    constructor(name, stats) {
        this.name = name;
        this.#stats = stats
    }

    getName() {
        return this.name
    }


    getStats() {
        return {
            attack: this.#stats.attack,
            defence: this.#stats.defence,
            hp: this.#stats.hp,
        }
    }


    addToStats(statsObject) {
        if (statsObject.attack) {
            this.#stats.attack += statsObject.attack;
        }
        if (statsObject.defence) {
            this.#stats.defence += statsObject.defence;
        }
        if (statsObject.hp) {
            this.#stats.hp += statsObject.hp;
        }
    }

    describe() {
        const stats = this.#stats
        console.log(`Player Stats: HP:${stats.hp} ATK:${stats.attack} DEF:${stats.defence}`);
    }


}
export { Player }