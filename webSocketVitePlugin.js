import injectSocketIO from './src/lib/server/socketIoHandler.js';

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server) {
        injectSocketIO(server.httpServer);
    }
};