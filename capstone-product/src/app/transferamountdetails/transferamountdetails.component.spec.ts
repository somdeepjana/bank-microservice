import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { TransferamountdetailsComponent } from './transferamountdetails.component';

describe('TransferamountdetailsComponent', () => {
  let component: TransferamountdetailsComponent;
  let fixture: ComponentFixture<TransferamountdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ TransferamountdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferamountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Page Redirect function', () => {
    spyOn(component, 'goTopage4');
    fixture.detectChanges();
    expect(component.goTopage4).toBeTruthy();
});

it('function created', () => {
  spyOn(component, 'ngAfterViewInit');
  fixture.detectChanges();
  expect(component.ngAfterViewInit).toBeTruthy();
});

it('function created', () => {
  spyOn(component, 'ngOnInit');
  fixture.detectChanges();
  expect(component.ngOnInit).toBeTruthy();
});

it('transfer content is created', () => {
  const element = fixture.debugElement.query(By.css('#transferContent'));
  expect(element).toBeTruthy();
});

});
