import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MainComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy function', () => {
    spyOn(component, 'ngOnDestroy');
    fixture.detectChanges();
    expect(component.ngOnDestroy).toBeTruthy();
  });

  it('ngOnInit function', () => {
    spyOn(component, 'ngOnInit');
    fixture.detectChanges();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('Page Redirect function created', () => {
    spyOn(component, 'goToPage');
    fixture.detectChanges();
    expect(component.goToPage).toBeTruthy();
  });

  it('mainComponent function', () => {
    spyOn(component, 'initVariable');
    fixture.detectChanges();
    expect(component.initVariable).toBeTruthy();
  });
});
