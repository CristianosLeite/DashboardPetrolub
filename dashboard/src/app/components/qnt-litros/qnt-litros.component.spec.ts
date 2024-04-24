import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QntLitrosComponent } from './qnt-litros.component';

describe('QntLitrosComponent', () => {
  let component: QntLitrosComponent;
  let fixture: ComponentFixture<QntLitrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QntLitrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QntLitrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
