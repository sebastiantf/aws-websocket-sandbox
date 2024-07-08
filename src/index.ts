import WebSocket from 'ws';
import dotenv from 'dotenv';
import { logger } from './common/logger';
dotenv.config();

let isAlive = false;

const ws = new WebSocket(process.env.WSS_URL || '', {
  headers: {
    Auth: process.env.WSS_AUTH,
  },
});

ws.on('error', console.error);
ws.on('close', function close() {
  logger.info('disconnected');
  logger.debug('clearing interval');
  clearInterval(interval);
});

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
  logger.debug('setting isAlive to true');
  isAlive = true;
});

const interval = setInterval(function ping() {
  logger.debug('setting isAlive to false');
  isAlive = false;
  logger.debug('sending ping');
  ws.ping();
}, 5000);
