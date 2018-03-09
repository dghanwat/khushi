import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { LoaderComponent } from '../shared/loader/loader.component';
import { DisplayNotificationService } from '../services/display.notification';

import { Observable } from "rxjs/Observable";
import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private displayNotificationService: DisplayNotificationService) {
  }

  ngOnInit() {
    $("html, body").animate({scrollTop: 5});
}

}
