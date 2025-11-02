import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVehiculoComponent } from './lista-vehiculo/lista-vehiculo.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListaVehiculoComponent],
  exports: [ListaVehiculoComponent]
})
export class VehiculoModule { }
