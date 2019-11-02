import { NgModule } from '@angular/core';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { MatToolbarModule, MatDialogModule, MatCheckboxModule, MatSelectModule } from '@angular/material';

@NgModule({
    imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatDialogModule, MatSelectModule],
    exports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatToolbarModule ,MatDialogModule, MatSelectModule],
})
export class MaterialModule { }