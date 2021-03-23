import Events from "events";
import TerminalController from "./src/terminalController.js";

const componentEmiiter = new Events();

const controller = new TerminalController();
await controller.initializeTable(componentEmiiter);
