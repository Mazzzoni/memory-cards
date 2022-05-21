import { ServerOptions, Socket } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { CONNECTION_EVENT } from '@nestjs/websockets/constants';

export class GameIoAdapter extends IoAdapter
{
  // Default options applied for each gateway
  private options = {
    cors: {
      origin: process.env.CORS_ALLOW_ORIGIN,
    },
    path: '/wsapi',
    transports: ['websocket'],
    serveClient: false,
    maxSocketListeners: 35,
  };

  createIOServer(port: number, options?: ServerOptions): any
  {
    return super.createIOServer(port, {...this.options, ...options});
  }

  public bindClientConnect(server: any, callback: Function)
  {
    server.on(CONNECTION_EVENT, (socket: Socket) => {
      socket.setMaxListeners(this.options.maxSocketListeners);
      callback(socket);
    });
  }
}
