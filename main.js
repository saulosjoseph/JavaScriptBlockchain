const Chain = require('./chain.js');

let SauloCoin = new Chain();

SauloCoin.addBlock("Oi");
SauloCoin.addBlock("Olá");
SauloCoin.addBlock("Viva");

console.log(JSON.stringify(SauloCoin, null, 4));

console.log(SauloCoin.isChainValid());