import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['../../styles/components/home.css']
})

export class HomeComponent implements AfterViewInit {
    constructor(private _router: Router, private _authService: AuthService) {
    }

    ngAfterViewInit() {
        $("html").trigger("ngAfterViewInit", ["homepage"]);
        $("html, body").animate({scrollTop: 1});
    }




}
