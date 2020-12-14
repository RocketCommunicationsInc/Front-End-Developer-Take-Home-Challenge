import { DashboardComponent } from './dashboard/dashboard.component';

export const RocketAppRoutes = [
	{ path: '', component: DashboardComponent},
	{ path: ':tab', component: DashboardComponent}
]
