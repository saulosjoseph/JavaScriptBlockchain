const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, data, previousHash){
        this.index = index;
        this.timestamp = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "Genesis Block", '0');
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(data){
        let index = this.chain.length;
        let newBlock = new Block(index, data, '0');
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let SauloCoin = new Blockchain();

SauloCoin.addBlock("Oi");
SauloCoin.addBlock("Olá");

console.log(JSON.stringify(SauloCoin, null, 4));

