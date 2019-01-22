#!/usr/bin/env node
import express = require('express');
import clear = require('clear');
import chalk = require('chalk');
import figlet = require('figlet');
import program = require('commander');
import bodyParser = require('body-parser');
import setup = require('./lib/setup');
import wallet = require('./lib/wallet');
import routes = require('./lib/routes');
// const Sign = require('./utils/sign');
// const spawn = require('./utils/spawn');

// Clear terminal & show message.
clear();
console.log(
	chalk.default(
		figlet.textSync('ETH-LOCAL', { horizontalLayout: 'full' })
	)
);

// Flags
program
	.version('0.1.0')
	.option('-s, --setup', 'Setup the wallet in your local drive.')
	.option('-S, --start', 'Start app.')
	.option('-w, --wallet', 'Wallet functionality.')
	.parse(process.argv);

if (!process.argv.slice(2).length) program.help(); // Show helper if no arguments are passed
else setup.Verify(); // Verify the setup

// Execute functions based on arguments
if (program.setup) {
  setup.init();
} else if (program.wallet) {
  wallet.Choose();
} else if (program.start) {
  const app: express = express();
  const PORT: number = 3210;
  app.use(bodyParser.json());
  app.listen(PORT);
  // Cross Origin middleware
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
  });
  app.use('/', routes);
}
