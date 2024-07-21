/*
 * @Author: 孙浩林 sunhaolin@steedos.com
 * @Date: 2024-07-16 20:06:26
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2024-07-21 16:40:36
 * @FilePath: /steedos-oidc-server/express.js
 * @Description:
 */
/* eslint-disable no-console */

// 加载环境变量
import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

import * as path from 'node:path';
import * as url from 'node:url';

import { dirname } from 'desm';
import express from 'express'; // eslint-disable-line import/no-unresolved
import helmet from 'helmet';

import Provider from 'oidc-provider'; // from 'oidc-provider';

import Account from './support/account.js';
import configuration from './support/configuration.js';
import routes from './routes/express.js';

const __dirname = dirname(import.meta.url);

const { PORT = 3000, ISSUER = `http://localhost:${PORT}`, DEBUG } = process.env;
configuration.findAccount = Account.findAccount;

const app = express();

const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
delete directives['form-action'];
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: false,
    directives,
  },
}));


if(DEBUG == 'true'){
  app.set('views', path.join(__dirname, 'views', 'debug'));
}else{
  app.set('views', path.join(__dirname, 'views', 'production'));
}

app.set('view engine', 'ejs');

let server;
try {
  let adapter;
  if (process.env.MONGODB_URI) {
    ({ default: adapter } = await import('./adapters/mongodb.js'));
    await adapter.connect();
    console.log('>>>>>>>>>>使用process.env.MONGODB_URI')
  }

  const prod = process.env.NODE_ENV === 'production';

  const provider = new Provider(ISSUER, { adapter, ...configuration });

  if (prod) {
    app.enable('trust proxy');
    provider.proxy = true;

    app.use((req, res, next) => {
      if (req.secure) {
        next();
      } else if (req.method === 'GET' || req.method === 'HEAD') {
        res.redirect(url.format({
          protocol: 'https',
          host: req.get('host'),
          pathname: req.originalUrl,
        }));
      } else {
        res.status(400).json({
          error: 'invalid_request',
          error_description: 'do yourself a favor and only use https',
        });
      }
    });
  }

  routes(app, provider);
  app.use(provider.callback());
  server = app.listen(PORT, () => {
    console.log(`application is listening on port ${PORT}, check its /.well-known/openid-configuration`);
  });
} catch (err) {
  if (server?.listening) server.close();
  console.error(err);
  process.exitCode = 1;
}
