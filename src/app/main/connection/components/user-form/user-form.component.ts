import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NicknameGeneratorService } from 'src/app/core/nickname_generator/nickname-generator.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  @Input() disabled = false;
  @Input() message: string;

  constructor(
    private nickname: NicknameGeneratorService,
    public auth: AuthenticationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(this.nickname.generateNickname(), {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }

  public start() {
    this.auth.userAuth(this.form.value.username).subscribe((res) => {
      if (res) {
        this.navCtrl.navigateForward('/f-app');
      } else {
        // TODO : Error
      }
    });
  }
}
