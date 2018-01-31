import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    // addBeneficiary: any = {};
    // removeBeneficiary: any = {};
    // addMerchant: any = {};
    // removeMerchant: any = {};
    model: any;
    loading = false;
    loggedin = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedin = true;

        }
        else {
            this.loggedin = false;
            this.router.navigate(['/login']);
        }
         }

    addBeneficiary() {
        this.loading = true;
        // this.userService.create(this.model)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //              this.loading = false;
        //         });
    }

    removeBeneficiary() {
        this.loading = true;
        if (confirm("Are you sure you want to remove this beneficiary")) {
            this.loading = false;
        }
        this.loading = false;
         
    }

}
