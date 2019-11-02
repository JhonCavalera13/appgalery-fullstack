import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ListComponent } from './components/list/list.component';
import { GuardService } from './services/guard.service';
import { NewImageComponent } from './components/new-image/new-image.component';
import { EditImageComponent } from './components/edit-image/edit-image.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { IsLogged } from './services/isLogged.service';


const routes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [GuardService],
    children: [
      { path: 'list', component: ListComponent },
      { path: 'new', component: NewImageComponent },
      { path: 'edit/:id', component: EditImageComponent },
      {path: 'search/result', component: SearchResultComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home/1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
