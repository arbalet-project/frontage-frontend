import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NicknameGeneratorService } from "src/app/core/nickname_generator/nickname-generator.service";
import { FrontageService } from "src/app/core/frontage/frontage.service";
import { TranslateService } from "@ngx-translate/core";
import { cpuUsage } from 'process';

@Component({
  selector: "user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  @Input() disabled: boolean = false;
  @Input() message: string;

  constructor(
    private nickname: NicknameGeneratorService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(this.nickname.generateNickname(), {
        updateOn: "blur",
        validators: [Validators.required],
      }),
    });
  }

  public start() {
    console.log(this.form.value.username);
  }


}
