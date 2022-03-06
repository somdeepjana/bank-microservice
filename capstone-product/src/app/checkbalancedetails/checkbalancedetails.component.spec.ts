import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckbalancedetailsComponent } from './checkbalancedetails.component';

describe('CheckbalancedetailsComponent', () => {
  let component: CheckbalancedetailsComponent;
  let fixture: ComponentFixture<CheckbalancedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CheckbalancedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbalancedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('balanceRedirect function', () => {
    spyOn(component, 'balanceRedirect');
    fixture.detectChanges();
    expect(component.balanceRedirect).toBeTruthy();
});

it('display Balance content is created', () => {
  const element = fixture.debugElement.query(By.css('#displayBalance'));
  expect(element).toBeTruthy();
});

/* it('display_details function', () => {
  spyOn(component, 'display_details');
  fixture.detectChanges();
  expect(component.display_details).toBeTruthy();
}); */

it('ngOnInit function', () => {
  spyOn(component, 'ngOnInit');
  fixture.detectChanges();
  expect(component.ngOnInit).toBeTruthy();
});

it('ngAfterViewChecked function', () => {
  spyOn(component, 'ngAfterViewChecked');
  fixture.detectChanges();
  expect(component.ngAfterViewChecked).toBeTruthy();
});

});
