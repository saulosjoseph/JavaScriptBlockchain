"use strict"
const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(transactions, previousHash){
        this.timestamp = new Date();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.noun = 0;
    }

    calculateHash(){
        return SHA256(this.timestamp + this.previousHash + this.noun + JSON.stringify(this.transactions)).toString();
    }

    mineBlock(dificulty){
        console.log("Mining Block...");
        let begin = Math.round(new Date() / 1000);
        while(this.hash.substring(0, dificulty) !== Array(dificulty + 1).join("0")){
            this.noun++;
            this.hash = this.calculateHash();
        }
        let end = Math.round(new Date() / 1000);
        console.log("Block mined: "+ this.hash);
        console.log("In " + (end - begin) + " seconds");
    }

    hasValidTransactions(){
        for(const tx of this.transactions){
            if(!tx.isValid()){
                return false;
            }
        }
        return true;
    }
}

module.exports = Block;