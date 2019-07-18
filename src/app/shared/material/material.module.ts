import { NgModule } from '@angular/core';
import { MatProgressBarModule,MatProgressSpinnerModule, MatButtonModule, 
  MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, 
  MatCardModule, MatCheckboxModule, MatTableModule, MatSortModule } 
from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const MaterialModules=[
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule, 
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  FlexLayoutModule
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
