import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting/waiting.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './options/options.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
     ],
    declarations: [
        WaitingComponent,
        OptionsComponent
    ],
    exports: [
        WaitingComponent,
        OptionsComponent
    ]
})
export class SharedModule {}
