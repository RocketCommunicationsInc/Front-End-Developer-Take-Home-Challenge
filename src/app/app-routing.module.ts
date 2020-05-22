import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AlertsComponent } from './pages/alerts/alerts.component';


const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [{
            path: '',
            component: ContactsComponent,
            data: {
                title: 'Contacts'
            }
        }, {
            path: 'alerts',
            component: AlertsComponent,
            data: {
                title: 'Alerts'
            }
        }
        ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
