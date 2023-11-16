import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUserBuyComponent } from './page-user-buy.component';

describe('PageUserBuyComponent', () => {
  let component: PageUserBuyComponent;
  let fixture: ComponentFixture<PageUserBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageUserBuyComponent]
    });
    fixture = TestBed.createComponent(PageUserBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
