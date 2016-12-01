import path from 'path';
import config from '../../webpack.config.dev';
import open from 'open';

import Hapi from 'hapi';
import hapiWebpackDevMiddlewarePlugin from './hapiWebpackDevMiddlewarePlugin';
import hapiWebpackHotMiddlewarePlugin from './hapiWebpackHotMiddlewarePlugin';

/* eslint-disable no-console */

const server = new Hapi.Server();
const port = 3000;

server.connection({
  port: port
});

server.register([
  {
    register: hapiWebpackDevMiddlewarePlugin,
    options: {
      config: config,
      options: {
        noInfo: true,
        publicPath: config.output.publicPath
      }
    }
  },
  {
    register: hapiWebpackHotMiddlewarePlugin
  }
]);

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: function (request, response) {
      response.file(path.join( __dirname, '../../source/index.html'));
    }
  });
});

server.start(function() {
  console.log('server running at: ' + server.info.uri);
  open(`http://localhost:${port}`);
});
