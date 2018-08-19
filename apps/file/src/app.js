const { Application } = require('../../../common');
const Config = require('./config');

const app = new Application(Config);

app.start();
