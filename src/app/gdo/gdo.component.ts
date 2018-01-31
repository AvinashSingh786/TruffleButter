import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
    moduleId: module.id.toString(),
    templateUrl: 'gdo.component.html'
})

export class GDOComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    loggedin = false;
    type: any;
    data: any;
    options: any;


    public doughnutChartLabels: string[] = ['Tokens Burned', 'Tokens Minted'];
    public doughnutChartData: number[] = [450, 550];
    public doughnutChartType: string = 'doughnut';

    public barChartLabels: string[] = ['Merchant1', 'Merchant2', 'Merchant3'];
    public barChartData: any[] = [350, 450, 100, 200];
    public barChartType: string = 'bar';

    public scatterChartLabels: string[] = ['Grains', 'Vegetables', 'Oils', 'Meat', 'Water'];
    public scatterChartData: any[] = [850, 450, 200, 1000, 500];
    public scatterChartType: string = 'radar';

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

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
