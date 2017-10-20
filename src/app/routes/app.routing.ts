import { Routes, RouterModule } from '@angular/router';

import { ElementsComponent } from '../components/elements/elements.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { ELEMENT_ROUTES } from './element.routing';

const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'elements',
        pathMatch: 'full'
    },
    {
        path: 'elements',
        component: ElementsComponent,
        data: { title: 'KmdProj | Elements', pageTitle: 'Elements | Main' },
        children: ELEMENT_ROUTES
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'KmdProj | Login', pageTitle: 'Login' }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'KmdProj | Register', pageTitle: 'Register' }
    },
    {
        path: 'profile/:id',
        component: UserProfileComponent,
        data: { title: 'KmdProj | Profile', pageTitle: 'User Profile' }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { title: 'KmdProj | Not Found', pageTitle: 'Page Not Found' }
    }
]

export const AppRouting = RouterModule.forRoot(APP_ROUTES);