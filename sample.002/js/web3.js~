//Time-stamp: <2018-10-29 21:46:54 hamada>

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

function main() {
		var user = {
				account: null,
				balance: null
		}
		user.account = web3.eth.defaultAccount;
		user.balance = 0;
		web3.eth.getBalance(user.account, (err, balance) => {
				if (err) return;
				console.log(JSON.stringify(balance, undefined, 1));
				var text02 = document.getElementById('text02');
				var v  = web3.fromWei(balance, "ether");
				text02.textContent = 'balance: '+v;
		});
		var text01 = document.getElementById('text01');
		text01.textContent = 'account: '+user.account;
}
