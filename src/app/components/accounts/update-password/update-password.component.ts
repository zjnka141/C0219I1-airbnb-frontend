import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { LoginStatusService } from 'src/app/shared/login-status.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  registerForm: FormGroup;
  newPassword: String;
  currentPassword: String;
  message: String;
  id: number = 9;
  loginStatus: Boolean = false;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, 
    private loginStatusService: LoginStatusService, private token: TokenStorageService) { }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordnotmatch: true
    };
  }
  validatePass() {

  }
  ngOnInit() {
    const token = this.token.getToken();
    if(token!=null){
      this.loginStatusService.changeState(true);
    }
    this.loginStatusService.status.subscribe(status => {
      console.log(status);
      this.loginStatus = status;
    });
    this.registerForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: this.formBuilder.group({
        newPassword: ['', [Validators.minLength(6), Validators.required]],
        confirmPassword: ['', Validators.required]
      }, {
          validator: this.comparePassword,

        })
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    console.log("aasd")
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (confirm("Bạn có muốn cập nhật password này hay không?")) {
      if (this.registerForm.valid) {
        this.currentPassword = this.registerForm.get("currentPassword").value;
        this.newPassword = this.registerForm.get("password").get("newPassword").value;
        if (this.currentPassword == this.newPassword) {
          alert("Same old password");
        } else {
          this.accountService.updatePassword(this.id, this.newPassword, this.currentPassword)
            .subscribe(res => {
              if (res.text == "Successful") {
                alert("Success");
              } else if (res.text == "NotCompare") {
                alert("Wrong Password");
              } else {
                alert("Wrong Account");
              }
            })
        }
      } else {
        alert("Please enter full information");
      }
    }
  }
}
