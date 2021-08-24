const pkg = require('./package.json');

module.exports = {
    openapi: '3.0.2',
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  apis: [
    './src/app/controllers/**/*.ts',
    './src/app/controllers/**/*.js',
    './app/controllers/**/*.ts',
    './app/controllers/**/*.js',
  ],
};

