import Open from 'open';
import Path from 'path';
import Hapi from 'hapi';
import HapiWebpackDevMiddlewarePlugin from './hapiWebpackDevMiddlewarePlugin';
import HapiWebpackHotMiddlewarePlugin from './hapiWebpackHotMiddlewarePlugin';
import Config from '../../webpack.config.dev';

import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../source/store/configureStore';
import App from '../../source/components/App';

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
    handler: handleRender
  });
});

function handleRender(req, res) {
  const store = configureStore();
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const preloadedState = store.getState();
  res(renderFullPage(html, preloadedState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Hapi React Redux Starter</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `;
}

server.start(function() {
  /* eslint-disable no-console */

  console.log('server running @ port ' + port);
  Open(`http://localhost:${port}`);
});
