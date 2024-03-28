import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectionDialogComponent } from './table-selection-dialog.component';

describe('TableSelectionDialogComponent', () => {
  let component: TableSelectionDialogComponent;
  let fixture: ComponentFixture<TableSelectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSelectionDialogComponent]
    });
    fixture = TestBed.createComponent(TableSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
