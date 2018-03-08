import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InternalMessageService } from '../../services/internal.message.service';
import { Constants } from '../../services/constants';

@Component({
  selector: 'app-ui-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {
  isUserAuthorized: boolean = false;
  isUserAdministrator: boolean = false;
  loggedInUserName: string = '';
  showMobileMenu: boolean = false;

  @ViewChild('topnav') topnav: ElementRef;

  constructor(private _router: Router,
    private _authService: AuthService,
    private messageService: InternalMessageService,
    private constants: Constants) {
    _router.events.subscribe(this.updateMenuAfterLogin.bind(this));
    
  }

  ngOnInit() { }

  toggle() {
    this.topnav.nativeElement.classList.toggle(['responsive']);
  }

  openMobileMenu() {
    this.showMobileMenu = true;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  getMobileMenuClass() {
    if(this.showMobileMenu) {
      return "prepare-anim open";
    }
  }

  logout() {
    this._authService.logout();
    this._router.navigateByUrl('/');
  }

  updateMenuAfterLogin() {
    this.isUserAuthorized = this._authService.isUserAuthorized();
    this.isUserAdministrator = this._authService.isCurrentUserAnAdministrator();
    this.loggedInUserName = this._authService.getLoggedInUserName();
  }

}
