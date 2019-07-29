import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/accounts/login/login.component';
import { UploadImageComponent } from './components/houses/upload-image/upload-image.component';
import { RegisterComponent } from './components/accounts/register/register.component';
import { PostnewsComponent } from './components/houses/postnews/postnews.component';
import { UpdatePasswordComponent } from './components/accounts/update-password/update-password.component';
import { ListHouseComponent } from './components/houses/list-house/list-house.component';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './components/accounts/profile/profile.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "upload-image", component: UploadImageComponent },
  { path: "register", component: RegisterComponent },
  { path: "postnews", component: PostnewsComponent },
  { path: "update-password", component: UpdatePasswordComponent },
  { path: "viewList", component: ListHouseComponent },
  { path: "home", component: HomeComponent },
  {
    path: "Profile/:info",
    component: ProfileComponent
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
