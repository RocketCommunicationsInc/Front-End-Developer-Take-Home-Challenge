import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ContactsTableComponent } from '../dashboard_elements/contacts-table/contacts-table.component';
import { AlertsTableComponent } from '../dashboard_elements/alerts-table/alerts-table.component';
import { CounterComponent } from '../../widgets/counter/counter.component';
import { TitleComponent } from '../title/title.component';


import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CountUpModule } from 'ngx-countup';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


/*
Share module for dashboard components. Pulls in necessary modules for dashboard layout.
*/

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ContactsTableComponent,
        AlertsTableComponent,
        CounterComponent,
        TitleComponent
    ],
    imports: [
        CommonModule,
        MatDividerModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule,
        MatMenuModule,
        MatListModule,
        RouterModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatCardModule,
        CountUpModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ContactsTableComponent,
        AlertsTableComponent,
        CounterComponent,
        TitleComponent
    ]
})
export class SharedModule { }
