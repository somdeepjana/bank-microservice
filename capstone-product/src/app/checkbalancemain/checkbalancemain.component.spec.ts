import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckbalancemainComponent } from './checkbalancemain.component';

describe('CheckbalancemainComponent', () => {
  let component: CheckbalancemainComponent;
  let fixture: ComponentFixture<CheckbalancemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CheckbalancemainComponent ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(CheckbalancemainComponent);
      component = fixture.componentInstance;
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbalancemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('display_details function', () => {
    spyOn(component, 'display_details');
    fixture.detectChanges();
    expect(component.display_details).toBeTruthy();
});

it('display Balance content is created', () => {
  const element = fixture.debugElement.query(By.css('#accountNumber'));
  expect(element).toBeTruthy();
});

it('ngOnInit function', () => {
  spyOn(component, 'ngOnInit');
  fixture.detectChanges();
  expect(component.ngOnInit).toBeTruthy();
});

it('ngOnDestroy function', () => {
  spyOn(component, 'ngOnDestroy');
  fixture.detectChanges();
  expect(component.ngOnInit).toBeTruthy();
});

it('ngAfterViewInit function', () => {
  spyOn(component, 'ngAfterViewInit');
  fixture.detectChanges();
  expect(component.ngAfterViewInit).toBeTruthy();
});

it('checkBalanceComponent function', () => {
  spyOn(component, 'initVariable');
  fixture.detectChanges();
  expect(component.initVariable).toBeTruthy();
});

});
