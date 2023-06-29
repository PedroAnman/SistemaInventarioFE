import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarProductoComponent } from './components/registrar-producto/registrar-producto.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'nuevo', component: RegistrarProductoComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'productos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
