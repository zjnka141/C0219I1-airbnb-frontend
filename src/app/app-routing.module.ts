import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/accounts/login/login.component';
import { UploadImageComponent } from './components/houses/upload-image/upload-image.component';
import { RegisterComponent } from './components/accounts/register/register.component';
import { UpdatePasswordComponent } from './components/accounts/update-password/update-password.component';
import { UpdateUserInformationComponent } from './components/accounts/update-user-information/update-user-information.component';
import { ListAccountComponent } from './components/accounts/list-account/list-account.component';
import { ListCustomerComponent } from './components/customer/list-customer/list-customer.component'

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "upload-image", component: UploadImageComponent },
  { path: "register", component: RegisterComponent },
  { path: "update-password", component: UpdatePasswordComponent},
  {path: 'list-account', component:ListAccountComponent},
  { path: 'update-user-information/:id', component: UpdateUserInformationComponent },
  { path: 'list-customer', component:ListCustomerComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
