import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
const Web3 = require('web3');
const contract = require('truffle-contract');
const ngoArtifacts = require('../../../build/contracts/NGO.json');
const bankArtifacts = require('../../../build/contracts/Bank.json');
const sifArtifacts = require('../../../build/contracts/SifCoin.json');

declare var window: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'bank.component.html'
})

export class BankComponent implements OnInit {
  BankContract = contract(bankArtifacts); //.at("0xdda6327139485221633a1fcd65f4ac932e60a2e1");
  SIFContract = contract(sifArtifacts);

    account: any;
    accounts: any;
    web3: any;
    status: string;
    model: any = {};
    loading = false;
    returnUrl: string;
    loggedin = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router) {
            if (localStorage.getItem('currentUser')) {
                // logged in so return true
                this.loggedin = true;

            }
            else {
                this.loggedin = false;
                this.router.navigate(['/login']);
            }
    }

    ngOnInit() {
        // reset login status
        this.checkAndInstantiateWeb3();
        this.onReady();
    };

    checkAndInstantiateWeb3 = () => {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.web3 !== 'undefined') {
          console.warn(
            'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
          );
          // Use Mist/MetaMask's provider
          this.web3 = new Web3(window.web3.currentProvider);
          // this.web3 = new Web3(
          //   new Web3.providers.HttpProvider('http://localhost:7545')
          // );
        } else {
          console.warn(
            'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
          );
          // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
          this.web3 = new Web3(
            new Web3.providers.HttpProvider('http://localhost:7545')
          );
        }
      };

    onReady = () => {
        // Bootstrap the MetaCoin abstraction for Use.
        // this.BankContract.setProvider(this.web3.currentProvider);
        this.SIFContract.setProvider(this.web3.currentProvider);
    
        // Get the initial account balance so it can be displayed.
        // this.web3.eth.getAccounts((err, accs) => {
        //   if (err != null) {
        //     alert('There was an error fetching your accounts.');
        //     return;
        //   }
    
        //   if (accs.length === 0) {
        //     alert(
        //       'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        //     );
        //     return;
        //   }
        //   this.accounts = accs;
        //   this.account = this.accounts[0];
    
        //   // This is run from window:load and ZoneJS is not aware of it we
        //   // need to use _ngZone.run() so that the UI updates on promise resolution
        //   /* this._ngZone.run(() =>
        //     this.refreshBalance()
        //   ); */
        // });
      };

      setStatus = message => {
        this.status = message;
      };
    
    // addMerchant = () => {
    //     const merchant = this.model.address;
    //     const name = this.model.merchantname;
    //     const typeOfGoods = this.model.goods;
    //     let meta;
    
    //     this.setStatus('Initiating transaction... (please wait)');
    
    //     this.BankContract
    //     .deployed()
    //     .then(instance => {
    //         meta = instance;
    //         meta.addMerchant(merchant, name, typeOfGoods, {
    //         from: this.account
    //         });
    //     })
    //     .then(() => {
    //         this.setStatus('Transaction complete!');
    //         //this.refreshBalance();
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         this.setStatus('Error sending coin; see log.');
    //     });
    // };

    allocateTokens() {
      this.loading = true;
      // if (confirm("Are you sure you want to allocate " + this.model.tokens + " tokens."))
      // {
        this.setStatus('Initiating transaction... (please wait)');
        let sif;
        this.SIFContract
          .deployed()
          .then(instance => {
            sif = instance;
            console.log(sif);
            console.log("Sending tokens to NGO " + this.model.ngo[0]);
            console.log(window.web3);
            console.log(this.web3);
            sif.mint(window.web3.eth.accounts[0], this.model.tokens, { from: window.web3.eth.accounts[0], contractAddress: "0xf17f52151EbEF6C7334FAD080c5704D77216b732"}).then(result => {

              console.log(result);
              console.log("after");
              // sif.transferFrom(window.web3.eth.accounts[0], "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef", 2000, { from: window.web3.eth.accounts[0], contractAddress: "0xf17f52151EbEF6C7334FAD080c5704D77216b732" }).then(result => {

              //   console.log(result);
              //   console.log("token");

              // }).catch(result => {
              //   console.log(result);
              // });
              
            }).catch(result => {
              console.log(result);
            });
             
            console.log(this.model.ngo[0]);
            // alert("Yessss");


            


          })
          .catch(e => {
            console.log(e);
           
          });
      // }
      this.loading = false;
    }
}

