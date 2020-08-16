import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';

const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = new Router();

app.use(cors());

app.use(router.routes());

app.listen({port: PORT}, () => console.log(`Listening on port ${PORT}`));
