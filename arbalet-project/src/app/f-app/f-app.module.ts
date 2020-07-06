import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAppPageRoutingModule } from './f-app-routing.module';

import { FAppPage } from './f-app.page';
import { TranslateModule } from '@ngx-translate/core';
import { FappItemComponent } from './components/fapp-item/fapp-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FAppPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [FAppPage, FappItemComponent]
})
export class FAppPageModule {}
