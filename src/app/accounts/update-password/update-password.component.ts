import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  registerForm: FormGroup;
  newPassword: String;
  currentPassword: String;
  message: String;
  id: number = 1;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.newPassword === v.confirmPassword) ? null : {
      passwordnotmatch: true
    };
  }
  validatePass() {

  }
  ngOnInit() {
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
