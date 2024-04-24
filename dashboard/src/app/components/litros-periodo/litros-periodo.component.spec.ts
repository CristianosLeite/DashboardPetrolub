import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitrosPeriodoComponent } from './litros-periodo.component';

describe('LitrosPeriodoComponent', () => {
  let component: LitrosPeriodoComponent;
  let fixture: ComponentFixture<LitrosPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitrosPeriodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LitrosPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
