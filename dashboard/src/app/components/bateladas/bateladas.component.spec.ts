import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BateladasComponent } from './bateladas.component';

describe('BateladasComponent', () => {
  let component: BateladasComponent;
  let fixture: ComponentFixture<BateladasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BateladasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BateladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
