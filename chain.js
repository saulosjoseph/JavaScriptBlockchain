"use strict"

const Block = require('./block.js');
const Transaction = require('./transaction.js');

class Chain{

    constructor(){
        this.difficulty = 1;
        this.chain = [this.createGenesisBlock()];        
        this.pendingTransactions = [];
        this.miningReward = 1;
    }

    createGenesisBlock(){
        let genesisBlock = new Block("Genesis Block", '0');
        genesisBlock.mineBlock(this.difficulty);
        return genesisBlock;
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePedingTransactions(mineRewardAddres){
        const rewardTx = new Transaction(null, mineRewardAddres, this.miningReward);
        this.pendingTransactions.push(rewardTx);
        let block = new Block(this.pendingTransactions, this.getLastBlock().hash);
        block.mineBlock(this.difficulty);   
        console.log("Block sucessfully mined!");
        this.chain.push(block);
        this.pendingTransactions = [];
    }

    addTransaction(transaction){

        if(!transaction.fromAdress || !transaction.toAdress){
            throw new Error('Transaction must include from and to addres');
        }
        if(!this.isChainValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAdress(adress){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAdress === adress){
                    balance -= trans.amount;
                }
                if(trans.toAdress === adress){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i  = 1; i < this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if(!currentBlock.hasValidTransactions()){
                return false;
            }

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