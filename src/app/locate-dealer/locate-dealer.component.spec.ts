import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateDealerComponent } from './locate-dealer.component';

describe('LocateDealerComponent', () => {
  let component: LocateDealerComponent;
  let fixture: ComponentFixture<LocateDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
