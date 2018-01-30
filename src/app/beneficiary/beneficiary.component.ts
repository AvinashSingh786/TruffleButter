import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QrScannerModule } from 'angular2-qrscanner';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'beneficiary.component.html'
})

export class BeneficiaryComponent implements OnInit {
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
    }

    getBalance() {
        alert(this.model.address);
        this.loading = true;
    }
}
