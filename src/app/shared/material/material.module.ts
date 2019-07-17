import { NgModule } from '@angular/core';
import { MatProgressBarModule,MatProgressSpinnerModule, MatButtonModule, 
  MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, 
  MatCardModule, MatCheckboxModule } 
from '@angular/material';
const MaterialModules=[
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule, 
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule
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
