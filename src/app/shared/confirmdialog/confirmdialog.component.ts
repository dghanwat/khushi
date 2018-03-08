import { Component } from '@angular/core';
import {ConfirmDialogService} from './confirmdialog.service';
@Component({
   moduleId: module.id,
   selector: 'confirm',
   templateUrl: './confirmdialog.component.html',

})
export class ConfirmDialogComponent {
   message: any;
   constructor(
     private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
   //this function waits for a message from alert service, it gets
   //triggered when we call this from any other component
   this.confirmDialogService.getMessage().subscribe(message => {
       this.message = message;
   });
 }
}
