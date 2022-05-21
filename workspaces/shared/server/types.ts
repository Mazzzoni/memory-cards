import { SocketExceptions } from './SocketExceptions';

export type ServerExceptionResponse = {
  exception: SocketExceptions;
  message?: string | object;
};