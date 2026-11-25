/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EgyFlagComponent } from './egy-flag.component';

describe('EgyFlagComponent', () => {
  let component: EgyFlagComponent;
  let fixture: ComponentFixture<EgyFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgyFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgyFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
