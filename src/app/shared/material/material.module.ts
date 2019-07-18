import { NgModule } from '@angular/core';
import {
  MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule,
  MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatSidenavModule, MatToolbarModule,
  MatMenuModule,MatSnackBarModule
}
  from '@angular/material';
const MaterialModules = [
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule
]
@NgModule({
  declarations: [],
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ]
})
export class MaterialModule { }
