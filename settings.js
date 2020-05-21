require('dotenv').config({ silent: true });

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'development',

    // Enviroment-depending settings
    development: {
        db: {
            dialect: 'sqlite',
            storage: ':memory',
            operatorsAliases: false,
        },
    },
    production: {
        db: {
            dialect: 'sqlite',
            storage: 'db/database.sqlite',
            operatorsAliases: false,
        }
    }
};
