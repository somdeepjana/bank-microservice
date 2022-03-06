import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MinistatementdetailsComponent } from './ministatementdetails.component';

describe('MinistatementdetailsComponent', () => {
  let component: MinistatementdetailsComponent;
  let fixture: ComponentFixture<MinistatementdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MinistatementdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistatementdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Page Redirect Function', () => {
    spyOn(component, 'goTopage6');
    fixture.detectChanges();
    expect(component.goTopage6).toBeTruthy();
});

it('should create mini statement content', () => {
  const element = fixture.debugElement.query(By.css('#miniStatementContent'));
  expect(element).toBeTruthy();
});

it('ngOnInit function', () => {
  spyOn(component, 'ngOnInit');
  fixture.detectChanges();
  expect(component.ngOnInit).toBeTruthy();
});

});
