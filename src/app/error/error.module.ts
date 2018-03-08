import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './error.component';

@NgModule({
    imports: [SharedModule],
    declarations: [ErrorComponent]
})

export class ErrorModule {}
