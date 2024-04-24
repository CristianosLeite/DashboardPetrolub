import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifLitrosComponent } from './dif-litros.component';

describe('LastProcessoComponent', () => {
  let component: DifLitrosComponent;
  let fixture: ComponentFixture<DifLitrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifLitrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifLitrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
