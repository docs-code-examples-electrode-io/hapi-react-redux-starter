import WebpackHotMiddleware from 'webpack-hot-middleware';

const hapiWebpackHotMiddlewarePlugin = {
  register: function (server, options, next) {
    const compiler = server.app.webpackCompiler;
    const middleware = WebpackHotMiddleware(compiler, options.options);

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

hapiWebpackHotMiddlewarePlugin.register.attributes = {
  name: 'hapi-webpack-hot-middleware-plugin',
  version: '0.0.1',
  dependencies: ['hapi-webpack-dev-middleware-plugin']
};

export default hapiWebpackHotMiddlewarePlugin;