import http from 'http';
import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import serve from 'koa-static';
import socketio from 'socket.io';
import graphqlServer from './graphql/server';

const PORT = process.env.STANDUP_ROCKS_PORT || 3000;
const app = new Koa();
const router = new Router();

app.use(cors());

graphqlServer.applyMiddleware({app, path: '/graphql'});

const server = http.createServer(app.callback());
export const io = socketio(server);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
