import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('Page Navigate function', () => {
    spyOn(component, 'goToPage3');
    fixture.detectChanges();
    expect(component.goToPage3).toBeTruthy();
  });

  it('headerCmponent function', () => {
    spyOn(component, 'initVariable');
    fixture.detectChanges();
    expect(component.initVariable).toBeTruthy();
  });
});
