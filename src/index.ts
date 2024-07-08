import WebSocket from 'ws';
import dotenv from 'dotenv';
import { logger } from './common/logger';
dotenv.config();

const ws = new WebSocket(process.env.WSS_URL || '', {
  headers: {
    Auth: process.env.WSS_AUTH,
  },
});

ws.on('error', console.error);

ws.on('open', function open() {
  logger.info('connected');
  logger.debug('sending ping');
  ws.ping();
  logger.debug('ping sent');
});

ws.on('message', function message(data) {
  logger.info('received: %s', data);
});

ws.on('pong', function pong() {
  logger.debug('received pong');
});
