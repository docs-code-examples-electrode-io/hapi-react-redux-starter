import Webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';

const hapiWebpackDevMiddlewarePlugin = {
  register: function (server, options, next) {
    const config = options.config;
    const compiler = Webpack(config);
    server.app.webpackCompiler = compiler;
    const middleware = WebpackDevMiddleware(compiler, options.options);

    server.ext('onRequest', (request, reply) => {

      const req = request.raw.req;
      const res = request.raw.res;

      middleware(req, res, (err) => {

        if (err) {
          return reply(err);
        }

        return reply.continue();
      });
    });

    next();
  }
};

hapiWebpackDevMiddlewarePlugin.register.attributes = {
  name: 'hapi-webpack-dev-middleware-plugin',
  version: '0.0.1'
};

export default hapiWebpackDevMiddlewarePlugin;
