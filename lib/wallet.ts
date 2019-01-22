import ethers = require('ethers');
import inquirer = require('inquirer');
import fs = require('fs');
import path = require('path');
import api = require('eth-local-api');
import constants = require('./constants');
import logger = require('./logger')

const createQuestions = [{
		name: 'walletName',
		type: 'input',
		message: `Desired wallet name? (default public address)`
	},
	{
		name: 'createConfirm',
		type: 'confirm',
		message: 'Please write down your mnemonic, confirm once written down.'
	},
	{
		name: 'choose',
		type: 'list',
		message: 'Please choose a wallet action:',
		choices: ['Create Wallet', 'Get Balance']
	},
	{
		name: 'password',
		type: 'password',
		message: 'Please choose a password to encrypt your wallet:'
	},
	{
		name: 'confirmPassword',
		type: 'password',
		message: 'Re-type password:'
	},
];

export async function Choose() {
	const res = await inquirer.prompt(createQuestions[2]);
	switch (res.choose) {
		case 'Create Wallet':
			createWallet();
			break;
		case 'Get Balance':
			logger.error('Not supported yet!');
			break;
	}

}

async function createWallet() {
	const resName = await inquirer.prompt(createQuestions[0]);
  const passRes = await inquirer.prompt(createQuestions.slice(3,5));
  if (passRes.password !== passRes.confirmPassword) {
    logger.error("Passwords do not match!");
  }

  // Generate wallet
  const wallet = ethers.Wallet.createRandom();
  const walletName = resName.walletName === "" ? wallet.address : `${resName.walletName} - ${wallet.address}`;
  const filePath = path.join(constants.FULL_PATH, walletName);

  if (api.wallet.createWallet(passRes.password, walletName)) {
    logger.log(`\nSuccessfully created ${walletName} \n at ${filePath}`);
  } else {
  	logger.error("Could not create wallet, check logs!");
	}

}

// function percentLoader(percent) {
// 	process.stdout.clearLine();
// 	process.stdout.cursorTo(0);
// 	process.stdout.write(`Encrypting... ${parseInt(percent * 100)}%`);
// }

export function getWallets() {
	let files = fs.readdirSync(constants.FULL_PATH);
	let wallets = {};
	files.map((file, i) => {
	  logger.debug(`Found file: ${file}`);
	  // Get name from 'name - address'
	  wallets[file.split('-')[1].trim()] = constants.FULL_PATH + '/' + file
	});
	logger.debug('Wallets found:', wallets);
	return wallets
}

module.exports = { Choose, getWallets } ;
