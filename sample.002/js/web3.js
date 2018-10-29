//Time-stamp: <2018-10-30 00:28:02 hamada>

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
				//callback();
				setInterval(callback, 300);
    } else {
				document.write("Please switch MetaMask to Ropsten Test Network and reload page.");
    }
  });
}

function saveAccountInfo2storage(_account) {
		web3.eth.getBalance(_account, (err, _wei) => {
				if (err) return;
				var v = web3.fromWei(_wei, "ether");
				sessionStorage.clear();
				sessionStorage.metamask_account = _account;
				sessionStorage.metamask_balance = v;
				console.log('v: '+v);
		});
}

function main() {
		var account = web3.eth.defaultAccount;
		saveAccountInfo2storage(account);
		var balance = sessionStorage.getItem('metamask_balance');
		balance = Number(balance);
		console.log(balance);

		var text01 = document.getElementById('text01');
		var text02 = document.getElementById('text02');
		var text03 = document.getElementById('text03');

		if(balance > 31.0){
				text01.textContent = 'Success!!';
				text02.textContent = 'account: '+account;
				text03.textContent = balance + " ETH";
		}else{
				text01.textContent = 'Failed...';
				text02.textContent = 'account: '+account;
				text03.textContent = "you only have "+balance+" ETH! not enough !!"
		}
}
