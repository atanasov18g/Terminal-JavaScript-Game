import inquirer from "inquirer";


async function promptPlayerForDirection() {
    const results = await inquirer.prompt({
        type: 'list',
        name: 'direction',
        message: 'Which direction are you going?',
        choices: ["Up", "Down", "Left", "Right"]
    })
    return results.direction
}

export { promptPlayerForDirection }