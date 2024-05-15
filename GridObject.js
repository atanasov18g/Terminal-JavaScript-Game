class GridObject {
    #backgroundSprites = ["🌳", "🌲", "🌴"]

    constructor(sprite, type = 'undiscovered') {
        if (!sprite) {
            const randomIndex = Math.floor(
                Math.random() * this.#backgroundSprites.length
            );
            this.sprite = this.#backgroundSprites[randomIndex];
        } else {
            this.sprite = sprite
        }
        this.type = type;
    }


    describe() {
        const number = Math.random();
        if (number < 0.33) {
            console.log("Coast is clear! Place Discovered!");
        } else if (number < 0.66){
            console.log("Nothing here");
        } else {
            console.log("Already been here.");
        }

    }


}


export { GridObject };