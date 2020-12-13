/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Method: sortColumn() should sort strings correctly', () => {
    component.data = [
      {sampleColumn: "z"},
      {sampleColumn: "apple"},
      {sampleColumn: "d"},
      {sampleColumn: "f"}
    ]

    component.sortColumn('sampleColumn');
    console.log(component.data);
    expect(component.data).toEqual([
      {sampleColumn: "apple"},
      {sampleColumn: "d"},
      {sampleColumn: "f"},
      {sampleColumn: "z"},
    ]);
  });

  it('Method: sortColumn() should sort numbers correctly', () => {
    component.data = [
      {sampleColumn: 3214124},
      {sampleColumn: 111111111111111},
      {sampleColumn: 51424242},
      {sampleColumn: 9}
    ]

    component.sortColumn('sampleColumn');
    expect(component.data).toEqual([
      {sampleColumn: 9},
      {sampleColumn: 3214124},
      {sampleColumn: 51424242},
      {sampleColumn: 111111111111111},
    ]);
  });
});
