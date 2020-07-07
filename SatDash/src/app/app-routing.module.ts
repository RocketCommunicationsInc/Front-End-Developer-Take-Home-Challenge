import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';

// a typical angular route has two properties
// path: a string that matches url in the browser address bar
// component: component that the router should create when navigating to this route
const routes: Routes = [{ path: 'contacts', component: ContactsComponent }];

@NgModule({
  // add routerModule to the appRoutingMpdule imports array and configure it with routes
  imports: [RouterModule.forRoot(routes)],
  // export RouterModule so it can be used throughout app
  exports: [RouterModule],
})
export class AppRoutingModule {}
