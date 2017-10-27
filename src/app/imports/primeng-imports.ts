import { NgModule } from '@angular/core';
import { MultiSelectModule } from '../../../node_modules/primeng/components/multiselect/multiselect';
import { DropdownModule } from '../../../node_modules/primeng/components/dropdown/dropdown';
@NgModule({
    imports: [
        MultiSelectModule,
        DropdownModule
    ],
    exports: [
        MultiSelectModule,
        DropdownModule
    ]
})

export class PrimeNgImports {}