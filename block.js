"use strict"
const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, data, previousHash){
        this.index = index;
        this.timestamp = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.noun = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + this.noun + JSON.stringify(this.data)).toString();
    }

    mineHash(dificulty){
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
}

module.exports = Block;