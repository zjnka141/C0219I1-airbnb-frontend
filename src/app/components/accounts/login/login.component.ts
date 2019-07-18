import { Component, OnInit } from '@angular/core';
import { AuthJwtService } from '../../../auth/auth-jwt.service';
import { FormBuilder, Validators} from '@angular/forms'
import { AuthLoginInfo } from '../../../auth/login-info';
import { TokenStorageService } from '../../../auth/token-storage.service';
import { AuthService,FacebookLoginProvider } from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username:String='';
  password:String='';
  userInfo:AuthLoginInfo;
  submitted:boolean=false;
  roles:string[]=[];
  isLoginFailed:boolean=false;
  isLoggedIn:boolean=false;
  userLogin:string='';

  constructor(
    private auth:AuthJwtService, private fb:FormBuilder,
    private tokenStorage: TokenStorageService,
    private socialAuthService: AuthService) { }

  loginForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(25)]],
    password:['',Validators.required]
  });
  ngOnInit() {

  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  get fusername(){
    return this.loginForm.get('username');
  }
  get fpassword(){
    return this.loginForm.get('password');
  }
  onSubmit(){
    this.submitted=true;
    this.userInfo= new AuthLoginInfo(this.fusername.value,this.fpassword.value);
    this.auth.attemptAuth(this.userInfo).subscribe(
      data=>{
        console.log("OK ",data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.userLogin=data.username;
        this.roles=this.tokenStorage.getAuthorities();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      },
      error=>{
        console.log("Error ",error);
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    );

  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
      }
    );
  }
}
