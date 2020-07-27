import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAppPageRoutingModule } from './scheduling-routing.module';

import { SchedulingPage } from './scheduling.page';
import { TranslateModule } from '@ngx-translate/core';
import { FappListComponent } from 'src/app/components/fapp-list/fapp-list.component';
import { TemplateComponent } from 'src/app/template/template.component';
import { FlagsComponent } from './flags/flags.component';
import { FlagListComponent } from 'src/app/components/fapp/flags/flag-list/flag-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    FAppPageRoutingModule
  ],
  declarations: [SchedulingPage, FappListComponent, TemplateComponent, FlagsComponent, FlagListComponent]
})
export class SchedulingPageModule { }