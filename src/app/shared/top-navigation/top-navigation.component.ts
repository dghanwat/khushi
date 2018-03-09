import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InternalMessageService } from '../../services/internal.message.service';
import { Constants } from '../../services/constants';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

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
  urlPath: String;
  userName: any;
  user: Observable<firebase.User>;

  menus = []

  @ViewChild('topnav') topnav: ElementRef;

  constructor(private _router: Router,
    private _authService: AuthService,
    private messageService: InternalMessageService,
    private constants: Constants,
    private activatedRoute: ActivatedRoute,
    private afAuth: AngularFireAuth) {
      this.menus.push({
        id: "home",
        link: "/home",
        displayText: "Home"
      })
      this.user = afAuth.authState;
      this.afAuth.authState.subscribe(auth => {
        if(auth) {
          this.userName = auth;
          console.log("User name from FB",this.userName)
          console.log("User name Display",this.userName.displayName)
        }
      });
  }

  ngOnInit() { 
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.urlPath = this.activatedRoute.snapshot.url.join('/');
    })
  }

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
    console.log("In Logout")
    this.afAuth.auth.signOut();
    this.userName = null;
    this._authService.logout();
    this._router.navigateByUrl('/');
  }

  updateMenuAfterLogin() {
    this.isUserAuthorized = this._authService.isUserAuthorized();
    this.isUserAdministrator = this._authService.isCurrentUserAnAdministrator();
    this.loggedInUserName = this._authService.getLoggedInUserName();
  }

  getHeaderCSS() {
    if(this._router.routerState.snapshot.url.indexOf("login") != -1) {
      return "header-background"
    }
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  

}
