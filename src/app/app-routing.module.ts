import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ContactsComponent } from './contacts/contacts.component'
import { AlertsComponent } from './alerts/alerts.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'


const routes: Routes = [
  { path: 'alerts', component: AlertsComponent },
  { path: 'contacts', component: ContactsComponent},
  { path: '', redirectTo: 'alerts', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
