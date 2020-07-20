import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAppPageRoutingModule } from './fapp-routing.module';

import { FAppPage } from './fapp.page';
import { TranslateModule } from '@ngx-translate/core';
import { FappListComponent } from 'src/app/components/fapp-list/fapp-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    FAppPageRoutingModule
  ],
  declarations: [FAppPage, FappListComponent]
})
export class FAppPageModule {}
