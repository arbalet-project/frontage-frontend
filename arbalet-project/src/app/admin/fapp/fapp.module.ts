import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAppPageRoutingModule } from './fapp-routing.module';

import { FAppPage } from './fapp.page';
import { TranslateModule } from '@ngx-translate/core';
import { FappListComponent } from 'src/app/components/fapp-list/fapp-list.component';
import { TemplateComponent } from 'src/app/template/template.component';
import { FlagsComponent } from './flags/flags.component';
import { FlagListComponent } from 'src/app/components/fapp/flags/flag-list/flag-list.component';
import { RadioListComponent } from 'src/app/f-app/components/form/radio-list/radio-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    FAppPageRoutingModule
  ],
  declarations: [FAppPage, FappListComponent, TemplateComponent, FlagsComponent, FlagListComponent, RadioListComponent]
})
export class FAppPageModule { }
