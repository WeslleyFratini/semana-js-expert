import { constants } from "./constants.js";
export default class Controller {
  #users = new Map();
  #rooms = new Map();

  constructor({ socketServer }) {
    this.socketServer = socketServer;
  }
  onNewConnection(socket) {
    const { id } = socket;
    console.log("connection stablished with", id);
    const userData = { id, socket };
    this.#updateGlobalUserData(id, userData);

    socket.on("data", this.#onSocketData(id));
    socket.on("error", this.#onSocketClosed(id));
    socket.on("end", this.#onSocketClosed(id));
  }

  async joinRoom(socketId, data) {
    const userData = data;
    console.log(`${userData.username} joined ${[socketId]}`);
    const user = this.#updateGlobalUserData(socketId, userData);

    const { roomId } = userData;
    const users = this.#joinUserOnRoom(roomId, user);

    const currentUsers = Array.from(users.values()).map(({ id, userName }) => ({
      username,
      id,
    }));

    this.socketServer.sendMessage(
      userData.socket,
      constants.event.UPDATE_USERS
    );
  }

  #joinUserOnRoom(roomId, user) {
    const userOnRoom = this.#rooms.get(roomId) ?? new Map();
    userOnRoom.set(user.id, user);
    this.#rooms.set(roomId, userOnRoom);

    return userOnRoom;
  }

  #onSocketClosed(id) {
    return (data) => {
      console.log("onSocketClosed", id);
    };
  }
  #onSocketData(id) {
    return (data) => {
      try {
        const { event, message } = JSON.parse(data);
        this[event](id, message);
      } catch (error) {
        console.error("wrong event format!!", data.toString());
      }
    };
  }

  #updateGlobalUserData(socketId, userData) {
    const users = this.#users;
    const user = users.get(socketId) ?? {};

    const updatedUserData = {
      ...user,
      ...userData,
    };

    users.set(socketId, updatedUserData);

    return users.get(socketId);
  }
}
