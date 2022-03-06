import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MinistatementmainComponent } from './ministatementmain.component';

describe('MinistatementmainComponent', () => {
  let component: MinistatementmainComponent;
  let fixture: ComponentFixture<MinistatementmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MinistatementmainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistatementmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('miniStatement Button is created', () => {
    const element = fixture.debugElement.query(By.css('#miniStatementButton'));
    expect(element).toBeTruthy();
    });

      it('Page Navigation function is created', () => {
      spyOn(component, 'goToDetailsPage');
      fixture.detectChanges();
      expect(component.goToDetailsPage).toBeTruthy();
    });

    it('ngOnInit created', () => {
      spyOn(component, 'ngOnInit');
      fixture.detectChanges();
      expect(component.ngOnInit).toBeTruthy();
    });

    it('ngOnDestroy created', () => {
      spyOn(component, 'ngOnDestroy');
      fixture.detectChanges();
      expect(component.ngOnDestroy).toBeTruthy();
    });

    it('miniStatementComponent function', () => {
      spyOn(component, 'initVariable');
      fixture.detectChanges();
      expect(component.initVariable).toBeTruthy();
    });
});
