import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadQuoteComponent } from './upload-quote.component';

describe('UploadQuoteComponent', () => {
  let component: UploadQuoteComponent;
  let fixture: ComponentFixture<UploadQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
