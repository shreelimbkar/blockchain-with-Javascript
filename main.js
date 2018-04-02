const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previoushash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = '';
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Blocked mined: ', this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createShreesBlock()];
        this.difficulty = 4;
    }

    createShreesBlock() {
        return new Block(0, '01/01/2018', 'Shrees Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previoushash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previoushash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
 }

let shreeCoin = new Blockchain();
console.log('Mining Block 1...');
shreeCoin.addBlock(new Block(1, '02/04/2018', { amount : 4}));

console.log('Mining Block 2...');
shreeCoin.addBlock(new Block(2, '01/04/2018', { amount: 10 }));


// console.log(JSON.stringify(shreeCoin, null, 4));
// console.log('Is blockchain is Valid? ', shreeCoin.isChainValid());