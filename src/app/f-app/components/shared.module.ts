import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting/waiting.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './options/options.component';
import { TemplateComponent } from 'src/app/template/template.component';
import { FlagListComponent } from 'src/app/components/fapp/flags/flag-list/flag-list.component';
import { FappListComponent } from 'src/app/components/fapp-list/fapp-list.component';
import { ColorlistComponent } from 'src/app/components/fapp/sweeprand/colorlist/colorlist.component';
import { RouterModule } from '@angular/router';
import { RandomflashingListComponent } from 'src/app/components/fapp/randomflashing/randomflashing.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        TranslateModule.forChild(),
    ],
    declarations: [
        WaitingComponent,
        OptionsComponent,
        TemplateComponent,
        FlagListComponent,
        FappListComponent,
        ColorlistComponent,
        RandomflashingListComponent
    ],
    exports: [
        WaitingComponent,
        OptionsComponent,
        TemplateComponent,
        FlagListComponent,
        FappListComponent,
        ColorlistComponent,
        RandomflashingListComponent
    ]
})
export class SharedModule { }
