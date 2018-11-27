"use strict"

const Block = require('./block.js');

class Chain{

    constructor(){
        this.difficulty = 3;
        this.chain = [this.createGenesisBlock()];        
    }

    createGenesisBlock(){
        let genesisBlock = new Block(0, "Genesis Block", '0');
        genesisBlock.mineHash(this.difficulty);
        return genesisBlock;
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(data){
        let index = this.chain.length;
        let newBlock = new Block(index, data, '0');
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.mineHash(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i  = 1; i < this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            } else if (currentBlock.previousHash !== previousBlock.calculateHash()){
                console.log(currentBlock.previousHash);
                console.log(previousBlock.calculateHash());
                console.log("B");
                return false;
            }
        }
        return true;
    }
}

module.exports = Chain;