
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://192.168.103.100:18545'));

var coinbase = web3.eth.coinbase;
console.log(coinbase);


var bnum  = web3.eth.blockNumber;

var istart = bnum - 10;
var iend   = bnum;

for (var i=istart; i<iend; i++){
		var block = web3.eth.getBlock(i);
		var miner = block.miner;
		console.log(i +":" + miner);

}

/**
var balance  = web3.eth.getBalance(coinbase);
console.log(balance);
*/
