import express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send({connected: true}));

// router.get('/getAccounts', (req, res) => {
//   console.log('Received request');
// });
//
// router.get('/req', (req, res) => {
// 	const to = req.query.to
// 	const value = req.query.value
// 	console.log('received ' + to + " " + value );
// });
//
// router.get('/wallets', (req, res) => {
// 	res.send(Wallet.getWallets());
// })
//
// // used for Web3 tx signing
// var node_endpoint = "http://127.0.0.1:8545"
// var Web3 = require("web3");
// var web3 = new Web3(new Web3.providers.HttpProvider(node_endpoint));
// var addr1 = "0x781eD7a40BE08584fCd086e3e8337154B20B4e3B";  // test from account
//
// router.post('/transactionDetails', async(req, res) => {
//     //const from = req.body.from
//     //TODO: determine why req.body.from is undefined for me (ed)
//     debug('req.body.from:', req.body.from)
//     const from = req.body.from//'0xd9Ccb5FFd474b7830e41a03E1675084b3e27DBd4';
//     const to = req.body.to
//     const value = new BN(req.body.value);
//     //TODO: Find better way of getting user password
//     const password = 'password';
//
//     let realPW = await spawn.start()
//
//     var rawTx = {};
//     rawTx.nonce = web3.utils.toHex(web3.eth.getTransactionCount(from));
//     rawTx.to = to;
//     rawTx.gasPrice = web3.utils.toHex(31000000000);
//     rawTx.gasLimit = web3.utils.toHex(21000);
//     rawTx.value = web3.utils.toHex(web3.utils.toWei(value, 'ether'));
//     rawTx.data = "";
//
//
//     Sign.SignTX(rawTx, from, password).then((val) => {
//         console.log('signed digest: ', val);
//         signedTransactionObject = val;
//     }).catch(function(error) {
//       console.log(error);
//     });
//
//     console.log("to: " + to);
//     console.log("from: " + from);
//     console.log("value: " + value);
//     console.log("rawTX: ", rawTx);
// })
//
// router.get("/getSignedTransaction", (req, res) => {
//   console.log(signedTransactionObject);
//   res.send(signedTransactionObject);
// })
//

module.exports = router;
