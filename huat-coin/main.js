// From Pull Stack Developer: AT
// For Consensys Blockchain BootCamp
// Reference from: 
// https://github.com/cooganb/bitcoin-whitepaper-exercises
// https://github.com/tspoff/bitcoin-whitepaper-exercises/blob/master/hashing/hashing.js
// https://www.youtube.com/watch?v=zVqczFZr124
// Consensys Study Group
// Version: 0.1
// Date: 12/9/2021

const crypto = require('crypto');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash("sha256").update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString()).digest("hex");
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.createGensisBlock()];
    }
    createGensisBlock() {
        return new Block(0, "12/9/2021", "1st Huat Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(data) {
        let newBlock = new Block(this.chain.length, Date.now(), data, this.getLatestBlock().hash);
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            if (!Boolean(currentBlock.data) || !Number.isInteger(currentBlock.index) ){
                return false;
            }
        }
     
        return true;
    }
}

// Create new blockchain huatCoin
let huatCoin = new Blockchain();
huatCoin.addBlock({amount: 8});
huatCoin.addBlock({amount: 16});

// Print blockchain records
console.log(JSON.stringify(huatCoin, null, 2));

// Check if blockchain is valid without tampering
console.log('Is Huatchain valid? ' + huatCoin.isChainValid());