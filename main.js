const Chain = require('./chain.js');
const Transaction = require('./transaction.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('8f8646336273ed1bb606de00e0dedb9d184e45f8607c6e979af1ce8cacc2b89e');
const myWalletAdress = myKey.getPublic('hex');

let SauloCoin = new Chain();

const tx1 = new Transaction(myWalletAdress, 'public key goes here', 1);
tx1.signTransaction(myKey);

SauloCoin.addTransaction(tx1);

SauloCoin.minePedingTransactions(myWalletAdress);

console.log(SauloCoin.getBalanceOfAdress(myWalletAdress));




console.log(SauloCoin.isChainValid());