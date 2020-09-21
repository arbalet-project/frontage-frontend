import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController, NavController } from "@ionic/angular";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-authentication-form",
  templateUrl: "./authentication-form.component.html",
  styleUrls: ["./authentication-form.component.scss"],
})
export class AuthenticationFormComponent {
  public adminForm: FormGroup;

  constructor(
    public modalController: ModalController,
    public auth: AuthenticationService,
    private navCtrl: NavController
  ) {
    this.adminForm = new FormGroup({
      username: new FormControl("", {
        validators: [Validators.required],
      }),
      password: new FormControl("", {
        validators: [Validators.required],
      }),
    });
  }

  login() {
    this.auth
      .adminAuth(this.adminForm.value.username, this.adminForm.value.password)
      .subscribe((res: boolean) => {
        if (res) {
          this.navCtrl.navigateForward("/admin"); // TODO : NavControl !
          this.modalController.dismiss();
        } else {
          this.adminForm.setErrors({ 'incorrect': true })
        }
      });
  }

  cancel() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
