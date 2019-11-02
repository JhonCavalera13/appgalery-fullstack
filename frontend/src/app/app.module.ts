import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-modules';

//Services
import { LoginService } from './services/login.service';
import { FotografiasService } from './services/fotografias.service';

//Components
import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { NewImageComponent } from './components/new-image/new-image.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';
import { FotografiaComponent } from './components/fotografia/fotografia.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    ListComponent,
    NewImageComponent,
    EditImageComponent,
    FotografiaComponent,
    RegisterComponent,
    DialogComponent,
    SearchResultComponent,
    FilterPipe
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    FotografiasService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
