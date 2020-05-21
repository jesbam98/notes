const Hapi = require('@hapi/hapi');
const Models = require('./lib/models/');
const Routes = require('./lib/routes');
const Settings = require('./settings');
const server = new Hapi.Server({ port: Settings.port });

server.route(Routes);

const init = async () => {
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