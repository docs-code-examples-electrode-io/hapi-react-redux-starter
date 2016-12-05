import Open from 'open';
import Path from 'path';
import Hapi from 'hapi';
import HapiWebpackDevMiddlewarePlugin from './hapiWebpackDevMiddlewarePlugin';
import HapiWebpackHotMiddlewarePlugin from './hapiWebpackHotMiddlewarePlugin';
import Config from '../../webpack.config.dev';

/* eslint-disable no-console */

const server = new Hapi.Server();
const port = 3000;

server.connection({
  port: port
});

server.register([
  {
    register: HapiWebpackDevMiddlewarePlugin,
    options: {
      config: Config,
      options: {
        noInfo: true,
        publicPath: Config.output.publicPath
      }
    }
  },
  {
    register: HapiWebpackHotMiddlewarePlugin
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
      response.file(Path.join( __dirname, '../../source/index.html'));
    }
  });
});

server.start(function() {
  console.log('server running @ ' + port);
  Open(`http://localhost:${port}`);
});
