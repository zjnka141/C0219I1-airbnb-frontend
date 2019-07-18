import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/accounts/login/login.component';
import { UploadImageComponent } from './components/houses/upload-image/upload-image.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"upload-image",component:UploadImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
