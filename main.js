const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previoushash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = '';
    }

    calculateHash() {
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, '01/01/2018', 'Genesis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let shreeCoin = new Blockchain();
shreeCoin.addBlock(new Block(1, '02/04/2018', { amount : 4}));
shreeCoin.addBlock(new Block(2, '10/04/2018', { amount: 10 }));

console.log(JSON.stringify(shreeCoin, null, 4));