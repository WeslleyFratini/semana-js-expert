/*
node index.js \
    --username weslleyfratini \
    --room sala01 \
    --hostUri localhost
*/

import Events from "events";
import CliConfig from "./src/cliConfig.js";
import SocketClient from "./src/socker.js";
import TerminalController from "./src/terminalController.js";
import eventManager from "./src/eventManager.js";

const [nodePath, filePath, ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);

const componentEmitter = new Events();
const socketClient = new SocketClient(config);
await socketClient.initialize();

const eventManager = new EventManager({ componentEmitter, socketClient });
const data = {
  roomId: config.room,
  userName: config.userName,
};
eventManager.joinRoomAndWaitForMessages(data);

const controller = new TerminalController();
await controller.initializeTable(componentEmitter);
