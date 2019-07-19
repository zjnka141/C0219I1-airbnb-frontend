import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/accounts/login/login.component';
import { UploadImageComponent } from './components/houses/upload-image/upload-image.component';
import { RegisterComponent } from './components/accounts/register/register.component';
import { PostnewsComponent } from './components/houses/postnews/postnews.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "upload-image", component: UploadImageComponent },
  { path: "register", component: RegisterComponent },
  { path: "postnews", component: PostnewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
