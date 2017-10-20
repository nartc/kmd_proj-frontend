import { Routes } from '@angular/router';

import { ElementAddComponent } from '../components/element-add/element-add.component';
import { ElementEditComponent } from '../components/element-edit/element-edit.component';
import { ElementComponent } from '../components/element/element.component';

export const ELEMENT_ROUTES: Routes = [
    {
        path: 'element/:id',
        component: ElementComponent,
        data: {title: 'KmdProj | Elements - Element Detail', pageTitle: 'Element Detail'}
    },
    {
        path: 'add',
        component: ElementAddComponent,
        data: {title: 'KmdProj | Elements - Add', pageTitle: 'Add Element'}
    },
    {
        path: 'edit/:id',
        component: ElementEditComponent,
        data: {title: 'KmdProj | Elements - Edit', pageTitle: 'Edit Element'}
    }
]