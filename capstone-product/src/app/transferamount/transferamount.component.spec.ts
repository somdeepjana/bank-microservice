import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferamountComponent } from './transferamount.component';

describe('TransferamountComponent', () => {
  let component: TransferamountComponent;
  let fixture: ComponentFixture<TransferamountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ TransferamountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('transferAmountComponent function', () => {
    spyOn(component, 'initVariable');
    fixture.detectChanges();
    expect(component.initVariable).toBeTruthy();
  });

  it('ngOnInit function', () => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('Transfer Amount content is created', () => {
    const element = fixture.debugElement.query(By.css('#transferAmountLanding'));
    expect(element).toBeTruthy();
  });

  it('Page Navigate function is created', () => {
    spyOn(component, 'transferRedirect');
    fixture.detectChanges();
    expect(component.transferRedirect).toBeTruthy();
  });

});
