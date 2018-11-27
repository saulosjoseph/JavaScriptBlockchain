"use strict"

const Block = require('./block.js');

class Chain{

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

    isChainValid(){
        for(let i  = 1; i < this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            } else if (currentBlock.previousHash !== previousBlock.calculateHash()){
                return false;
            }
        }
        return true;
    }
}

module.exports = Chain;