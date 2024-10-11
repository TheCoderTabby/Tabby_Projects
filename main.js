import { world } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

let mainUi = createMainUi();

world.afterEvents.itemUse.subscribe((event) => {
    const { source, itemStack } = event;
    if (["minecraft:compass"].includes(itemStack.typeId)) {
        mainUi = createMainUi(source);

        mainUi.show(source).then(r => {
            if (r.selection !== undefined && r.selection < mainUi.buttonActions.length) {
                mainUi.buttonActions[r.selection]();
            }
        });
    }
});

function createMainUi(source) {
    const ui = new ActionFormData()
        .title("Test UI")
        .body(source ? `Hallo ${source.nameTag}!` : "Hallo Player!");
    const buttonActions = [];

    ui.button("Orte");
    buttonActions.push(() => Orte(source));

    ui.buttonActions = buttonActions;

    return ui;
}

function Orte(player) {
    const ui = new ActionFormData()
        .title("Orte")
        .body(`Wohin soll es gehen?`);
    const buttonActions = [];

    ui.button("Spawn");
    buttonActions.push(() => player.runCommandAsync("tp -41 65 -50"))

    ui.show(player).then(r => {
        if (r.selection !== undefined && r.selection < ui.buttonActions.length) {
            ui.buttonActions[r.selection]();
        }
    });
    ui.buttonActions = buttonActions;
} 