import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterOptionsComponent } from './options/footer/footer.component';
import { HeaderOptionsComponent } from './options/header/header.component';
import { WaitingComponent } from './waiting/waiting.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
     ],
    declarations: [
        FooterOptionsComponent,
        HeaderOptionsComponent,
        WaitingComponent
    ],
    exports: [
        FooterOptionsComponent,
        HeaderOptionsComponent,
        WaitingComponent
    ]
})
export class SharedModule {}