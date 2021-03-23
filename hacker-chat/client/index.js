/*
    node index.js \
    --username weslleyfratini \
    --room sala 01 \
    --hostUri localhost \
*/

import Events from "events";
import CliConfig from "./src/cliConfig.js";
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...comands] = process.argv;
const config = CliConfig.parseArguments(comands);
console.log("config", config);
const componentEmitter = new Events();

//const controller = new TerminalController();
//await controller.initializeTable(componentEmitter);
