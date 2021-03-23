import http from "http";

export default class SocketServer {
  constructor({ port }) {
    this.port = port;
  }

  async initizalize(eventEmitter) {
    const server = (http = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("hey there");
    }));

    return new Promise((resolve, reject) => {
      server.on("error");
      server.listen(this.port, () => resolve(server));
    });
  }
}
