const Hapi = require('@hapi/hapi');
const Settings = require('./settings');
const server = new Hapi.Server({ port: Settings.port });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => 'Hello, World!'
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();