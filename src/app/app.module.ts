import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule,FormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/accounts/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./shared/material/material.module";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NgxGalleryModule } from 'ngx-gallery';
import { UploadImageComponent } from './components/houses/upload-image/upload-image.component';
import { RegisterComponent } from './components/accounts/register/register.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angular-6-social-login";
import { PostnewsComponent } from './components/houses/postnews/postnews.component';
import { UpdatePasswordComponent } from './components/accounts/update-password/update-password.component';
import { ManageHouseComponent } from './components/houses/manage-house/manage-house.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { HeaderComponent } from './layout/header/header.component';
import { ViewHouseComponent } from './components/houses/view-house/view-house.component';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,MatDividerModule,MatGridListModule } 
from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { BookingHouseComponent } from './components/houses/booking-house/booking-house.component';
import { ProfileComponent } from './components/accounts/profile/profile.component';
import { ListHouseComponent } from './components/houses/list-house/list-house.component';
import { Ng5SliderModule } from 'ng5-slider';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("480680596076970")
      }
    ]
  );
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadImageComponent,
    RegisterComponent,
    PostnewsComponent,
    UpdatePasswordComponent,
    ViewHouseComponent,
    ManageHouseComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BookingHouseComponent,
    ProfileComponent,
    ListHouseComponent
  ],

  entryComponents: [
    UploadImageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MaterialModule,
    NgxGalleryModule,
    FormsModule,
    SocialLoginModule,
    Ng5SliderModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs,
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
