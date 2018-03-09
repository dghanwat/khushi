import { Component , AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { FormStateModel } from '../models/form/form-state.model';
import { LoginRequestModel } from '../models/auth/login-request.model';

import { InternalMessageService } from '../services/internal.message.service';
import { Constants } from '../services/constants';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements AfterViewInit , OnInit {
    formState: FormStateModel;
    loginForm: FormGroup;

    private _loginRequest: LoginRequestModel;

    constructor(private _formBuilder: FormBuilder,
            private _router: Router,
            private _authService: AuthService,
            private messageService: InternalMessageService,
            private constants: Constants,
            private slimLoadingBarService: SlimLoadingBarService) {
        if (this._authService.isUserAuthorized()) {
            this._router.navigate(['/organisation/dashboard']);
        }

        this.formState = new FormStateModel();

        this.loginForm = this._formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.formState.submitError = false;
        });
    }

    onLoginFormSubmit() {
        this._loginRequest = new LoginRequestModel();
        this._loginRequest.username = this.loginForm.value.username;
        this._loginRequest.password = this.loginForm.value.password;

        this.formState.submitting = true;
        this.formState.submitError = false;
        this.slimLoadingBarService.start();
        this._authService.login(this._loginRequest).subscribe((user) => {
            this.messageService.sendMessage(this.constants.LOGIN_SUCCESS, '');
            this.slimLoadingBarService.complete();
            this._router.navigate(['/organisation/dashboard']);
        }, (errorMessage: string) => {
            this.formState.submitting = false;
            this.formState.submitError = true;
            this.formState.submitErrorMessage = errorMessage;
            this.slimLoadingBarService.complete();
        });
    }

    ngAfterViewInit() {
        $("html, body").animate({scrollTop: 1});
    }

    ngOnInit() {
        $("html, body").animate({scrollTop: 2});
    }
}
