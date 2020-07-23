import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting/waiting.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OptionsComponent } from './options/options.component';
import { TemplateComponent } from 'src/app/template/template.component';
import { JoystickComponent } from './joystick/joystick.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
     ],
    declarations: [
        WaitingComponent,
        OptionsComponent,
        TemplateComponent,
        JoystickComponent
    ],
    exports: [
        WaitingComponent,
        OptionsComponent,
        TemplateComponent,
        JoystickComponent
    ]
})
export class SharedModule {}
