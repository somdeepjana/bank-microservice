import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TransactiponPage2Component } from './transactipon-page2.component';

describe('TransactiponPage2Component', () => {
  let component: TransactiponPage2Component;
  let fixture: ComponentFixture<TransactiponPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ TransactiponPage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactiponPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit function', () => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('Page Navigate function is created', () => {
    spyOn(component, 'backToTransferMain');
    fixture.detectChanges();
    expect(component.backToTransferMain).toBeTruthy();
  });
});
