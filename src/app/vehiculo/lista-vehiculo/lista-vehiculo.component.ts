import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css']
})
export class ListaVehiculoComponent implements OnInit {
vehiculos: Array<Vehiculo> = [];
modelosCount: Array<{marca: string, conteo: number}> = [];
  constructor(private vehiculoService: VehiculoService) { }

  getVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(data => {
      this.vehiculos = data;
      this.calculateModelCounts(); // Llamamos a calculateModelCounts cuando obtenemos los vehículos
    });
  }

  calculateModelCounts() {
    // Crear un objeto temporal para contar
    const conteoTemp: { [key: string]: number } = {};
    
    // Contar vehículos por marca
    this.vehiculos.forEach(vehiculo => {
      if (conteoTemp[vehiculo.marca]) {
        conteoTemp[vehiculo.marca]++;
      } else {
        conteoTemp[vehiculo.marca] = 1;
      }
    });
    
    // Convertir el objeto temporal en un array de objetos con marca y conteo
    this.modelosCount = Object.entries(conteoTemp).map(([marca, conteo]) => ({
      marca,
      conteo
    }));
  }

  ngOnInit() {
    this.getVehiculos();
  }

}
