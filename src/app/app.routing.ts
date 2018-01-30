import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { GDOComponent } from './gdo/gdo.component';
import { NGOComponent } from './ngo/ngo.component';

import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'gdo', component: GDOComponent },
    { path: 'ngo', component: NGOComponent },
    { path: 'beneficiary', component: BeneficiaryComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);