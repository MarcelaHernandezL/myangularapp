import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ListaVehiculoComponent } from './lista-vehiculo.component';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';
import { of } from 'rxjs';

describe('ListaVehiculoComponent', () => {
  let component: ListaVehiculoComponent;
  let fixture: ComponentFixture<ListaVehiculoComponent>;
  let debug: DebugElement;
  let vehiculoService: VehiculoService;

  const testVehiculos = [
    new Vehiculo(7, 'Renault', 'Sandero', 'New Authentique Life', 2018, 25000, 'Blanco', 'https://example.com/img1.jpg'),
    new Vehiculo(8, 'Chevrolet', 'Traker', 'New LS', 2019, 20000, 'Negro', 'https://example.com/img2.jpg'),
    new Vehiculo(9, 'Nissan', 'March', 'Active Plus', 2022, 32000, 'Blanco', 'https://example.com/img3.jpg')
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ListaVehiculoComponent],
      providers: [
        {
          provide: VehiculoService,
          useValue: { getVehiculos: () => of(testVehiculos) }
        }
      ]
    }).compileComponents();

    vehiculoService = TestBed.inject(VehiculoService);
    spyOn(vehiculoService, 'getVehiculos').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVehiculoComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 3 vehicles on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    
    expect(component.vehiculos.length).toBe(3);
    expect(vehiculoService.getVehiculos).toHaveBeenCalled();
  }));

  it('should display all vehicle brands correctly', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    
    const rows = debug.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
    
    const brands = rows.map(row => row.query(By.css('td:nth-child(2)')).nativeElement.textContent.trim());
    expect(brands).toContain('Renault');
    expect(brands).toContain('Chevrolet');
    expect(brands).toContain('Nissan');
  }));

  it('should calculate model counts correctly', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const counts = component.modelosCount;
    const renaultCount = counts.find(c => c.marca === 'Renault');
    const chevroletCount = counts.find(c => c.marca === 'Chevrolet');
    const nissanCount = counts.find(c => c.marca === 'Nissan');

    expect(renaultCount?.conteo).toBe(1);
    expect(chevroletCount?.conteo).toBe(1);
    expect(nissanCount?.conteo).toBe(1);
  }));
});
