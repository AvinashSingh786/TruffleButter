import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QrScannerModule } from 'angular2-qrscanner';
import { Web3Service } from '../_services/index'
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'beneficiary.component.html'
})

export class BeneficiaryComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loggedin = false;
    balance = 0;
    constructor(
        private route: ActivatedRoute,
        private router: Router, private web3Service: Web3Service) {
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
    }

    async getBalance() {
        this.loading = true;
        this.balance = await this.web3Service.web3.eth.getBalance(this.model.address);
        this.loading = false;
    }
}
