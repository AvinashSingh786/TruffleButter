﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'gdo.component.html'
})

export class GDOComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        // reset login status
    }
}
