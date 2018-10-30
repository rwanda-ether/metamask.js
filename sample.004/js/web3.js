//Time-stamp: <2018-10-30 17:16:20 hamada>

//var contractAddress = "0x7b3C93596C3e07F8AFd06a1e7aEd3F4fE2EF74B6"; // MAK
//var contractAddress = "0x3D854Bb187C4D38fc69a36f56e4F8ca7cAA247DF"; // But coin
var contractAddress = "0xFE4F88ff1B52f1cBb1F3C002aFCC57cA53eA5D57"; // YAM

var contractAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];


if( ('sessionStorage' in window) && (window.sessionStorage !== null) ) {
    console.log("SessionStorage: Available!");
} else {
    console.log("SessionStorage: Not available...");
}


window.addEventListener('load', () => {
		if (typeof web3 !== 'undefined') {
				window.web3 = new Web3(web3.currentProvider);
				console.log(web3.currentProvider.constructor.name);
				onlyRopstenTestNetwork(main);
		} else {
			document.write("Please install <a href=\"https://metamask.io/\">MetaMask</a>.")
		}
});


function onlyRopstenTestNetwork(callback) {
  web3.version.getNetwork((err, netId) => {
    if (netId === "3") {
				callback();
    } else {
				document.write("Please switch MetaMask to Ropsten Test Network and reload page.");
    }
  });
}

function saveAccountInfo2storage(_account) {
		web3.eth.getBalance(_account, (err, _wei) => {
				if (err) return;
				var v = web3.fromWei(_wei, "ether");
				sessionStorage.metamask_account = _account;
				sessionStorage.metamask_balance = v;
				console.log('v: '+v);
		});
}



function initializeApp(account, contract, name, symbol, decimals, balance){
		console.log("contract.address: " + contractAddress);
		console.log("contract.name: " + name);
		console.log("contract.symbol: " + symbol);
		console.log("contract.decimals: " + Number(decimals));
		console.log("contract.balance: " + Number(balance)/10**Number(decimals));
		sessionStorage.metamask_ERC20_name = name;
		sessionStorage.metamask_ERC20_symbol = symbol;
		sessionStorage.metamask_ERC20_decimals = Number(decimals);
		sessionStorage.metamask_ERC20_balance = Number(balance)/(10**Number(decimals));
}


function main() {
		sessionStorage.clear();
		mainLoop();
		setInterval(mainLoop, 5000);
}

function mainLoop() {
		var account = web3.eth.defaultAccount;
		var contract = web3.eth.contract(contractAbi).at(contractAddress);

		contract.name(function(err, name){
				if(err) throw err;
				contract.symbol(function(err, symbol){
						if(err) throw err;
						contract.decimals(function(err, decimals){
								if(err) throw err;
								contract.balanceOf(account, function(err, balance){
										if(err) throw err;
										initializeApp(account, contract, name, symbol, decimals, balance);
								});
						});
				});
		});

		saveAccountInfo2storage(account);
		var balance = sessionStorage.getItem('metamask_balance');
		balance = Number(balance);
		console.log(balance);

		var lamp   = document.getElementById('lamp');
		var text01 = document.getElementById('text01');
		var text02 = document.getElementById('text02');
		var text03 = document.getElementById('text03');
		var qrcode = document.getElementById('qrcode');
		var bar    = document.getElementById('bar');

		qrcode.src = "http://chart.apis.google.com/chart?cht=qr&chs=130x130&chl="+account;

/**
		sessionStorage.metamask_ERC20_name = name;
		sessionStorage.metamask_ERC20_symbol = symbol;
		sessionStorage.metamask_ERC20_decimals = Number(decimals);
		sessionStorage.metamask_ERC20_balance = Number(balance)/10**Number(decimals);
*/

		var ERC20_name = sessionStorage.getItem('metamask_ERC20_name');
		var ERC20_symbol = sessionStorage.getItem('metamask_ERC20_symbol');
		var ERC20_decimals = sessionStorage.getItem('metamask_ERC20_decimals');
		var ERC20_balance = sessionStorage.getItem('metamask_ERC20_balance');

		console.log('ERC20_balance: '+ ERC20_balance);

		if(1 == ERC20_balance % 2){
				lamp.src = "./img/lamp-on.png";
				text01.textContent = 'Success!!';
				text02.textContent = 'account: '+account;
				text03.textContent = ERC20_balance + " " + ERC20_symbol;
		}else{
				lamp.src = "./img/lamp-off.png";
				text01.textContent = 'Failed...';
				text02.textContent = 'account: '+account;
				text03.textContent = "you only have "+ERC20_balance+" "+ERC20_symbol +"! not enough !!";
		}

}
