import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LaptopsComponent } from './laptops/laptops.component';
import { ConsolasComponent } from './consolas/consolas.component';
import { PcsComponent } from './pcs/pcs.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagoComponent } from './pago/pago.component';
import { entryGuard } from './entry.guard';

export const routes: Routes = [
    {path : '' , component:IndexComponent},
    {path : 'laptops' , component:LaptopsComponent},
    {path : 'consolas' , component:ConsolasComponent},
    {path : 'pcs', component: PcsComponent},
    {path : 'carrito', component: CarritoComponent , canActivate: [entryGuard]},
    {path : 'checkout' , component:CheckoutComponent , canActivate: [entryGuard]},
    {path : 'pago' , component:PagoComponent , canActivate: [entryGuard]}

];
