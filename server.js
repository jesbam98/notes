'use strict';

const Path = require('path');
const Pug = require('pug');
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const Models = require('./lib/models/');
const Routes = require('./lib/routes');
const Settings = require('./settings');

const server = new Hapi.Server({ port: Settings.port });

const init = async () => {
    await server.register([ Vision, Inert ]);
    
    server.views({
        engines: { pug: Pug },
        path: Path.join(__dirname, 'lib/views'),
        compileOptions: {
            pretty: false,
        },
        isCached: Settings.env === 'production'
    });
    
    server.route(Routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

Models.sequelize.sync().then(() => {
    init();
});