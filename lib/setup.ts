import inquirer = require('inquirer');
import api = require('eth-local-api');
import logger = require('./logger');
import constants = require('./constants');

const question = [{
  name: 'input',
  type: 'confirm',
  message: `Create directory ${constants.ETH_HOME} in ${constants.HOME_DIR}?`
}];

export function Verify() {
	console.log("Checking if ${constants.ETH_HOME} exists in ${constants.HOME_DIR}...");
	if (api.utils.verify()) {
		logger.log("Directory structure not found! Please run setup");
	} else {
		console.log(`${constants.ETH_HOME} found in ${constants.HOME_DIR}!`);
	}
}

export async function init() {
	const res = await inquirer.prompt(question);
	if (res.input) {
		logger.log("Creating directory...");
		if (api.utils.setup()) {
			logger.log("Successfully created directory!");
		} else {
			logger.error("Error creating directory!");
		}
	} else {
		logger.error("User declined setup.");
	}
}
