import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelAtualComponent } from './nivel-atual.component';

describe('NivelAtualComponent', () => {
  let component: NivelAtualComponent;
  let fixture: ComponentFixture<NivelAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NivelAtualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NivelAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
