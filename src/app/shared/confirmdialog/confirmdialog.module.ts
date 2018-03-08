import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { ConfirmDialogComponent } from './confirmdialog.component';

@NgModule({
    imports: [SharedModule],
    exports: [ConfirmDialogComponent],
    declarations: [ConfirmDialogComponent]
})

export class ConfirmDialogModule {}
