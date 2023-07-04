import socketServer from './server.js';

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        socketServer(server.httpServer);
    }
};